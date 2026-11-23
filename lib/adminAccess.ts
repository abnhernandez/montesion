export type AdminAccessFields = {
  activo: boolean;
  estado_cuenta: string;
  suspendido_hasta: string | null;
};

/** Bloqueado siempre prevalece sobre cualquier suspensión previa. */
export function puedeAccederAdmin(
  usuario: AdminAccessFields,
  ahora: number = Date.now()
): boolean {
  if (!usuario.activo) return false;
  if (usuario.estado_cuenta === "bloqueado") return false;
  if (usuario.estado_cuenta === "activo") return true;
  if (usuario.estado_cuenta !== "suspendido") return false;
  if (!usuario.suspendido_hasta) return false; // Suspensión indefinida
  const hasta = Date.parse(usuario.suspendido_hasta);
  return Number.isFinite(hasta) && hasta <= ahora;
}