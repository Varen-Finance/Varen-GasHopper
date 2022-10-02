import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ACTIVATED_NETWORKS } from './constants'

const DEFAULT_CHAIN_ID = '1'

export function middleware(req: NextRequest) {
  const chainId = req.cookies['chain-id']

  const res = NextResponse.next()

  res.cookies.set('chain-id', chainId in ACTIVATED_NETWORKS ? ACTIVATED_NETWORKS : DEFAULT_CHAIN_ID, {
    sameSite: 'none',
    secure: true,
  })

  return res
}
