import { ChainId, NATIVE } from '@sushiswap/core-sdk'
import React, { useEffect } from 'react'

import { ACTIVATED_NETWORKS } from '../../constants'
import ExternalLink from '../ExternalLink'
import Image from 'next/image'
import LanguageSwitch from '../LanguageSwitch'
import Link from 'next/link'
import More from './More'
import { Popover } from '@headlessui/react'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import { t } from '@lingui/macro'
import { useActiveWeb3React } from '../../hooks/useActiveWeb3React'
import { useETHBalances } from '../../state/wallet/hooks'
import { useLingui } from '@lingui/react'
import { NETWORK_ICON, NETWORK_LABEL } from '../../config/networks'
import { SUPPORTED_NETWORKS } from '../../modals/NetworkModal'
// @ts-ignore
import cookie from 'cookie-cutter'
import HeadlessUIModal from '../Modal/HeadlessUIModal'

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  // @ts-ignore
  const currentNetwork = `<span class="font-bold text-blue">${NETWORK_LABEL[chainId]}</span>`

  return (
    <header className="relative z-50 flex-shrink-0 w-full">
      <Popover as="nav" className="z-10 w-full bg-transparent">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ExternalLink className="opacity-100" href="https://varen.finance" title={i18n._(t`About Varen`)}>
                <Image src="https://varenx.com/images/varen-x/varen-x-logo.svg" alt="VarenX" width={161} height={45} />
              </ExternalLink>
            </div>
            <div className="relative z-50 block md:hidden">
              <LanguageSwitch />
            </div>

            <div className="fixed bottom-0 left-0 z-10 flex flex-row items-center justify-center w-full py-2 rounded lg:w-auto bg-varen-darkest-blue lg:relative lg:p-0 lg:bg-transparent">
              <div className="flex items-center justify-between space-x-2 sm:justify-end">
                <div className="hidden md:block">
                  <LanguageSwitch />
                </div>

                <div className="flex items-center">
                  <Web3Network />
                </div>

                <div className="flex items-center w-auto cursor-default whitespace-nowrap">
                  {account && chainId && userEthBalance && (
                    <>
                      <div className="px-3 py-2 text-primary text-bold">
                        {userEthBalance?.toSignificant(4)} {NATIVE[chainId].symbol}
                      </div>
                    </>
                  )}
                  <Web3Status />
                </div>
                <More />
              </div>
            </div>
          </div>
        </div>
      </Popover>
      <HeadlessUIModal.Controlled
        // @ts-ignore
        isOpen={!!account && !ACTIVATED_NETWORKS.includes(chainId)}
        onDismiss={() => null}
      >
        <div className="flex flex-col justify-center">
          <div
            className="mb-6 text-lg text-primary"
            dangerouslySetInnerHTML={{
              __html: i18n._(
                t`You are connected with the ${currentNetwork} network, which is currently not supported.`
              ),
            }}
          />
          <div className="mb-6 text-lg text-primary">
            {i18n._(t`Please switch to one of the networks listed below.`)}
          </div>
          <div className={`grid gap-2 grid-cols-2`}>
            {ACTIVATED_NETWORKS.map((key: ChainId, idx: number) => (
              <button
                className="w-full col-span-1 p-px rounded bg-varen-blue"
                key={idx}
                onClick={() => {
                  const params = SUPPORTED_NETWORKS[key]
                  cookie.set('chainId', key)
                  if (key === ChainId.ETHEREUM) {
                    library?.send('wallet_switchEthereumChain', [{ chainId: '0x1' }, account])
                  } else {
                    library?.send('wallet_addEthereumChain', [params, account])
                  }
                }}
              >
                <div className="flex items-center w-full h-full p-3 space-x-3 rounded bg-varen-dark-blue">
                  <Image
                    // @ts-ignore
                    src={NETWORK_ICON[key]}
                    alt={`Switch to ${NETWORK_LABEL[key]} Network`}
                    className="rounded-md"
                    width="32px"
                    height="32px"
                  />
                  <div className="font-bold text-primary">{NETWORK_LABEL[key]}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </HeadlessUIModal.Controlled>
    </header>
  )
}

export default AppBar
