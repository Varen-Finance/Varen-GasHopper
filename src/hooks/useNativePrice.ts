import { ChainId } from '@sushiswap/core-sdk'
import axios from 'axios'

const useNativePrice = async (chainId: ChainId) => {
  const res = async () => {
    try {
      const response = await axios.get(`https://varen-gashopper-api-staging.herokuapp.com/price/${chainId}`, {
        withCredentials: false,
      })

      return response.data
    } catch (error) {
      return error.message
    }
  }

  return res()
}

export default useNativePrice
