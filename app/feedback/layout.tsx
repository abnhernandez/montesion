import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback - Monte Sion",
  description: "Envíanos tus comentarios y sugerencias para mejorar Monte Sion.",
  openGraph: {
    title: "Feedback - Monte Sion",
    description: "Envíanos tus comentarios y sugerencias para mejorar Monte Sion.",
    url: "https://montesion.me/feedback",
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="canonical" href="https://montesion.me/feedback" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
