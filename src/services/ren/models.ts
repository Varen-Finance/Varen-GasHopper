import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'

export class RenAsset {
  constructor(
    readonly symbol: string,
    readonly name: string,
    readonly chain: any,
    readonly logoURI: string,
    readonly renToken: WrappedTokenInfo,
    readonly color: string
  ) {}
}

export type Detail = {
  txHash?: string
  error?: string
  message?: string
}
