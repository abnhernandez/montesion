'use client'

import { supabase } from '@/lib/supabase-client';

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
