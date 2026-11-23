
"use server";

import { revalidatePath } from "next/cache";
import { getAdminSession } from "@/lib/session";
import { createAdminDb } from "@/lib/supabase/admin";

export type EventoActionState = {
  success: boolean;
  error: string | null;
};

const ESTADOS = [
  "publicado",
  "borrador",
  "cancelado",
] as const;
const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const fail = (error: string): EventoActionState => ({
  success: false,
  error,
});

function fechaOaxaca(value: string): string | null {
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(value)) {
    return null;
  }

  const fecha = new Date(`${value}:00-06:00`);

  if (Number.isNaN(fecha.getTime())) {
    return null;
  }

  const comprobacion = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(fecha);
  const parts = Object.fromEntries(
    comprobacion.map(({ type, value }) => [type, value])
  );

  if (
    `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}` !==
    value
  ) {
    return null;
  }

  return fecha.toISOString();
}

function leer(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function crearEvento(
  _prevState: EventoActionState,
  formData: FormData
): Promise<EventoActionState> {
  const admin = await getAdminSession();

  if (!admin) {
    return {
      success: false,
      error: "Tu sesión ha expirado. Inicia sesión nuevamente.",
    };
  }

  const titulo = String(
    formData.get("titulo") ?? ""
  ).trim();

  const descripcion = String(
    formData.get("descripcion") ?? ""
  ).trim();

  const lugar = String(
    formData.get("lugar") ?? ""
  ).trim();

  const fechaInicio = leer(formData, "fecha_inicio");
  const fechaFin = leer(formData, "fecha_fin");

  const imagenUrl = String(
    formData.get("imagen_url") ?? ""
  ).trim();

  const estado = String(
    formData.get("estado") ?? "publicado"
  );

  if (!titulo || titulo.length > 180) {
    return {
      success: false,
      error: "El título debe tener entre 1 y 180 caracteres.",
    };
  }

  if (
    !ESTADOS.includes(
      estado as (typeof ESTADOS)[number]
    )
  ) {
    return {
      success: false,
      error: "Selecciona un estado válido.",
    };
  }

  if (!fechaInicio) {
    return {
      success: false,
      error: "Selecciona la fecha y hora de inicio.",
    };
  }

  const inicio = fechaOaxaca(fechaInicio);

  if (!inicio) {
    return {
      success: false,
      error: "La fecha de inicio no es válida.",
    };
  }

  let finISO: string | null = null;

  if (fechaFin) {
    const fin = fechaOaxaca(fechaFin);

    if (!fin) {
      return {
        success: false,
        error: "La fecha de finalización no es válida.",
      };
    }

    if (new Date(fin) <= new Date(inicio)) {
      return {
        success: false,
        error:
          "La finalización debe ser posterior al inicio.",
      };
    }

    finISO = fin;
  }

  if (imagenUrl) {
    try {
      const url = new URL(imagenUrl);

      if (!["https:", "http:"].includes(url.protocol)) {
        throw new Error("Protocolo inválido");
      }
    } catch {
      return {
        success: false,
        error: "Introduce una URL de imagen válida.",
      };
    }
  }

  const db = createAdminDb();

  const { error } = await db
    .from("eventos")
    .insert({
      titulo,
      descripcion: descripcion || null,
      lugar: lugar || null,
      fecha_inicio: inicio,
      fecha_fin: finISO,
      imagen_url: imagenUrl || null,
      estado,
    });

  if (error) {
    console.error(
      "[ADMIN EVENTOS] Error creando evento:",
      error.message
    );

    return {
      success: false,
      error: "No se pudo guardar el evento en Supabase.",
    };
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");

  return {
    success: true,
    error: null,
  };
}

export async function editarEvento(
  _prev: EventoActionState,
  formData: FormData
): Promise<EventoActionState> {
  const admin = await getAdminSession();
  if (!admin) return fail("Sesión expirada. Vuelve a iniciar sesión.");

  const id = leer(formData, "id");
  const titulo = leer(formData, "titulo");
  const descripcion = leer(formData, "descripcion");
  const lugar = leer(formData, "lugar");
  const imagenUrl = leer(formData, "imagen_url");
  const estado = leer(formData, "estado");
  const inicio = fechaOaxaca(leer(formData, "fecha_inicio"));
  const finRaw = leer(formData, "fecha_fin");
  const fin = finRaw ? fechaOaxaca(finRaw) : null;

  if (!UUID.test(id)) return fail("Identificador de evento inválido.");
  if (!titulo || titulo.length > 180) {
    return fail("El título debe tener entre 1 y 180 caracteres.");
  }
  if (descripcion.length > 10000 || lugar.length > 500) {
    return fail("La descripción o el lugar son demasiado largos.");
  }
  if (!ESTADOS.includes(estado as (typeof ESTADOS)[number])) {
    return fail("Selecciona un estado válido.");
  }
  if (!inicio) return fail("Fecha de inicio inválida.");
  if (finRaw && !fin) return fail("Fecha de finalización inválida.");
  if (fin && new Date(fin) <= new Date(inicio)) {
    return fail("La finalización debe ser posterior al inicio.");
  }
  if (imagenUrl) {
    if (imagenUrl.length > 2000) {
      return fail("La URL de la imagen es demasiado larga.");
    }

    try {
      const url = new URL(imagenUrl);
      if (url.protocol !== "https:" && url.protocol !== "http:") {
        return fail("La imagen debe usar una URL HTTP o HTTPS.");
      }
    } catch {
      return fail("La URL de la imagen no es válida.");
    }
  }

  const db = createAdminDb();
  const { data, error } = await db
    .from("eventos")
    .update({
      titulo,
      descripcion: descripcion || null,
      lugar: lugar || null,
      fecha_inicio: inicio,
      fecha_fin: fin,
      imagen_url: imagenUrl || null,
      estado,
    })
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    console.error("[ADMIN EVENTOS] Error al editar:", error?.message);
    return fail(
      "No se pudo actualizar el evento. Verifica que todavía exista."
    );
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  return { success: true, error: null };
}

export async function eliminarEvento(
  id: string
): Promise<EventoActionState> {
  const admin = await getAdminSession();
  if (!admin) return fail("Sesión expirada. Vuelve a iniciar sesión.");
  if (!UUID.test(id)) return fail("Identificador inválido.");

  const db = createAdminDb();
  const { data, error } = await db
    .from("eventos")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    console.error("[ADMIN EVENTOS] Error al eliminar:", error?.message);
    return fail(
      "No se pudo eliminar el evento. Es posible que ya no exista."
    );
  }

  revalidatePath("/admin/eventos");
  revalidatePath("/eventos");
  return { success: true, error: null };
}