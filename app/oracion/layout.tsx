import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next"
export const dynamic = "force-dynamic";
export const revalidate = 0;
      <SpeedInsights/>
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Solicitar Oración - Monte Sion",
  openGraph: {
    title: "Solicitar Oración - Monte Sion",
    description: "Envíanos tu petición de oración y nuestro equipo estará orando por ti.",
    url: "https://montesion.vercel.app/prayer",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SpeedInsights />
      {children}
    </>
  );
}