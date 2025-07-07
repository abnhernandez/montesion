import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conducta - Monte Sion",
  description: "Código de conducta y valores de la comunidad Monte Sion.",
  openGraph: {
    title: "Conducta - Monte Sion",
    description: "Código de conducta y valores de la comunidad Monte Sion.",
    url: "https://montesion.me/conduct",
  },
};

export default function ConductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/conduct" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
