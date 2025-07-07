import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Test - Monte Sion",
  description: "Página de pruebas y demostraciones de Monte Sion.",
  openGraph: {
    title: "Test - Monte Sion",
    description: "Página de pruebas y demostraciones de Monte Sion.",
    url: "https://montesion.me/test",
  },
};

export default function TestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/test" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
