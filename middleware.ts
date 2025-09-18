// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Mapa de rutas internas a URLs externas
  const redirects: Record<string, string> = {
    '/usuarios': 'https://montesion.me/usuarios/mis_cursos',
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
    '/en-vivo/live': 'https://www.youtube.com/@montesionoaxaca/live'
  }

  const destination = redirects[pathname]

  if (destination) {
    return NextResponse.redirect(destination)
  }

  return NextResponse.next()
}

// Limita el middleware solo a las rutas que necesitas
export const config = {
  matcher: ['/usuarios', '/agenda', '/yt', '/youtube', '/ig', '/instagram', '/discord', '/replay/quien-es-Dios', '/replay/como-buscar-a-Dios', '/replay/como-honrar-a-Dios', '/replay/uncion-del-Espiritu-Santo', '/replay/la-gran-comision', '/en-vivo/live'],
}