import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  const expected = process.env.DASHBOARD_TOKEN

  if (!expected || token !== expected) {
    return new NextResponse(null, { status: 404 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/sprint-dashboard/:path*',
}
