import { useQuery } from '@tanstack/react-query'
import { ACTIVATED_NETWORKS } from 'app/constants'

export default function useNativePrices() {
  const nativePrices = {}

  ACTIVATED_NETWORKS.forEach((chainId) => {
    const { data } = useQuery(
      ['nativePrices', chainId],
      async () => {
        if (!chainId) throw 'Fetching native prices failed'

        try {
          const result = await fetch(`https://varen-gashopper-api-staging.herokuapp.com/price/${chainId}`)

          if (result.ok) {
            return result.json()
          }
          throw 'Fetching native prices failed'
        } catch (e) {
          throw e
        }
      },
      {
        refetchInterval: 60000,
      }
    )
    nativePrices[chainId] = data
  })
  if (Object.keys(nativePrices).length !== ACTIVATED_NETWORKS.length) return null
  return nativePrices
}
