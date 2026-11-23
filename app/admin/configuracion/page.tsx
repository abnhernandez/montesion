import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";
import MiPerfil from "@/components/perfilAdmin";
import ConfiguracionDashboard from "@/components/configuracionAdmin";

export const instant = false;
export const metadata = { title: "Configuración | Monte Sion", robots: {index:false,follow:false} };

export default async function ConfiguracionPage() {
  const admin = await getAdminSession();
  if(!admin) redirect("/login/admin");
  const db=createAdminDb();
  const [areasResult,usuariosResult,transferResult,auditResult]=await Promise.all([
    db.from("admin_areas").select("id,codigo,nombre,es_general,activo,propietario_user_id").order("nombre"),
    db.from("admin_users").select("user_id,username,nombre,activo,estado_cuenta,avatar_url").order("username"),
    db.from("admin_ownership_transfers").select("id,area_id,nuevo_user_id,estado,created_at").eq("estado","pendiente").order("created_at",{ascending:false}),
    db.from("admin_audit_logs").select("id,accion,actor_username_snapshot,created_at,detalles").order("created_at",{ascending:false}).limit(30),
  ]);
  const errores=[areasResult.error,usuariosResult.error,transferResult.error,auditResult.error].filter(Boolean);
  const { data: perfilActual } = await db.from("admin_users")
    .select("nombre,username,avatar_url").eq("user_id",admin.user_id).single();
  const general=areasResult.data?.find(a=>a.codigo==="general");
  return <div className="space-y-10">
    <MiPerfil perfil={{
      nombre: perfilActual?.nombre ?? admin.nombre,
      username: perfilActual?.username ?? admin.username,
      avatar_url: perfilActual?.avatar_url ?? null
    }}/>
    <div className="border-t border-white/10 pt-8">
    <ConfiguracionDashboard
    yo={admin.user_id}
    esGeneral={general?.propietario_user_id===admin.user_id}
    areas={areasResult.data??[]}
    usuarios={usuariosResult.data??[]}
    transferencias={transferResult.data??[]}
    auditoria={auditResult.data??[]}
    error={errores.length?"No se pudieron cargar todos los datos de configuración.":null}
  />
    </div>
  </div>;
}