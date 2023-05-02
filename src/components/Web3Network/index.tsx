import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useWeb3Modal } from '@web3modal/react'
import { ACTIVATED_NETWORKS, ChainId, NETWORK_ICON, NETWORK_LABEL } from 'app/constants'
import { classNames } from 'app/functions'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi'
import Dots from '../Dots'
import { HeadlessUiModal } from '../Modal'
import Typography from '../Typography'

interface Props {
  variant?: 'base' | 'large'
}

function Web3Network({ variant = 'base' }: Props): JSX.Element | null {
  const { i18n } = useLingui()
  const { chain } = useNetwork()
  const account = useAccount()
  const { open } = useWeb3Modal()
  const { switchNetwork, isLoading } = useSwitchNetwork()
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(false)
  }, [chain?.id])

  return (
    <>
      <button
        className="bg-dark800 border border-blue rounded text-white hover:bg-varen-dark-blue disabled:opacity-50 disabled:bg-dark800 md:px-4 md:py-2 text-base disabled:cursor-not-allowed focus:outline-none"
        id="network-select"
        onClick={() => {
          if (!account.isConnected) {
            open()
          } else {
            setShowModal(true)
          }
        }}
        color="gray"
      >
        <div className="grid items-center grid-flow-col space-x-2">
          <Image
            src={NETWORK_ICON[chain?.id ?? ChainId.ETHEREUM]}
            alt="Switch Network"
            className="rounded"
            width={22}
            height={22}
          />
          <div className={classNames(variant === 'base' ? 'hidden text-white md:flex' : 'flex text-white')}>
            {NETWORK_LABEL[chain?.id ?? ChainId.ETHEREUM]}
          </div>
        </div>
      </button>
      <HeadlessUiModal.Controlled isOpen={showModal} onDismiss={() => setShowModal(false)}>
        <div className="flex flex-col gap-4">
          <HeadlessUiModal.Header header={i18n._(t`Select a network`)} onClose={() => setShowModal(false)} />
          <div className="grid grid-flow-row-dense grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 relative">
            {isLoading && (
              <div className="absolute w-full h-full flex justify-center items-center inset-0 isolate backdrop-blur-sm bg-black/50 ">
                <Dots>{i18n._(t`Switching chains`)}</Dots>
              </div>
            )}
            {ACTIVATED_NETWORKS.map((key: ChainId, i: number) => {
              if (chain?.id === key) {
                return (
                  <div
                    key={i}
                    className="flex items-center w-full gap-4 px-4 py-3 border rounded cursor-default bg-varen-dark-blue focus:outline-none border-varen-blue"
                  >
                    <Image
                      // @ts-ignore TYPE NEEDS FIXING
                      src={NETWORK_ICON[key]}
                      alt="Switch Network"
                      className="rounded-md"
                      width={32}
                      height={32}
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
                  onClick={() => switchNetwork?.(key)}
                  className={classNames(
                    'bg-varen-darkest-blue focus:outline-none flex items-center gap-4 w-full px-4 py-3 rounded border border-varen-blue hover:bg-varen-dark-blue'
                  )}
                >
                  <Image src={NETWORK_ICON[key]} alt="Switch Network" className="rounded-md" width={32} height={32} />
                  <Typography weight={700} className="text-high-emphesis">
                    {NETWORK_LABEL[key]}
                  </Typography>
                </button>
              )
            })}
          </div>
        </div>
      </HeadlessUiModal.Controlled>
    </>
  )
}

export default Web3Network
