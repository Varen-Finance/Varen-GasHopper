import { Token as InchToken } from '../services/1inch/models'
import { ChainId, Token as SushiToken } from '@sushiswap/core-sdk'

export function InchTokenToSushiToken(token: any, chainId: ChainId): SushiToken {
  const chainID = chainId
  const sushiToken = new SushiToken(chainID, token.address, token.decimals, token.symbol, token.name)
  return sushiToken
}
