"use server";

import { compare } from "bcryptjs";
import { createHash } from "node:crypto";
import { createAdminDb } from "@/lib/supabase/admin";
import { createAdminSession } from "@/lib/session";
import { puedeAccederAdmin } from "@/lib/adminAccess";

export type LoginState = { error: string | null; success: boolean };
const ERROR_GENERICO = "Credenciales incorrectas o acceso no autorizado.";
const ERROR_LIMITE = "Demasiados intentos. Espera 15 minutos antes de volver a intentarlo.";
const failure = (): LoginState => ({ error: ERROR_GENERICO, success: false });

export async function adminLogin(
  _previousState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const usuario = String(formData.get("usuario") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!usuario || !password) {
    return { error: "Introduce tu usuario y contraseña.", success: false };
  }
  if (!/^[a-z0-9._-]{3,32}$/.test(usuario) || password.length > 1024) {
    return failure();
  }

  const identifierHash = createHash("sha256").update(usuario).digest("hex");
  try {
    const db = createAdminDb();
    async function throttle(action: "check" | "failure" | "success") {
      const { data, error } = await db.rpc("admin_login_throttle", {
        p_identifier_hash: identifierHash,
        p_action: action,
      });
      if (error) throw new Error("No se pudo verificar el límite de intentos.");
      return data === true;
    }

    if (!(await throttle("check"))) {
      return { error: ERROR_LIMITE, success: false };
    }

    const { data: admin, error } = await db
      .from("admin_users")
      .select("user_id, password_hash, activo, estado_cuenta, suspendido_hasta")
      .eq("username", usuario)
      .maybeSingle();
    if (error) throw new Error("No se pudo consultar el administrador.");

    const dummyHash =
      "$2b$12$C6UzMDM.H6dfI/f/IKcEe.OiQ7c6WJ4W9QdH5vQzXh1R5LwK9r6aK";
    const validPassword = await compare(password, admin?.password_hash || dummyHash);

    if (!admin || !validPassword || !puedeAccederAdmin(admin)) {
      await throttle("failure");
      return failure();
    }

    // createAdminSession vuelve a comprobar el estado antes de insertar la sesión.
    await createAdminSession(admin.user_id);
    await throttle("success");
    return { error: null, success: true };
  } catch (error) {
    console.error("Error de autenticación administrativa:", error);
    return {
      error: "No fue posible iniciar sesión. Inténtalo nuevamente.",
      success: false,
    };
  }
}