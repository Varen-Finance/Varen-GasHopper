import { Currency, ChainId, NATIVE, Token, WNATIVE, WNATIVE_ADDRESS } from '@sushiswap/core-sdk'
import { NEVER_RELOAD, useSingleCallResult } from '../state/multicall/hooks'
import { TokenAddressMap, useAllLists, useInactiveListUrls, useUnsupportedTokenList } from '../state/lists/hooks'
import { useBytes32TokenContract, useTokenContract } from './useContract'
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo'
import { arrayify } from '@ethersproject/bytes'
import { createTokenFilterFunction } from '../functions/filtering'
import { parseBytes32String } from '@ethersproject/strings'
import { useCombinedActiveList } from '../state/lists/hooks'
import { useMemo } from 'react'
import { useUserAddedTokens } from '../state/user/hooks'

// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(
  tokenMap: TokenAddressMap,
  includeUserAdded: boolean,
  chainId: ChainId = ChainId.ETHEREUM
): { [address: string]: Token } {
  const userAddedTokens = useUserAddedTokens(chainId)

  return useMemo(() => {
    if (!chainId) return {}

    // reduce to just tokens
    const mapWithoutUrls = Object.keys(tokenMap[chainId]).reduce<{
      [address: string]: Token
    }>((newMap, address) => {
      newMap[address] = tokenMap[chainId][address].token
      return newMap
    }, {})

    if (includeUserAdded) {
      return (
        userAddedTokens
          // reduce into all ALL_TOKENS filtered by the current chain
          .reduce<{ [address: string]: Token }>(
            (tokenMap, token) => {
              tokenMap[token.address] = token
              return tokenMap
            },
            // must make a copy because reduce modifies the map, and we do not
            // want to make a copy in every iteration
            { ...mapWithoutUrls }
          )
      )
    }

    return mapWithoutUrls
  }, [chainId, userAddedTokens, tokenMap, includeUserAdded])
}

export function useAllTokens(chainId: ChainId = ChainId.ETHEREUM): { [address: string]: Token } {
  const allTokens = useCombinedActiveList(chainId)
  return useTokensFromMap(allTokens, true, chainId)
}

export function useTokens(chainId: ChainId = ChainId.ETHEREUM): { [address: string]: Token } {
  const allTokens = useCombinedActiveList(chainId)
  return useTokensFromMap(allTokens, false, chainId)
}

export function useUnsupportedTokens(chainId: ChainId = ChainId.ETHEREUM): { [address: string]: Token } {
  const unsupportedTokensMap = useUnsupportedTokenList()
  return useTokensFromMap(unsupportedTokensMap, false, chainId)
}

export function useSearchInactiveTokenLists(
  search: string | undefined,
  minResults = 10,
  chainId: ChainId = ChainId.ETHEREUM
): WrappedTokenInfo[] {
  const lists = useAllLists()
  const inactiveUrls = useInactiveListUrls()
  const activeTokens = useAllTokens(chainId)
  return useMemo(() => {
    if (!search || search.trim().length === 0) return []
    const tokenFilter = createTokenFilterFunction(search)
    const result: WrappedTokenInfo[] = []
    const addressSet: { [address: string]: true } = {}
    for (const url of inactiveUrls) {
      const list = lists[url].current
      if (!list) continue
      for (const tokenInfo of list.tokens) {
        if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
          const wrapped: any = new WrappedTokenInfo(tokenInfo, list)
          if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
            addressSet[wrapped.address] = true
            result.push(wrapped)
            if (result.length >= minResults) return result
          }
        }
      }
    }
    return result
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search])
}

export function useIsTokenActive(token: Token | undefined | null, chainId: ChainId = ChainId.ETHEREUM): boolean {
  const activeTokens = useAllTokens(chainId)

  if (!activeTokens || !token) {
    return false
  }

  return !!activeTokens[token.address]
}

// Check if currency is included in custom list from user storage
export function useIsUserAddedToken(
  currency: Currency | undefined | null,
  chainId: ChainId = ChainId.ETHEREUM
): boolean {
  const userAddedTokens = useUserAddedTokens(chainId)

  if (!currency) {
    return false
  }

  return !!userAddedTokens.find((token) => currency.equals(token))
}

// parse a name or symbol from a token response
const BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/

function parseStringOrBytes32(str: string | undefined, bytes32: string | undefined, defaultValue: string): string {
  return str && str.length > 0
    ? str
    : // need to check for proper bytes string and valid terminator
    bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0
    ? parseBytes32String(bytes32)
    : defaultValue
}

// undefined if invalid or does not exist
// null if loading
// otherwise returns the token
export function useToken(chainId: ChainId = ChainId.ETHEREUM, tokenAddress?: string): Token | undefined | null {
  const tokens = useAllTokens(chainId)
  // const address = isAddress(tokenAddress) ? isAddress(tokenAddress) :
  const address = tokenAddress

  const tokenContract = useTokenContract(address ? address : undefined, false)
  const tokenContractBytes32 = useBytes32TokenContract(address ? address : undefined, false)
  const token: Token | undefined = address ? tokens[address] : undefined

  const tokenName = useSingleCallResult(token ? undefined : tokenContract, 'name', undefined, NEVER_RELOAD)
  const tokenNameBytes32 = useSingleCallResult(
    token ? undefined : tokenContractBytes32,
    'name',
    undefined,
    NEVER_RELOAD
  )
  const symbol = useSingleCallResult(token ? undefined : tokenContract, 'symbol', undefined, NEVER_RELOAD)
  const symbolBytes32 = useSingleCallResult(token ? undefined : tokenContractBytes32, 'symbol', undefined, NEVER_RELOAD)
  const decimals = useSingleCallResult(token ? undefined : tokenContract, 'decimals', undefined, NEVER_RELOAD)

  return useMemo(() => {
    if (token) return token
    if (!chainId || !address) return undefined
    if (decimals.loading || symbol.loading || tokenName.loading) return null
    if (decimals.result) {
      return new Token(
        chainId,
        address,
        decimals.result[0],
        parseStringOrBytes32(symbol.result?.[0], symbolBytes32.result?.[0], 'UNKNOWN'),
        parseStringOrBytes32(tokenName.result?.[0], tokenNameBytes32.result?.[0], 'Unknown Token')
      )
    }
    return undefined
  }, [
    address,
    chainId,
    decimals.loading,
    decimals.result,
    symbol.loading,
    symbol.result,
    symbolBytes32.result,
    token,
    tokenName.loading,
    tokenName.result,
    tokenNameBytes32.result,
  ])
}

export function useCurrency(
  currencyId: string | undefined,
  chainId: ChainId = ChainId.ETHEREUM
): Currency | null | undefined {
  const token = useToken(chainId, currencyId)

  // const extendedEther = useMemo(() => (chainId ? ExtendedEther.onChain(chainId) : undefined), [chainId])
  // const weth = chainId ? WETH9_EXTENDED[chainId] : undefined

  const wnative = chainId ? WNATIVE[chainId] : undefined

  if (wnative?.address?.toLowerCase() === currencyId?.toLowerCase()) return wnative

  return token
}
