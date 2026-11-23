import "server-only";

import { cookies } from "next/headers";
import { connection } from "next/server";
import { randomBytes, createHash } from "node:crypto";
import { createAdminDb } from "@/lib/supabase/admin";
import { puedeAccederAdmin } from "@/lib/adminAccess";

const COOKIE_NAME = "montesion_admin_session";
const SESSION_SECONDS = 60 * 60 * 8;
const TOKEN_PATTERN = /^[a-f0-9]{64}$/;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createAdminSession(userId: string): Promise<void> {
  const db = createAdminDb();
  const { data: admin, error: adminError } = await db
    .from("admin_users")
    .select("activo, estado_cuenta, suspendido_hasta")
    .eq("user_id", userId)
    .maybeSingle();
  if (adminError || !admin || !puedeAccederAdmin(admin)) {
    throw new Error("La cuenta no tiene acceso administrativo habilitado.");
  }

  const token = randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_SECONDS * 1000).toISOString();
  const { error } = await db.from("admin_sessions").insert({
    admin_user_id: userId,
    token_hash: tokenHash,
    expires_at: expiresAt,
  });
  if (error) {
    console.error("Error al crear sesión administrativa:", error.message);
    throw new Error("No se pudo crear la sesión administrativa.");
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_SECONDS,
  });
}

export async function getAdminSession() {
  await connection();
  const token = (await cookies()).get(COOKIE_NAME)?.value;
  if (!token || !TOKEN_PATTERN.test(token)) return null;

  const db = createAdminDb();
  const now = new Date().toISOString();
  const { data: session, error } = await db
    .from("admin_sessions")
    .select("admin_user_id, expires_at, revoked_at")
    .eq("token_hash", hashToken(token))
    .is("revoked_at", null)
    .gt("expires_at", now)
    .maybeSingle();
  if (error) {
    console.error("Error al verificar sesión:", error.message);
    return null;
  }
  if (!session) return null;

  const { data: admin, error: adminError } = await db
    .from("admin_users")
    .select("user_id, username, nombre, activo, estado_cuenta, suspendido_hasta")
    .eq("user_id", session.admin_user_id)
    .maybeSingle();
  if (adminError) {
    console.error("Error al verificar administrador:", adminError.message);
    return null;
  }
  if (!admin || !puedeAccederAdmin(admin)) return null;

  // No exponer campos adicionales a componentes que esperan la sesión anterior.
  return {
    user_id: admin.user_id,
    username: admin.username,
    nombre: admin.nombre,
    activo: admin.activo,
  };
}

export async function deleteAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (token && TOKEN_PATTERN.test(token)) {
    const db = createAdminDb();
    const { error } = await db
      .from("admin_sessions")
      .update({ revoked_at: new Date().toISOString() })
      .eq("token_hash", hashToken(token));
    if (error) {
      console.error("Error al revocar sesión:", error.message);
      throw new Error("No se pudo revocar la sesión administrativa.");
    }
  }
  cookieStore.delete(COOKIE_NAME);
}