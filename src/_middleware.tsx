import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { SUBDOMAIN_CHAIN_ID } from './constants'

export function middleware(req: NextRequest) {
  const chainId = req.cookies.get('chain-id')

  const subdomain = req.headers.get('host')?.split('.')[0]

  const res = NextResponse.next()

  // If chainId already set and no subdomain, just return...
  if (chainId && !subdomain) {
    return res
  }

  if (subdomain && subdomain in SUBDOMAIN_CHAIN_ID) {
    // set the `cookie`
    res.cookies.set('chain-id', SUBDOMAIN_CHAIN_ID[subdomain].toString(), { sameSite: 'none', secure: true })
  } else {
    res.cookies.delete('chain-id')
  }

  // return the res
  return res
}
