import { Web3Provider } from '@ethersproject/providers'
import RenJS from '@renproject/ren'
import { ChainId } from '@sushiswap/core-sdk'
import { REN_ASSETS } from './assets'
import { RenAsset } from './models'
import { NETWORK } from './network'

type Fees = {
  [key: string]: any
}

export enum TxType {
  MINT = 'mint',
  BURN = 'burn',

  // VARENX ONLY
  MINT_SWAP_BURN = 'mint-swap-burn',
}

export enum BridgeCurrency {
  BTC = 'BTC',
  BCH = 'BCH',
  DOTS = 'DOTS',
  DOGE = 'DOGE',
  ZEC = 'ZEC',
  DGB = 'DGB',
  FIL = 'FIL',
  RENBTC = 'RENBTC',
  RENBCH = 'RENBCH',
  RENDOGE = 'RENDOGE',
  RENZEC = 'RENZEC',
  RENDGB = 'RENDGB',
  RENLUNA = 'RENLUNA',
  RENFIL = 'RENFIL',
}

export type BridgeFee = Fees & {
  lock: number
  release: number
  symbol: BridgeCurrency
}

export type BridgeFees = Array<BridgeFee>

export type CalculatedFee = {
  renVMFee: number
  renVMFeeAmount: number
  networkFee: number
  conversionTotal: number
  varenXFeeAmount: number
}

export type SimpleFee = {
  lock?: number
  release?: number
  mint: number
  burn: number
}

type GetTransactionsFeesArgs = {
  amount: number
  fees: SimpleFee | null
  type: TxType
  decimals: number
}

export const getFees = async (
  renJS: RenJS,
  chainId: ChainId = ChainId.ETHEREUM,
  renAsset: RenAsset,
  provider: Web3Provider
) => {
  const fees = await renJS.getFees({
    asset: renAsset.symbol,
    from: renAsset.chain(),
    to: REN_ASSETS[chainId].NATIVE.chain(provider, NETWORK),
  })

  return mapFees(fees)
}

export const getTransactionFees = ({ amount, type, fees, decimals }: GetTransactionsFeesArgs) => {
  const amountNumber = Number(amount)
  const feeData: CalculatedFee = {
    renVMFee: 0,
    renVMFeeAmount: 0,
    networkFee: 0,
    varenXFeeAmount: 0,
    conversionTotal: amountNumber,
  }
  if (fees) {
    const renTxTypeFee = type === TxType.MINT ? fees.mint : fees.burn
    const networkFee = type === TxType.MINT ? fees.lock : fees.release
    feeData.networkFee = Number(networkFee) / 10 ** decimals
    if (feeData.networkFee === 339.9) {
      feeData.networkFee = 0.003399
    }

    feeData.renVMFee = Number(renTxTypeFee) / 10000 // percent value
    feeData.renVMFeeAmount = Number(amountNumber * feeData.renVMFee)
    feeData.varenXFeeAmount = (amountNumber - feeData.renVMFeeAmount - feeData.networkFee) * 0.0005
    const total = Number(Number(amountNumber - feeData.renVMFeeAmount - feeData.networkFee).toFixed(6))
    feeData.conversionTotal = total > 0 ? total : 0
  }

  return feeData
}

export const mapFees = (rates: any) => {
  return {
    mint: rates.mint,
    burn: rates.burn,
    lock: rates.lock ? rates.lock.toNumber() : 0,
    release: rates.release ? rates.release.toNumber() : 0,
  } as SimpleFee
}
