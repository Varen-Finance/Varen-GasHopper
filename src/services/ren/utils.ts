import { REN_ASSETS } from './assets'
import { RenAsset } from './models'
import { WrappedTokenInfo } from '../../state/lists/wrappedTokenInfo'
import { DEFAULT_LIST, LOCAL_BURN_DETAILS, LOCAL_MINT_DETAILS } from '../../constants'
import { ChainId } from '@sushiswap/core-sdk'

export function getRenAssetBySymbol(symbol: string, chainId: ChainId = ChainId.ETHEREUM): RenAsset {
  if (symbol == null || symbol == '') return null
  var asset: RenAsset = null
  Object.keys(REN_ASSETS[chainId]).forEach((key) => {
    const a: RenAsset = REN_ASSETS[chainId][key]
    if (a.symbol == symbol.toUpperCase()) asset = a
  })
  return asset
}

export function getRenAssetByAddress(address: string, chainId: ChainId = ChainId.ETHEREUM): RenAsset {
  if (address == null || address == '') return null
  var asset: RenAsset = null
  Object.keys(REN_ASSETS[chainId]).forEach((key) => {
    const a: RenAsset = REN_ASSETS[chainId][key]
    if (a.renToken.address.toLowerCase() == address.toLowerCase()) asset = a
  })
  return asset
}

export function getRenAssetByToken(address, chainId: ChainId = ChainId.ETHEREUM): RenAsset | null {
  let renAsset: RenAsset = null
  Object.keys(REN_ASSETS[chainId]).forEach((key) => {
    const asset = REN_ASSETS[chainId][key]
    if (asset.renToken.address.toLowerCase() == address.toLowerCase()) renAsset = asset
  })
  return renAsset
}

export function getRenAssetByRenTokenSymbol(symbol: string, chainId: ChainId = ChainId.ETHEREUM): RenAsset {
  if (symbol === null || symbol === '' || !symbol) return null
  var asset: RenAsset = null
  Object.entries(REN_ASSETS[chainId]).forEach(([key, values]) => {
    const a: RenAsset = REN_ASSETS[chainId][key]
    if (a.renToken.symbol.toUpperCase() === symbol.toUpperCase()) asset = a
  })
  if (!asset) {
    return REN_ASSETS[chainId].NATIVE
  }
  return asset
}

export function isRenAsset(symbol: string, chainId: ChainId = ChainId.ETHEREUM): boolean {
  return getRenAssetBySymbol(symbol, chainId) != null
}

export function isRenNativeAsset(symbol: string, chainId: ChainId = ChainId.ETHEREUM): boolean {
  return isRenAsset(symbol, chainId) && symbol != REN_ASSETS[chainId].NATIVE.symbol
}

export const getRenNativeAssetAsWrappedTokenInfo = (
  foundRenCoin: RenAsset,
  chainId: ChainId = ChainId.ETHEREUM
): WrappedTokenInfo => {
  return new WrappedTokenInfo(
    {
      address: foundRenCoin?.renToken?.address,
      chainId: foundRenCoin?.renToken?.chainId,
      decimals: foundRenCoin?.renToken?.decimals,
      logoURI: foundRenCoin?.logoURI,
      name: foundRenCoin?.name,
      symbol: foundRenCoin?.symbol,
    },
    DEFAULT_LIST[chainId]
  )
}

export function getBurnDetailsKey(accountAddress: string) {
  return `${accountAddress}-${LOCAL_BURN_DETAILS}`
}

export function getMintDetailsKey(accountAddress: string) {
  return `${accountAddress}-${LOCAL_MINT_DETAILS}`
}
