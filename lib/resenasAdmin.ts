"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";

type Resultado = { ok: boolean; error?: string };
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

async function autorizar() {
  const admin = await getAdminSession();
  if (!admin) throw new Error("Sesión administrativa no válida.");
  return createAdminDb();
}

function texto(form: FormData, campo: string, max: number) {
  const valor = form.get(campo);
  if (typeof valor !== "string") return "";
  return valor.trim().slice(0, max + 1);
}

function urlValida(valor: string) {
  if (!valor) return true;
  try { const u = new URL(valor); return (u.protocol === "https:" || u.protocol === "http:") && valor.length <= 2000; }
  catch { return false; }
}

function datos(form: FormData) {
  const autor = texto(form, "autor", 160);
  const comentario = texto(form, "comentario", 5000);
  const fuente = texto(form, "fuente", 120) || "Google Maps";
  const url_fuente = texto(form, "url_fuente", 2000);
  const avatar_url = texto(form, "avatar_url", 2000);
  const fecha_relativa = texto(form, "fecha_relativa", 100);
  const calificacionRaw = texto(form, "calificacion", 3);
  const ordenRaw = texto(form, "orden", 12);
  const fechaRaw = texto(form, "fecha_publicacion", 40);
  const calificacion = calificacionRaw === "" ? null : Number(calificacionRaw);
  const orden = Number(ordenRaw || "0");
  const fecha = fechaRaw ? new Date(fechaRaw) : null;
  if (!autor || autor.length > 160) throw new Error("El autor debe tener entre 1 y 160 caracteres.");
  if (comentario.length > 5000 || fuente.length > 120 || fecha_relativa.length > 100) throw new Error("Uno de los textos es demasiado largo.");
  if (calificacion !== null && (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5)) throw new Error("La calificación debe ser de 1 a 5.");
  if (!Number.isSafeInteger(orden) || orden < -100000 || orden > 100000) throw new Error("El orden debe ser un número entero entre -100000 y 100000.");
  if (!urlValida(url_fuente) || !urlValida(avatar_url)) throw new Error("Las URLs deben ser http o https válidas.");
  if (fecha && Number.isNaN(fecha.getTime())) throw new Error("Fecha de publicación no válida.");
  return {
    autor, comentario: comentario || null, calificacion,
    fecha_publicacion: fecha ? fecha.toISOString() : null,
    fuente, url_fuente: url_fuente || null, avatar_url: avatar_url || null,
    visible: form.get("visible") === "true", orden,
    fecha_relativa: fecha_relativa || null,
  };
}

function errorSeguro(e: unknown): Resultado {
  return { ok: false, error: e instanceof Error && ["Sesión administrativa no válida.", "El autor debe tener entre 1 y 160 caracteres.", "Uno de los textos es demasiado largo.", "La calificación debe ser de 1 a 5.", "El orden debe ser un número entero entre -100000 y 100000.", "Las URLs deben ser http o https válidas.", "Fecha de publicación no válida.", "Identificador de reseña no válido."].includes(e.message) ? e.message : "No se pudo completar la operación. Revisa los datos o los registros del servidor." };
}

function refrescar() {
  revalidatePath("/admin/resenas");
  revalidatePath("/");
}

export async function guardarResena(form: FormData): Promise<Resultado> {
  try {
    const db = await autorizar();
    const id = texto(form, "id", 40);
    if (id && !UUID.test(id)) throw new Error("Identificador de reseña no válido.");
    const payload = datos(form);
    const query = id ? db.from("resenas").update(payload).eq("id", id) : db.from("resenas").insert(payload);
    const { data, error } = await query.select("id").single();
    if (error || !data) { console.error("[RESENAS] Guardar:", error); throw new Error("Error de base de datos"); }
    refrescar();
    return { ok: true };
  } catch (e) { return errorSeguro(e); }
}

export async function eliminarResena(id: string): Promise<Resultado> {
  try {
    const db = await autorizar();
    if (!UUID.test(id)) throw new Error("Identificador de reseña no válido.");
    const { data, error } = await db.from("resenas").delete().eq("id", id).select("id").single();
    if (error || !data) { console.error("[RESENAS] Eliminar:", error); throw new Error("Error de base de datos"); }
    refrescar();
    return { ok: true };
  } catch (e) { return errorSeguro(e); }
}

export async function cambiarVisibilidadResena(id: string, visible: boolean): Promise<Resultado> {
  try {
    const db = await autorizar();
    if (!UUID.test(id) || typeof visible !== "boolean") throw new Error("Identificador de reseña no válido.");
    const { data, error } = await db.from("resenas").update({ visible }).eq("id", id).select("id").single();
    if (error || !data) { console.error("[RESENAS] Visibilidad:", error); throw new Error("Error de base de datos"); }
    refrescar();
    return { ok: true };
  } catch (e) { return errorSeguro(e); }
}