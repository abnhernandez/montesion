
import { redirect } from "next/navigation";

import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";
import EventosDashboard from "@/components/EventosDashboard";

export const instant = false;

export const metadata = {
  title: "Gestión de eventos | Monte Sion",
  robots: {
    index: false,
    follow: false,
  },
};

export type EventoAdmin = {
  id: string;
  titulo: string;
  descripcion: string | null;
  lugar: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  imagen_url: string | null;
  estado: string;
  created_at: string | null;
};

export default async function AdminEventosPage() {
  // Verificar sesión administrativa
  const admin = await getAdminSession();

  if (!admin) {
    redirect("/login/admin");
  }

  // Conexión privada con Supabase
  const db = createAdminDb();

  // Consultar eventos reales
  const { data, error } = await db
    .from("eventos")
    .select(`
      id,
      titulo,
      descripcion,
      lugar,
      fecha_inicio,
      fecha_fin,
      imagen_url,
      estado,
      created_at
    `)
    .order("fecha_inicio", {
      ascending: false,
    })
    .limit(200);

  if (error) {
    console.error(
      "[ADMIN EVENTOS] Error consultando Supabase:",
      error.message
    );
  }

  return (
    <EventosDashboard
      eventos={(data ?? []) as EventoAdmin[]}
      error={
        error
          ? "No se pudieron cargar los eventos desde Supabase. Verifica la conexión y los permisos."
          : null
      }
    />
  );
}