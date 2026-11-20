import { Suspense } from "react";
import { connection } from "next/server";

import { supabase } from "@/lib/supabase";

type ChurchService = {
  id: string;
  name: string;
  subtitle: string | null;
  day: string;
  time: string;
};

type ChurchLocation = {
  address: string;
  maps_embed_url: string;
  maps_url: string;
};

function formatTime(time: string) {
  const [hours, minutes] = time.split(":").map(Number);
  const hour12 = hours % 12 || 12;
  const period = hours >= 12 ? "P.M." : "A.M.";

  return `${String(hour12).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")} ${period}`;
}

async function ServicesContent() {
  await connection();

  const [servicesResult, locationResult] = await Promise.all([
    supabase
      .from("church_services")
      .select("id, name, subtitle, day, time")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),

    supabase
      .from("church_location")
      .select("address, maps_embed_url, maps_url")
      .eq("id", 1)
      .maybeSingle(),
  ]);

  if (servicesResult.error) {
    console.error("Error al obtener servicios:", servicesResult.error);
  }

  if (locationResult.error) {
    console.error("Error al obtener ubicación:", locationResult.error);
  }

  const services = (servicesResult.data ?? []) as ChurchService[];
  const location = locationResult.data as ChurchLocation | null;

  return (
    <section className="w-full bg-black">
      {/* Encabezado */}
      <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-20 sm:px-10 lg:pb-20 lg:pt-24">
        <p className="mb-1 text-xs font-medium uppercase tracking-[0.45em] text-white">
          HORARIOS
        </p>

        <h2 className="text-[clamp(3.5rem,10vw,8.5rem)] font-black leading-[0.9] tracking-[-0.07em] text-[#F5BE52]">
          SERVICIOS
        </h2>
      </div>

      {/* Contenido blanco */}
      <div className="rounded-b-[12px] bg-[#FAFAFA] text-black">
        <div className="mx-auto grid max-w-[1200px] grid-cols-1 items-start gap-12 px-6 py-12 sm:px-10 lg:grid-cols-[1.65fr_1fr] lg:gap-12 lg:py-16">

          {/* Columna de horarios */}
          <div className="flex flex-col gap-4">
            {services.length === 0 && (
              <p className="text-sm text-neutral-600">
                Los horarios estarán disponibles próximamente.
              </p>
            )}

            {services.map((service) => (
              <article
                key={service.id}
                className="flex min-h-[120px] flex-col justify-between gap-4 bg-black px-7 py-6 text-white sm:flex-row sm:items-center sm:px-9"
              >
                <div className="min-w-0">
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
                    {service.subtitle || service.day}
                  </p>

                  <h3 className="text-[clamp(1.8rem,3.5vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.055em] text-[#F5BE52]">
                    {service.name}
                  </h3>
                </div>

                <span className="shrink-0 text-xl font-black italic text-neutral-300 sm:text-2xl">
                  {formatTime(service.time)}
                </span>
              </article>
            ))}
          </div>

          {/* Columna de ubicación */}
          {location && (
            <div className="flex flex-col gap-4">
              <div className="h-[300px] w-full overflow-hidden rounded-xl bg-neutral-200">
                <iframe
                  src={location.maps_embed_url}
                  title="Ubicación de Monte Sion Atzompa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <a
                href={location.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[48px] items-center justify-center rounded-md bg-[#F5BE52] px-6 py-3 text-center text-base font-semibold text-black transition-colors hover:bg-[#E5AA3C]"
              >
                Ver ubicación
              </a>

              <p className="text-sm font-semibold uppercase leading-relaxed tracking-[0.12em] text-neutral-800">
                {location.address}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default function ServicesSection() {
  return (
    <Suspense fallback={null}>
      <ServicesContent />
    </Suspense>
  );
}