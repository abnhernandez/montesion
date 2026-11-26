import { NextRequest, NextResponse } from 'next/server';
import { mobile } from './lib/device';

export function proxy(r: NextRequest) {
	if (mobile(r.headers)) return NextResponse.next();

	return r.nextUrl.pathname.startsWith('/api/')
		? NextResponse.json({ error: 'Dispositivo no compatible' }, { status: 403 })
		: NextResponse.redirect(new URL('/restringido', r.url));
}

export const config = {
	matcher: ['/registro/:path*', '/api/registro/:path*'],
};