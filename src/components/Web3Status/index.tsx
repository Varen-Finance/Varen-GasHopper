import React, { useMemo } from 'react'
import { SUPPORTED_WALLETS, injected } from '../../config/wallets'

import { AbstractConnector } from 'web3-react-abstract-connector'
import Image from 'next/image'
import Loader from '../Loader'
import { NetworkContextName } from '../../constants'
import WalletModal from '../../modals/WalletModal'
import Web3Connect from '../Web3Connect'
import { shortenAddress } from '../../functions/format'
import styled from 'styled-components/macro'
import { t } from '@lingui/macro'
import useENSName from '../../hooks/useENSName'
import { useLingui } from '@lingui/react'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useWeb3React } from 'web3-react-core'
import Davatar from '@davatar/react'

const IconWrapper = styled.div<{ size?: number }>`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  & > * {
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector, library, account }: { connector: AbstractConnector; library: any; account: string }) {
  if (connector === injected) {
    return (
      <Davatar
        size={20}
        // @ts-ignore TYPE NEEDS FIXING
        address={account}
        defaultComponent={<Image src="https://varenx.com/images/misc/varen.svg" alt="Varen" width={20} height={20} />}
        provider={library}
      />
    )
  } else if (connector.constructor.name === 'WalletConnectConnector') {
    return (
      <IconWrapper size={16}>
        <Image
          src="https://varenx.com/images/wallets/wallet-connect.png"
          alt={'Wallet Connect'}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    )
  } else if (connector.constructor.name === 'LatticeConnector') {
    return (
      <IconWrapper size={16}>
        <Image src="https://varenx.com/images/wallets/lattice.png" alt={'Lattice'} width="16px" height="16px" />
      </IconWrapper>
    )
  } else if (connector.constructor.name === 'WalletLinkConnector') {
    return (
      <IconWrapper size={16}>
        <Image
          src="https://varenx.com/images/wallets/coinbase.svg"
          alt={'Coinbase Wallet'}
          width="16px"
          height="16px"
        />
      </IconWrapper>
    )
  } else if (connector.constructor.name === 'FortmaticConnector') {
    return (
      <IconWrapper size={16}>
        <Image src="https://varenx.com/images/wallets/fortmatic.png" alt={'Fortmatic'} width="16px" height="16px" />
      </IconWrapper>
    )
  } else if (connector.constructor.name === 'PortisConnector') {
    return (
      <IconWrapper size={16}>
        <Image src="https://varenx.com/images/wallets/portis.png" alt={'Portis'} width="16px" height="16px" />
      </IconWrapper>
    )
  } else if (connector.constructor.name === 'KeystoneConnector') {
    return (
      <IconWrapper size={16}>
        <Image src="https://varenx.com/images/wallets/keystone.png" alt={'Keystone'} width="16px" height="16px" />
      </IconWrapper>
    )
  }
  return null
}

function Web3StatusInner() {
  const { i18n } = useLingui()
  const { account, connector, library } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    return (
      <div
        id="web3-status-connected"
        className="flex items-center px-3 py-1 mr-1 border rounded cursor-pointer pointer-events-auto border-varen-dark-blue text-md bg-varen-dark-blue hover:border-indigo-400 "
        onClick={toggleWalletModal}
      >
        <div className="mr-2">{ENSName || shortenAddress(account)}</div>
      </div>
    )
  } else {
    return <Web3Connect style={{ paddingTop: '6px', paddingBottom: '6px' }} color="gray" className="text-white" />
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} />
    </>
  )
}
