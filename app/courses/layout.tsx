import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos - Monte Sion",
  description: "Descubre los cursos y talleres disponibles en Monte Sion.",
  openGraph: {
    title: "Cursos - Monte Sion",
    description: "Descubre los cursos y talleres disponibles en Monte Sion.",
    url: "https://montesion.me/courses",
  },
};

export default function CoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>{children}</>
  );
}
