import { NextRequest, NextResponse } from "next/server"
import createIntlMiddleware from "next-intl/middleware"
import { routing } from "@/i18n/routing"
import { SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth"

const intlMiddleware = createIntlMiddleware(routing)

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next()
    const token = request.cookies.get(SESSION_COOKIE_NAME)?.value
    if (!verifySessionToken(token)) {
      const loginUrl = new URL("/admin/login", request.url)
      return NextResponse.redirect(loginUrl)
    }
    return NextResponse.next()
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next|_vercel|icon|apple-icon|.*\\..*).*)"],
}
