
import Link from "next/link";

interface VisitSectionProps {
  href?: string;
}

export default function VisitSection({
  href = "#",
}: VisitSectionProps) {
  return (
    <section className="w-full bg-black text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-start justify-between gap-10 px-6 py-16 sm:px-10 md:flex-row md:items-center lg:px-4 lg:py-20">

        {/* Título */}
        <div className="flex flex-col items-start">
          <p className="text-[clamp(2.5rem,5.5vw,5rem)] font-extralight italic leading-[0.95] tracking-[-0.055em]">
            ¿LISTO PARA
          </p>

          <h2 className="text-[clamp(2.8rem,5.5vw,5rem)] font-black leading-[0.95] tracking-[-0.065em] text-[#F5BE52]">
            VISITARNOS?
          </h2>
        </div>

        {/* Botón */}
        <Link
          href={href}
          className="inline-flex min-h-[44px] shrink-0 items-center justify-center rounded-full bg-[#F5BE52] px-8 py-3 text-sm font-medium text-black transition-all duration-300 hover:bg-[#E9A935] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F5BE52]"
        >
          DA EL PRIMER PASO
        </Link>

      </div>
    </section>
  );
}