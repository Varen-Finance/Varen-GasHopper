import { ChainId, CurrencyAmount, NATIVE, Token } from '@sushiswap/core-sdk'
import { InchTokenToSushiToken } from 'app/functions/mapper'
import { REN_ASSETS } from '../ren/assets'
import { getRenAssetByAddress, getRenAssetBySymbol } from '../ren/utils'
import { Quote, Swap } from './models'

const fetcher = (url: string) =>
  fetch(`${url}`).then((res) => {
    return res.json()
  })

export const getSwap = async (
  from: string,
  to: string,
  amount: string,
  walletAddress: string,
  slippage: string,
  chainId: ChainId = ChainId.ETHEREUM
) => {
  if (!from || !to || from === to || isNaN(Number(amount)) || Number(amount) < 0) {
    return null
  }
  if (from === REN_ASSETS[chainId].NATIVE.symbol) {
    from = REN_ASSETS[chainId].NATIVE.renToken.address
  }
  if (to === REN_ASSETS[chainId].NATIVE.symbol) {
    to = REN_ASSETS[chainId].NATIVE.renToken.address
  }

  const url = `https://api.1inch.exchange/v4.0/${chainId}/swap?fromTokenAddress=${from}&toTokenAddress=${to}&amount=${amount}&fromAddress=${walletAddress}&slippage=${slippage}&disableEstimate=true`

  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  const json = await res.json()
  return Swap.fromJSON(json, chainId)
}

export const getQuote = async (
  from: string,
  to: string,
  amount: string,
  chainId: ChainId = ChainId.ETHEREUM,
  isMintOrBurnOnly: boolean = false
) => {
  if (!from || !to || from === to || isNaN(Number(amount)) || amount === '0' || Number(amount) < 0) {
    return null
  }
  if (from === REN_ASSETS[chainId].NATIVE.symbol) {
    from = REN_ASSETS[chainId].NATIVE.renToken.address
  }
  if (to === REN_ASSETS[chainId].NATIVE.symbol) {
    to = REN_ASSETS[chainId].NATIVE.renToken.address
  }

  const url = !isMintOrBurnOnly
    ? `https://api.1inch.exchange/v4.0/${chainId}/quote?fromTokenAddress=${from}&toTokenAddress=${to}&amount=${amount}`
    : `https://api.1inch.exchange/v4.0/${chainId}/quote?fromTokenAddress=${REN_ASSETS[chainId].BTC.renToken.address}&toTokenAddress=${REN_ASSETS[chainId].NATIVE.renToken.address}&amount=${amount}`

  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json()
    if (err.statusCode === 400 && err.description === 'insufficient liquidity') {
      const fromTokenCurrency = InchTokenToSushiToken(NATIVE[chainId], chainId)
      const fromTokenCurrencyAmount = CurrencyAmount.fromRawAmount(fromTokenCurrency, from)
      const toTokenCurrencyAmount = CurrencyAmount.fromRawAmount(fromTokenCurrency, 0)

      return {
        noLiquidity: true,
        toTokenFixed: '0.0',
        fromTokenCurrencyAmount: fromTokenCurrencyAmount,
        toTokenCurrencyAmount: toTokenCurrencyAmount,
      }
    }
  }

  const json = await res.json()

  if (isMintOrBurnOnly) {
    const renToken = getRenAssetByAddress(from, chainId)

    json.fromToken = renToken.renToken.tokenInfo
    json.toToken = renToken.renToken.tokenInfo
  }

  return Quote.fromJSON(json, chainId)
}
