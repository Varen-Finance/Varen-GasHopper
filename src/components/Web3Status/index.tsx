import { useWeb3Modal } from '@web3modal/react'
import { shortenAddress } from 'app/functions'
import { useEffect, useState } from 'react'
import { useAccount, useEnsName } from 'wagmi'
import Button from '../Button'
import Web3Connect from '../Web3Connect'

export default function Web3Status() {
  const account = useAccount()
  const fallBackAccount = '0x0000000000000000000000000000000000000000'
  const [address, setAddress] = useState<`0x${string}`>(fallBackAccount)
  const { data: ENSName } = useEnsName({ address, chainId: 1 })
  const { open } = useWeb3Modal()

  useEffect(() => {
    if (account && account?.address !== address) {
      setAddress(account?.address)
    }
  }, [account?.address])

  if (account.isConnected) {
    return (
      <Button
        id="web3-status-connected"
        onClick={() => open()}
        variant="outlined"
        color="gray"
        className="text-white"
        size="sm"
      >
        <div className="mr-2">{ENSName || shortenAddress(address)}</div>
      </Button>
    )
  } else {
    return <Web3Connect style={{ paddingTop: '8px', paddingBottom: '8px' }} color="gray" className="text-white" />
  }
}
