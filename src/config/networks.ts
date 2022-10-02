import { ChainId } from '@sushiswap/core-sdk'

const Arbitrum = 'https://logos.varen.finance/networks/arbitrum.jpg'
const Avalanche = 'https://logos.varen.finance/networks/avalanche.jpg'
const Bsc = 'https://logos.varen.finance/networks/bsc.jpg'
const Fantom = 'https://logos.varen.finance/networks/fantom.jpg'
const Goerli = 'https://logos.varen.finance/networks/goerli.jpg'
const Harmony = 'https://logos.varen.finance/networks/harmonyone.jpg'
const Heco = 'https://logos.varen.finance/networks/heco.jpg'
const Kovan = 'https://logos.varen.finance/networks/kovan.jpg'
const Mainnet = 'https://logos.varen.finance/networks/mainnet.jpg'
const Matic = 'https://logos.varen.finance/networks/polygon.jpg'
const Moonbeam = 'https://logos.varen.finance/networks/moonbeam.jpg'
const OKEx = 'https://logos.varen.finance/networks/okex.jpg'
const Polygon = 'https://logos.varen.finance/networks/polygon.jpg'
const Rinkeby = 'https://logos.varen.finance/networks/rinkeby.jpg'
const Ropsten = 'https://logos.varen.finance/networks/ropsten.jpg'
const xDai = 'https://logos.varen.finance/networks/xdai.jpg'
const Celo = 'https://logos.varen.finance/networks/celo.jpg'
const Palm = 'https://logos.varen.finance/networks/palm.jpg'
const Moonriver = 'https://logos.varen.finance/networks/moonriver.jpg'
const Fuse = 'https://logos.varen.finance/networks/fuse.jpg'
const Telos = 'https://logos.varen.finance/networks/telos.jpg'
const Optimism = 'https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/optimism.jpg'
const Kava = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/kava.svg'
const Metis = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/metis.svg'
const ArbitrumNova = 'https://raw.githubusercontent.com/sushiswap/icons/master/network/arbitrum-nova.svg'
const BobaAvax = 'https://raw.githubusercontent.com/sushiswap/list/master/logos/network-logos/boba-avax.jpg'

export const NETWORK_ICON = {
  [ChainId.ETHEREUM]: Mainnet,
  [ChainId.ROPSTEN]: Ropsten,
  [ChainId.RINKEBY]: Rinkeby,
  [ChainId.GÖRLI]: Goerli,
  [ChainId.KOVAN]: Kovan,
  [ChainId.FANTOM]: Fantom,
  [ChainId.FANTOM_TESTNET]: Fantom,
  [ChainId.BSC]: Bsc,
  [ChainId.BSC_TESTNET]: Bsc,
  [ChainId.MATIC]: Polygon,
  [ChainId.MATIC_TESTNET]: Matic,
  [ChainId.XDAI]: xDai,
  [ChainId.ARBITRUM]: Arbitrum,
  [ChainId.ARBITRUM_TESTNET]: Arbitrum,
  [ChainId.MOONBEAM_TESTNET]: Moonbeam,
  [ChainId.AVALANCHE]: Avalanche,
  [ChainId.AVALANCHE_TESTNET]: Avalanche,
  [ChainId.HECO]: Heco,
  [ChainId.HECO_TESTNET]: Heco,
  [ChainId.HARMONY]: Harmony,
  [ChainId.HARMONY_TESTNET]: Harmony,
  [ChainId.OKEX]: OKEx,
  [ChainId.OKEX_TESTNET]: OKEx,
  [ChainId.CELO]: Celo,
  [ChainId.PALM]: Palm,
  [ChainId.MOONRIVER]: Moonriver,
  [ChainId.FUSE]: Fuse,
  [ChainId.TELOS]: Telos,
  [ChainId.MOONBEAM]: Moonbeam,
  [ChainId.OPTIMISM]: Optimism,
  [ChainId.KAVA]: Kava,
  [ChainId.METIS]: Metis,
  [ChainId.ARBITRUM_NOVA]: ArbitrumNova,
  [ChainId.BOBA_AVAX]: BobaAvax,
}

export const NETWORK_LABEL: { [chainId in ChainId]?: string } = {
  [ChainId.ETHEREUM]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FANTOM]: 'Fantom',
  [ChainId.FANTOM_TESTNET]: 'Fantom Testnet',
  [ChainId.MATIC]: 'Polygon',
  [ChainId.MATIC_TESTNET]: 'Polygon Testnet',
  [ChainId.XDAI]: 'Gnosis',
  [ChainId.ARBITRUM]: 'Arbitrum',
  [ChainId.ARBITRUM_TESTNET]: 'Arbitrum Testnet',
  [ChainId.BSC]: 'BNB Chain',
  [ChainId.BSC_TESTNET]: 'BSC Testnet',
  [ChainId.MOONBEAM_TESTNET]: 'Moonbase',
  [ChainId.AVALANCHE]: 'Avalanche',
  [ChainId.AVALANCHE_TESTNET]: 'Fuji',
  [ChainId.HECO]: 'HECO',
  [ChainId.HECO_TESTNET]: 'HECO Testnet',
  [ChainId.HARMONY]: 'Harmony',
  [ChainId.HARMONY_TESTNET]: 'Harmony Testnet',
  [ChainId.OKEX]: 'OKEx',
  [ChainId.OKEX_TESTNET]: 'OKEx',
  [ChainId.CELO]: 'Celo',
  [ChainId.PALM]: 'Palm',
  [ChainId.MOONRIVER]: 'Moonriver',
  [ChainId.FUSE]: 'Fuse',
  [ChainId.TELOS]: 'Telos EVM',
  [ChainId.MOONBEAM]: 'Moonbeam',
  [ChainId.OPTIMISM]: 'Optimism',
  [ChainId.KAVA]: 'Kava',
  [ChainId.METIS]: 'Metis',
  [ChainId.ARBITRUM_NOVA]: 'Arbitrum Nova',
  [ChainId.BOBA_AVAX]: 'Boba Avax',
}
