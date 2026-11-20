import type { Metadata } from "next";
import { connection } from "next/server";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Eventos | Monte Sion Atzompa",
  description:
    "Conoce los próximos eventos y reuniones de Iglesia Cristiana Monte Sion en Santa María Atzompa, Oaxaca.",
};

export const instant = false;

const TIME_ZONE = "America/Mexico_City";

type Evento = {
  id: string;
  titulo: string;
  descripcion: string | null;
  lugar: string | null;
  fecha_inicio: string;
  fecha_fin: string | null;
  imagen_url: string | null;
};

function formatearFecha(fecha: string) {
  return new Intl.DateTimeFormat("es-MX", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZone: TIME_ZONE,
  }).format(new Date(fecha));
}

// PÁGINA PRINCIPAL DE EVENTOS
export default async function EventosPage() {
  await connection();

  const { data, error } = await supabase
    .from("eventos")
    .select(
      "id, titulo, descripcion, lugar, fecha_inicio, fecha_fin, imagen_url"
    )
    .eq("estado", "publicado")
    .gte("fecha_inicio", new Date().toISOString())
    .order("fecha_inicio", { ascending: true });

  if (error) {
    console.error("Error al obtener eventos:", error);
  }

  const eventos: Evento[] = data ?? [];

  return (
    <main className="min-h-screen bg-[#F8F7F4] text-[#111111]">

      {/* HERO */}
      <section className="bg-black px-5 pb-16 pt-20 text-white md:px-8 md:pt-28">
        <div className="mx-auto max-w-[1600px]">

          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#F5BE52]">
            AGENDA
          </p>

          <h1 className="mt-5 max-w-[1100px] text-5xl font-light leading-[1.05] tracking-[-0.055em] sm:text-7xl lg:text-[90px]">
            Lo que está pasando.
          </h1>

        </div>
      </section>

      {/* PRÓXIMOS EVENTOS */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-8 md:py-28">

        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500">
              MONTE SION ATZOMPA
            </p>

            <h2 className="text-4xl font-semibold tracking-[-0.055em] sm:text-5xl">
              Próximos eventos
            </h2>
          </div>

          <p className="max-w-[350px] text-sm leading-relaxed text-neutral-500">
            Descubre nuestras próximas actividades,
            reuniones y momentos especiales como congregación.
          </p>

        </div>

        {/* Tarjetas */}
        {eventos.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {eventos.map((evento) => (
              <article
                key={evento.id}
                className="group overflow-hidden bg-white"
              >
                {/* Imagen */}
                <div className="relative flex min-h-[220px] items-end overflow-hidden bg-neutral-900 p-6 text-white">

                  {evento.imagen_url && (
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      style={{
                        backgroundImage: `url("${evento.imagen_url}")`,
                      }}
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <span className="relative z-10 text-sm font-semibold uppercase tracking-widest text-[#F5BE52]">
                    {formatearFecha(evento.fecha_inicio)}
                  </span>
                </div>

                {/* Información */}
                <div className="p-7">
                  <h3 className="text-2xl font-semibold tracking-tight">
                    {evento.titulo}
                  </h3>

                  {evento.descripcion && (
                    <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                      {evento.descripcion}
                    </p>
                  )}

                  {evento.lugar && (
                    <p className="mt-6 border-t border-black/10 pt-5 text-xs font-semibold uppercase tracking-widest">
                      {evento.lugar}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex min-h-[250px] flex-col items-center justify-center border border-black/10 bg-white/50 px-6 text-center">
            <h3 className="text-2xl font-semibold tracking-tight">
              Próximamente
            </h3>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
              Estamos preparando nuevas actividades.
              Los próximos eventos aparecerán aquí.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}