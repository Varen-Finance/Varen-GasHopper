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
  //ChainId.ARBITRUM,
  ChainId.AVALANCHE,
  ChainId.BSC,
  ChainId.CELO,
  ChainId.FANTOM,
  ChainId.MOONBEAM,
  ChainId.MOONRIVER,
  ChainId.OPTIMISM,
  ChainId.MATIC,
]

export const FAUCET_ADDRESS = '0x4Fe425C05DD4052d9ef446eCdf8b3D8fC50DEE15'

export const SUPPORTED_NETWORKS: {
  [key: number]: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    blockExplorerUrls: string[]
    blockExplorerAPIkey: string
  }
} = {
  [ChainId.ETHEREUM]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.com', 'https://api.etherscan.io'],
    blockExplorerAPIkey: 'GEBJRTC59MB6F9QM77FT9K4HUTVYVGFJIM',
  },
  [ChainId.ARBITRUM]: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://arbiscan.io', 'https://api.arbiscan.io'],
    blockExplorerAPIkey: 'ZZKZFFS5BZ9G4FKYSVHT818E8PNIWT788S',
  },
  [ChainId.AVALANCHE]: {
    chainId: '0xa86a',
    chainName: 'Avalance',
    nativeCurrency: {
      name: 'Avalance',
      symbol: 'AVAX',
      decimals: 18,
    },
    blockExplorerUrls: ['https://snowtrace.io', 'https://api.snowtrace.io'],
    blockExplorerAPIkey: 'ISGK8TRRVD7ZSFHT4DJB2QJ1XG7JF97FUT',
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'BNB Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    blockExplorerUrls: ['https://bscscan.com', 'https://api.bscscan.com'],
    blockExplorerAPIkey: 'IR4XKJTR4H258VFIW99TYCC3KK7AP7MJS9',
  },
  [ChainId.CELO]: {
    chainId: '0xa4ec',
    chainName: 'Celo',
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    blockExplorerUrls: ['https://celoscan.io', 'https://api.celoscan.io'],
    blockExplorerAPIkey: 'G1CK6KFG3VGF8PPF6PX7CFC36ERSCVPYIF',
  },
  [ChainId.FANTOM]: {
    chainId: '0xfa',
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    blockExplorerUrls: ['https://ftmscan.com', 'https://api.ftmscan.com'],
    blockExplorerAPIkey: 'T3N2VPPDTD3C8U52S1XINH9RN1WZFKVEQ3',
  },
  [ChainId.MOONBEAM]: {
    chainId: '0x504',
    chainName: 'Moonbeam',
    nativeCurrency: { name: 'Glimmer', symbol: 'GLMR', decimals: 18 },
    blockExplorerUrls: ['https://moonbeam.moonscan.io', 'https://api-moonbeam.moonscan.io'],
    blockExplorerAPIkey: 'JC8QKKSFDB8SYV778B3ZJ5JA3Q9HSK5RMN',
  },
  [ChainId.MOONRIVER]: {
    chainId: '0x505',
    chainName: 'Moonriver',
    nativeCurrency: { name: 'Moonriver', symbol: 'MOVR', decimals: 18 },
    blockExplorerUrls: ['https://moonriver.moonscan.io', 'https://api-moonriver.moonscan.io'],
    blockExplorerAPIkey: '9BE6ZWPTIMUIC7U56IHUN4DPFSXEDCTWRA',
  },
  [ChainId.OPTIMISM]: {
    chainId: '0xa',
    chainName: 'Optimism',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://optimistic.etherscan.io', 'https://api-optimistic.etherscan.io'],
    blockExplorerAPIkey: 'PHYE5HKJSZH3BRX5EV3686G435RC8PDJNF',
  },
  [ChainId.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    blockExplorerUrls: ['https://polygonscan.com', 'https://api.polygonscan.com'],
    blockExplorerAPIkey: 'NEHJVRRCJYN6S36QQ17EINYSV84UWJ56BR',
  },
}
