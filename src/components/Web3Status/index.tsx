import React from 'react'
import { injected } from '../../config/wallets'
import { AbstractConnector } from 'web3-react-abstract-connector'
import Image from 'next/image'
import { NetworkContextName } from '../../constants'
import WalletModal from '../../modals/WalletModal'
import Web3Connect from '../Web3Connect'
import { shortenAddress } from '../../functions/format'
import styled from 'styled-components/macro'
import useENSName from '../../hooks/useENSName'
import { useLingui } from '@lingui/react'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useWeb3React } from 'web3-react-core'
import Davatar from '@davatar/react'
import Button from '../Button'

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

function Web3StatusInner() {
  const { i18n } = useLingui()
  const { account, connector, library } = useWeb3React()

  const { ENSName } = useENSName(account ?? undefined)

  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    return (
      <Button
        id="web3-status-connected"
        onClick={toggleWalletModal}
        variant="outlined"
        color="gray"
        className="text-white"
        size="sm"
      >
        <div className="mr-2">{ENSName || shortenAddress(account)}</div>
      </Button>
    )
  } else {
    return <Web3Connect style={{ paddingTop: '8px', paddingBottom: '8px' }} color="gray" className="text-white" />
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
