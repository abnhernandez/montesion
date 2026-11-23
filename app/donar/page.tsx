
import Link from "next/link";

export const metadata = {
  title: "Donar | Monte Sion",
  description:
    "Tu generosidad nos ayuda a continuar compartiendo el amor de Jesús.",
};

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

export default function DonarPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col items-center px-6 pb-16 pt-16 text-center sm:pt-20">

        {/* CONTENIDO CENTRAL */}
        <section className="flex w-full max-w-xl flex-col items-center">

          <h1 className="text-[43px] font-semibold leading-[1.08] tracking-[-0.045em] sm:text-[54px]">
            Gracias por tu
            <span className="block font-normal text-[#E7DCC5]">
              generosidad
            </span>
          </h1>

          <p className="mt-9 max-w-md text-[15px] leading-[1.8] text-neutral-200">
            Tu aporte sostiene la misión de Monte Sion.
            <br />
            Donar toma menos de un minuto.
          </p>

          {/* BOTÓN PRINCIPAL */}
          <Link
            href=""
            className="mt-9 flex h-[60px] w-full items-center justify-center rounded-[20px] bg-[#857a5d] px-6 text-[15px] font-bold tracking-[0.08em] text-white transition duration-200 hover:bg-[#AD8545] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5BE52]"
          >
            Formas de Donar
          </Link>

          {/* ENLACES SECUNDARIOS */}
          <div className="mt-7 flex flex-col items-center gap-4 text-[13px]">
            <Link
              href="/donaciones"
              className="text-neutral-200 underline decoration-neutral-500 underline-offset-4 transition hover:text-[#F5BE52]"
            >
              Ver otras formas de donar →
            </Link>

            <Link
              href="/conexion"
              className="text-neutral-200 underline decoration-neutral-500 underline-offset-4 transition hover:text-[#F5BE52]"
            >
              Ya soy donante · Entrar a mi portal →
            </Link>
          </div>
        </section>

        {/* PIE DE PÁGINA */}
        <footer className="mt-16 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[12px] text-neutral-400">
          <Link
            href="/privacidad"
            className="underline decoration-neutral-600 underline-offset-4 transition hover:text-white"
          >
            Aviso de privacidad
          </Link>

          <span className="text-neutral-600">·</span>

          <Link
            href="https://wa.me/+529512091644"
            className="underline decoration-neutral-600 underline-offset-4 transition hover:text-white"
          >
            Soporte: +529512091644
          </Link>
        </footer>
      </div>
    </main>
  );
}