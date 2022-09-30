import { ChainId, Currency, CurrencyAmount } from '@sushiswap/core-sdk'
import BigNumber from 'bignumber.js'
import { InchTokenToSushiToken } from '../../functions/mapper'
import { currencyId } from '../../functions'

/*
   this file contains curated 1inch models inspired by their api. some additional helper fields/functions are included
   to make implemention a bit easier in our sushiswap fork.
*/

export class Swap {
  constructor(
    readonly fromToken: Token,
    readonly toToken: Token,
    readonly fromTokenAmount: string,
    readonly toTokenAmount: string,
    readonly protocols: any,
    readonly estimatedGas: string,
    readonly tx: Tx,
    readonly chainId: ChainId
  ) {}

  static fromJSON({ fromToken, toToken, fromTokenAmount, toTokenAmount, protocols, estimatedGas, tx }, chainId) {
    return new Swap(fromToken, toToken, fromTokenAmount, toTokenAmount, protocols, estimatedGas, tx, chainId)
  }
}

export class Quote {
  // fixed amount values
  readonly fromTokenFixed: string
  readonly toTokenFixed: string

  // tokens mapped to Sushiswap's CurrencyAmount for easier implementation in our sushi fork
  fromTokenCurrencyAmount: CurrencyAmount<Currency>
  toTokenCurrencyAmount: CurrencyAmount<Currency>

  constructor(
    readonly fromToken: Token,
    readonly toToken: Token,
    readonly fromTokenAmount: string,
    readonly toTokenAmount: string,
    readonly protocols: any,
    readonly estimatedGas: string,
    readonly chainId: ChainId,
    readonly noLiquidity?: boolean
  ) {
    this.fromTokenFixed = new BigNumber(fromTokenAmount).dividedBy(Math.pow(10, fromToken.decimals)).toString()
    this.toTokenFixed = new BigNumber(toTokenAmount).dividedBy(Math.pow(10, toToken.decimals)).toString()

    // map token amounts
    const fromTokenCurrency = InchTokenToSushiToken(this.fromToken, chainId)
    this.fromTokenCurrencyAmount = CurrencyAmount.fromRawAmount(fromTokenCurrency, fromTokenAmount)
    const toTokenCurrency = InchTokenToSushiToken(this.toToken, chainId)
    this.toTokenCurrencyAmount = CurrencyAmount.fromRawAmount(toTokenCurrency, toTokenAmount)
  }

  static fromJSON({ fromToken, toToken, fromTokenAmount, toTokenAmount, protocols, estimatedGas }, chainId) {
    return new Quote(fromToken, toToken, fromTokenAmount, toTokenAmount, protocols, estimatedGas, chainId)
  }

  static fromCurrencies(
    fromCurrency: Currency,
    toCurrency: Currency,
    fromCurrencyAmount: string,
    toCurrencyAmount: string,
    protocols: any,
    estimatedGas: string,
    chainId: ChainId = ChainId.ETHEREUM
  ) {
    const fromToken = new Token(
      currencyId(chainId, fromCurrency),
      fromCurrency.decimals,
      null,
      fromCurrency.name,
      fromCurrency.symbol
    )
    const toToken = new Token(
      currencyId(chainId, toCurrency),
      toCurrency.decimals,
      null,
      toCurrency.name,
      toCurrency.symbol
    )
    return new Quote(fromToken, toToken, fromCurrencyAmount, toCurrencyAmount, protocols, estimatedGas, chainId)
  }
}

export class Token {
  constructor(
    readonly address: string,
    readonly decimals: number,
    readonly logoURI: string,
    readonly name: string,
    readonly symbol: string
  ) {}
}

export class Tx {
  constructor(
    readonly from: string,
    readonly to: string,
    readonly data: string,
    readonly value: string,
    readonly gasPrice: string,
    readonly gas: number
  ) {}
}
