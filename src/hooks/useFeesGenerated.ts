import { ChainId } from '@sushiswap/core-sdk'
import { FAUCET_ADDRESS, SUPPORTED_NETWORKS } from 'app/constants'
import axios from 'axios'
import { ethers } from 'ethers'

const useFeesGenerated = async (chainId: ChainId) => {
  const url = SUPPORTED_NETWORKS[chainId].blockExplorerUrls[1]
  const keys = SUPPORTED_NETWORKS[chainId].blockExplorerAPIkeys
  const key = keys[Math.floor(Math.random() * keys.length)]
  const startBlock = SUPPORTED_NETWORKS[chainId].blockStart
  const res = async () => {
    try {
      const response = await axios.get(
        `${url}/api?module=account&action=txlist&address=${FAUCET_ADDRESS}&startblock=${startBlock}&apikey=${key}`
      )
      const data = await response.data.result
      let value = 0
      data.forEach((transaction: Transaction) => {
        if (transaction.from.toLowerCase() !== FAUCET_ADDRESS.toLowerCase()) {
          value += Number(ethers.utils.formatEther(transaction.value)) / 10
        }
      })

      return value
    } catch (error) {
      return error.message
    }
  }

  return res()
}

export default useFeesGenerated
