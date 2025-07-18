import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Salmo 91",
  description: "Morando bajo la sombra del Omnipotente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased bg-background text-foreground">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}