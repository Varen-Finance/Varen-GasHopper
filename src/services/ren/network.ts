import Web3 from 'web3'
import { ChainId } from '@sushiswap/core-sdk'
import { getRenNetworkDetails, RenNetwork, RenNetworkDetails } from '@renproject/interfaces'
import { Ethereum, Polygon, Arbitrum, BinanceSmartChain, Avalanche, Fantom } from '../ren/chains'

export const NETWORK: RenNetworkDetails = getRenNetworkDetails(RenNetwork.Mainnet)

const web3 = new Web3(Web3.givenProvider)
const provider = web3.currentProvider

export const getRenNetwork = (currentChainId) => {
  switch (currentChainId) {
    case ChainId.MATIC:
      return Polygon(provider, NETWORK)
    case ChainId.BSC:
      return BinanceSmartChain(provider, NETWORK)
    case ChainId.ARBITRUM:
      return Arbitrum(provider, NETWORK)
    case ChainId.AVALANCHE:
      return Avalanche(provider, NETWORK)
    case ChainId.FANTOM:
      return Fantom(provider, NETWORK)
    default:
      return Ethereum(provider, NETWORK)
  }
}
