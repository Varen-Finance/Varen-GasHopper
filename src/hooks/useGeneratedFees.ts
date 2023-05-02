import { useQuery } from '@tanstack/react-query'
import { ACTIVATED_NETWORKS, ChainId, FAUCET_ADDRESS, FEE_EXCLUDE_LIST, SUPPORTED_NETWORKS } from 'app/constants'
import { ethers } from 'ethers'

export default function useGeneratedFees() {
  const generatedFees = {}

  ACTIVATED_NETWORKS.forEach((chainId, index) => {
    const currentChainId = chainId ?? ChainId.ETHEREUM
    const url = SUPPORTED_NETWORKS[currentChainId]?.blockExplorerUrls[1]
    const keys = SUPPORTED_NETWORKS[currentChainId].blockExplorerAPIkeys
    const key = keys[Math.floor(Math.random() * keys.length)]
    const startBlock = SUPPORTED_NETWORKS[currentChainId].blockStart

    const { data } = useQuery(
      ['generatedFees', chainId, index],
      async () => {
        if (!chainId) throw 'Fetching generated fees failed'

        try {
          const result = await fetch(
            `${url}/api?module=account&action=txlist&address=${FAUCET_ADDRESS}&startblock=${startBlock}&apikey=${key}`
          )

          if (result.ok) {
            return result.json()
          }
          throw 'Fetching generated fees failed'
        } catch (e) {
          throw e
        }
      },
      {
        refetchInterval: 60000,
      }
    )

    if (data?.result) {
      let totalFee = 0
      let txCount = 0
      data.result.forEach((transaction: Transaction) => {
        if (FEE_EXCLUDE_LIST.indexOf(transaction.from.toLowerCase()) === -1) {
          totalFee += Number(ethers.utils.formatEther(transaction.value)) / 10
          txCount++
        }
      })
      generatedFees[chainId] = { totalFee: totalFee, txCount: txCount }
    } else {
      generatedFees[chainId] = { totalFee: 0, txCount: 0 }
    }
  })

  if (Object.keys(generatedFees).length !== ACTIVATED_NETWORKS.length) return null
  return generatedFees
}
