import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lemuel Acosta - Monte Sion",
  description: "Conoce a nuestros pastores y líderes en Monte Sion.",
  openGraph: {
    title: "Lemuel Acosta - Monte Sion",
    description: "Conoce a nuestros pastores y líderes en Monte Sion.",
    url: "https://montesion.me/lemuelacosta",
  },
};

export default function LemuelAcostaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/lemuelacosta" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
