import { EIP_1559_ACTIVATION_BLOCK, ZERO_STRING } from '../constants'
import { ChainId, Percent, Router, TradeType, Trade as V2Trade } from '@sushiswap/core-sdk'
import { Currency, CurrencyAmount, Ether } from '@sushiswap/core-sdk'
import { useFactoryContract, useRouterContract } from './useContract'
import { ArcherRouter } from '../functions/archerRouter'
import BigNumber from 'bignumber.js'
import { BigNumber as BN } from '@ethersproject/bignumber'
import { SignatureData } from './useERC20Permit'
import approveAmountCalldata, { toHex } from '../functions/approveAmountCalldata'
import { calculateGasMargin, currencyId, formatCurrencyAmount } from '../functions'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from './useActiveWeb3React'
import { useArgentWalletContract } from './useArgentWalletContract'
import { useBlockNumber } from '../state/application/hooks'
import useENS from './useENS'
import { useMemo } from 'react'
import { useTransactionAdder } from '../state/transactions/hooks'
import useTransactionDeadline from './useTransactionDeadline'
import { useUserArcherETHTip } from '../state/user/hooks'
import { getSwap } from '../services/1inch'
import { ethers } from 'ethers'
import { calculateVarenRouterFee, VarenRouterContract } from '../services/varenx/utils'
import { Quote } from '../services/1inch/models'
import { REN_ASSETS } from 'app/services/ren/assets'
import { getRenAssetByRenTokenSymbol } from 'app/services/ren/utils'
import { getLowestDenomRounded } from 'app/services/ren'
import router from 'app/config/router'

export enum SwapCallbackState {
  INVALID,
  LOADING,
  VALID,
}

interface SwapCall {
  address: string
  calldata: string
  value: string
}

interface SwapCallEstimate {
  call: SwapCall
}

export interface SuccessfulCall extends SwapCallEstimate {
  call: SwapCall
  gasEstimate: BigNumber
}

interface FailedCall extends SwapCallEstimate {
  call: SwapCall
  error: Error
}

export type EstimatedSwapCall = SuccessfulCall | FailedCall

/**
 * Returns the swap calls that can be used to make the trade
 * @param trade trade to execute
 * @param allowedSlippage user allowed slippage
 * @param recipientAddressOrName the ENS name or address of the recipient of the swap output
 * @param signatureData the signature data of the permit of the input token amount, if available
 */
export function useSwapCallArguments(
  trade: V2Trade<Currency, Currency, TradeType> | undefined, // trade to execute, required
  allowedSlippage: Percent, // in bips
  recipientAddressOrName: string | null, // the ENS name or address of the recipient of the trade, or null if swap should be returned to sender
  signatureData: SignatureData | null | undefined,
  useArcher: boolean = false
): SwapCall[] {
  const { account, chainId, library } = useActiveWeb3React()

  const { address: recipientAddress } = useENS(recipientAddressOrName)
  const recipient = recipientAddressOrName === null ? account : recipientAddress
  const deadline = useTransactionDeadline()

  const routerContract = useRouterContract(useArcher)
  const factoryContract = useFactoryContract()

  const argentWalletContract = useArgentWalletContract()

  const [archerETHTip] = useUserArcherETHTip()

  return useMemo(() => {
    if (!trade || !recipient || !library || !account || !chainId || !deadline) return []

    if (trade instanceof V2Trade) {
      if (!routerContract) return []
      const swapMethods = []
      if (!useArcher) {
        swapMethods.push(
          Router.swapCallParameters(trade, {
            feeOnTransfer: false,
            allowedSlippage,
            recipient,
            deadline: deadline.toNumber(),
          })
        )

        if (trade.tradeType === TradeType.EXACT_INPUT) {
          swapMethods.push(
            Router.swapCallParameters(trade, {
              feeOnTransfer: true,
              allowedSlippage,
              recipient,
              deadline: deadline.toNumber(),
            })
          )
        }
      } else {
        swapMethods.push(
          ArcherRouter.swapCallParameters(factoryContract.address, trade, {
            allowedSlippage,
            recipient,
            ttl: deadline.toNumber(),
            ethTip: CurrencyAmount.fromRawAmount(Ether.onChain(ChainId.ETHEREUM), archerETHTip),
          })
        )
      }
      return swapMethods.map(({ methodName, args, value }) => {
        if (argentWalletContract && trade.inputAmount.currency.isToken) {
          return {
            address: argentWalletContract.address,
            calldata: argentWalletContract.interface.encodeFunctionData('wc_multiCall', [
              [
                approveAmountCalldata(trade.maximumAmountIn(allowedSlippage), routerContract.address),
                {
                  to: routerContract.address,
                  value: value,
                  data: routerContract.interface.encodeFunctionData(methodName, args),
                },
              ],
            ]),
            value: '0x0',
          }
        } else {
          return {
            address: routerContract.address,
            calldata: routerContract.interface.encodeFunctionData(methodName, args),
            value,
          }
        }
      })
    }
  }, [
    account,
    allowedSlippage,
    archerETHTip,
    argentWalletContract,
    chainId,
    deadline,
    library,
    factoryContract,
    recipient,
    routerContract,
    trade,
    useArcher,
  ])
}

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error an error from the ethers provider
 */
export function swapErrorToUserReadableMessage(error: any): string {
  let reason: string | undefined

  while (Boolean(error)) {
    reason = error.data?.message ?? error.reason ?? error.message ?? reason
    error = error.error ?? error.data?.originalError
  }

  if (reason?.indexOf('execution reverted: ') === 0) reason = reason.substr('execution reverted: '.length)

  switch (reason) {
    case 'UniswapV2Router: EXPIRED':
      return t`The transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low.`
    case 'UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT':
    case 'UniswapV2Router: EXCESSIVE_INPUT_AMOUNT':
      return t`This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance.`
    case 'TransferHelper: TRANSFER_FROM_FAILED':
      return t`The input token cannot be transferred. There may be an issue with the input token.`
    case 'UniswapV2: TRANSFER_FAILED':
      return t`The output token cannot be transferred. There may be an issue with the output token.`
    case 'UniswapV2: K':
      return t`The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer.`
    case 'Too little received':
    case 'Too much requested':
    case 'STF':
      return t`This transaction will not succeed due to price movement. Try increasing your slippage tolerance.`
    case 'TF':
      return t`The output token cannot be transferred. There may be an issue with the output token.`
    default:
      if (reason?.indexOf('undefined is not an object') !== -1) {
        console.error(error, reason)
        return t`An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note fee on transfer and rebase tokens are incompatible with Uniswap V3.`
      }
      return t`${reason ? reason : 'Unknown error.'}.`
  }
}

// returns a function that will execute a swap, if the parameters are all valid
// and the user has approved the slippage adjusted input amount for the trade
export function useSwapOrBurnCallback(
  quote: Quote | undefined, // trade to execute, required
  allowedSlippage: Percent,
  toOffChain: boolean,
  burnSendTo: string | null
): {
  state: SwapCallbackState
  callback: null | (() => Promise<string>)
  error: string | null
} {
  const { account, chainId, library } = useActiveWeb3React()
  const varenRouterContract = new VarenRouterContract(library, chainId)
  const blockNumber = useBlockNumber()
  const addTransaction = useTransactionAdder()
  const eip1559 =
    EIP_1559_ACTIVATION_BLOCK[chainId] == undefined ? false : blockNumber >= EIP_1559_ACTIVATION_BLOCK[chainId]

  const from = quote?.fromTokenCurrencyAmount
  const fromToken =
    from?.currency?.symbol === REN_ASSETS[chainId ?? ChainId.ETHEREUM].NATIVE.symbol
      ? REN_ASSETS[chainId ?? ChainId.ETHEREUM].NATIVE.renToken.address
      : currencyId(chainId, from?.currency)
  const fromBigInt = new BigNumber(Number(formatCurrencyAmount(from, from?.currency.decimals))).multipliedBy(
    Math.pow(10, from?.currency.decimals)
  )

  const amount = from
    ? getLowestDenomRounded(Number(quote?.fromTokenCurrencyAmount.toFixed()), from?.currency.decimals)
    : '0'
  const to = quote?.toTokenCurrencyAmount
  const toToken =
    to?.currency?.symbol === REN_ASSETS[chainId ?? ChainId.ETHEREUM].NATIVE.symbol
      ? REN_ASSETS[chainId ?? ChainId.ETHEREUM].NATIVE.renToken.address
      : currencyId(chainId, to?.currency)
  const toBigInt = new BigNumber(Number(formatCurrencyAmount(to, to?.currency.decimals))).multipliedBy(
    Math.pow(10, to?.currency.decimals)
  )
  const toAmount = to
    ? getLowestDenomRounded(Number(quote?.toTokenCurrencyAmount.toFixed()), to?.currency.decimals)
    : '0'

  const burnSendToBuffer = burnSendTo ? Buffer.from(burnSendTo) : Buffer.from('')
  return useMemo(() => {
    if (!quote || !library || !account || !chainId || !amount) {
      return {
        state: SwapCallbackState.INVALID,
        callback: null,
        error: 'Missing dependencies',
      }
    }

    return {
      state: SwapCallbackState.VALID,
      callback: async function onSwapOrBurn(): Promise<string> {
        const isBurnOnly = quote.fromToken.symbol === quote.toToken.symbol
        const swap = await getSwap(
          fromToken,
          toToken,
          amount,
          toOffChain ? router[chainId] : account,
          allowedSlippage.toFixed(),
          chainId
        )
        if (!swap && !isBurnOnly) return 'unable to get swap details from 1inch'

        const encodedTx = varenRouterContract.interface.encodeFunctionData('swap', [
          account,
          ZERO_STRING,
          toOffChain ? toToken : ZERO_STRING,
          toOffChain ? toAmount : 0,
          burnSendToBuffer,
          isBurnOnly ? [ZERO_STRING, 0, ZERO_STRING, Buffer.from('')] : [fromToken, amount, toToken, swap.tx.data],
          0,
          ethers.utils.randomBytes(32),
          Buffer.from(''),
        ])

        let value = fromToken == REN_ASSETS[chainId ?? ChainId.ETHEREUM].NATIVE.renToken.address ? toHex(amount) : 0

        const tx = {
          from: account,
          to: varenRouterContract.address,
          data: encodedTx,
          value: value,
        }

        const call = await library
          .estimateGas(tx)
          .then((gasEstimate) => {
            return {
              swap,
              gasEstimate,
            }
          })
          .catch((gasError) => {
            console.debug('Gas estimate failed, trying eth_call to extract error', call)

            return library
              .call(tx)
              .then((result) => {
                console.debug('Unexpected successful call after failed estimate gas', call, gasError, result)
                return {
                  call,
                  error: new Error('Unexpected issue with estimating the gas. Please try again.'),
                }
              })
              .catch((callError) => {
                console.debug('Call threw error', call, callError)
                return {
                  call,
                  error: new Error(swapErrorToUserReadableMessage(callError)),
                }
              })
          })

        return library
          .getSigner()
          .sendTransaction({
            from: account,
            to: tx.to,
            data: tx.data,
            // let the wallet try if we can't estimate the gas
            ...(call.gasEstimate ? { gasLimit: calculateGasMargin(call.gasEstimate) } : {}),
            gasPrice: !eip1559 && chainId === ChainId.HARMONY ? BN.from('2000000000') : undefined,
            // ...(value && !isZero(value) ? { value } : {}),
            value: tx.value,
          })
          .then((response) => {
            const inputSymbol = quote.fromTokenCurrencyAmount.currency.symbol
            const outputSymbol =
              isBurnOnly || toOffChain
                ? getRenAssetByRenTokenSymbol(quote.toTokenCurrencyAmount.currency.symbol, chainId).symbol
                : quote.toTokenCurrencyAmount.currency.symbol
            const inputAmount = quote.fromTokenCurrencyAmount.toSignificant(4)
            const outputAmount = quote.toTokenCurrencyAmount.toSignificant(4)

            const base = `Swap ${inputAmount} ${inputSymbol} for ${outputAmount} ${outputSymbol}`
            // const withRecipient =
            //   recipient === account
            //     ? base
            //     : `${base} to ${
            //         recipientAddressOrName && isAddress(recipientAddressOrName)
            //           ? shortenAddress(recipientAddressOrName)
            //           : recipientAddressOrName
            //       }`
            addTransaction(response, {
              summary: base,
            })

            return response.hash
          })
          .catch((error) => {
            // if the user rejected the tx, pass this along
            if (error?.code === 4001) {
              throw new Error('Transaction rejected.')
            } else {
              // otherwise, the error was unexpected and we need to convey that
              console.error(`Swap failed`, error, tx.to, tx.data, tx.value)

              throw new Error(`Swap failed: ${swapErrorToUserReadableMessage(error)}`)
            }
          })
      },
      error: null,
    }
  }, [
    quote,
    library,
    account,
    chainId,
    amount,
    fromToken,
    toToken,
    allowedSlippage,
    varenRouterContract.interface,
    varenRouterContract.address,
    toOffChain,
    burnSendToBuffer,
    eip1559,
    addTransaction,
  ])
}
