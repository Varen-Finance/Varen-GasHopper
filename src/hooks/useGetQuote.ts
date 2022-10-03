import { ChainId } from '@sushiswap/core-sdk'
import axios from 'axios'

const useGetQuote = async (address: string, source: ChainId, target: ChainId[]) => {
  const payload = { from_chain: source, to_chains: target }

  const res = async () => {
    try {
      const response = await axios({
        method: 'post',
        url: `https://varen-gashopper-api-staging.herokuapp.com/quote/${address}`,
        withCredentials: false,
        data: payload,
      })
      return response.data
    } catch (error) {
      return error.message
    }
  }
  return res()
}

export default useGetQuote
