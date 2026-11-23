
"use client";

import { useMemo, useState } from "react";
import NuevoEventoModal from "@/components/NuevoEventoModal";
import EditarEventoModal from "@/components/editarEvento";

import {
  CalendarDays,
  Search,
  Plus,
  MapPin,
  Clock3,
  CalendarClock,
  CheckCircle2,
  FilePenLine,
  Ban,
  AlertCircle,
  SlidersHorizontal,
  ImageIcon,
} from "lucide-react";

import type { EventoAdmin } from "@/app/admin/eventos/page";

type Props = {
  eventos: EventoAdmin[];
  error: string | null;
};

const TIME_ZONE = "America/Mexico_City";

// ==========================================
// FORMATO DE FECHAS Y HORARIOS
// ==========================================

function formatearFecha(
  fecha: string | null
): string {
  if (!fecha) return "Sin fecha";

  const parsed = new Date(fecha);

  if (Number.isNaN(parsed.getTime())) {
    return "Fecha no válida";
  }

  return new Intl.DateTimeFormat("es-MX", {
    timeZone: TIME_ZONE,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(parsed);
}

function formatearHora(
  fecha: string | null
): string {
  if (!fecha) return "Sin hora";

  const parsed = new Date(fecha);

  if (Number.isNaN(parsed.getTime())) {
    return "Hora no válida";
  }

  return new Intl.DateTimeFormat("es-MX", {
    timeZone: TIME_ZONE,
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(parsed);
}

// ==========================================
// CONFIGURACIÓN DE ESTADOS
// ==========================================

function estadoConfig(estado: string) {
  const normalized = estado.toLowerCase();

  if (
    normalized === "publicado" ||
    normalized === "activo" ||
    normalized === "programado"
  ) {
    return {
      label: estado,
      classes:
        "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    };
  }

  if (normalized === "borrador") {
    return {
      label: estado,
      classes:
        "border-amber-500/20 bg-amber-500/10 text-amber-400",
    };
  }

  if (normalized === "cancelado") {
    return {
      label: estado,
      classes:
        "border-red-500/20 bg-red-500/10 text-red-400",
    };
  }

  return {
    label: estado,
    classes:
      "border-white/10 bg-white/5 text-neutral-300",
  };
}

// ==========================================
// DASHBOARD DE EVENTOS
// ==========================================

export default function EventosDashboard({
  eventos,
  error,
}: Props) {
  const [busqueda, setBusqueda] = useState("");

  const [filtro, setFiltro] = useState("todos");

  const [nuevoEventoOpen, setNuevoEventoOpen] = useState(false);
  const [eventoSeleccionado, setEventoSeleccionado] =
    useState<EventoAdmin | null>(null);

  // Estados encontrados realmente en Supabase
  const estadosDisponibles = useMemo(() => {
    return Array.from(
      new Set(
        eventos
          .map((evento) => evento.estado)
          .filter(Boolean)
      )
    ).sort((a, b) => a.localeCompare(b, "es"));
  }, [eventos]);

  // Estadísticas
  const estadisticas = useMemo(() => {
    const publicados = eventos.filter((evento) =>
      ["publicado", "activo", "programado"].includes(
        evento.estado.toLowerCase()
      )
    ).length;

    const borradores = eventos.filter(
      (evento) =>
        evento.estado.toLowerCase() === "borrador"
    ).length;

    const cancelados = eventos.filter(
      (evento) =>
        evento.estado.toLowerCase() === "cancelado"
    ).length;

    return {
      total: eventos.length,
      publicados,
      borradores,
      cancelados,
    };
  }, [eventos]);

  // Búsqueda y filtros
  const eventosFiltrados = useMemo(() => {
    const termino = busqueda.trim().toLowerCase();

    return eventos.filter((evento) => {
      const coincideEstado =
        filtro === "todos" ||
        evento.estado === filtro;

      const coincideBusqueda =
        !termino ||
        evento.titulo
          .toLowerCase()
          .includes(termino) ||
        (evento.descripcion ?? "")
          .toLowerCase()
          .includes(termino) ||
        (evento.lugar ?? "")
          .toLowerCase()
          .includes(termino);

      return coincideEstado && coincideBusqueda;
    });
  }, [eventos, busqueda, filtro]);

  const cards = [
    {
      label: "Total de eventos",
      value: estadisticas.total,
      icon: CalendarDays,
    },
    {
      label: "Publicados / activos",
      value: estadisticas.publicados,
      icon: CheckCircle2,
    },
    {
      label: "Borradores",
      value: estadisticas.borradores,
      icon: FilePenLine,
    },
    {
      label: "Cancelados",
      value: estadisticas.cancelados,
      icon: Ban,
    },
  ];

  return (
    <>
    <div className="space-y-9">

      {/* ENCABEZADO */}
      <section className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#F5BE52]">
            <CalendarDays size={16} />
            Administración de eventos
          </div>

          <h1 className="text-3xl font-black uppercase tracking-tight text-white md:text-5xl">
            EVENTOS
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-400">
            Consulta y organiza los eventos de
            Monte Sion Atzompa desde un solo lugar.
          </p>
        </div>

<button
  type="button"
  onClick={() => setNuevoEventoOpen(true)}
  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#F5BE52] px-6 text-sm font-black text-black transition hover:bg-[#FFD277]"
>
  <Plus size={18} />
  Nuevo evento
</button>
      </section>

      {/* ESTADÍSTICAS */}
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-white/10 bg-[#151515] p-6"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl border border-[#F5BE52]/15 bg-[#F5BE52]/10">
                <Icon
                  size={20}
                  className="text-[#F5BE52]"
                />
              </div>

              <p className="text-3xl font-black text-white">
                {card.value}
              </p>

              <p className="mt-2 text-xs font-medium text-neutral-500">
                {card.label}
              </p>
            </div>
          );
        })}
      </section>

      {/* ERROR */}
      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300"
        >
          <AlertCircle
            size={19}
            className="mt-0.5 shrink-0"
          />
          {error}
        </div>
      )}

      {/* LISTADO */}
      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">

        {/* HERRAMIENTAS */}
        <div className="border-b border-white/10 p-5 md:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-bold text-white">
                Listado de eventos
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                {eventosFiltrados.length} resultados
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />

                <input
                  type="search"
                  value={busqueda}
                  onChange={(event) =>
                    setBusqueda(event.target.value)
                  }
                  placeholder="Buscar evento..."
                  aria-label="Buscar eventos"
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#1B1B1B] pl-11 pr-4 text-sm text-white outline-none placeholder:text-neutral-600 focus:border-[#F5BE52]/50 sm:w-64"
                />
              </div>

              <div className="relative">
                <SlidersHorizontal
                  size={16}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
                />

                <select
                  value={filtro}
                  onChange={(event) =>
                    setFiltro(event.target.value)
                  }
                  aria-label="Filtrar por estado"
                  className="h-11 w-full appearance-none rounded-xl border border-white/10 bg-[#1B1B1B] pl-11 pr-8 text-sm text-white outline-none focus:border-[#F5BE52]/50 sm:w-44"
                >
                  <option value="todos">
                    Todos los estados
                  </option>

                  {estadosDisponibles.map((estado) => (
                    <option
                      key={estado}
                      value={estado}
                    >
                      {estado}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* RESULTADOS */}
        {eventosFiltrados.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5">
              <CalendarClock
                size={29}
                className="text-[#F5BE52]"
              />
            </div>

            <h3 className="text-lg font-bold text-white">
              No se encontraron eventos
            </h3>

            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-500">
              {error
                ? "No fue posible recuperar los eventos."
                : eventos.length === 0
                  ? "Todavía no hay eventos registrados."
                  : "Prueba con otra búsqueda o cambia el filtro."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-white/10">
            {eventosFiltrados.map((evento) => {
              const status = estadoConfig(
                evento.estado
              );

              return (
                <article
                  key={evento.id}
                  className="p-5 transition hover:bg-white/[0.025] md:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">

                    {/* IMAGEN */}
                    <div className="flex h-28 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#1B1B1B] sm:w-40">
                      {evento.imagen_url ? (
                        // Se utiliza img para permitir
                        // URLs externas de Supabase
                        // sin configurar remotePatterns.
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={evento.imagen_url}
                          alt={evento.titulo}
                          loading="lazy"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <ImageIcon
                          size={28}
                          className="text-neutral-600"
                        />
                      )}
                    </div>

                    {/* INFORMACIÓN */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${status.classes}`}
                        >
                          {status.label}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white">
                        {evento.titulo}
                      </h3>

                      {evento.descripcion && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
                          {evento.descripcion}
                        </p>
                      )}

                      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs text-neutral-400">
                        <span className="inline-flex items-center gap-2">
                          <CalendarDays
                            size={15}
                            className="text-[#F5BE52]"
                          />
                          {formatearFecha(
                            evento.fecha_inicio
                          )}
                        </span>

                        <span className="inline-flex items-center gap-2">
                          <Clock3
                            size={15}
                            className="text-[#F5BE52]"
                          />
                          {formatearHora(
                            evento.fecha_inicio
                          )}
                        </span>

                        <span className="inline-flex items-center gap-2">
                          <MapPin
                            size={15}
                            className="text-[#F5BE52]"
                          />
                          {evento.lugar ??
                            "Sin ubicación"}
                        </span>
                      </div>

                      {evento.fecha_fin && (
                        <p className="mt-3 text-xs text-neutral-600">
                          Finaliza:{" "}
                          {formatearFecha(
                            evento.fecha_fin
                          )}{" "}
                          ·{" "}
                          {formatearHora(
                            evento.fecha_fin
                          )}
                        </p>
                      )}
                    </div>

                    {/* ACCIONES */}
                    <div className="shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEventoSeleccionado(evento);
                        }}
                        className="inline-flex rounded-lg border border-[#F5BE52]/30 px-4 py-2 text-xs font-bold text-[#F5BE52] transition hover:bg-[#F5BE52]/10"
                      >
                        Editar evento
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <p className="text-center text-xs text-neutral-600">
        Monte Sion Atzompa · Sistema administrativo
      </p>
    </div>
    <NuevoEventoModal
      open={nuevoEventoOpen}
      onClose={() => setNuevoEventoOpen(false)}
    />
    {eventoSeleccionado && (
      <EditarEventoModal
        onClose={() => {
          setEventoSeleccionado(null);
        }}
        evento={eventoSeleccionado}
      />
    )}
    </>
  );
}