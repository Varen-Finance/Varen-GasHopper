import { ChainCommon, RenNetwork } from '@renproject/interfaces'
import { OrderedMap } from 'immutable'
import { ChainMapper } from './chains/chains'
import { allChains, searchChainTransaction } from './searchChainTransactions'
import { SearchResult, SearchTactic, TaggedError } from './types'
export enum SearchErrors {
  NO_RESULTS = 'No results found.',
}

export const search = async (
  searchString: string,
  updateStatus: (status: string) => void,
  getChain: (chainName: string) => ChainCommon | null
): Promise<SearchResult | SearchResult[]> => {
  const searchTactics: SearchTactic[] = [searchChainTransaction]

  for (const tactic of searchTactics) {
    try {
      if (tactic.match(searchString, getChain)) {
        const result = await tactic.search(searchString, updateStatus, getChain)
        if (result && (!Array.isArray(result) || result.length > 0)) {
          return result
        }
      }
    } catch (error: any) {
      console.error('DEBUG', error)
    }
  }

  throw new TaggedError(SearchErrors.NO_RESULTS)
}

const chains = allChains.reduce((acc, chainDetails) => {
  try {
    const chain = ChainMapper(chainDetails.chain, RenNetwork.Mainnet)
    chain?.initialize(RenNetwork.Mainnet)
    return acc.set(chainDetails.chain, chain || null)
  } catch (error: any) {
    console.error(error)
    return acc.set(chainDetails.chain, null)
  }
}, OrderedMap<string, ChainCommon | null>())

const getChainDetails = (chainName: string) => {
  for (const chain of allChains) {
    if (chain.chainPattern.exec(chainName)) {
      return chain
    }
  }
  return null
}

const getChain = (chainName: string) => {
  const chainDetails = getChainDetails(chainName)
  return chainDetails ? chains.get(chainDetails.chain, null) : null
}

export const searchForTx = async (deposit: any) => {
  const transaction = deposit.depositDetails.transaction
  const hash = transaction.txHash ?? transaction.hash
  return search(hash, console.log, getChain)
    .then((result) => {
      if (result && Array.isArray(result)) {
        //@ts-ignore
        return result[0].txHash
      } else {
        return false
      }
    })
    .catch((error) => {
      console.debug('error', error)
      return false
    })
}
