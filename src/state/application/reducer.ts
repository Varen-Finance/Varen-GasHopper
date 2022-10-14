import { createSlice } from '@reduxjs/toolkit'
import { TokenList } from '@uniswap/token-lists'

export type PopupContent =
  | {
      txn: {
        hash: string
        success?: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        oldList: TokenList
        newList: TokenList
        auto: boolean
      }
    }

export enum ApplicationModal {
  WALLET,
  LANGUAGE,
  NETWORK,
}

type PopupList = Array<{
  key: string
  show: boolean
  content: PopupContent
  removeAfterMs: number | null
}>

export interface ApplicationState {
  readonly chainId: number | null
  readonly openModal: ApplicationModal | null
  readonly popupList: PopupList
  readonly blockNumber: { readonly [chainId: number]: number }
}

const initialState: ApplicationState = {
  chainId: null,
  openModal: null,
  blockNumber: {},
  popupList: [],
}

const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    updateChainId(state, action) {
      const { chainId } = action.payload
      state.chainId = chainId
    },
    setOpenModal(state, action) {
      state.openModal = action.payload
    },
    updateBlockNumber(state, action) {
      const { chainId, blockNumber } = action.payload
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    },
  },
})

export const { updateChainId, setOpenModal, updateBlockNumber } = applicationSlice.actions
export default applicationSlice.reducer
