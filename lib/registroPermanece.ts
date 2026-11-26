import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { mobile } from '@/lib/device';
import { schema, ageOf } from '@/lib/validation';
import { encrypt, hash } from '@/lib/crypto';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';

export async function POST(r: NextRequest) {
  const reply = (v: unknown, status = 200) =>
    NextResponse.json(v, {
      status,
      headers: { 'Cache-Control': 'no-store' },
    });

  try {
    if (!mobile(r.headers) || r.headers.get('origin') !== process.env.APP_ORIGIN) {
      return reply({ error: 'Acceso no autorizado' }, 403);
    }

    const raw = await r.text();
    if (raw.length > 12000) {
      return reply({ error: 'Solicitud demasiado grande' }, 413);
    }

    const p = schema.safeParse(JSON.parse(raw));
    if (!p.success) {
      return reply({ error: 'Revisa los datos y requisitos de participación.' }, 400);
    }

    const { token, ...d } = p.data;
    const captcha = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET || '',
          response: token,
        }),
      },
    );
    const check = await captcha.json();

    if (
      !check.success ||
      check.hostname !== new URL(process.env.APP_ORIGIN!).hostname
    ) {
      return reply({ error: 'Verificación de seguridad no válida.' }, 400);
    }

    const db = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );

    const age = ageOf(d.birth);
    if (age < 18) {
      return reply({ error: 'Se requiere gestión por el responsable.' }, 403);
    }

    const phone = parsePhoneNumberFromString(d.phone)!.number;
    const folio = randomUUID();
    const { error } = await db.from('permanece_registros').insert({
      folio,
      datos_cifrados: encrypt({ ...d, phone }),
      email_hash: hash(d.email.toLowerCase()),
      telefono_hash: hash(phone),
      estado: 'pending_review',
      menor: age < 18,
    });

    if (error) {
      return reply(
        {
          error:
            'No se pudo registrar. Si ya enviaste una solicitud, contacta a Monte Sion.',
        },
        409,
      );
    }

    return reply({ folio, menor: age < 18 });
  } catch {
    return reply({ error: 'No se pudo completar la solicitud.' }, 500);
  }
}