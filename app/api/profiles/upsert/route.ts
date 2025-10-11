import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE

if (!supabaseUrl || !serviceRoleKey) {
  // This route must be deployed with SUPABASE_SERVICE_ROLE_KEY set
  console.warn('Supabase service role key not set for profiles upsert API')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, email, display_name, avatar_url, metadata } = body

    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    const supabase = createClient(supabaseUrl as string, serviceRoleKey as string)

    const payload: Record<string, unknown> = {
      id,
      email: email ?? null,
      display_name: display_name ?? (metadata?.full_name ?? metadata?.name) ?? null,
      avatar_url: avatar_url ?? (metadata?.avatar_url ?? metadata?.picture) ?? null,
      updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('profiles').upsert(payload)

    if (error) {
      console.error('Server upsert profile failed:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Upsert profile route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
