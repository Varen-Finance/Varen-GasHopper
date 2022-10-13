import { ChainId } from '@sushiswap/core-sdk'
import { FAUCET_ADDRESS, SUPPORTED_NETWORKS } from 'app/constants'
import axios from 'axios'
import { ethers } from 'ethers'

const useWalletBalance = async (chainId: ChainId) => {
  const url = SUPPORTED_NETWORKS[chainId].blockExplorerUrls[1]
  const keys = SUPPORTED_NETWORKS[chainId].blockExplorerAPIkeys
  const key = keys[Math.floor(Math.random() * keys.length)]
  const res = async () => {
    try {
      const response = await axios.get(
        `${url}/api?module=account&action=balance&address=${FAUCET_ADDRESS}&tag=latest&apikey=${key}`
      )
      const data = await response.data.result
      if (!isNaN(+data)) {
        return Number(ethers.utils.formatEther(data))
      } else {
        return 0
      }
    } catch (error) {
      return 0
    }
  }

  return res()
}

export default useWalletBalance
