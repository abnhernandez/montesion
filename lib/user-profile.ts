'use clients'

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function getUserAndProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: perfil, error } = await supabase
    .from('perfiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) return null;

  return { ...user, perfil };
}

export type DatosPerfil = Record<string, unknown>; // Replace with actual fields if known

export async function updateProfile(userId: string, datosPerfil: DatosPerfil) {
  const { error } = await supabase
    .from('perfiles')
    .update(datosPerfil)
    .eq('id', userId);

  return error;
}
