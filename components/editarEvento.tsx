"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, Loader2, Save, Trash2, X } from "lucide-react";
import type { EventoAdmin } from "@/app/admin/eventos/page";
import {
  editarEvento,
  eliminarEvento,
  type EventoActionState,
} from "@/lib/eventosAdmin";

const initialState: EventoActionState = { success: false, error: null };
const TIME_ZONE = "America/Mexico_City";

function toLocalInput(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: TIME_ZONE, year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).formatToParts(date);
  const p = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

export default function EditarEventoModal({ evento, onClose }: {
  evento: EventoAdmin;
  onClose: () => void;
}) {
  const router = useRouter();
  const [state, action, pending] = useActionState(editarEvento, initialState);
  const [deleteState, setDeleteState] = useState<string | null>(null);
  const [isDeleting, startDelete] = useTransition();
  const [inicio, setInicio] = useState(() => toLocalInput(evento.fecha_inicio));

  useEffect(() => {
    if (state.success) {
      router.refresh();
      onClose();
    }
  }, [state.success, router, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && !pending) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [pending, onClose]);

  function handleDelete() {
    if (
      !window.confirm(
        `¿Eliminar "${evento.titulo}"? Esta acción no se puede deshacer.`
      )
    ) {
      return;
    }

    startDelete(async () => {
      setDeleteState(null);
      const result = await eliminarEvento(evento.id);

      if (!result.success) {
        setDeleteState(result.error);
        return;
      }

      router.refresh();
      onClose();
    });
  }

  const busy = pending || isDeleting;
  const input = "mt-2 w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 py-3 text-sm text-white outline-none focus:border-[#F5BE52]/60";
  const label = "block text-xs font-semibold uppercase tracking-wide text-neutral-400";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div role="dialog" aria-modal="true" aria-labelledby="editar-evento-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#111111] px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5BE52]">MONTE SION · ADMINISTRACIÓN</p>
            <h2 id="editar-evento-title" className="mt-2 text-xl font-black text-white">Editar evento</h2>
          </div>
          <button type="button" aria-label="Cerrar" disabled={busy} onClick={onClose} className="rounded-lg p-2 text-neutral-400 hover:bg-white/10"><X size={21}/></button>
        </div>
        <form action={action} className="space-y-5 p-6">
          <input type="hidden" name="id" value={evento.id}/>
          <div><label htmlFor="edit-titulo" className={label}>Título *</label><input id="edit-titulo" name="titulo" required maxLength={180} defaultValue={evento.titulo} className={input}/></div>
          <div><label htmlFor="edit-descripcion" className={label}>Descripción</label><textarea id="edit-descripcion" name="descripcion" rows={4} maxLength={10000} defaultValue={evento.descripcion ?? ""} className={input}/></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="edit-inicio" className={label}>Inicio (hora de Oaxaca) *</label><input id="edit-inicio" type="datetime-local" name="fecha_inicio" required value={inicio} onChange={e => setInicio(e.target.value)} className={input}/></div>
            <div><label htmlFor="edit-fin" className={label}>Finalización</label><input id="edit-fin" type="datetime-local" name="fecha_fin" key={evento.id} defaultValue={toLocalInput(evento.fecha_fin)} min={inicio || undefined} className={input}/></div>
          </div>
          <div><label htmlFor="edit-lugar" className={label}>Lugar</label><input id="edit-lugar" name="lugar" maxLength={500} defaultValue={evento.lugar ?? ""} className={input}/></div>
          <div><label htmlFor="edit-imagen" className={label}>URL de imagen</label><input id="edit-imagen" type="url" name="imagen_url" maxLength={2000} defaultValue={evento.imagen_url ?? ""} className={input}/></div>
          <div><label htmlFor="edit-estado" className={label}>Estado</label><select id="edit-estado" name="estado" defaultValue={evento.estado} className={input}>
            {!(["publicado", "borrador", "cancelado"].includes(evento.estado)) && <option value={evento.estado} disabled>{evento.estado} (estado anterior)</option>}
            <option value="publicado">Publicado</option><option value="borrador">Borrador</option><option value="cancelado">Cancelado</option>
          </select></div>
          {(state.error || deleteState) && <p role="alert" className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"><AlertCircle size={18}/>{state.error || deleteState}</p>}
          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-5 sm:flex-row sm:justify-end">
            <button type="button" onClick={handleDelete} disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-4 py-3 text-sm font-semibold text-red-300 transition hover:bg-red-500/10 disabled:opacity-60"><Trash2 size={17}/>{isDeleting ? "Eliminando..." : "Eliminar"}</button>
            <button type="button" onClick={onClose} disabled={busy} className="rounded-xl border border-white/10 px-6 py-3 text-sm text-neutral-300">Cancelar</button>
            <button type="submit" disabled={busy} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5BE52] px-6 py-3 text-sm font-bold text-black disabled:opacity-60">
              {pending ? <Loader2 size={18} className="animate-spin"/> : <Save size={18}/>} {pending ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
