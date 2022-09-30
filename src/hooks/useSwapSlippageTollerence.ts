import { Percent } from '@sushiswap/core-sdk'
import { useMemo } from 'react'
import { Quote } from '../services/1inch/models'
import { useUserSlippageToleranceWithDefault } from '../state/user/hooks'

const V2_SWAP_DEFAULT_SLIPPAGE = new Percent(50, 10_000) // .50%
const ONE_TENTHS_PERCENT = new Percent(10, 10_000) // .10%

export default function useSwapSlippageTolerance(quote: Quote | undefined): Percent {
  const defaultSlippageTolerance = useMemo(() => {
    if (!quote) return ONE_TENTHS_PERCENT
    return V2_SWAP_DEFAULT_SLIPPAGE
  }, [quote])
  return useUserSlippageToleranceWithDefault(defaultSlippageTolerance)
}
