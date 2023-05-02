import { useQuery } from '@tanstack/react-query'

interface Props {
  account: string
  cid: number
  accepted: boolean
}

export default function useUpdateQuoteStatus(props: Props) {
  const address = props.account
  return useQuery(
    ['updateQuoteStatus', address, props.cid, props.accepted],
    async () => {
      try {
        const result = await fetch(
          `https://varen-gashopper-api-staging.herokuapp.com/get_contract_by_id/${props.cid}/${address}`
        )

        if (result.ok) {
          return result.json()
        }
        throw 'Update Quote status failed'
      } catch (e) {
        throw e
      }
    },
    {
      enabled: !!(props.cid && props.account && props.accepted),
      refetchInterval: 1000,
    }
  )
}
