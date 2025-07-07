import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enlaces - Monte Sion",
  description: "Encuentra todos los enlaces oficiales y redes sociales de Monte Sion.",
  openGraph: {
    title: "Enlaces - Monte Sion",
    description: "Encuentra todos los enlaces oficiales y redes sociales de Monte Sion.",
    url: "https://montesion.me/links",
  },
  alternates: {
    canonical: "https://montesion.me/links",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function LinksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
