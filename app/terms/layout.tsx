import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones - Monte Sion",
  description: "Consulta los términos y condiciones de uso de Monte Sion.",
  openGraph: {
    title: "Términos y Condiciones - Monte Sion",
    description: "Consulta los términos y condiciones de uso de Monte Sion.",
    url: "https://montesion.me/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/terms" />
      </head>
      <body>{children}</body>
    </html>
  );
}
