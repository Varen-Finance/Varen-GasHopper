import { API_URL } from 'app/constants'
import axios from 'axios'

const useAllSendQuotes = async (address?: string) => {
  const res = async () => {
    const enpoint = address ? `all_send_contracts_for_addr/${address}` : 'all_send_contracts'
    try {
      const response = await axios.get(`${API_URL}/${enpoint}`, {
        withCredentials: false,
      })

      return response.data
    } catch (error) {
      return error.message
    }
  }

  return res()
}

export default useAllSendQuotes
