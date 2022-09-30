import { ChainId } from '@sushiswap/core-sdk'
import { Ethereum, Bitcoin, Dogecoin, Zcash, Polygon, Arbitrum, Avalanche, BinanceSmartChain, Fantom } from './chains'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import ETH_TOKEN_LIST from '../../constants/token-lists/ethereum.tokenlist.json'
import ARBITRUM_TOKEN_LIST from '../../constants/token-lists/arbitrum.tokenlist.json'
import AVALANCHE_TOKEN_LIST from '../../constants/token-lists/avalanche.tokenlist.json'
import BSC_TOKEN_LIST from '../../constants/token-lists/bsc.tokenlist.json'
import FTM_TOKEN_LIST from '../../constants/token-lists/fantom.tokenlist.json'
import POLYGON_TOKEN_LIST from '../../constants/token-lists/polygon.tokenlist.json'

export enum Asset {
  BTC = 'BTC',
  ZEC = 'ZEC',
  DOGE = 'DOGE',
}

export const REN_ASSETS = {
  [ChainId.ETHEREUM]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ETHEREUM,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
    BTC: {
      chainId: 0,
      symbol: 'BTC',
      name: 'Bitcoin',
      chain: Bitcoin,
      logoURI: 'https://logos.varen.finance/btc.png',
      color: '#f7931a',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ETHEREUM,
          address: '0xEB4C2781e4ebA804CE9a9803C67d0893436bB27D',
          name: 'Ren Bitcoin',
          symbol: 'renBTC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png',
        },
        ETH_TOKEN_LIST
      ),
    },
    DOGE: {
      chainId: 0,
      symbol: 'DOGE',
      name: 'Dogecoin',
      chain: Dogecoin,
      logoURI: 'https://logos.varen.finance/doge.png',
      color: '#c3a634',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ETHEREUM,
          address: '0x3832d2F059E55934220881F831bE501D180671A7',
          name: 'Ren Dogecoin',
          symbol: 'renDOGE',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x3832d2f059e55934220881f831be501d180671a7.png',
        },
        ETH_TOKEN_LIST
      ),
    },
    ZEC: {
      chainId: 0,
      symbol: 'ZEC',
      name: 'Z-Cash',
      chain: Zcash,
      logoURI: 'https://logos.varen.finance/zec.png',
      color: '#f9bb00',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ETHEREUM,
          address: '0x1C5db575E2Ff833E46a2E9864C22F4B22E0B37C2',
          name: 'Ren Zcash',
          symbol: 'renZEC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.ROPSTEN]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ROPSTEN,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.RINKEBY]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.RINKEBY,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.GÖRLI]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.GÖRLI,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.KOVAN]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.KOVAN,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.FANTOM]: {
    NATIVE: {
      chainId: 0,
      symbol: 'FTM',
      name: 'Fantom',
      logoURI: 'https://logos.varen.finance/ftm.png',
      chain: Fantom,
      color: '#0000ff',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.FANTOM,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/ftm.png',
        },
        FTM_TOKEN_LIST
      ),
    },
    BTC: {
      chainId: 0,
      symbol: 'BTC',
      name: 'Bitcoin',
      chain: Bitcoin,
      logoURI: 'https://logos.varen.finance/btc.png',
      color: '#f7931a',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.FANTOM,
          address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
          name: 'Ren Bitcoin',
          symbol: 'renBTC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png',
        },
        FTM_TOKEN_LIST
      ),
    },
    DOGE: {
      chainId: 0,
      symbol: 'DOGE',
      name: 'Dogecoin',
      chain: Dogecoin,
      logoURI: 'https://logos.varen.finance/doge.png',
      color: '#c3a634',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.FANTOM,
          address: '0xcE829A89d4A55a63418bcC43F00145adef0eDB8E',
          name: 'Ren Dogecoin',
          symbol: 'renDOGE',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x3832d2f059e55934220881f831be501d180671a7.png',
        },
        FTM_TOKEN_LIST
      ),
    },
    ZEC: {
      chainId: 0,
      symbol: 'ZEC',
      name: 'Z-Cash',
      chain: Zcash,
      logoURI: 'https://logos.varen.finance/zec.png',
      color: '#f9bb00',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.FANTOM,
          address: '0x31a0D1A199631D244761EEba67e8501296d2E383',
          name: 'Ren Zcash',
          symbol: 'renZEC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2.png',
        },
        FTM_TOKEN_LIST
      ),
    },
  },
  [ChainId.FANTOM_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'FTM',
      name: 'Fantom',
      logoURI: 'https://logos.varen.finance/ftm.png',
      chain: Fantom,
      color: '#0000ff',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.FANTOM_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/ftm.png',
        },
        FTM_TOKEN_LIST
      ),
    },
  },
  [ChainId.MATIC]: {
    NATIVE: {
      chainId: 0,
      symbol: 'MATIC',
      name: 'Polygon',
      logoURI: 'https://logos.varen.finance/polygon.png',
      chain: Polygon,
      color: '#8347e5',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.MATIC,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Polygon',
          symbol: 'MATIC',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/polygon.png',
        },
        POLYGON_TOKEN_LIST
      ),
    },
    BTC: {
      chainId: 0,
      symbol: 'BTC',
      name: 'Bitcoin',
      chain: Bitcoin,
      logoURI: 'https://logos.varen.finance/btc.png',
      color: '#f7931a',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.MATIC,
          address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
          name: 'Ren Bitcoin',
          symbol: 'renBTC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png',
        },
        POLYGON_TOKEN_LIST
      ),
    },
    DOGE: {
      chainId: 0,
      symbol: 'DOGE',
      name: 'Dogecoin',
      chain: Dogecoin,
      logoURI: 'https://logos.varen.finance/doge.png',
      color: '#c3a634',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.MATIC,
          address: '0xcE829A89d4A55a63418bcC43F00145adef0eDB8E',
          name: 'Ren Dogecoin',
          symbol: 'renDOGE',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x3832d2f059e55934220881f831be501d180671a7.png',
        },
        POLYGON_TOKEN_LIST
      ),
    },
    ZEC: {
      chainId: 0,
      symbol: 'ZEC',
      name: 'Z-Cash',
      chain: Zcash,
      logoURI: 'https://logos.varen.finance/zec.png',
      color: '#f9bb00',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.MATIC,
          address: '0x31a0D1A199631D244761EEba67e8501296d2E383',
          name: 'Ren Zcash',
          symbol: 'renZEC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2.png',
        },
        POLYGON_TOKEN_LIST
      ),
    },
  },
  [ChainId.MATIC_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'MATIC',
      name: 'Polygon',
      logoURI: 'https://logos.varen.finance/polygon.png',
      chain: Polygon,
      color: '#8347e5',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.MATIC_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Polygon',
          symbol: 'MATIC',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/polygon.png',
        },
        POLYGON_TOKEN_LIST
      ),
    },
  },
  [ChainId.XDAI]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.XDAI,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.BSC]: {
    NATIVE: {
      chainId: 0,
      symbol: 'BNB',
      name: 'BNB Chain',
      logoURI: 'https://logos.varen.finance/bnb.png',
      chain: BinanceSmartChain,
      color: '#f3ba2f',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.BSC,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Binance Coin',
          symbol: 'BNB',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/bnb.png',
        },
        BSC_TOKEN_LIST
      ),
    },
    BTC: {
      chainId: 0,
      symbol: 'BTC',
      name: 'Bitcoin',
      chain: Bitcoin,
      logoURI: 'https://logos.varen.finance/btc.png',
      color: '#f7931a',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.BSC,
          address: '0xfCe146bF3146100cfe5dB4129cf6C82b0eF4Ad8c',
          name: 'Ren Bitcoin',
          symbol: 'renBTC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png',
        },
        BSC_TOKEN_LIST
      ),
    },
    DOGE: {
      chainId: 0,
      symbol: 'DOGE',
      name: 'Dogecoin',
      chain: Dogecoin,
      logoURI: 'https://logos.varen.finance/doge.png',
      color: '#c3a634',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.BSC,
          address: '0xc3fEd6eB39178A541D274e6Fc748d48f0Ca01CC3',
          name: 'Ren Dogecoin',
          symbol: 'renDOGE',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x3832d2f059e55934220881f831be501d180671a7.png',
        },
        BSC_TOKEN_LIST
      ),
    },
    ZEC: {
      chainId: 0,
      symbol: 'ZEC',
      name: 'Z-Cash',
      chain: Zcash,
      logoURI: 'https://logos.varen.finance/zec.png',
      color: '#f9bb00',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.BSC,
          address: '0x695FD30aF473F2960e81Dc9bA7cB67679d35EDb7',
          name: 'Ren Zcash',
          symbol: 'renZEC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2.png',
        },
        BSC_TOKEN_LIST
      ),
    },
  },
  [ChainId.BSC_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'BNB',
      name: 'BNB Chain',
      logoURI: 'https://logos.varen.finance/bnb.png',
      chain: BinanceSmartChain,
      color: '#f3ba2f',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.BSC_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Binance Coin',
          symbol: 'BNB',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/bnb.png',
        },
        BSC_TOKEN_LIST
      ),
    },
  },
  [ChainId.MOONBEAM_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.MOONBEAM_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.AVALANCHE]: {
    NATIVE: {
      chainId: 0,
      symbol: 'AVAX',
      name: 'Avalanche',
      logoURI: 'https://logos.varen.finance/avax.png',
      chain: Avalanche,
      color: '#f62c2e',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.AVALANCHE,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Avalanche',
          symbol: 'AVAX',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/avax.png',
        },
        AVALANCHE_TOKEN_LIST
      ),
    },
    BTC: {
      chainId: 0,
      symbol: 'BTC',
      name: 'Bitcoin',
      chain: Bitcoin,
      logoURI: 'https://logos.varen.finance/btc.png',
      color: '#f7931a',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.AVALANCHE,
          address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
          name: 'Ren Bitcoin',
          symbol: 'renBTC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png',
        },
        AVALANCHE_TOKEN_LIST
      ),
    },
    DOGE: {
      chainId: 0,
      symbol: 'DOGE',
      name: 'Dogecoin',
      chain: Dogecoin,
      logoURI: 'https://logos.varen.finance/doge.png',
      color: '#c3a634',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.AVALANCHE,
          address: '0xcE829A89d4A55a63418bcC43F00145adef0eDB8E',
          name: 'Ren Dogecoin',
          symbol: 'renDOGE',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x3832d2f059e55934220881f831be501d180671a7.png',
        },
        AVALANCHE_TOKEN_LIST
      ),
    },
    ZEC: {
      chainId: 0,
      symbol: 'ZEC',
      name: 'Z-Cash',
      chain: Zcash,
      logoURI: 'https://logos.varen.finance/zec.png',
      color: '#f9bb00',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.AVALANCHE,
          address: '0x31a0D1A199631D244761EEba67e8501296d2E383',
          name: 'Ren Zcash',
          symbol: 'renZEC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2.png',
        },
        AVALANCHE_TOKEN_LIST
      ),
    },
  },
  [ChainId.AVALANCHE_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Avalanche,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.AVALANCHE_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        AVALANCHE_TOKEN_LIST
      ),
    },
  },
  [ChainId.HECO]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.HECO,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.HECO_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.HECO_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.HARMONY]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.HARMONY,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.HARMONY_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.HARMONY_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.OKEX]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.OKEX,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.OKEX_TESTNET]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.OKEX_TESTNET,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.ARBITRUM]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Arbitrum',
      logoURI: 'https://logos.varen.finance/aeth.png',
      chain: Arbitrum,
      color: '#28a0f0',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ARBITRUM,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Arbitrum Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/aeth.png',
        },
        ARBITRUM_TOKEN_LIST
      ),
    },
    BTC: {
      chainId: 0,
      symbol: 'BTC',
      name: 'Bitcoin',
      chain: Bitcoin,
      logoURI: 'https://logos.varen.finance/btc.png',
      color: '#f7931a',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ARBITRUM,
          address: '0xDBf31dF14B66535aF65AaC99C32e9eA844e14501',
          name: 'Ren Bitcoin',
          symbol: 'renBTC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0xeb4c2781e4eba804ce9a9803c67d0893436bb27d.png',
        },
        ARBITRUM_TOKEN_LIST
      ),
    },
    DOGE: {
      chainId: 0,
      symbol: 'DOGE',
      name: 'Dogecoin',
      chain: Dogecoin,
      logoURI: 'https://logos.varen.finance/doge.png',
      color: '#c3a634',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ARBITRUM,
          address: '0xcE829A89d4A55a63418bcC43F00145adef0eDB8E',
          name: 'Ren Dogecoin',
          symbol: 'renDOGE',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x3832d2f059e55934220881f831be501d180671a7.png',
        },
        ARBITRUM_TOKEN_LIST
      ),
    },
    ZEC: {
      chainId: 0,
      symbol: 'ZEC',
      name: 'Z-Cash',
      chain: Zcash,
      logoURI: 'https://logos.varen.finance/zec.png',
      color: '#f9bb00',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ARBITRUM,
          address: '0x31a0D1A199631D244761EEba67e8501296d2E383',
          name: 'Ren Zcash',
          symbol: 'renZEC',
          decimals: 8,
          logoURI: 'https://logos.varen.finance/0x1c5db575e2ff833e46a2e9864c22f4b22e0b37c2.png',
        },
        ARBITRUM_TOKEN_LIST
      ),
    },
  },
  [ChainId.PALM]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.ETHEREUM,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
  [ChainId.CELO]: {
    NATIVE: {
      chainId: 0,
      symbol: 'ETH',
      name: 'Ethereum',
      logoURI: 'https://logos.varen.finance/eth.png',
      chain: Ethereum,
      color: '#6984dd',
      renToken: new WrappedTokenInfo(
        {
          chainId: ChainId.CELO,
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
          name: 'Ethereum',
          symbol: 'ETH',
          decimals: 18,
          logoURI: 'https://logos.varen.finance/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        },
        ETH_TOKEN_LIST
      ),
    },
  },
}
