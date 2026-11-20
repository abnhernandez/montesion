
import type { Metadata } from "next";

const SPOTIFY_URL =
  "https://open.spotify.com/show/2DMLI61ENfMaDSFZ6x9Fgb";

const SPOTIFY_EMBED =
  "https://open.spotify.com/embed/show/2DMLI61ENfMaDSFZ6x9Fgb?utm_source=generator&theme=0";

export const metadata: Metadata = {
  title: "Podcast",
  description:
    "Escucha el podcast de Iglesia Cristiana Monte Sion Atzompa, Oaxaca, disponible en Spotify.",
};

function SpotifyIcon({
  className = "h-6 w-6",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0Zm5.503 17.307a.75.75 0 0 1-1.031.25c-2.824-1.725-6.379-2.115-10.568-1.159a.75.75 0 1 1-.334-1.462c4.584-1.048 8.514-.596 11.684 1.34a.75.75 0 0 1 .249 1.031Zm1.468-3.266a.938.938 0 0 1-1.29.31c-3.232-1.986-8.158-2.56-11.98-1.4a.938.938 0 0 1-.545-1.794c4.367-1.326 9.795-.686 13.504 1.594a.938.938 0 0 1 .31 1.29Zm.126-3.4C15.22 8.338 8.824 8.126 5.122 9.25a1.125 1.125 0 1 1-.654-2.153c4.25-1.29 11.314-1.041 15.778 1.608a1.125 1.125 0 0 1-1.149 1.936Z" />
    </svg>
  );
}

export default function PodcastPage() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* HERO COMPACTO */}
      <section className="px-6 pb-16 pt-16 sm:px-10 md:pb-20 md:pt-20">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-end md:justify-between">

          <div className="max-w-[680px]">
            {/* Identidad */}
            <div className="flex items-center gap-3">
              <SpotifyIcon className="h-7 w-7 text-[#1ED760]" />

              <span className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-400">
                NUESTRO PODCAST
              </span>
            </div>

            <h1 className="mt-7 text-[clamp(2.5rem,5vw,4.5rem)] font-black uppercase leading-[0.98] tracking-[-0.065em]">
              ESCUCHA.
              <span className="block text-[#F5BE52]">
                REFLEXIONA.
              </span>
            </h1>

            <p className="mt-6 max-w-[570px] text-base leading-relaxed text-neutral-400 sm:text-lg">
              Un espacio para escuchar la Palabra de Dios,
              reflexionar y seguir creciendo en la fe.
              Disponible en Spotify.
            </p>
          </div>

          <a
            href="#reproductor"
            className="inline-flex min-h-12 w-fit shrink-0 items-center justify-center gap-3 rounded-full border border-white/25 px-7 py-3 text-sm font-semibold text-white transition-colors hover:border-[#F5BE52] hover:text-[#F5BE52]"
          >
            ESCUCHAR AHORA
            <span aria-hidden="true">↓</span>
          </a>

        </div>
      </section>

      {/* REPRODUCTOR — SECCIÓN CONSERVADA */}
      <section
        id="reproductor"
        className="rounded-t-[35px] bg-[#F8F7F4] px-6 py-20 text-black sm:px-10 md:py-28"
      >
        <div className="mx-auto max-w-[1200px]">

          <p className="text-xs font-bold uppercase tracking-[0.35em] text-neutral-500">
            ESCUCHA AHORA
          </p>

          <h2 className="mt-5 text-[clamp(3rem,6vw,6rem)] font-black uppercase leading-[0.95] tracking-[-0.065em]">
            DALE PLAY
            <span className="block text-[#DDA536]">
              A LA PALABRA.
            </span>
          </h2>

          <p className="mt-6 max-w-[650px] text-base leading-relaxed text-neutral-600">
            Explora nuestro podcast y reproduce los
            episodios disponibles directamente desde
            esta página.
          </p>

          {/* Reproductor oficial de Spotify */}
          <div className="mt-12 overflow-hidden rounded-[18px] bg-[#171717] shadow-xl">
            <iframe
              title="Podcast Monte Sion Atzompa en Spotify"
              src={SPOTIFY_EMBED}
              width="100%"
              height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="block w-full border-0"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
            <p className="text-sm text-neutral-500">
              También puedes escucharnos desde la aplicación de Spotify.
            </p>

            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold text-black underline decoration-[#F5BE52] decoration-2 underline-offset-8 transition hover:text-[#B58424]"
            >
              ABRIR EN SPOTIFY
              <span aria-hidden="true">↗</span>
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}