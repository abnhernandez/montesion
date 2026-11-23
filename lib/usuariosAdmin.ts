"use server";
import { randomBytes } from "node:crypto";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";

type Resultado={ok:boolean;mensaje:string;claveTemporal?:string};
const idRE=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
async function acceso(){
 const s=await getAdminSession(); if(!s) throw new Error("Sesión expirada");
 const db=createAdminDb();
 const {data:a,error}=await db.from("admin_areas").select("propietario_user_id").eq("codigo","general").single();
 if(error||a?.propietario_user_id!==s.user_id) throw new Error("Solo Administración General puede gestionar cuentas");
 const {data:u}=await db.from("admin_users").select("activo,estado_cuenta").eq("user_id",s.user_id).single();
 if(!u?.activo||u.estado_cuenta!=="activo") throw new Error("Cuenta sin autorización");
 return {s,db};
}
const finalizar=()=>revalidatePath("/admin/configuracion");
export async function crearAdministrador(form:FormData):Promise<Resultado>{
 try{
  const {s,db}=await acceso();
  const nombre=String(form.get("nombre")??"").trim();
  const username=String(form.get("username")??"").trim().toLowerCase();
  const password=String(form.get("password")??"");
  if(nombre.length<2||nombre.length>120||!/^[a-z0-9._-]{3,40}$/.test(username)||password.length<12||password.length>128) throw new Error("Nombre, usuario o contraseña no válidos (contraseña mínimo 12 caracteres)");
  const hash=await bcrypt.hash(password,12);
  const {data:u,error}=await db.from("admin_users").insert({nombre,username,password_hash:hash,activo:true,estado_cuenta:"activo",debe_cambiar_password:true}).select("user_id").single();
  if(error||!u) throw new Error("No se pudo crear la cuenta; verifica si el username ya existe");
  const {error:logError}=await db.from("admin_audit_logs").insert({actor_user_id:s.user_id,target_user_id:u.user_id,accion:"cuenta.creada",actor_username_snapshot:s.username,target_username_snapshot:username,detalles:{nombre}});
  if(logError) console.error("Auditoría pendiente para cuenta creada",logError.message);
  finalizar(); return {ok:true,mensaje:"Administrador creado. Comparte su contraseña por un canal seguro."};
 }catch(e){return {ok:false,mensaje:e instanceof Error?e.message:"Error inesperado"};}
}
export async function gestionarAdministrador(form:FormData):Promise<Resultado>{
 try{
  const {s,db}=await acceso();
  const target=String(form.get("user_id")??"");
  const op=String(form.get("operacion")??"");
  if(!idRE.test(target)||!(["suspender","bloquear","activar","restablecer","eliminar"].includes(op))) throw new Error("Operación no válida");
  if(target===s.user_id) throw new Error("No puedes gestionar tu propia cuenta desde aquí");
  const motivo=String(form.get("motivo")??"").trim().slice(0,500);
  const hasta=String(form.get("hasta")??"");
  let fecha:string|null=null;
  if(op==="suspender"){
   if(!hasta) throw new Error("Indica hasta cuándo suspender");
   const d=new Date(hasta);if(!Number.isFinite(d.getTime())||d<=new Date()) throw new Error("Fecha inválida");
   fecha=d.toISOString();
  }
  let hash:string|null=null,claveTemporal:string|undefined;
  if(op==="restablecer"){
   claveTemporal=randomBytes(24).toString("base64url");
   hash=await bcrypt.hash(claveTemporal,12);
  }
  const {error}=await db.rpc("admin_gestionar_cuenta",{
   p_actor:s.user_id,p_target:target,p_operacion:op,p_hash:hash,p_hasta:fecha,p_motivo:motivo||null,
  });
  if(error) throw new Error(error.message);
  finalizar();return {ok:true,mensaje:op==="restablecer"?"Contraseña temporal generada. Se muestra una sola vez.":`Operación ${op} completada.`,claveTemporal};
 }catch(e){return {ok:false,mensaje:e instanceof Error?e.message:"Error inesperado"};}
}