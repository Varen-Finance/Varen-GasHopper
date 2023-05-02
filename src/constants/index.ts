export enum ChainId {
  ETHEREUM = 1,
  MATIC = 137,
  FANTOM = 250,
  BSC = 56,
  ARBITRUM = 42161,
  AVALANCHE = 43114,
  CELO = 42220,
  MOONRIVER = 1285,
  MOONBEAM = 1284,
  OPTIMISM = 10,
}

const Arbitrum = 'https://logos.varen.finance/networks/arbitrum.jpg'
const Avalanche = 'https://logos.varen.finance/networks/avalanche.jpg'
const Bsc = 'https://logos.varen.finance/networks/bsc.jpg'
const Fantom = 'https://logos.varen.finance/networks/fantom.jpg'
const Mainnet = 'https://logos.varen.finance/networks/mainnet.jpg'
const Moonbeam = 'https://logos.varen.finance/networks/moonbeam.jpg'
const Polygon = 'https://logos.varen.finance/networks/polygon.jpg'
const Celo = 'https://logos.varen.finance/networks/celo.jpg'
const Moonriver = 'https://logos.varen.finance/networks/moonriver.jpg'
const Optimism = 'https://logos.varen.finance/networks/optimism.jpeg'

export const ACTIVATED_NETWORKS = [
  ChainId.ETHEREUM,
  ChainId.ARBITRUM,
  ChainId.AVALANCHE,
  ChainId.BSC,
  ChainId.CELO,
  ChainId.FANTOM,
  ChainId.MOONBEAM,
  ChainId.MOONRIVER,
  ChainId.OPTIMISM,
  ChainId.MATIC,
]

export const NETWORK_ICON = {
  [ChainId.ETHEREUM]: Mainnet,
  [ChainId.FANTOM]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.MATIC]: Polygon,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.CELO]: Celo,
  [ChainId.MOONRIVER]: Moonriver,
  [ChainId.MOONBEAM]: Moonbeam,
  [ChainId.OPTIMISM]: Optimism,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.MATIC]: 'Polygon',
  [ChainId.ARBITRUM]: 'Arbitrum',
  [ChainId.BSC]: 'BNB Chain',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.CELO]: 'Celo',
  [ChainId.MOONRIVER]: 'Moonriver',
  [ChainId.MOONBEAM]: 'Moonbeam',
  [ChainId.OPTIMISM]: 'Optimism',
}

export const NetworkContextName = 'NETWORK'

export const API_URL = 'https://varen-gashopper-api-staging.herokuapp.com'

export const FAUCET_ADDRESS = '0x4Fe425C05DD4052d9ef446eCdf8b3D8fC50DEE15'

export const FEE_EXCLUDE_LIST = [
  FAUCET_ADDRESS.toLowerCase(),
  '0x7b3DA7800DfC203F6B70D60F894e4B6134340835'.toLowerCase(),
  '0x81B74adc3307a9F4370075DE0e561Ea49B1703eF'.toLowerCase(),
  '0x0541DAd7df5568B0078a33477F8cfCFEbc709704'.toLowerCase(),
  '0x29383d6C41D9876De695454a1Ce7Df08FcA15529'.toLowerCase(),
  '0x61cC93bA1733af3497542eafdCEFF9cf3D24F614'.toLowerCase(),
  '0x94820c05db60CC854B1204A4D50177FEC5CcD65F'.toLowerCase(),
  '0x0000000000000000000000000000000000000000',
]

export const SUPPORTED_NETWORKS: SupportedNetworksProps = {
  [ChainId.ETHEREUM]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    blockExplorerUrls: ['https://etherscan.com', 'https://api.etherscan.io'],
    blockExplorerAPIkeys: [
      'GEBJRTC59MB6F9QM77FT9K4HUTVYVGFJIM',
      'UC8AP7RXZZJDI9SS9QUU66ZG17G28T3KCK',
      'U2EYU2HRPV72AEVUVJ7G1EG9C5IUW3H4F9',
    ],
    blockStart: 15668341,
  },
  [ChainId.ARBITRUM]: {
    chainId: '0xa4b1',
    chainName: 'Arbitrum',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://arbiscan.io', 'https://api.arbiscan.io'],
    blockExplorerAPIkeys: [
      'ZZKZFFS5BZ9G4FKYSVHT818E8PNIWT788S',
      'GJ3U7SIM6G896QIVTGS2GFCNKH5ZRCA11D',
      'XNIHY1J896KJ1CK3815ZQSVGGXNIQ7QAN2',
    ],
    blockStart: 28199614,
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
    blockExplorerAPIkeys: [
      'ISGK8TRRVD7ZSFHT4DJB2QJ1XG7JF97FUT',
      'W29VJUGWSMB4AINNMJKE35H9Y4MXFHEVAH',
      'UHR26M3V9C21MDTQGTN8MPZH42Z6GRX6Q5',
    ],
    blockStart: 13278075,
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
    blockExplorerAPIkeys: [
      'IR4XKJTR4H258VFIW99TYCC3KK7AP7MJS9',
      '5ZEN87UT6ZS5I8WTC1MTWURRSJT82FVC2E',
      'G9EM7WV6J3MPBN8VP1FK1B8PVPEMRR4E34',
    ],
    blockStart: 21868890,
  },
  [ChainId.CELO]: {
    chainId: '0xa4ec',
    chainName: 'Celo',
    nativeCurrency: { name: 'Celo', symbol: 'CELO', decimals: 18 },
    blockExplorerUrls: ['https://celoscan.io', 'https://api.celoscan.io'],
    blockExplorerAPIkeys: [
      'G1CK6KFG3VGF8PPF6PX7CFC36ERSCVPYIF',
      'ECTP18MVE1QKN655T4N85ERVXW6WDZ2MUS',
      'R45XPBNYQQ5GS9FV6KAVMMK1REAF4SC3NS',
    ],
    blockStart: 15500490,
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
    blockExplorerAPIkeys: [
      'SWQZ6R78QX8ACJUXYMBNM9MYB6V7S52UJ9',
      'T3N2VPPDTD3C8U52S1XINH9RN1WZFKVEQ3',
      'SR9XRMZ8F8VYX23RC1V2MATVDVUPX8HNM5',
    ],
    blockStart: 37001045,
  },
  [ChainId.MOONBEAM]: {
    chainId: '0x504',
    chainName: 'Moonbeam',
    nativeCurrency: { name: 'Glimmer', symbol: 'GLMR', decimals: 18 },
    blockExplorerUrls: ['https://moonbeam.moonscan.io', 'https://api-moonbeam.moonscan.io'],
    blockExplorerAPIkeys: [
      'JC8QKKSFDB8SYV778B3ZJ5JA3Q9HSK5RMN',
      'PSURPI3F3PVRWI4NT5W2RE83VNJFFDWK6F',
      '9NPIBTS8WARYYJEG9FBS4E24GYIJ55US4F',
    ],
    blockStart: 2027640,
  },
  [ChainId.MOONRIVER]: {
    chainId: '0x505',
    chainName: 'Moonriver',
    nativeCurrency: { name: 'Moonriver', symbol: 'MOVR', decimals: 18 },
    blockExplorerUrls: ['https://moonriver.moonscan.io', 'https://api-moonriver.moonscan.io'],
    blockExplorerAPIkeys: [
      '9BE6ZWPTIMUIC7U56IHUN4DPFSXEDCTWRA',
      'WRJT8VPCGV6R5HMEYW4KGTSX1Y679STBE9',
      'E8MHRWQEPRNGEKAX5HY1F18JB41TMB7BUX',
    ],
    blockStart: 2723560,
  },
  [ChainId.OPTIMISM]: {
    chainId: '0xa',
    chainName: 'Optimism',
    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
    blockExplorerUrls: ['https://optimistic.etherscan.io', 'https://api-optimistic.etherscan.io'],
    blockExplorerAPIkeys: [
      'PHYE5HKJSZH3BRX5EV3686G435RC8PDJNF',
      '19MWR2EU67D3I56Q3U2RGFJ7R37M5MAP2I',
      'H7NQAPS3SYAGW14YFIY9W55U8RFKE91P5I',
    ],
    blockStart: 28046980,
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
    blockExplorerAPIkeys: [
      'NEHJVRRCJYN6S36QQ17EINYSV84UWJ56BR',
      'ZJTSCPJSY39C479CFVYVVZFRPNNVG1UHW2',
      'UZK387S12UD8Z1519A1ZTYQ5139MQM6ZQF',
    ],
    blockStart: 33894200,
  },
}
