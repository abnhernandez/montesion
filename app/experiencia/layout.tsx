import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiencia - Monte Sion",
  description: "Vive la experiencia Monte Sion y conoce nuestras actividades y valores.",
  openGraph: {
    title: "Experiencia - Monte Sion",
    description: "Vive la experiencia Monte Sion y conoce nuestras actividades y valores.",
    url: "https://montesion.me/experiencia",
  },
};

export default function ExperienciaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/experiencia" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
