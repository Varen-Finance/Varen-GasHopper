import { LogLevel, SimpleLogger, TxStatus, RenNetwork } from '@renproject/interfaces'
import RenJS from '@renproject/ren'
import { LockAndMintDeposit } from '@renproject/ren/build/main/lockAndMint'
import { sleep } from '@renproject/utils'
import BigNumber from 'bignumber.js'
import { getRenNetwork, NETWORK } from './network'
import { Web3Provider } from '@ethersproject/providers'
import { Percent, ChainId } from '@sushiswap/core-sdk'
import { getRenAssetByRenTokenSymbol, getRenAssetBySymbol } from './utils'
import { getQuote, getSwap } from '../1inch'
import { ZERO_STRING } from '../../constants'
import { RenAsset } from './models'
import { swapErrorToUserReadableMessage } from '../../hooks/useSwapOrBurnCallback'
import { calculateVarenRouterFee, VarenRouterContract } from '../varenx/utils'
import { Quote } from '../1inch/models'
import { mapFees } from './feesUtils'
import { currencyId, formatCurrencyAmount } from '../../functions'
import router from 'app/config/router'

export const logLevel = LogLevel.Log

export const startMint = async (
  renJS: RenJS,
  chainId: ChainId = ChainId.ETHEREUM,
  previousMint: any,
  renAsset: RenAsset,
  provider: Web3Provider,
  sender: string,
  showGateway: (address: string | { address: string; params?: string }) => void,
  onDeposit: (txHash: string, deposit: LockAndMintDeposit) => void,
  showFees: (fees: { mint: number; burn: number; lock?: number; release?: number }) => void
) => {
  const fromChain = getRenAssetBySymbol(renAsset.symbol, chainId).chain
  const varenRouterContract = new VarenRouterContract(provider, chainId)
  const currentNetwork = getRenNetwork(chainId)

  const lockAndMintPayload = {
    asset: renAsset.symbol,
    from: fromChain(),
    to: currentNetwork.Contract(varenRouterContract.getContractCall(sender, chainId)),
    nonce: '0x' + '00'.repeat(32),
  }
  const fees = await renJS.getFees(lockAndMintPayload)
  const mappedFees = mapFees(fees)
  showFees(mappedFees)

  const lockAndMint = await renJS.lockAndMint(lockAndMintPayload)

  if (lockAndMint.gatewayAddress) {
    // some renAssets have gatewayAddress objects instead of strings
    let address = lockAndMint?.gatewayAddress?.address ?? lockAndMint?.gatewayAddress
    showGateway(address)
  }

  if (previousMint && previousMint?.depositDetails) {
    console.debug('resuming mint', previousMint)
    lockAndMint
      .processDeposit(previousMint?.depositDetails)
      .then(async (deposit) => {
        const txHash = await deposit.txHash()
        onDeposit(txHash, deposit as unknown as LockAndMintDeposit)
      })
      .catch((e) => {
        console.debug(e)
      })
  } else {
    console.debug('starting new mint')
    lockAndMint.on('deposit', async (deposit) => {
      const txHash = await deposit.txHash()
      onDeposit(txHash, deposit as unknown as LockAndMintDeposit)
    })
  }
}

export enum DepositStatus {
  DETECTED = 'Detected',
  CONFIRMED = 'Confirmed',
  SIGNED = 'Signed',
  DONE = 'Done',
  ERROR = 'Error',
}

export const handleDeposit = async (
  deposit: LockAndMintDeposit,
  onStatus: (status: DepositStatus) => void,
  onConfirmation: (values_0: number) => void,
  onConfirmationTarget: (values_0: number) => void,
  onRenVMStatus: (status: TxStatus) => void,
  onTransactionHash: (txHash: string) => void
) => {
  const hash = deposit.txHash()

  const findTransaction = await deposit.params.to.findMint(deposit.params.asset, {
    out: {
      sighash: Buffer.from('00'.repeat(32), 'hex'),
      nhash: deposit._state.nHash!,
    },
  } as any)
  if (findTransaction) {
    onStatus(DepositStatus.DONE)
    return
  }

  deposit._state.logger = new SimpleLogger(logLevel, `[${hash.slice(0, 6)}] `)

  await deposit.confirmed().on('target', onConfirmationTarget).on('confirmation', onConfirmation)

  onStatus(DepositStatus.CONFIRMED)

  let retries = 1
  let lastError
  while (retries) {
    try {
      await deposit.signed().on('status', onRenVMStatus)
      break
    } catch (error) {
      console.debug(error)
      lastError = error
    }
    retries--
    if (retries) {
      await sleep(10)
    }
  }
  if (retries === 0) {
    throw new Error(lastError)
  }

  const mintTransaction = await deposit.findTransaction()
  if (mintTransaction) {
    onTransactionHash(mintTransaction as string)
    onStatus(DepositStatus.DONE)
    return
  }
  onStatus(DepositStatus.SIGNED)
}

export const submitDeposit = async (
  deposit: LockAndMintDeposit,
  toOffChain: boolean,
  quote: Quote,
  slippage: Percent,
  recipient: string | null,
  onTxHash: (txHash: string) => void,
  onError: (error: string) => void,
  chainId: ChainId = ChainId.ETHEREUM,
  renJS: RenJS,
  library: Web3Provider
) => {
  const fromToken = currencyId(chainId, quote.fromTokenCurrencyAmount.currency)
  const toToken = currencyId(chainId, quote.toTokenCurrencyAmount.currency)

  try {
    const depositDetails: any = await deposit.queryTx()
    const gatewayOut = new BigNumber(depositDetails.out.amount)
    const srcAmount = gatewayOut.toString()
    const newQuote = await getQuote(quote.fromToken.address, quote.toToken.address, srcAmount, chainId, false)

    const from = newQuote?.fromTokenCurrencyAmount
    const to = newQuote?.toTokenCurrencyAmount
    const toBigInt = new BigNumber(Number(formatCurrencyAmount(to, to?.currency.decimals)))
    const toAmount = to
      ? toBigInt
          .multipliedBy(Math.pow(10, newQuote.toTokenCurrencyAmount.currency.decimals))
          .integerValue(BigNumber.ROUND_DOWN)
          .toString()
      : 0

    const varenRouterFee = calculateVarenRouterFee(gatewayOut).toString()
    const afterFeeAmount =
      fromToken != toToken
        ? new BigNumber(Number(formatCurrencyAmount(from, from.currency.decimals)))
            .multipliedBy(Math.pow(10, from.currency.decimals))
            .integerValue(BigNumber.ROUND_DOWN)
            .toString()
        : '0'
    const mintAmountForSwap = String(Number(afterFeeAmount) - Number(varenRouterFee))

    const swap =
      fromToken != toToken
        ? await getSwap(fromToken, toToken, mintAmountForSwap, router[chainId], slippage.toFixed(), chainId)
        : null
    await deposit
      .mint({
        mintToken: fromToken,
        burnToken: toOffChain ? toToken : ZERO_STRING,
        burnSendTo: Buffer.from(recipient),
        burnAmount: toOffChain ? String(toAmount) : 0,
        swapVars: [fromToken, srcAmount, toToken, swap?.tx?.data ?? Buffer.from('')],
      })
      .on('transactionHash', onTxHash)
  } catch (error) {
    onError(error)
    // if the user rejected the tx, pass this along
    if (error?.code === 4001) {
      throw new Error('Transaction rejected.')
    } else {
      // otherwise, the error was unexpected and we need to convey that
      // console.error(`Swap failed`, error, tx.to, tx.data, tx.value)

      throw new Error(`Swap failed: ${swapErrorToUserReadableMessage(error)}`)
    }
  }
}
