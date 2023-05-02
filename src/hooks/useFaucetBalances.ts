import { useQuery } from '@tanstack/react-query'
import { ACTIVATED_NETWORKS, API_URL } from 'app/constants'

export default function useFaucetBalances() {
  const faucetBalances = {}

  ACTIVATED_NETWORKS.forEach((chainId) => {
    const { data } = useQuery(
      ['faucetBalance', chainId],
      async () => {
        if (!chainId) throw 'Fetching GasHopper balances failed'

        try {
          const result = await fetch(`${API_URL}/wallet_funds/${chainId}`)

          if (result.ok) {
            return result.json()
          }
          throw 'Fetching GasHopper balances failed'
        } catch (e) {
          throw e
        }
      },
      {
        refetchInterval: 60000,
      }
    )
    faucetBalances[chainId] = data
  })
  if (Object.keys(faucetBalances).length !== ACTIVATED_NETWORKS.length) return null
  return faucetBalances
}
