import { ChainId, JSBI, Percent, Token } from '@sushiswap/core-sdk'
import ETH_TOKEN_LIST from './token-lists/ethereum.tokenlist.json'
import ARBITRUM_TOKEN_LIST from './token-lists/arbitrum.tokenlist.json'
import AVALANCHE_TOKEN_LIST from './token-lists/avalanche.tokenlist.json'
import BSC_TOKEN_LIST from './token-lists/bsc.tokenlist.json'
import FANTOM_TOKEN_LIST from './token-lists/fantom.tokenlist.json'
import POLYGON_TOKEN_LIST from './token-lists/polygon.tokenlist.json'

export const DEFAULT_LIST = {
  [ChainId.ETHEREUM]: ETH_TOKEN_LIST,
  [ChainId.ARBITRUM]: ARBITRUM_TOKEN_LIST,
  [ChainId.AVALANCHE]: AVALANCHE_TOKEN_LIST,
  [ChainId.BSC]: BSC_TOKEN_LIST,
  [ChainId.FANTOM]: FANTOM_TOKEN_LIST,
  [ChainId.MATIC]: POLYGON_TOKEN_LIST,
}

export const POOL_DENY = ['14', '29', '45', '30']

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 13

export const MERKLE_ROOT =
  'https://raw.githubusercontent.com/sushiswap/sushi-vesting/master/merkle/week-19/merkle-10959148-11824101.json'

export const NetworkContextName = 'NETWORK'

// default allowed slippage, in bips
export const INITIAL_ALLOWED_SLIPPAGE = 50
// 30 minutes, denominated in seconds
export const DEFAULT_DEADLINE_FROM_NOW = 60 * 30

// used for rewards deadlines
export const BIG_INT_SECONDS_IN_WEEK = JSBI.BigInt(60 * 60 * 24 * 7)

export const BIG_INT_ZERO = JSBI.BigInt(0)

// one basis point
export const ONE_BIPS = new Percent(JSBI.BigInt(1), JSBI.BigInt(10000))
export const BIPS_BASE = JSBI.BigInt(10000)

// used for warning states
export const ALLOWED_PRICE_IMPACT_LOW: Percent = new Percent(JSBI.BigInt(100), BIPS_BASE) // 1%
export const ALLOWED_PRICE_IMPACT_MEDIUM: Percent = new Percent(JSBI.BigInt(300), BIPS_BASE) // 3%
export const ALLOWED_PRICE_IMPACT_HIGH: Percent = new Percent(JSBI.BigInt(500), BIPS_BASE) // 5%

// if the price slippage exceeds this number, force the user to type 'confirm' to execute
export const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN: Percent = new Percent(JSBI.BigInt(1000), BIPS_BASE) // 10%

// for non expert mode disable swaps above this
export const BLOCKED_PRICE_IMPACT_NON_EXPERT: Percent = new Percent(JSBI.BigInt(1500), BIPS_BASE) // 15%

// used to ensure the user doesn't send so much ETH so they end up with <.01
export const MIN_ETH: JSBI = JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(16)) // .01 ETH

export const BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(JSBI.BigInt(50), JSBI.BigInt(10000))

export const ZERO_PERCENT = new Percent('0')
export const ONE_HUNDRED_PERCENT = new Percent('1')

export const AUTH_PASSWORD = '@bvfW@D2VHgwXuxd'

export const ZERO_STRING = '0x0000000000000000000000000000000000000000'

// SDN OFAC addresses
export const BLOCKED_ADDRESSES: string[] = [
  '0x7F367cC41522cE07553e823bf3be79A889DEbe1B',
  '0xd882cFc20F52f2599D84b8e8D58C7FB62cfE344b',
  '0x901bb9583b24D97e995513C6778dc6888AB6870e',
  '0xA7e5d5A720f06526557c513402f2e6B5fA20b008',
]

export const EIP_1559_ACTIVATION_BLOCK: { [chainId in ChainId]?: number } = {
  [ChainId.ROPSTEN]: 10499401,
  [ChainId.GÖRLI]: 5062605,
  [ChainId.RINKEBY]: 8897988,
}

export const RENJS_NETWORK = 'mainnet'
export const ETHERSJS_NETWORK = 'homestead'

import { AbstractConnector } from 'web3-react-abstract-connector'

// LINKSWAP
export const ROUTER_ADDRESS = '0xA7eCe0911FE8C60bff9e99f8fAFcDBE56e07afF1'

// SCRT
export const SRCT_BRIDGE = '0xf4B00C937b4ec4Bb5AC051c3c719036c668a31EC'

// a list of tokens by chain
type ChainTokenList = {
  readonly [chainId in ChainId]: Token[]
}

export const LINK = new Token(1, '0x514910771AF9Ca656af840dff83E8264EcF986CA', 18, 'LINK', 'ChainLink')
export const YFL = new Token(1, '0x28cb7e841ee97947a86B06fA4090C8451f64c0be', 18, 'YFL', 'YFLink')
export const YFLUSD = new Token(1, '0x7b760D06E401f85545F3B50c44bf5B05308b7b62', 18, 'YFLUSD', 'YFLink USD')
export const sYFL = new Token(1, '0x8282df223AC402d04B2097d16f758Af4F70e7Db0', 18, 'sYFL', 'YFLink Synthetic')
export const WETHER = new Token(1, '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', 18, 'WETH', 'WrappedEther')
export const DAI = new Token(1, '0x6B175474E89094C44Da98b954EedeAC495271d0F', 18, 'DAI', 'Dai Stablecoin')
export const USDC = new Token(1, '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 6, 'USDC', 'USD//C')
export const USDT = new Token(1, '0xdAC17F958D2ee523a2206206994597C13D831ec7', 6, 'USDT', 'Tether USD')
export const COMP = new Token(1, '0xc00e94Cb662C3520282E6f5717214004A7f26888', 18, 'COMP', 'Compound')
export const MKR = new Token(1, '0x9f8F72aA9304c8B593d555F12eF6589cC3A579A2', 18, 'MKR', 'Maker')
export const AMPL = new Token(1, '0xD46bA6D942050d489DBd938a2C909A5d5039A161', 9, 'AMPL', 'Ampleforth')

export const BUSD = new Token(1, '0x4Fabb145d64652a948d72533023f6E7A623C7C53', 18, 'BUSD', 'Binance USD')
export const DPI = new Token(1, '0x1494CA1F11D487c2bBe4543E90080AeBa4BA3C2b', 18, 'DPI', 'DefiPulse Index')
export const CEL = new Token(1, '0xaaAEBE6Fe48E54f431b0C390CfaF0b017d09D42d', 4, 'CEL', 'Celsius')
export const MASQ = new Token(1, '0x06F3C323f0238c72BF35011071f2b5B7F43A054c', 18, 'MASQ', 'MASQ')
export const YAX = new Token(1, '0xb1dC9124c395c1e97773ab855d66E879f053A289', 18, 'YAX', 'yAxis')
export const SYAX = new Token(1, '0xb1dC9124c395c1e97773ab855d66E879f053A289', 18, 'sYAX', 'staked yAxis')
export const WBTC = new Token(1, '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', 8, 'WBTC', 'Wrapped BTC')
export const GSWAP = new Token(1, '0xaac41EC512808d64625576EDdd580e7Ea40ef8B2', 18, 'GSWAP', 'gameswap.org')
export const DOKI = new Token(1, '0x9cEB84f92A0561fa3Cc4132aB9c0b76A59787544', 18, 'DOKI', 'DokiDokiFinance')
export const SNX = new Token(1, '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F', 18, 'SNX', 'Synthetix Network')
export const CFI = new Token(1, '0x63b4f3e3fa4e438698CE330e365E831F7cCD1eF4', 18, 'CFI', 'CyberFi Token')
export const AZUKI = new Token(1, '0x910524678C0B1B23FFB9285a81f99C29C11CBaEd', 18, 'AZUKI', 'DokiDokiAzuki')
export const DRC = new Token(1, '0xb78B3320493a4EFaa1028130C5Ba26f0B6085Ef8', 18, 'DRC', 'Dracula Token')
export const BONK = new Token(1, '0x6D6506E6F438edE269877a0A720026559110B7d5', 18, 'BONK', 'BONKTOKEN')
export const MFG = new Token(
  1,
  '0x6710c63432A2De02954fc0f851db07146a6c0312',
  18,
  'MFG',
  'SyncFab Smart Manufacturing Blockchain'
)

export const aLINK = new Token(
  1,
  '0xA64BD6C70Cb9051F6A9ba1F163Fdc07E0DfB5F84',
  18,
  'aLINK v1',
  'Aave Interest bearing LINK v1'
)

export const MPH = new Token(1, '0x8888801aF4d980682e47f1A9036e589479e835C5', 18, 'MPH', '88mph.app')

export const mphYALINKNFT = new Token(
  1,
  '0xF0b7DE03134857391d8D43Ed48e20EDF21461097',
  0,
  '88mph-yaLINK-Deposit',
  '88mph yaLINK Pool Deposit'
)

//renTokens
export const renDOGE = new Token(1, '0x3832d2F059E55934220881F831bE501D180671A7', 8, 'renDOGE', 'Ren Dogecoin')
export const renFIL = new Token(1, '0xD5147bc8e386d91Cc5DBE72099DAC6C9b99276F5', 18, 'renFIL', 'Ren Filecoin')
export const renBTC = new Token(1, '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D', 8, 'renBTC', 'Ren Bitcoin')
export const renBCH = new Token(1, '0x459086F2376525BdCebA5bDDA135e4E9d3FeF5bf', 8, 'renBCH', 'Ren BitcoinCash')

export const renZEC = new Token(1, '0x1C5db575E2Ff833E46a2E9864C22F4B22E0B37C2', 8, 'renZEC', 'Ren Zcash')

export const renDGB = new Token(1, '0xe3Cb486f3f5C639e98cCBaF57d95369375687F80', 8, 'renDGB', 'Ren DigiByte')

export const renLUNA = new Token(1, '0x52d87F22192131636F93c5AB18d0127Ea52CB641', 6, 'renLUNA', 'Ren Terra')

//secretTokens
export const secretETH = {
  address: 'secret1wuzzjsdhthpvuyeeyhfq2ftsn3mvwf9rxy6ykw',
  decimals: 18,
  symbol: 'secretETH',
  name: 'Secret Ethereum',
  proxy: false,
}

export const secretLINK = {
  address: 'secret1xcrf2vvxcz8dhtgzgsd0zmzlf9g320ea2rhdjw',
  decimals: 18,
  symbol: 'secretLINK',
  name: 'Secret ChainLink Token',
  proxy: false,
}

export const stakedSecretLINK = {
  address: 'secret19y50xzywrz98g6ljxp43fd4q47sl40gkcpm03n',
  decimals: 18,
  symbol: 'staked secretLINK',
  name: 'Staked Secret ChainLink Token',
  proxy: false,
}

export const secretYFL = {
  address: 'secret1jk0tw00vs23n8jwqdzrxtln6ww2a3k6em7s0p2',
  decimals: 18,
  symbol: 'secretYFL',
  name: 'Secret YFLink',
  proxy: false,
}

export const stakedSecretYFL = {
  address: 'secret1ra9l5p04sc4pu8vc5djr3c9ds7npmwmzvsee32',
  decimals: 18,
  symbol: 'staked secretYFL',
  name: 'Staked Secret YFLink',
  proxy: false,
}

export const secretSCRT = {
  address: 'secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek',
  decimals: 6,
  symbol: 'secretSCRT',
  name: 'Secret Secret Token',
  proxy: true,
}

export const stETH = new Token(1, '0xDFe66B14D37C77F4E9b180cEb433d1b164f0281D', 18, 'stETH', 'Staked ETH')

export const ibETH = new Token(1, '0x67B66C99D3Eb37Fa76Aa3Ed1ff33E8e39F0b9c7A', 18, 'ibETH', 'Interest Bearing ETH')

export const vUSDC = new Token(1, '0x0C49066C0808Ee8c673553B7cbd99BCC9ABf113d', 18, 'vUSDC', 'Vesper Finance USDC')

export const vETH = new Token(1, '0x103cc17C2B1586e5Cd9BaD308690bCd0BBe54D5e', 18, 'vETH', 'Vesper Finance ETH')

export const vBTC = new Token(1, '0x4B2e76EbBc9f2923d83F5FBDe695D8733db1a17B', 18, 'vBTC', 'Vesper Finance BTC')

export const VRN = new Token(1, '0x72377f31e30a405282b522d588AEbbea202b4f23', 18, 'VRN', 'Varen')
export const yVRN = new Token(1, '0x80Ad276cce240A8C4ad05c589557482fFD729755', 18, 'yVRN', 'Staked Varen')

/**
 * Some tokens can only be swapped via certain pairs, so we override the list of bases that are considered for these
 * tokens.
 */
export const CUSTOM_BASES: { [chainId in ChainId]?: { [tokenAddress: string]: Token[] } } = {}

export const PINNED_PAIRS: { readonly [chainId in ChainId]?: [Token, Token][] } = {
  [ChainId.ETHEREUM]: [
    [VRN, WETHER],
    [VRN, USDC],
    [YFLUSD, WETHER],
    [YFLUSD, LINK],
    [YFL, WETHER],
    [YFL, YFLUSD],
    [LINK, WETHER],
    [LINK, YFL],
    [LINK, USDC],
    [DPI, LINK],
    [CEL, LINK],
    [MASQ, WETHER],
    [MASQ, LINK],
    [LINK, GSWAP],
    [LINK, DOKI],
    [LINK, AZUKI],
    [DRC, WETHER],
    [renDOGE, WETHER],
    [renDOGE, LINK],
    [MPH, LINK],
    [renDGB, WETHER],
  ],
}

export const MARKETCAPS = {
  YFL: 47173,
  VRN: 88888,
}

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

export const ACTIVE_REWARD_POOLS = [
  {
    address: '0xB7Cd446a2a80d4770C6bECde661B659cFC55acf5',
    rewardsAddress: '0xa74Ef3faB9E94578c79e0077f6Bd572C9efc8733',
    abi: 'StakingRewards',
    type: 'default',
  },
  {
    address: '0xbe755C548D585dbc4e3Fe4bcD712a32Fd81e5Ba0',
    rewardsAddress: '0x795BD26b99082E59478cfe8d9Cd207bb196808E4',
    abi: 'StakingRewards',
    type: 'default',
  },
  {
    address: '0x40F1068495Ba9921d6C18cF1aC25f718dF8cE69D',
    rewardsAddress: '0x0E6FA9f95a428F185752b60D38c62184854bB9e1',
    abi: 'StakingRewards',
    type: 'default',
  },
]

export const MFGWETH_POOL = new Token(
  1,
  '0x527d5f10d70cA41e1e0EEE8d30b553bB5271ee48',
  18,
  'UNI-V2',
  'Uniswap Liquidity Token'
)

export const VRNWETH_POOL = new Token(1, '0x88024deacdC2e9eda02a3051377Ed635381fAa54', 18, 'SLP', 'SushiSwap LP Token')

export const VRNWETHOLD_POOL = new Token(
  1,
  '0x88024deacdC2e9eda02a3051377Ed635381fAa54',
  18,
  'SLP',
  'SushiSwap LP Token'
)
export const SINGLE_POOLS: Record<string, any> = {
  GOV: {
    rewardsAddress: '0x80Ad276cce240A8C4ad05c589557482fFD729755',
    tokens: [VRN, WETHER],
    stakedToken: yVRN,
    balance: 0,
    abi: 'governancePool',
    type: 'gov',
  },
}

export const BETTER_TRADE_LINK_THRESHOLD = new Percent(JSBI.BigInt(75), JSBI.BigInt(10000))

export const ETH_REPRESENTING_ADDRESS = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
export const ETH_SYMBOL = 'ETH'

export const LOCAL_BURN_DETAILS = 'burn-details'
export const LOCAL_MINT_DETAILS = 'mint-details'

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

export const IS_IN_IFRAME = typeof window !== 'undefined' && window.parent !== window
