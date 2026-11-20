
import Image from "next/image";
import { cacheLife } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

const logoUrl = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/branding/logo.png`
  : "";

const redesSociales = [
  {
    nombre: "Instagram",
    href: "",
    color: "bg-gradient-to-tr from-[#FEDA75] via-[#D62976] to-[#4F5BD5]",
  },
  {
    nombre: "Facebook",
    href: "",
    color: "bg-[#1877F2]",
  },
  {
    nombre: "YouTube",
    href: "",
    color: "bg-[#FF0000]",
  },
];

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.19 2.23.19v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.99h-2.34v6.99A10 10 0 0 0 22 12Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

async function getCopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}

export default async function Footer() {
  const year = await getCopyrightYear();

  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto w-full max-w-[1200px] px-6 pt-12 pb-5 sm:px-10">

        {/* LOGO */}
        <div className="flex justify-center">
          {logoUrl && (
            <Image
              src={logoUrl}
              alt="Iglesia Cristiana Monte Sion Atzompa"
              width={230}
              height={90}
              unoptimized
              className="h-auto max-h-[75px] w-auto max-w-[230px] object-contain"
            />
          )}
        </div>

        {/* REDES SOCIALES */}
        <div className="mt-7 flex items-center justify-center gap-3">

          {redesSociales.map((red) => {
            const icono =
              red.nombre === "Instagram" ? (
                <InstagramIcon />
              ) : red.nombre === "Facebook" ? (
                <FacebookIcon />
              ) : (
                <YoutubeIcon />
              );

            return red.href ? (
              <a
                key={red.nombre}
                href={red.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar ${red.nombre} de Monte Sion`}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110 ${red.color}`}
              >
                {icono}
              </a>
            ) : (
              <span
                key={red.nombre}
                title={`${red.nombre}: enlace pendiente`}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-white opacity-70 ${red.color}`}
              >
                {icono}
              </span>
            );
          })}

        </div>

        {/* DIVISOR */}
        <div className="mt-9 h-px w-full bg-white/15" />

        {/* COPYRIGHT */}
        <p className="pt-5 text-center text-sm font-normal text-neutral-300">
          © {year} Iglesia Cristiana Monte Sion Atzompa
        </p>

      </div>
    </footer>
  );
}