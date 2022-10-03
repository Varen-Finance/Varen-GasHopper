import axios from 'axios'

const useUpdateQuoteStatus = async (cid: number, address: string) => {
  const res = async () => {
    try {
      const response = await axios.get(
        `https://varen-gashopper-api-staging.herokuapp.com//get_contract_by_id/${cid}/${address}`,
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

export default useUpdateQuoteStatus
