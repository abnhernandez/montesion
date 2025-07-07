import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Contacto - Monte Sion",
  openGraph: {
    title: "Contacto - Monte Sion",
    description: "Ponte en contacto con Monte Sion para dudas, oración o información.",
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