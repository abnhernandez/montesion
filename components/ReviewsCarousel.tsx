
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";

type Imagen = {
  nombre: string;
  url: string;
};

type Resena = {
  id: string;
  autor: string;
  comentario: string | null;
  calificacion: number | null;
  fecha_publicacion: string | null;
  fecha_relativa: string | null;
  fuente: string;
  url_fuente: string | null;
  avatar_url: string | null;
};

type Props = {
  imagenes: Imagen[];
  resenas: Resena[];
};

const INTERVALO_IMAGENES = 4000;
const INTERVALO_RESENAS = 6000;

function Estrellas({ cantidad }: { cantidad: number }) {
  const estrellas = Math.max(0, Math.min(5, cantidad));

  return (
    <span
      className="text-lg tracking-[0.08em] text-[#F5BE52]"
      aria-label={`${estrellas} de 5 estrellas`}
    >
      {"★".repeat(estrellas)}
      <span className="text-neutral-300">
        {"★".repeat(5 - estrellas)}
      </span>
    </span>
  );
}

function formatearFecha(fecha: string | null) {
  if (!fecha) return null;

  return new Intl.DateTimeFormat("es-MX", {
    month: "long",
    year: "numeric",
    timeZone: "America/Mexico_City",
  }).format(new Date(fecha));
}

export default function ReviewsCarousel({
  imagenes,
  resenas,
}: Props) {
  const [indiceImagen, setIndiceImagen] = useState(0);
  const [indiceResena, setIndiceResena] = useState(0);
  const [reducirMovimiento, setReducirMovimiento] =
    useState(false);

  // Respetar la preferencia de movimiento reducido
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const actualizar = () => {
      setReducirMovimiento(media.matches);
    };

    actualizar();

    media.addEventListener("change", actualizar);

    return () => {
      media.removeEventListener("change", actualizar);
    };
  }, []);

  // Avance automático de fotografías
  useEffect(() => {
    if (imagenes.length <= 1 || reducirMovimiento) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setIndiceImagen(
        (actual) => (actual + 1) % imagenes.length
      );
    }, INTERVALO_IMAGENES);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [imagenes.length, reducirMovimiento]);

  // Avance automático de reseñas
  useEffect(() => {
    if (resenas.length <= 1 || reducirMovimiento) {
      return;
    }

    const intervalo = window.setInterval(() => {
      setIndiceResena(
        (actual) => (actual + 1) % resenas.length
      );
    }, INTERVALO_RESENAS);

    return () => {
      window.clearInterval(intervalo);
    };
  }, [resenas.length, reducirMovimiento]);

  const imagenActual =
    imagenes[indiceImagen % Math.max(imagenes.length, 1)];

  const imagenSiguiente =
    imagenes.length > 1
      ? imagenes[(indiceImagen + 1) % imagenes.length]
      : null;

  const resenaActual =
    resenas[indiceResena % Math.max(resenas.length, 1)];

  return (
    <section
      id="resenas"
      className="w-full overflow-hidden bg-[#F8F8F8] py-20 text-[#171717] md:py-28 lg:py-36"
    >
      <div className="mx-auto grid w-full max-w-[1350px] grid-cols-1 gap-12 px-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12 lg:gap-20 lg:px-10">

        {/* CARRUSEL DE FOTOGRAFÍAS */}
        <div className="relative flex min-w-0 items-start gap-6 lg:gap-10">

          {/* Indicadores verticales */}
          {imagenes.length > 1 && (
            <div className="flex shrink-0 flex-col items-center gap-3 pt-7">
              {imagenes.map((imagen, index) => (
                <button
                  key={imagen.nombre}
                  type="button"
                  onClick={() => setIndiceImagen(index)}
                  aria-label={`Ver imagen ${index + 1}`}
                  aria-current={
                    indiceImagen === index
                      ? "true"
                      : undefined
                  }
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    indiceImagen === index
                      ? "scale-110 bg-black"
                      : "bg-neutral-400 hover:bg-neutral-600"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Fotografías */}
          <div className="min-w-0 flex-1">
            {imagenActual ? (
              <div className="flex flex-col gap-3">

                {/* Fotografía principal */}
                <div className="relative w-full overflow-hidden bg-neutral-200">
                  <div className="aspect-[1.5/1] w-full">
                    <img
                      key={imagenActual.url}
                      src={imagenActual.url}
                      alt={`Fotografía de Monte Sion ${indiceImagen + 1}`}
                      className={`h-full w-full object-cover grayscale ${
                        reducirMovimiento
                          ? ""
                          : "animate-[fadeIn_0.7s_ease-in-out]"
                      }`}
                    />
                  </div>
                </div>

                {/* Fotografía siguiente */}
                {imagenSiguiente && (
                  <div className="relative w-full overflow-hidden bg-neutral-200">
                    <div className="aspect-[1.5/1] w-full">
                      <img
                        key={imagenSiguiente.url}
                        src={imagenSiguiente.url}
                        alt="Siguiente fotografía de Monte Sion"
                        className={`h-full w-full object-cover grayscale ${
                          reducirMovimiento
                            ? ""
                            : "animate-[fadeIn_0.7s_ease-in-out]"
                        }`}
                      />
                    </div>
                  </div>
                )}

              </div>
            ) : (
              <div className="flex aspect-[1.5/1] items-center justify-center bg-neutral-200 p-6 text-center text-sm text-neutral-500">
                Las fotografías aparecerán aquí.
              </div>
            )}
          </div>
        </div>

        {/* RESEÑAS */}
        <div className="min-w-0 pt-0 md:pt-2">

          <h2 className="text-[clamp(2.8rem,5.5vw,5.5rem)] font-black uppercase leading-[0.95] tracking-[-0.075em] text-[#F5BE52]">
            TUS RESEÑAS
          </h2>

          <div className="mt-10 md:mt-12">
            {resenaActual ? (
              <article
                key={resenaActual.id}
                className={`rounded-[22px] bg-[#F0F0F2] p-5 sm:p-7 ${
                  reducirMovimiento
                    ? ""
                    : "animate-[fadeIn_0.7s_ease-in-out]"
                }`}
              >
                {/* Autor */}
                <div className="flex items-center gap-3">
                  {resenaActual.avatar_url ? (
                    <img
                      src={resenaActual.avatar_url}
                      alt=""
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F5BE52] font-bold text-black">
                      {resenaActual.autor
                        .charAt(0)
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="min-w-0">
                    <p className="font-medium text-neutral-800">
                      {resenaActual.autor}
                    </p>

                    <p className="text-xs text-neutral-500">
                      {resenaActual.fuente}
                    </p>
                  </div>
                </div>

                {/* Calificación y fecha */}
                {(resenaActual.calificacion !== null ||
                  resenaActual.fecha_relativa ||
                  resenaActual.fecha_publicacion) && (
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    {resenaActual.calificacion !== null && (
                      <Estrellas
                        cantidad={resenaActual.calificacion}
                      />
                    )}

                    {(resenaActual.fecha_relativa ||
                      resenaActual.fecha_publicacion) && (
                      <span className="text-xs text-neutral-500">
                        {resenaActual.fecha_relativa ??
                          formatearFecha(
                            resenaActual.fecha_publicacion
                          )}
                      </span>
                    )}
                  </div>
                )}

                {/* Comentario */}
                {resenaActual.comentario && (
                  <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-neutral-600 sm:text-base">
                    {resenaActual.comentario}
                  </p>
                )}

                {/* Fuente original */}
                {resenaActual.url_fuente && (
                  <a
                    href={resenaActual.url_fuente}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block text-xs font-semibold text-neutral-600 underline underline-offset-4 transition hover:text-black"
                  >
                    Ver reseña original
                  </a>
                )}
              </article>
            ) : (
              <div className="rounded-[22px] bg-[#F0F0F2] p-8">
                <p className="text-lg font-medium">
                  Tu opinión es importante.
                </p>

                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  Las reseñas de nuestra comunidad aparecerán aquí.
                </p>
              </div>
            )}

            {/* Contador sin flechas */}
            {resenas.length > 1 && (
              <div className="mt-7 flex items-center justify-end">
                <span className="text-xs font-medium tracking-widest text-neutral-400">
                  {String(indiceResena + 1).padStart(2, "0")}
                  {" / "}
                  {String(resenas.length).padStart(2, "0")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}