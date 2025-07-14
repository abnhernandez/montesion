import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kids - Monte Sion",
  description: "Descubre el ministerio de niños y actividades para los más pequeños en Monte Sion.",
  openGraph: {
    title: "Kids - Monte Sion",
    description: "Descubre el ministerio de niños y actividades para los más pequeños en Monte Sion.",
    url: "https://montesion.me/kids",
  },
};

export default function KidsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/kids" />
        <link rel="icon" href="/favicon.ico" />
      </head>
    </html>
  );
}
