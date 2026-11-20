import ServicesSection from "@/components/ServicesSection";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
import VisitSection from "@/components/VisitSection";
import ReviewsSection from "@/components/ReviewsSection";

export const instant = false;

const videoUrl = supabaseUrl
  ? `${supabaseUrl}/storage/v1/object/public/media/hero.mp4`
  : "";

export default function Home() {
  return (
    <>
    <section className="relative isolate flex min-h-[calc(100svh-140px)] w-full items-end overflow-hidden rounded-t-[35px] bg-black">
      {/* Video de fondo */}
      {videoUrl && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      )}

      {/* Oscurecimiento del video */}
      <div className="absolute inset-0 -z-10 bg-black/60" />

      {/* Degradado para legibilidad */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/50 via-transparent to-black/20" />

      {/* Contenido */}
      <div className="mx-auto flex w-full max-w-[1250px] flex-col items-start justify-end px-6 pb-14 pt-24 sm:px-10 sm:pb-20 lg:px-4 lg:pb-24">
        <div className="flex flex-col items-start">
          <p className="text-2xl font-light tracking-tight text-white sm:text-5xl lg:text-[58px]">
            BIENVENIDO A
          </p>

          <h1 className="mt-1 max-w-[1000px] text-[clamp(2.2rem,5vw,4.5rem)] leading-[1.05] font-black tracking-[-0.055em] text-[#F5BE52]">
              MONTE SION
                <span className="block">ATZOMPA, OAXACA</span>
              </h1>

          <p className="mt-8 text-sm font-light tracking-[0.25em] text-white uppercase sm:text-lg sm:tracking-[0.35em] lg:text-[23px]">
            UN LUGAR PARA TI Y TU FAMILIA.
          </p>
        </div>
      </div>
    </section>
    <ServicesSection />
    <VisitSection/>
    <ReviewsSection />
    </>
  );
}