import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mujeres - Monte Sion",
  description: "Conoce el ministerio de mujeres de Monte Sion y sus actividades.",
  openGraph: {
    title: "Mujeres - Monte Sion",
    description: "Conoce el ministerio de mujeres de Monte Sion y sus actividades.",
    url: "https://montesion.me/mujeres",
  },
};

export default function MujeresLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/mujeres" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
