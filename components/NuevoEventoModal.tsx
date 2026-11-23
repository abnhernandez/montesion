
"use client";

import {
  useActionState,
  useEffect,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  X,
  CalendarDays,
  MapPin,
  ImageIcon,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  crearEvento,
  type EventoActionState,
} from "@/lib/eventosAdmin";

type Props = {
  open: boolean;
  onClose: () => void;
};

const initialState: EventoActionState = {
  success: false,
  error: null,
};

export default function NuevoEventoModal({
  open,
  onClose,
}: Props) {
  const router = useRouter();

  const [state, formAction, pending] =
    useActionState(crearEvento, initialState);

  const [fechaInicio, setFechaInicio] =
    useState("");

  const [fechaFin, setFechaFin] =
    useState("");

  useEffect(() => {
    if (state.success) {
      router.refresh();
      onClose();
    }
  }, [state.success, router, onClose]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && !pending) {
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener(
        "keydown",
        onKeyDown
      );
    };
  }, [open, pending, onClose]);

  if (!open) return null;

  const inputClass =
    "mt-2 h-12 w-full rounded-xl border border-white/10 bg-[#1A1A1A] px-4 text-sm text-white outline-none transition focus:border-[#F5BE52]/60";

  const labelClass =
    "block text-xs font-semibold uppercase tracking-wide text-neutral-400";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="nuevo-evento-title"
        className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111111] shadow-2xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#111111] px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#F5BE52]">
              MONTE SION · ADMINISTRACIÓN
            </p>

            <h2
              id="nuevo-evento-title"
              className="mt-2 text-xl font-black text-white"
            >
              Nuevo evento
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={pending}
            aria-label="Cerrar formulario"
            className="rounded-lg p-2 text-neutral-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={21} />
          </button>
        </div>

        <form action={formAction} className="p-6">
          <div className="space-y-6">
            <div>
              <label
                htmlFor="evento-titulo"
                className={labelClass}
              >
                Título del evento *
              </label>

              <input
                id="evento-titulo"
                name="titulo"
                required
                maxLength={180}
                placeholder="Ej. Congreso de Jóvenes 2027"
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="evento-descripcion"
                className={labelClass}
              >
                Descripción
              </label>

              <textarea
                id="evento-descripcion"
                name="descripcion"
                rows={4}
                placeholder="Describe el evento..."
                className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#1A1A1A] p-4 text-sm text-white outline-none focus:border-[#F5BE52]/60"
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="evento-inicio"
                  className={labelClass}
                >
                  Fecha y hora de inicio *
                </label>

                <input
                  id="evento-inicio"
                  name="fecha_inicio"
                  type="datetime-local"
                  required
                  value={fechaInicio}
                  onChange={(event) =>
                    setFechaInicio(event.target.value)
                  }
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="evento-fin"
                  className={labelClass}
                >
                  Fecha y hora de finalización
                </label>

                <input
                  id="evento-fin"
                  name="fecha_fin"
                  type="datetime-local"
                  min={fechaInicio || undefined}
                  value={fechaFin}
                  onChange={(event) =>
                    setFechaFin(event.target.value)
                  }
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="evento-lugar"
                className={labelClass}
              >
                Lugar del evento
              </label>

              <div className="relative">
                <MapPin
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />

                <input
                  id="evento-lugar"
                  name="lugar"
                  placeholder="Ej. Monte Sion Atzompa"
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="evento-imagen"
                className={labelClass}
              >
                URL de imagen
              </label>

              <div className="relative">
                <ImageIcon
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />

                <input
                  id="evento-imagen"
                  name="imagen_url"
                  type="url"
                  placeholder="https://..."
                  className={`${inputClass} pl-11`}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="evento-estado"
                className={labelClass}
              >
                Estado del evento
              </label>

              <select
                id="evento-estado"
                name="estado"
                defaultValue="publicado"
                className={inputClass}
              >
                <option value="publicado">
                  Publicado
                </option>
                <option value="borrador">
                  Borrador
                </option>
                <option value="cancelado">
                  Cancelado
                </option>
              </select>
            </div>

            {state.error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
              >
                <AlertCircle
                  size={19}
                  className="shrink-0"
                />
                {state.error}
              </div>
            )}

            {state.success && (
              <div className="flex items-center gap-2 text-sm text-emerald-400">
                <CheckCircle2 size={18} />
                Evento guardado correctamente.
              </div>
            )}
          </div>

          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={pending}
              className="h-12 rounded-xl border border-white/10 px-6 text-sm font-semibold text-neutral-300 transition hover:bg-white/5"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={pending}
              className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#F5BE52] px-7 text-sm font-black text-black transition hover:bg-[#FFD277] disabled:opacity-60"
            >
              {pending ? (
                <>
                  <Loader2
                    size={18}
                    className="animate-spin"
                  />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Guardar evento
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}