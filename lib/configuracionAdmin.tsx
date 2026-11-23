"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";

type Resultado = { ok: boolean; mensaje: string };
const uuidRe = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function contexto() {
  const session = await getAdminSession();
  if (!session) throw new Error("Sesión expirada");
  const db = createAdminDb();
  const { data: general, error } = await db.from("admin_areas")
    .select("propietario_user_id").eq("codigo", "general").single();
  if (error || !general || general.propietario_user_id !== session.user_id) {
    throw new Error("Solo el propietario de Administración General puede realizar esta operación");
  }
  return { session, db };
}

async function auditar(db: ReturnType<typeof createAdminDb>, actor: {user_id:string; username:string}, accion:string, target_user_id:string|null, area_id:string|null, detalles:Record<string,unknown>={}) {
  const { error } = await db.from("admin_audit_logs").insert({
    actor_user_id:actor.user_id, actor_username_snapshot:actor.username,
    target_user_id, area_id, accion, detalles,
  });
  if (error) throw new Error("No se pudo registrar la auditoría: " + error.message);
}

export async function crearArea(formData:FormData):Promise<Resultado> {
  try {
    const { session,db }=await contexto();
    const nombre=String(formData.get("nombre")??"").trim();
    const codigo=String(formData.get("codigo")??"").trim().toLowerCase();
    if (nombre.length<3 || nombre.length>100 || !/^[a-z0-9_-]{3,50}$/.test(codigo)) throw new Error("Nombre o código inválidos");
    const {data,error}=await db.from("admin_areas").insert({nombre,codigo}).select("id").single();
    if(error) throw new Error(error.message);
    await auditar(db,session,"area.creada",null,data.id,{nombre,codigo});
    revalidatePath("/admin/configuracion");
    return {ok:true,mensaje:"Área creada. Asigna un propietario antes de activarla para uso administrativo."};
  } catch(e) { return {ok:false,mensaje:e instanceof Error?e.message:"Error inesperado"}; }
}

export async function solicitarTransferencia(formData:FormData):Promise<Resultado> {
  try {
    const {session,db}=await contexto();
    const areaId=String(formData.get("area_id")??"");
    const nuevoId=String(formData.get("nuevo_user_id")??"");
    if(!uuidRe.test(areaId)||!uuidRe.test(nuevoId)) throw new Error("Identificadores inválidos");
    const {data:area,error:ae}=await db.from("admin_areas").select("id,propietario_user_id").eq("id",areaId).single();
    if(ae||!area) throw new Error("Área no encontrada");
    if(area.propietario_user_id===nuevoId) throw new Error("La persona ya es propietaria");
    const {data:usuario,error:ue}=await db.from("admin_users").select("user_id,activo,estado_cuenta").eq("user_id",nuevoId).single();
    if(ue||!usuario?.activo||usuario.estado_cuenta!=="activo") throw new Error("El destinatario debe estar activo");
    const {data,error}=await db.from("admin_ownership_transfers").insert({
      area_id:areaId,anterior_user_id:area.propietario_user_id,
      nuevo_user_id:nuevoId,solicitado_por:session.user_id,
    }).select("id").single();
    if(error) throw new Error(error.message);
    await auditar(db,session,"propiedad.transferencia_solicitada",nuevoId,areaId,{transferencia_id:data.id});
    revalidatePath("/admin/configuracion");
    return {ok:true,mensaje:"Transferencia solicitada. El destinatario debe aceptarla desde su propia sesión."};
  }catch(e){return {ok:false,mensaje:e instanceof Error?e.message:"Error inesperado"};}
}

export async function aceptarTransferencia(formData:FormData):Promise<Resultado> {
  try {
    const session=await getAdminSession();
    if(!session) throw new Error("Sesión expirada");
    const id=String(formData.get("transfer_id")??"");
    if(!uuidRe.test(id)) throw new Error("Identificador inválido");
    const db=createAdminDb();
    const {error}=await db.rpc("admin_aceptar_transferencia",{p_transfer_id:id,p_aceptante_user_id:session.user_id});
    if(error) throw new Error(error.message);
    revalidatePath("/admin/configuracion");
    return {ok:true,mensaje:"Propiedad transferida correctamente."};
  }catch(e){return {ok:false,mensaje:e instanceof Error?e.message:"Error inesperado"};}
}