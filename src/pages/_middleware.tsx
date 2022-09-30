import { ChainSubdomain } from 'app/enums/ChainSubdomain'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

const SUBDOMAIN_CHAIN_ID: { [subdomain: string]: string } = {
  [ChainSubdomain.ETHEREUM]: '1',
  [ChainSubdomain.POLYGON]: '137',
  [ChainSubdomain.BSC]: '56',
  [ChainSubdomain.ARBITRUM]: '42161',
  [ChainSubdomain.AVALANCHE]: '43114',
}

const DEFAULT_CHAIN_ID = '1'

export function middleware(req: NextRequest) {
  // const response = NextResponse.next()

  const chainId = req.cookies['chain-id']

  const subdomain = req.headers.get('host')?.split('.')[0]

  const res = NextResponse.next()

  // If chainId already set and no subdomain, just return...
  if (chainId && !subdomain) {
    return res
  }

  // set the `cookie`
  res.cookie(
    'chain-id',
    subdomain && subdomain in SUBDOMAIN_CHAIN_ID ? SUBDOMAIN_CHAIN_ID[subdomain] : DEFAULT_CHAIN_ID,
    { sameSite: 'none', secure: true }
  )

  // return the res
  return res
}
