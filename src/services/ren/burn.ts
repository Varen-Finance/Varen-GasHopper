import { TxStatus } from '@renproject/interfaces'
import RenJS from '@renproject/ren'
import { getRenNetwork, NETWORK } from './network'
import { getRenAssetByToken } from './utils'
import { getLowestDenomination } from '.'
import { ChainId } from '@sushiswap/core-sdk'
import { swapErrorToUserReadableMessage } from '../../hooks/useSwapOrBurnCallback'
import { Quote } from '../1inch/models'
import { mapFees } from './feesUtils'
import { currencyId } from '../../functions'

export enum BurnStatus {
  BURNT = 'Burnt',
  DONE = 'Done',
  RELEASING = 'Releasing',
  BURNING = 'Burning',
  ERROR = 'Error',
}

const RENVM_CONFIRMATIONS_TARGET = 15

export const startBurn = async (
  renJS: RenJS,
  chainId: ChainId = ChainId.ETHEREUM,
  quote: Quote,
  provider: any,
  burnSendTo: string,
  sender: string,
  onStatus: (txStatus: TxStatus) => void,
  onConfirmation: (confirmations: number) => void,
  onTxHash: (txHash: string) => void,
  onTxAddress: (transactionAddress: string) => void,
  onError: (error: string) => void,
  showFees: (fees: { mint: number; burn: number; lock?: number; release?: number }) => void
) => {
  const fromToken = currencyId(chainId, quote.fromTokenCurrencyAmount.currency)
  const burnAmount = Number(
    getLowestDenomination(
      Number(quote.fromTokenCurrencyAmount.toFixed()),
      quote.fromTokenCurrencyAmount.currency.decimals
    )
  ).toFixed()
  const currentNetwork = getRenNetwork(chainId)

  const renAsset = getRenAssetByToken(fromToken, chainId)
  if (!renAsset) {
    return
  }

  const burnAndReleasePayload = {
    asset: renAsset.symbol,
    to: renAsset.chain().Address(burnSendTo),
    from: currentNetwork.Account({
      address: sender,
      value: burnAmount,
    }),
  }

  try {
    const fees = await renJS.getFees(burnAndReleasePayload)
    const mappedFees = mapFees(fees)
    showFees(mappedFees)

    const burnAndRelease = await renJS.burnAndRelease(burnAndReleasePayload)

    await burnAndRelease.burn().on('confirmation', onConfirmation).on('transactionHash', onTxAddress)

    await burnAndRelease.release().on('status', onStatus).on('txHash', onTxHash)
  } catch (error) {
    console.debug('error', error)
    onError(error)
    if (error?.code === 4001) {
      throw new Error('Transaction rejected.')
    } else {
      // otherwise, the error was unexpected and we need to convey that
      // console.error(`Swap failed`, error, tx.to, tx.data, tx.value)

      throw new Error(`Swap failed: ${swapErrorToUserReadableMessage(error)}`)
    }
  }
}
