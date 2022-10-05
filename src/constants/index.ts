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
  //ChainId.ARBITRUM,
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
    rpcUrls: string[]
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
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com', 'https://api.etherscan.io'],
    blockExplorerAPIkey: 'GEBJRTC59MB6F9QM77FT9K4HUTVYVGFJIM',
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'BNB Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com', 'https://api.bscscan.com'],
    blockExplorerAPIkey: 'IR4XKJTR4H258VFIW99TYCC3KK7AP7MJS9',
  },
  [ChainId.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://polygonscan.com', 'https://api.polygonscan.com'],
    blockExplorerAPIkey: 'NEHJVRRCJYN6S36QQ17EINYSV84UWJ56BR',
  },
  [ChainId.FANTOM]: {
    chainId: '0xfa',
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com', 'https://api.ftmscan.com'],
    blockExplorerAPIkey: 'T3N2VPPDTD3C8U52S1XINH9RN1WZFKVEQ3',
  },
  [ChainId.AVALANCHE]: {
    chainId: '0xa86a',
    chainName: 'Avalance',
    nativeCurrency: {
      name: 'Avalance',
      symbol: 'AVAX',
      decimals: 18,
    },
    rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://snowtrace.io', 'https://api.snowtrace.io'],
    blockExplorerAPIkey: 'ISGK8TRRVD7ZSFHT4DJB2QJ1XG7JF97FUT',
  },
  [ChainId.ARBITRUM]: {
    chainId: '0xA4B1',
    chainName: 'Arbitrum',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://arbitrum-mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://arbiscan.io', 'https://api.arbiscan.io'],
    blockExplorerAPIkey: 'ZZKZFFS5BZ9G4FKYSVHT818E8PNIWT788S',
  },
}
