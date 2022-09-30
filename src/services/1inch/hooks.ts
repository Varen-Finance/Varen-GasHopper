import { ChainId, Currency } from '@sushiswap/core-sdk'
import useSWR from 'swr'
import { getQuote, getSwap } from '.'
import { currencyId } from '../../functions'
import { REN_ASSETS } from '../ren/assets'

export function useSwap(
  fallbackData = undefined,
  fromCurrency: Currency | string,
  toCurrency: Currency | string,
  amount: string,
  walletAddress: string,
  slippage: any,
  chainId: ChainId = ChainId.ETHEREUM
) {
  const from =
    fromCurrency == REN_ASSETS[chainId].NATIVE.symbol
      ? REN_ASSETS[chainId].NATIVE.renToken.address
      : currencyId(chainId, fromCurrency)
  const to =
    toCurrency == REN_ASSETS[chainId].NATIVE.symbol
      ? REN_ASSETS[chainId].NATIVE.renToken.address
      : currencyId(chainId, toCurrency)

  const { data } = useSWR(
    `https://api.1inch.exchange/v4.0/${chainId}/swap?fromTokenAddress=${from}&toTokenAddress=${to}&amount=${amount}&fromAddress=${walletAddress}&slippage=${slippage}&disableEstimate=true`,
    () => getSwap(from, to, amount, walletAddress, slippage, chainId),
    { fallbackData }
  )
  return data
}

export function useQuote(
  fallbackData: any = undefined,
  fromCurrency: Currency,
  toCurrency: Currency,
  amount: string,
  chainId: ChainId = ChainId.ETHEREUM
) {
  const isMintOrBurnOnly = toCurrency?.symbol === fromCurrency?.symbol
  const from = !fromCurrency
    ? null
    : fromCurrency?.symbol == REN_ASSETS[chainId].NATIVE.symbol
    ? REN_ASSETS[chainId].NATIVE.renToken.address
    : currencyId(chainId, fromCurrency)
  const to = !toCurrency
    ? null
    : toCurrency?.symbol == REN_ASSETS[chainId].NATIVE.symbol
    ? REN_ASSETS[chainId].NATIVE.renToken.address
    : toCurrency?.symbol === fromCurrency?.symbol
    ? REN_ASSETS[chainId].NATIVE.renToken.address
    : currencyId(chainId, toCurrency)
  const url = !isMintOrBurnOnly
    ? `https://api.1inch.exchange/v4.0/${chainId}/quote?fromTokenAddress=${from}&toTokenAddress=${to}&amount=${amount}`
    : `https://api.1inch.exchange/v4.0/${chainId}/quote?fromTokenAddress=${REN_ASSETS[chainId].BTC.renToken.address}&toTokenAddress=${REN_ASSETS[chainId].NATIVE.renToken.address}&amount=100000000`

  let { data, error } = useSWR(url, () => getQuote(from, to, amount, chainId, isMintOrBurnOnly), {
    fallbackData,
    refreshInterval: 3000,
  })

  if (fromCurrency?.symbol === toCurrency?.symbol && data) {
    data.toToken = data.fromToken
    data.toTokenAmount = data.fromTokenAmount
    data.toTokenCurrencyAmount = data.fromTokenCurrencyAmount
    data.toTokenFixed = data.fromTokenFixed
  }
  error = isMintOrBurnOnly ? undefined : error

  return { data, error }
}
