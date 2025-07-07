import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad - Monte Sion",
  description: "Consulta el aviso de privacidad y protección de datos de Monte Sion.",
  openGraph: {
    title: "Aviso de Privacidad - Monte Sion",
    description: "Consulta el aviso de privacidad y protección de datos de Monte Sion.",
    url: "https://montesion.me/privacy",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/privacy" />
      </head>
      <body>{children}</body>
    </html>
  );
}
