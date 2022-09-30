import { Bitcoin, BitcoinCash, DigiByte, Dogecoin, Filecoin, Terra, Zcash } from '.'
import { TerraNetwork } from '@renproject/chains-terra/build/main/api/deposit'
import { LockChain, MintChain, RenNetwork } from '@renproject/interfaces'
import { ConnectorConfig } from '@renproject/multiwallet-ui'

export interface ChainDetails<ChainType extends MintChain | LockChain = MintChain | LockChain> {
  chain: string
  chainPattern: RegExp

  usePublicProvider: (network: RenNetwork) => ChainType | null

  nativeAssets: Array<{
    symbol: string
    name: string
  }>

  multiwalletConfig?: (network: RenNetwork) => Array<ConnectorConfig<any, any>>

  getMintParams?: (mintChain: MintChain, to: string, payload: string, asset: string) => Promise<MintChain>

  getTokenAccount?: (mintChain: MintChain, asset: string) => Promise<string | null>

  createTokenAccount?: (mintChain: MintChain, asset: string) => Promise<string>
}

export const BitcoinDetails: ChainDetails<Bitcoin> = {
  chain: 'Bitcoin',
  nativeAssets: [{ symbol: 'BTC', name: 'Bitcoin' }],
  chainPattern: /^(bitcoin|btc)$/i,
  usePublicProvider: (network: RenNetwork) => Bitcoin(network === RenNetwork.Mainnet ? 'mainnet' : 'testnet'),
}

export const ZcashDetails: ChainDetails<Zcash> = {
  chain: 'Zcash',
  nativeAssets: [{ symbol: 'ZEC', name: 'Zcash' }],
  chainPattern: /^(zcash|zec)$/i,
  usePublicProvider: (network: RenNetwork) => Zcash(network === RenNetwork.Mainnet ? 'mainnet' : 'testnet'),
}

export const BitcoinCashDetails: ChainDetails<BitcoinCash> = {
  chain: 'BitcoinCash',
  nativeAssets: [{ symbol: 'BCH', name: 'BitcoinCash' }],
  chainPattern: /^(bitcoincash|bch)$/i,
  usePublicProvider: (network: RenNetwork) => BitcoinCash(network === RenNetwork.Mainnet ? 'mainnet' : 'testnet'),
}

export const DibiByteDetails: ChainDetails<DigiByte> = {
  chain: 'DibiByte',
  nativeAssets: [{ symbol: 'DGB', name: 'DibiByte' }],
  chainPattern: /^(dibibyte|dgb)$/i,
  usePublicProvider: (network: RenNetwork) => DigiByte(network === RenNetwork.Mainnet ? 'mainnet' : 'testnet'),
}

export const FilecoinDetails: ChainDetails<Filecoin> = {
  chain: 'Filecoin',
  nativeAssets: [{ symbol: 'FIL', name: 'Filecoin' }],
  chainPattern: /^(filecoin|fil)$/i,
  usePublicProvider: (network: RenNetwork) => Filecoin(network === RenNetwork.Mainnet ? 'mainnet' : 'testnet'),
}

export const DogecoinDetails: ChainDetails<Dogecoin> = {
  chain: 'Dogecoin',
  nativeAssets: [{ symbol: 'DOGE', name: 'Dogecoin' }],
  chainPattern: /^(dogecoin|doge)$/i,
  usePublicProvider: (network: RenNetwork) => Dogecoin(network === RenNetwork.Mainnet ? 'mainnet' : 'testnet'),
}
