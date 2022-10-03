import axios from 'axios'

const useAllQuotes = async (address: string) => {
  const res = async () => {
    try {
      const response = await axios.get(
        `https://varen-gashopper-api-staging.herokuapp.com//all_contracts_for_addr/${address}`,
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

export default useAllQuotes
