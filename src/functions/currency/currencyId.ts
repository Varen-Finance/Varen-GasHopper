import { ChainId, Currency } from '@sushiswap/core-sdk'

export function currencyId(chainId: ChainId = ChainId.ETHEREUM, currency?: Currency): string {
  if (currency.isToken) return currency.address
  throw new Error('invalid currency')
}
