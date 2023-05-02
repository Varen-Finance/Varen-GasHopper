import { useQuery } from '@tanstack/react-query'
import { ChainId } from 'app/constants'

interface Props {
  account: string
  source: ChainId
  target: ChainId[]
  accepted: boolean
}

export default function useGetQuote(props: Props) {
  const payload = { from_chain: props.source, to_chains: props.target }
  const address = props.account

  return useQuery(
    ['getQuote', props.account, props.source, props.target?.length],
    async () => {
      try {
        const result = await fetch(`https://varen-gashopper-api-staging.herokuapp.com/quote/${address}`, {
          method: 'POST',
          body: JSON.stringify(payload),
        })
        if (result.ok) {
          return result.json()
        }
      } catch (e) {
        throw e
      }
    },
    {
      enabled: !!(props.account && props.source && props.target?.length && !props.accepted),
      refetchInterval: 60000,
    }
  )
}
