"use server";

import { revalidatePath } from "next/cache";
import { randomUUID } from "node:crypto";
import bcrypt from "bcryptjs";
import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";

type Resultado = { ok: boolean; mensaje: string };
const respuesta = (ok: boolean, mensaje: string): Resultado => ({ ok, mensaje });

async function identidad() {
  const admin = await getAdminSession();
  if (!admin) throw new Error("Tu sesión expiró. Inicia sesión nuevamente.");
  return admin;
}

export async function guardarPerfil(form: FormData): Promise<Resultado> {
  try {
    const admin = await identidad();
    const nombre = String(form.get("nombre") ?? "").trim();
    const username = String(form.get("username") ?? "").trim().toLowerCase();
    if (nombre.length < 2 || nombre.length > 120) return respuesta(false, "El nombre debe tener entre 2 y 120 caracteres.");
    if (!/^[a-z0-9._-]{3,40}$/.test(username)) return respuesta(false, "El usuario debe tener 3–40 caracteres: letras minúsculas, números, punto, guion o guion bajo.");
    const db = createAdminDb();
    const { data: repetido, error: consultaError } = await db.from("admin_users")
      .select("user_id").eq("username", username).neq("user_id", admin.user_id).maybeSingle();
    if (consultaError) return respuesta(false, "No se pudo verificar el nombre de usuario.");
    if (repetido) return respuesta(false, "Ese nombre de usuario ya está ocupado.");
    const { error } = await db.from("admin_users").update({ nombre, username }).eq("user_id", admin.user_id);
    if (error) return respuesta(false, "No se pudo guardar el perfil. Comprueba que el usuario no esté ocupado.");
    await db.from("admin_audit_logs").insert({
      actor_user_id: admin.user_id, target_user_id: admin.user_id,
      actor_username_snapshot: admin.username, target_username_snapshot: username,
      accion: "perfil.actualizado", detalles: { nombre_nuevo: nombre, username_anterior: admin.username, username_nuevo: username },
    });
    revalidatePath("/admin/configuracion");
    return respuesta(true, "Nombre y usuario actualizados correctamente.");
  } catch (e) { return respuesta(false, e instanceof Error ? e.message : "Error inesperado."); }
}

export async function cambiarPassword(form: FormData): Promise<Resultado> {
  try {
    const admin = await identidad();
    const actual = String(form.get("password_actual") ?? "");
    const nueva = String(form.get("password_nueva") ?? "");
    const confirmar = String(form.get("password_confirmar") ?? "");
    if (nueva.length < 12 || nueva.length > 128) return respuesta(false, "La nueva contraseña debe tener entre 12 y 128 caracteres.");
    if (nueva !== confirmar) return respuesta(false, "Las contraseñas nuevas no coinciden.");
    if (nueva === actual) return respuesta(false, "La nueva contraseña debe ser diferente.");
    const db = createAdminDb();
    const { data: cuenta, error: errorCuenta } = await db.from("admin_users")
      .select("password_hash").eq("user_id", admin.user_id).single();
    if (errorCuenta || !cuenta) return respuesta(false, "No se pudo comprobar la cuenta.");
    if (!(await bcrypt.compare(actual, cuenta.password_hash))) return respuesta(false, "La contraseña actual es incorrecta.");
    const hash = await bcrypt.hash(nueva, 12);
    const { error } = await db.from("admin_users").update({
      password_hash: hash, debe_cambiar_password: false,
    }).eq("user_id", admin.user_id).eq("password_hash", cuenta.password_hash);
    if (error) return respuesta(false, "No se pudo actualizar la contraseña.");
    // Invalidar otras sesiones. La actual se mantiene para evitar interrumpir el guardado.
    const { cookies } = await import("next/headers");
    const { createHash } = await import("node:crypto");
    const token = (await cookies()).get("montesion_admin_session")?.value ?? "";
    const tokenHash = createHash("sha256").update(token).digest("hex");
    await db.from("admin_sessions").update({ revoked_at: new Date().toISOString() })
      .eq("admin_user_id", admin.user_id).is("revoked_at", null).neq("token_hash", tokenHash);
    await db.from("admin_audit_logs").insert({
      actor_user_id: admin.user_id, target_user_id: admin.user_id,
      actor_username_snapshot: admin.username, accion: "perfil.password_cambiada",
      detalles: { otras_sesiones_revocadas: true },
    });
    revalidatePath("/admin/configuracion");
    return respuesta(true, "Contraseña actualizada. Las demás sesiones se han cerrado.");
  } catch (e) { return respuesta(false, e instanceof Error ? e.message : "Error inesperado."); }
}

export async function subirAvatar(form: FormData): Promise<Resultado> {
  try {
    const admin = await identidad();
    const archivo = form.get("avatar");
    if (!(archivo instanceof File) || archivo.size === 0) return respuesta(false, "Selecciona una imagen.");
    const tipos: Record<string, string> = { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" };
    const extension = tipos[archivo.type];
    if (!extension) return respuesta(false, "Solo se permiten imágenes JPG, PNG o WebP.");
    if (archivo.size > 2 * 1024 * 1024) return respuesta(false, "La imagen no puede superar los 2 MB.");
    const buffer = Buffer.from(await archivo.arrayBuffer());
    const firmaValida = extension === "jpg"
      ? buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff
      : extension === "png"
      ? buffer.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))
      : buffer.toString("ascii",0,4) === "RIFF" && buffer.toString("ascii",8,12) === "WEBP";
    if (!firmaValida) return respuesta(false, "El archivo no parece ser una imagen válida.");
    const db = createAdminDb();
    const ruta = `admin-avatars/${admin.user_id}/${randomUUID()}.${extension}`;
    const { error: storageError } = await db.storage.from("media").upload(ruta, buffer, {
      contentType: archivo.type, cacheControl: "3600", upsert: false,
    });
    if (storageError) return respuesta(false, "No se pudo subir la foto. Verifica que exista el bucket media.");
    const { data } = db.storage.from("media").getPublicUrl(ruta);
    const { error: dbError } = await db.from("admin_users")
      .update({ avatar_url: data.publicUrl }).eq("user_id", admin.user_id);
    if (dbError) {
      await db.storage.from("media").remove([ruta]);
      return respuesta(false, "No se pudo guardar la foto en el perfil.");
    }
    await db.from("admin_audit_logs").insert({
      actor_user_id: admin.user_id, target_user_id: admin.user_id,
      actor_username_snapshot: admin.username, accion: "perfil.foto_actualizada",
      detalles: { ruta_storage: ruta },
    });
    revalidatePath("/admin/configuracion");
    return respuesta(true, "Fotografía de perfil actualizada.");
  } catch (e) { return respuesta(false, e instanceof Error ? e.message : "Error inesperado."); }
}