import { Popover } from '@headlessui/react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { formatValue } from 'helpers'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAccount, useBalance, useNetwork, useSwitchNetwork } from 'wagmi'
import { ACTIVATED_NETWORKS, ChainId, NETWORK_ICON, NETWORK_LABEL } from '../../constants'
import Dots from '../Dots'
import ExternalLink from '../ExternalLink'
import LanguageSwitch from '../LanguageSwitch'
import HeadlessUIModal from '../Modal/HeadlessUIModal'
import Web3Network from '../Web3Network'
import Web3Status from '../Web3Status'
import More from './More'
import { NavigationItem } from './NavigationItem'
import useMenu from './useMenu'

function AppBar(): JSX.Element {
  const { i18n } = useLingui()
  const menu = useMenu()

  const { chain } = useNetwork()
  const account = useAccount()
  const fallBackAccount = '0x0000000000000000000000000000000000000000'
  const [address, setAddress] = useState<`0x${string}`>(fallBackAccount)
  const { chains, switchNetwork, isLoading } = useSwitchNetwork()
  const [chainInvalid, setChainInvalid] = useState(false)
  const {
    data: balance,
    isError: isErrorBalances,
    isLoading: isLoadingBalances,
  } = useBalance({
    address,
    watch: true,
    cacheTime: 5_000,
    staleTime: 5_000,
    enabled: !!address && address !== fallBackAccount,
  })

  useEffect(() => {
    if (account && account?.address !== address) {
      setAddress(account?.address)
    }
  }, [account?.address])

  useEffect(() => {
    if (!chain || !chains) return
    setChainInvalid(!chains.find((c) => c.id === chain?.id ?? ChainId.ETHEREUM))
  }, [chain, chains])

  return (
    <header className="relative z-50 flex-shrink-0 w-full">
      <Popover as="nav" className="z-10 w-full bg-transparent">
        <div className="p-4">
          <div className="flex flex-wrap items-center md:justify-between md:flex-nowrap">
            <div className="flex flex-wrap items-center md:flex-nowrap">
              <ExternalLink
                className="mb-4 opacity-100 md:mb-0 md:mr-10"
                href="https://varen.finance"
                title={i18n._(t`About Varen`)}
              >
                <Image
                  src="https://gashopper.io/images/gashopper-logo.svg"
                  alt="GasHopper by Varen DAO"
                  width={303}
                  height={45}
                />
              </ExternalLink>
              {menu.map((node) => {
                return <NavigationItem node={node} key={node.key} />
              })}
            </div>
            <div className="relative z-10 block mt-4 md:hidden">
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
                  <div className="px-3 py-2 text-primary text-bold">
                    {!isLoadingBalances && !isErrorBalances
                      ? formatValue(balance?.formatted, 2, 4, true, false, ` ${balance?.symbol ?? 'ETH'}`)
                      : `0.00 ${chain?.nativeCurrency.symbol ?? 'ETH'}`}
                  </div>
                  <Web3Status />
                </div>
                <More />
              </div>
            </div>
          </div>
        </div>
      </Popover>
      <HeadlessUIModal.Controlled isOpen={chainInvalid} onDismiss={() => null}>
        <div className="flex flex-col justify-center">
          <div
            className="mb-6 text-lg text-primary"
            dangerouslySetInnerHTML={{
              __html: i18n._(t`You are connected with an unsupported network.`),
            }}
          />
          <div className="mb-6 text-lg text-primary">
            {i18n._(t`Please switch to one of the networks listed below.`)}
          </div>
          <div className={`grid gap-2 grid-cols-2 relative`}>
            {isLoading && (
              <div className="absolute w-full h-full flex justify-center items-center isolate backdrop-blur-sm bg-black/50 inset-0">
                <Dots>{i18n._(t`Switching chains`)}</Dots>
              </div>
            )}
            {ACTIVATED_NETWORKS.map((key: ChainId, idx: number) => (
              <button
                className="w-full col-span-1 rounded bg-varen-blue"
                key={idx}
                onClick={() => {
                  switchNetwork?.(key)
                }}
              >
                <div className="flex items-center w-full h-full p-3 space-x-3 rounded bg-varen-dark-blue">
                  <Image
                    src={NETWORK_ICON[key]}
                    alt={`Switch to ${NETWORK_LABEL[key]} Network`}
                    className="rounded-md"
                    width={32}
                    height={32}
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
