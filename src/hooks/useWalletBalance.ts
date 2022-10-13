import { ChainId } from '@sushiswap/core-sdk'
import { API_URL } from 'app/constants'
import axios from 'axios'

const useWalletBalance = async (chainId: ChainId) => {
  const res = async () => {
    try {
      const response = await axios.get(`${API_URL}/wallet_funds/${chainId}`)
      const data = await response.data
      return data
    } catch (error) {
      console.log(error)
      return 0
    }
  }

  return res()
}

export default useWalletBalance
