import { ChainId, Currency } from '@sushiswap/core-sdk'
import { REN_ASSETS } from 'app/services/ren/assets'

export function currencyId(chainId: ChainId = ChainId.ETHEREUM, currency?: Currency | string): string {
  if (currency && typeof currency !== 'string' && currency.chainId) {
    if (currency.isNative) return REN_ASSETS[chainId].NATIVE.symbol

    if (currency.isToken) return currency.address
    throw new Error('invalid currency')
  } else {
    return REN_ASSETS[chainId].NATIVE.symbol
  }
}
