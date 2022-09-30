import { ChainCommon, TxStatus, MintChain, RenNetwork } from '@renproject/interfaces'
import {
  RenVMProvider,
  RenVMResponses,
  RPCMethod,
  unmarshalBurnTx,
  unmarshalMintTx,
} from '@renproject/rpc/build/main/v2'
import { doesntError, toURLBase64 } from '@renproject/utils'
import { summarizeTransaction } from './searchRenVMHash'
import { RenVMTransaction, SearchResult, SummarizedTransaction, TransactionType } from './types'
import {
  BitcoinDetails,
  ZcashDetails,
  BitcoinCashDetails,
  DibiByteDetails,
  FilecoinDetails,
  DogecoinDetails,
} from './chains/lockChains'

export const lockChains = [
  BitcoinDetails,
  ZcashDetails,
  BitcoinCashDetails,
  DibiByteDetails,
  FilecoinDetails,
  DogecoinDetails,
]

export const allChains = [...lockChains]

export interface SearchTactic<GenericResult extends SearchResult = SearchResult> {
  match: (searchString: string, getChain: (chainName: string) => ChainCommon | null) => boolean
  search: (
    searchString: string,
    updateStatus: (status: string) => void,
    getChain: (chainName: string) => ChainCommon | null
  ) => Promise<GenericResult | GenericResult[] | null>
}

export const queryTxsByTxid = async (
  provider: RenVMProvider,
  txid: Buffer,
  getChain: (chainName: string) => ChainCommon | null
): Promise<Array<SummarizedTransaction>> => {
  const response: { txs: Array<RenVMResponses[RPCMethod.QueryTx]['tx']> } = await provider.sendMessage(
    'ren_queryTxsByTxid' as any,
    { txid: toURLBase64(txid) },
    1
  )

  if (response.txs.length === 0) {
    throw new Error(`Transaction not found.`)
  }

  return await Promise.all(
    response.txs.map(async (tx) => {
      const response = {
        tx,
        txStatus: TxStatus.TxStatusNil,
      }

      const isMint = /((\/to)|(To))/.exec(response.tx.selector)

      // Unmarshal transaction.
      if (isMint) {
        const unmarshalled = unmarshalMintTx(response)
        return {
          result: unmarshalled,
          transactionType: TransactionType.Mint as const,
          summary: await summarizeTransaction(unmarshalled, getChain),
        }
      } else {
        const unmarshalled = unmarshalBurnTx(response)
        return {
          result: unmarshalled,
          transactionType: TransactionType.Burn as const,
          summary: await summarizeTransaction(unmarshalled, getChain),
        }
      }
    })
  )
}

const OR = (left: boolean, right: boolean) => left || right

export const searchChainTransaction: SearchTactic<RenVMTransaction> = {
  match: (searchString: string, getChain: (chainName: string) => ChainCommon | null) =>
    allChains
      .map((chain) => getChain(chain.chain))
      .map((chain) => doesntError(() => (chain ? chain.utils.transactionIsValid(searchString) : false))())
      .reduce(OR, false),
  search: async (
    searchString: string,
    updateStatus: (status: string) => void,
    getChain: (chainName: string) => ChainCommon | null
  ): Promise<RenVMTransaction[]> => {
    const formats = Array.from(
      // Remove duplicates.
      new Set(
        allChains
          .map((chain) => getChain(chain.chain))
          .map((chain) =>
            chain && chain.utils.transactionIsValid(searchString)
              ? chain.transactionRPCTxidFromID(searchString, true)
              : null
          )
          .filter((txid) => txid !== null)
          .map((x) => (x !== null ? x.toString('hex') : null))
      )
    ).map((x) => (x !== null ? Buffer.from(x, 'hex') : null))

    if (formats.length) {
      updateStatus(`Looking up ${formats.length} chain transaction format${formats.length === 1 ? '' : 's'}...`)
    } else {
      return []
    }

    const provider = new RenVMProvider(RenNetwork.Mainnet)

    let queryTxs
    for (const format of formats) {
      try {
        queryTxs = await queryTxsByTxid(provider, format!, getChain)
        break
      } catch (error: any) {
        continue
      }
    }

    if (!queryTxs) {
      throw new Error(`No result found.`)
    }

    return queryTxs.map((queryTx) => RenVMTransaction(queryTx.result.hash))
  },
}
