import { useQuery } from '@tanstack/react-query'
import { API_URL } from 'app/constants'

interface Props {
  account: string
}

export default function allQuotes(props: Props) {
  const address = props.account
  return useQuery(
    ['getAllQuotes', props.account],
    async () => {
      if (!props.account) throw 'Fetching all quotes failed'

      try {
        const result = await fetch(`${API_URL}/all_accepted_contracts_for_addr/${address}`)
        if (result.ok) {
          return result.json()
        }
        throw 'Fetching all quotes failed'
      } catch (e) {
        throw e
      }
    },
    {
      enabled: !!props.account,
      refetchInterval: 5000,
    }
  )
}
