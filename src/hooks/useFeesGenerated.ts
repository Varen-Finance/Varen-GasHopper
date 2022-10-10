import { ChainId } from '@sushiswap/core-sdk'
import { FAUCET_ADDRESS, FEE_EXCLUDE_LIST, SUPPORTED_NETWORKS } from 'app/constants'
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
      let totalFee = 0
      let txCount = 0
      data.forEach((transaction: Transaction) => {
        if (FEE_EXCLUDE_LIST.indexOf(transaction.from.toLowerCase()) === -1) {
          totalFee += Number(ethers.utils.formatEther(transaction.value)) / 10
          txCount++
        }
      })

      return { totalFee, txCount }
    } catch (error) {
      return error.message
    }
  }

  return res()
}

export default useFeesGenerated
