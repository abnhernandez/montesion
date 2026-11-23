import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";
import ResenasDashboard, { type ResenaAdmin } from "@/components/ResenasDashboard.tsx";

export const instant = false;
export const metadata = {
  title: "Administrar reseñas | Monte Sion",
  robots: { index: false, follow: false },
};

export default async function AdminResenasPage() {
  const admin = await getAdminSession();
  if (!admin) redirect("/login/admin");

  const { data, error } = await createAdminDb()
    .from("resenas")
    .select("id,autor,comentario,calificacion,fecha_publicacion,fuente,url_fuente,avatar_url,visible,orden,created_at,fecha_relativa")
    .order("orden", { ascending: true })
    .order("created_at", { ascending: false })
    .limit(500);

  if (error) console.error("[RESENAS] Lectura:", error);
  return <ResenasDashboard resenas={(data ?? []) as ResenaAdmin[]} error={error ? "No se pudieron cargar las reseñas." : null} />;
}