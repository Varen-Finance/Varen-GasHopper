import BigNumber from 'bignumber.js'
import { LockAndMintTransaction, BurnAndReleaseTransaction, ChainCommon } from '@renproject/interfaces'
export declare enum TxStatus {
  TxStatusNil = 'nil',
  TxStatusConfirming = 'confirming',
  TxStatusPending = 'pending',
  TxStatusExecuting = 'executing',
  TxStatusReverted = 'reverted',
  TxStatusDone = 'done',
}
import { LockAndMint, LockAndMintDeposit } from '@renproject/ren'
import { v4 as uuid } from 'uuid'
import { ResponseQueryTx, unmarshalTypedPackValue } from '@renproject/rpc/build/main/v2'
import { searchChainTransaction } from './searchChainTransactions'

export interface TransactionSummary {
  asset: string

  from: string
  fromChain?: ChainCommon

  to: string
  toChain?: ChainCommon

  amountIn?: BigNumber
  amountInRaw?: BigNumber

  amountOut?: BigNumber
  amountOutRaw?: BigNumber
}
export interface AbiItem {
  anonymous?: boolean
  constant?: boolean
  inputs?: AbiInput[]
  name?: string
  outputs?: AbiOutput[]
  payable?: boolean
  stateMutability?: StateMutabilityType
  type: AbiType
}
export interface AbiInput {
  name: string
  type: EthType
  indexed?: boolean
  components?: AbiInput[]
  internalType?: string
}
export interface AbiOutput {
  name: string
  type: string
  components?: AbiOutput[]
  internalType?: string
}

export interface RenTransaction<Input, Output> {
  version?: number
  hash: Base64String
  txStatus: TxStatus
  to: string
  in: Input
  out?: Output
}
export interface RenVMFees {
  [asset: string]: RenVMAssetFees
}

export interface RenVMTransaction {
  uuid: string
  type: SearchResultType
  resultPath: string
  txHash: string
  queryTx?: SummarizedTransaction | Error
  deposit?: LockAndMintDeposit
}

export interface LegacyRenVMTransaction {
  uuid: string
  type: SearchResultType
  resultPath: string
  txHash: string
  queryTx?: SummarizedTransaction | Error
  deposit?: LockAndMintDeposit
}

export const unmarshalClaimFeesTx = (response: ResponseQueryTx) => {
  let out

  const inValue = unmarshalTypedPackValue(response.tx.in)

  if (response.tx.out) {
    out = unmarshalTypedPackValue(response.tx.out)

    // Temporary fix to support v0.4.
    if (out.revert && out.revert.length === 0) {
      out.revert = undefined
    }
  }

  return {
    version: response.tx.version ? parseInt(response.tx.version) : undefined,
    hash: response.tx.hash,
    txStatus: response.txStatus,
    to: response.tx.selector,
    in: inValue,
    out,
  }
}
export interface SearchTactic<GenericResult extends SearchResult = SearchResult> {
  match: (searchString: string, getChain: (chainName: string) => ChainCommon | null) => boolean
  search: (
    searchString: string,
    updateStatus: (status: string) => void,
    getChain: (chainName: string) => ChainCommon | null
  ) => Promise<GenericResult | GenericResult[] | null>
}

export enum SearchResultType {
  Searching,

  /**
   * Redirect represents a generic search result that points to a new url. This
   * URL can be a relative URL or it can point to an external website. Its ID is
   * the URL.
   */
  Redirect,
  /**
   * RenVMTransaction represents a mint or burn. Its ID is a RenVM hash.
   */
  RenVMTransaction,

  /**
   * RenVMTransaction represents a mint or burn. Its ID is a RenVM hash.
   */
  LegacyRenVMTransaction,

  /**
   * RenVMGateway represents a gateway address. Its ID is the address.
   */
  RenVMGateway,
}

export interface SearchResultCommon {
  uuid: string

  type: SearchResultType
  resultPath: string
}

// Searching ////////////////////////////////////////////////////////////////////

export interface Searching extends SearchResultCommon {
  type: SearchResultType.Searching
  resultPath: string
  searchString: string
  noResult?: boolean
  errorSearching?: Error
  multipleResults?: SearchResult[]
  txHash?: string
}

/* eslint-disable @typescript-eslint/no-redeclare */
export const Searching = (searchString: string, details?: Partial<Searching>): Searching => ({
  uuid: uuid(),
  type: SearchResultType.Searching,
  searchString,
  resultPath: `/search/${encodeURIComponent(searchString)}`,
  ...details,
})

// RenVMTransaction ////////////////////////////////////////////////////////////

export enum RenVMTransactionError {
  TransactionNotFound = 'transaction-not-found',
}

export interface TransactionSummary {
  asset: string

  from: string
  fromChain?: ChainCommon

  to: string
  toChain?: ChainCommon

  amountIn?: BigNumber
  amountInRaw?: BigNumber

  amountOut?: BigNumber
  amountOutRaw?: BigNumber
}

export enum TransactionType {
  Mint = 'mint',
  Burn = 'burn',
  ClaimFees = 'claimFees',
}

export type SummarizedTransaction =
  | {
      result: LockAndMintTransaction
      summary: TransactionSummary
      transactionType: TransactionType.Mint
    }
  | {
      result: BurnAndReleaseTransaction
      summary: TransactionSummary
      transactionType: TransactionType.Burn
    }
  | {
      result: any
      summary: TransactionSummary
      transactionType: TransactionType.ClaimFees
    }

export interface RenVMTransaction extends SearchResultCommon {
  type: SearchResultType
  resultPath: string
  txHash: string
  queryTx?: SummarizedTransaction | Error
  deposit?: LockAndMintDeposit
}

export const RenVMTransaction = (
  transactionHash: string,
  queryTx?: SummarizedTransaction | Error,
  deposit?: LockAndMintDeposit
): RenVMTransaction => {
  return {
    uuid: uuid(),
    type: SearchResultType.RenVMTransaction,
    resultPath: `/tx/${encodeURIComponent(transactionHash)}`,
    txHash: transactionHash,
    queryTx,
    deposit,
  }
}

// LegacyRenVMTransaction //////////////////////////////////////////////////////

export interface LegacyRenVMTransaction {
  type: SearchResultType
  resultPath: string
  txHash: string
  queryTx?: SummarizedTransaction | Error
  deposit?: LockAndMintDeposit
}

export const LegacyRenVMTransaction = (
  transactionHash: string,
  queryTx?: SummarizedTransaction | Error,
  deposit?: LockAndMintDeposit
): LegacyRenVMTransaction => {
  return {
    uuid: uuid(),
    type: SearchResultType.LegacyRenVMTransaction,
    resultPath: `/legacy-tx/${encodeURIComponent(transactionHash)}`,
    txHash: transactionHash,
    queryTx,
    deposit,
  }
}

// RenVMGateway ////////////////////////////////////////////////////////////

export interface RenVMGateway extends SearchResultCommon {
  type: SearchResultType.RenVMGateway
  resultPath: string
  address: string
  queryGateway?: {
    result: LockAndMintTransaction
    transactionType: TransactionType.Mint
    summary: TransactionSummary
  }
  lockAndMint?: LockAndMint
}

export const RenVMGateway = (
  address: string,
  queryGateway?: {
    result: LockAndMintTransaction
    transactionType: TransactionType.Mint
    summary: TransactionSummary
  },
  lockAndMint?: LockAndMint
): RenVMGateway => {
  return {
    uuid: uuid(),
    type: SearchResultType.RenVMGateway,
    resultPath: `/gateway/${encodeURIComponent(address)}`,
    address,
    queryGateway,
    lockAndMint,
  }
}

////////////////////////////////////////////////////////////////////////////////

export type SearchResult = Searching | RenVMTransaction | LegacyRenVMTransaction | RenVMGateway

export declare type EthInt =
  | 'int'
  | 'int8'
  | 'int16'
  | 'int24'
  | 'int32'
  | 'int40'
  | 'int48'
  | 'int56'
  | 'int64'
  | 'int72'
  | 'int80'
  | 'int88'
  | 'int96'
  | 'int104'
  | 'int112'
  | 'int120'
  | 'int128'
  | 'int136'
  | 'int144'
  | 'int152'
  | 'int160'
  | 'int168'
  | 'int176'
  | 'int184'
  | 'int192'
  | 'int200'
  | 'int208'
  | 'int216'
  | 'int224'
  | 'int232'
  | 'int240'
  | 'int248'
  | 'int256'
export declare type EthUint =
  | 'uint'
  | 'uint8'
  | 'uint16'
  | 'uint24'
  | 'uint32'
  | 'uint40'
  | 'uint48'
  | 'uint56'
  | 'uint64'
  | 'uint72'
  | 'uint80'
  | 'uint88'
  | 'uint96'
  | 'uint104'
  | 'uint112'
  | 'uint120'
  | 'uint128'
  | 'uint136'
  | 'uint144'
  | 'uint152'
  | 'uint160'
  | 'uint168'
  | 'uint176'
  | 'uint184'
  | 'uint192'
  | 'uint200'
  | 'uint208'
  | 'uint216'
  | 'uint224'
  | 'uint232'
  | 'uint240'
  | 'uint248'
  | 'uint256'
export declare type EthByte =
  | 'bytes'
  | 'bytes1'
  | 'bytes2'
  | 'bytes3'
  | 'bytes4'
  | 'bytes5'
  | 'bytes6'
  | 'bytes7'
  | 'bytes8'
  | 'bytes9'
  | 'bytes10'
  | 'bytes11'
  | 'bytes12'
  | 'bytes13'
  | 'bytes14'
  | 'bytes15'
  | 'bytes16'
  | 'bytes17'
  | 'bytes18'
  | 'bytes19'
  | 'bytes20'
  | 'bytes21'
  | 'bytes22'
  | 'bytes23'
  | 'bytes24'
  | 'bytes25'
  | 'bytes26'
  | 'bytes27'
  | 'bytes28'
  | 'bytes29'
  | 'bytes30'
  | 'bytes31'
  | 'bytes32'
export declare type EthType = 'address' | 'bool' | 'string' | 'var' | EthInt | EthUint | 'byte' | EthByte | string

export declare type AbiType = 'function' | 'constructor' | 'event' | 'fallback'
export declare type StateMutabilityType = 'pure' | 'view' | 'nonpayable' | 'payable'

export declare type Base64String = string

export declare type RenVMAssetFees = {
  [mintChain: string]: {
    mint: number
    burn: number
  }
} & {
  lock: BigNumber
  release: BigNumber
}
export interface TransactionSummary {
  asset: string

  from: string
  fromChain?: ChainCommon

  to: string
  toChain?: ChainCommon

  amountIn?: BigNumber
  amountInRaw?: BigNumber

  amountOut?: BigNumber
  amountOutRaw?: BigNumber
}

export class TaggedError extends Error {
  public _tag: string

  constructor(msg: string, tag?: string) {
    super(msg)
    this._tag = tag || msg
  }
}

export const errorMatches = (error: any, match: RegExp | string) => {
  return error && error.message && error.message.match && error.message.match(match)
}
