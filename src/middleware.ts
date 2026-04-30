import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

// Empty matcher — middleware runs on no routes until auth is re-enabled
export const config = { matcher: [] }
