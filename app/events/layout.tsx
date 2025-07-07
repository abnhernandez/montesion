import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Eventos - Monte Sion",
  description: "Descubre los próximos eventos y actividades de Monte Sion.",
  openGraph: {
    title: "Eventos - Monte Sion",
    description: "Descubre los próximos eventos y actividades de Monte Sion.",
    url: "https://montesion.me/events",
  },
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/events" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
