import axios from 'axios'

const useAcceptQuote = async (cid: number, address: string) => {
  const res = async () => {
    try {
      const response = await axios.get(
        `https://varen-gashopper-api-staging.herokuapp.com/accept_contract/${cid}/${address}`,
        {
          withCredentials: false,
        }
      )

      return response.data
    } catch (error) {
      return error.message
    }
  }

  return res()
}

export default useAcceptQuote
