import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ChainId } from '@sushiswap/core-sdk'
import HeadlessUiModal from 'app/components/Modal/HeadlessUIModal'
import Typography from 'app/components/Typography'
import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks'
import { ACTIVATED_NETWORKS } from 'app/constants'
import { classNames } from 'app/functions'
import { useActiveWeb3React } from 'app/services/web3'
import { ApplicationModal } from 'app/state/application/actions'
import { useModalOpen, useNetworkModalToggle } from 'app/state/application/hooks'
// @ts-ignore TYPE NEEDS FIXING
import Image from 'next/image'
import React, { FC } from 'react'

export const SUPPORTED_NETWORKS: {
  [key: number]: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
} = {
  [ChainId.ETHEREUM]: {
    chainId: '0x1',
    chainName: 'Ethereum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://etherscan.com'],
  },
  [ChainId.BSC]: {
    chainId: '0x38',
    chainName: 'BNB Chain',
    nativeCurrency: {
      name: 'Binance Coin',
      symbol: 'BNB',
      decimals: 18,
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com'],
  },
  [ChainId.MATIC]: {
    chainId: '0x89',
    chainName: 'Matic',
    nativeCurrency: {
      name: 'Matic',
      symbol: 'MATIC',
      decimals: 18,
    },
    rpcUrls: ['https://polygon-mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://polygonscan.com'],
  },
  [ChainId.ARBITRUM]: {
    chainId: '0xA4B1',
    chainName: 'Arbitrum',
    nativeCurrency: {
      name: 'Ethereum',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: ['https://arbitrum-mainnet.infura.io/v3'],
    blockExplorerUrls: ['https://arbiscan.io'],
  },
  [ChainId.FANTOM]: {
    chainId: '0xfa',
    chainName: 'Fantom',
    nativeCurrency: {
      name: 'Fantom',
      symbol: 'FTM',
      decimals: 18,
    },
    rpcUrls: ['https://rpcapi.fantom.network'],
    blockExplorerUrls: ['https://ftmscan.com'],
  },
}

const NetworkModal: FC = () => {
  const { i18n } = useLingui()
  const { chainId, library, account } = useActiveWeb3React()
  const networkModalOpen = useModalOpen(ApplicationModal.NETWORK)
  const toggleNetworkModal = useNetworkModalToggle()

  if (!chainId) return null

  return (
    <HeadlessUiModal.Controlled isOpen={networkModalOpen} onDismiss={toggleNetworkModal}>
      <div className="flex flex-col gap-4">
        <HeadlessUiModal.Header header={i18n._(t`Select a network`)} onClose={toggleNetworkModal} />
        <div className="grid grid-flow-row-dense grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2">
          {ACTIVATED_NETWORKS.map((key: ChainId, i: number) => {
            if (chainId === key) {
              return (
                <div
                  key={i}
                  className="flex items-center w-full gap-4 px-4 py-3 border rounded cursor-default bg-varenx-dark-blue focus:outline-none border-varenx-blue"
                >
                  <Image
                    // @ts-ignore TYPE NEEDS FIXING
                    src={NETWORK_ICON[key]}
                    alt="Switch Network"
                    className="rounded-md"
                    width="32px"
                    height="32px"
                  />
                  <Typography weight={700} className="text-high-emphesis">
                    {NETWORK_LABEL[key]}
                  </Typography>
                </div>
              )
            }
            return (
              <button
                key={i}
                onClick={async () => {
                  console.debug(`Switching to chain ${key}`, SUPPORTED_NETWORKS[key])
                  toggleNetworkModal()
                  const params = SUPPORTED_NETWORKS[key]
                  try {
                    await library?.send('wallet_switchEthereumChain', [{ chainId: `0x${key.toString(16)}` }, account])
                  } catch (switchError) {
                    // This error code indicates that the chain has not been added to MetaMask.
                    // @ts-ignore TYPE NEEDS FIXING
                    if (switchError.code === 4902) {
                      try {
                        await library?.send('wallet_addEthereumChain', [params, account])
                      } catch (addError) {
                        // handle "add" error
                        console.error(`Add chain error ${addError}`)
                      }
                    }
                    console.error(`Switch chain error ${switchError}`)
                    // handle other "switch" errors
                  }
                }}
                className={classNames(
                  'bg-varenx-darkest-blue focus:outline-none flex items-center gap-4 w-full px-4 py-3 rounded border border-varenx-blue hover:bg-varenx-dark-blue'
                )}
              >
                {/*@ts-ignore TYPE NEEDS FIXING*/}
                <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width="32px" height="32px" />
                <Typography weight={700} className="text-high-emphesis">
                  {NETWORK_LABEL[key]}
                </Typography>
              </button>
            )
          })}
        </div>
      </div>
    </HeadlessUiModal.Controlled>
  )
}

export default NetworkModal
