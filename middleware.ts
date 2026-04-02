import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Middleware to protect private app routes (production-ready)
// It checks for common Supabase auth cookies and redirects to the sign-in page
// if no token is present. Adjust cookie names if your setup differs.

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) Protect /usuarios routes for authenticated users
  if (pathname.startsWith('/usuarios')) {
    const hasLegacyToken =
      !!req.cookies.get('sb-access-token')?.value ||
      !!req.cookies.get('sb-refresh-token')?.value ||
      !!req.cookies.get('supabase-auth-token')?.value ||
      !!req.cookies.get('supabase-session')?.value

    // Supabase SSR usually stores auth in a cookie like: sb-<project-ref>-auth-token
    const hasSupabaseSsrCookie = req
      .cookies
      .getAll()
      .some((cookie) => cookie.name.startsWith('sb-') && cookie.name.endsWith('-auth-token'))

    if (!hasLegacyToken && !hasSupabaseSsrCookie) {
      const signInUrl = new URL('/users/sign_in', req.url)
      signInUrl.searchParams.set('redirect', `${pathname}${req.nextUrl.search}`)
      return NextResponse.redirect(signInUrl)
    }

    return NextResponse.next()
  }

  // 2) Redirect map for specific public routes
  const redirects: Record<string, string> = {
    '/agenda': 'https://youtube.com/@montesionoaxaca',
    '/yt': 'https://youtube.com/@montesionoaxaca',
    '/youtube': 'https://youtube.com/@montesionoaxaca',
    '/ig': 'https://instagram.com/montesionoaxaca',
    '/instagram': 'https://instagram.com/montesionoaxaca',
    '/discord': 'https://discord.gg/montesionoaxaca',
    '/replay/quien-es-Dios': 'https://youtu.be/3yOjATMaEOI',
    '/replay/como-buscar-a-Dios': 'https://youtu.be/_7mwHQHkgJg',
    '/replay/como-honrar-a-Dios': 'https://youtu.be/F7BUqRX1WT0',
    '/replay/uncion-del-Espiritu-Santo': 'https://youtu.be/rTCGZufgONY',
    '/replay/la-gran-comision': 'https://youtu.be/tO9luxZK1xI',
    '/en-vivo/live': 'https://www.youtube.com/@montesionoaxaca/live',
    '/conf': 'https://www.youtube.com/@montesionoaxaca/live',
  }

  const destination = redirects[pathname]
  if (destination) return NextResponse.redirect(destination)

  return NextResponse.next()
}

// Limita el middleware solo a las rutas que necesitas
export const config = {
  matcher: [
    // protect usuarios and all nested routes
    '/usuarios/:path*',
    // public redirect shortcuts
    '/agenda',
    '/yt',
    '/youtube',
    '/ig',
    '/instagram',
    '/discord',
    '/replay/quien-es-Dios',
    '/replay/como-buscar-a-Dios',
    '/replay/como-honrar-a-Dios',
    '/replay/uncion-del-Espiritu-Santo',
    '/replay/la-gran-comision',
    '/en-vivo/live',
    '/conf',
  ],
}