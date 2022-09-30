import { ChainCommon, MintChain, RenNetwork } from '@renproject/interfaces'
import {
  BitcoinDetails,
  ZcashDetails,
  BitcoinCashDetails,
  DibiByteDetails,
  FilecoinDetails,
  DogecoinDetails,
} from './lockChains'
import { WalletPickerConfig } from '@renproject/multiwallet-ui'

export const lockChains = [
  BitcoinDetails,
  ZcashDetails,
  BitcoinCashDetails,
  DibiByteDetails,
  FilecoinDetails,
  DogecoinDetails,
]

export const allChains = [...lockChains]

export const multiwalletOptions = (network: RenNetwork): WalletPickerConfig<any, any> => {
  const chains = allChains.reduce((acc, chain) => {
    if (chain.multiwalletConfig) {
      return {
        ...acc,
        [chain.chain]: chain.multiwalletConfig(network),
      }
    } else {
      return acc
    }
  }, {})
  return { chains }
}

export const ChainMapper = (chainName: string, network: RenNetwork): ChainCommon | null => {
  for (const chain of lockChains) {
    if (chain.chainPattern.exec(chainName)) {
      return chain.usePublicProvider(network)
    }
  }

  console.error(`Couldn't find chain ${chainName}`)

  return null
}
