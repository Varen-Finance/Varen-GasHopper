import { NETWORK_ICON, NETWORK_LABEL } from 'app/config/networks'
import { switchToNetwork } from 'app/functions/network'
import useIsWindowVisible from 'app/hooks/useIsWindowVisible'
import usePrevious from 'app/hooks/usePrevious'
import NetworkModel from 'app/modals/NetworkModal'
import { useActiveWeb3React } from 'app/services/web3'
import { useNetworkModalToggle } from 'app/state/application/hooks'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useState } from 'react'

function Web3Network(): JSX.Element | null {
  const { chainId, library } = useActiveWeb3React()

  const toggleNetworkModal = useNetworkModalToggle()

  const [attemptingSwitchFromUrl, setAttemptingSwitchFromUrl] = useState(false)
  const [switchedFromUrl, setSwitchedFromUrl] = useState(false)

  const router = useRouter()

  const isWindowVisible = useIsWindowVisible()

  const prevChainId = usePrevious(chainId)

  const queryChainId = Number(router.query.chainId)

  const handleChainSwitch = useCallback(
    (targetChain: number) => {
      if (!library?.provider) {
        setAttemptingSwitchFromUrl(false)
        return
      }
      setSwitchedFromUrl(true)
      switchToNetwork({ provider: library.provider, chainId: targetChain })
        .then(() => {
          return router.replace({
            pathname: window.location.pathname,
            query: { ...router.query, chainId: targetChain },
          })
        })
        .catch(() => {
          if (chainId) {
            router.replace({ pathname: window.location.pathname, query: { ...router.query, chainId } })
          }
        })
        .finally(() => {
          //
        })
    },
    [library?.provider, router, chainId]
  )

  useEffect(() => {
    if (!chainId || !prevChainId) return

    // when network change originates from wallet or dropdown selector, just update URL
    if (chainId !== prevChainId) {
      console.debug('network change from wallet or network modal')
      router.replace({ pathname: window.location.pathname, query: { ...router.query, chainId } })
    }
  }, [chainId, prevChainId, router])

  useEffect(() => {
    // assume network change originates from URL

    const cookieChainId = Cookies.get('chain-id')

    const defaultChainId = cookieChainId ? Number(cookieChainId) : 1

    if (
      chainId &&
      defaultChainId &&
      queryChainId &&
      !attemptingSwitchFromUrl &&
      !switchedFromUrl &&
      isWindowVisible &&
      (chainId !== queryChainId || chainId !== defaultChainId)
    ) {
      console.debug('network change from query chainId', { queryChainId, chainId })
      setAttemptingSwitchFromUrl(true)
      handleChainSwitch(defaultChainId !== 1 ? defaultChainId : queryChainId)
    }
  }, [chainId, handleChainSwitch, switchedFromUrl, queryChainId, isWindowVisible, attemptingSwitchFromUrl])

  // set chainId on initial load if not present
  useEffect(() => {
    if (chainId && !queryChainId) {
      console.debug('Setting chain id on initial load because not present')
      router.replace({ pathname: window.location.pathname, query: { ...router.query, chainId } })
    }
  }, [chainId, queryChainId, router])

  if (!chainId || !library) return null

  return (
    <div
      className="flex items-center w-auto border rounded cursor-pointer pointer-events-auto select-none text-md bg-varen-blue border-varen-blue hover:border-indigo-400 whitespace-nowrap"
      onClick={() => toggleNetworkModal()}
    >
      <div className="grid items-center grid-flow-col px-3 py-2 space-x-2">
        <Image src={NETWORK_ICON[chainId]} alt="Switch Network" className="rounded" width="22px" height="22px" />
        <div className="hidden text-primary md:flex">{NETWORK_LABEL[chainId]}</div>
      </div>
      <NetworkModel />
    </div>
  )
}

export default Web3Network
