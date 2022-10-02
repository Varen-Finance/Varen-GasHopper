import { ChainId } from '@sushiswap/core-sdk'

export const NetworkContextName = 'NETWORK'
import { AbstractConnector } from 'web3-react-abstract-connector'

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}

export const ACTIVATED_NETWORKS = [
  ChainId.ETHEREUM,
  ChainId.MATIC,
  ChainId.BSC,
  ChainId.ARBITRUM,
  ChainId.AVALANCHE,
  ChainId.FANTOM,
]

export const BLOCKCHAIN = {
  [ChainId.ETHEREUM]: 'ethereum',
  [ChainId.BSC]: 'binanace',
  [ChainId.CELO]: 'celo',
  [ChainId.FANTOM]: 'fantom',
  [ChainId.HARMONY]: 'harmony',
  [ChainId.MATIC]: 'polygon',
  [ChainId.XDAI]: 'xdai',
  [ChainId.OKEX]: 'okex',
  [ChainId.MOONRIVER]: 'moonriver',
  [ChainId.TELOS]: 'telos',
}
