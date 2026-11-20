
import { supabase } from "@/lib/supabase";
import ReviewsCarousel from "@/components/ReviewsCarousel";

type Resena = {
  id: string;
  autor: string;
  comentario: string | null;
  calificacion: number | null;
  fecha_publicacion: string | null;
  fecha_relativa: string | null;
  fuente: string;
  url_fuente: string | null;
  avatar_url: string | null;
};

type ImagenResena = {
  nombre: string;
  url: string;
};

export default async function ReviewsSection() {
  // Obtener imágenes y reseñas desde Supabase
  const [imagenesResult, resenasResult] = await Promise.all([
    supabase.storage.from("resenas").list("", {
      limit: 100,
      sortBy: {
        column: "name",
        order: "asc",
      },
    }),

    supabase
      .from("resenas")
      .select(
        "id, autor, comentario, calificacion, fecha_publicacion, fecha_relativa, fuente, url_fuente, avatar_url"
      )
      .eq("visible", true)
      .order("orden", { ascending: true }),
  ]);

  // Registrar errores sin detener la página
  if (imagenesResult.error) {
    console.error(
      "Error cargando imágenes:",
      imagenesResult.error.message
    );
  }

  if (resenasResult.error) {
    console.error(
      "Error cargando reseñas:",
      resenasResult.error.message
    );
  }

  // Preparar imágenes del bucket público
  const imagenes: ImagenResena[] = (
    imagenesResult.data ?? []
  )
    .filter((archivo) =>
      /\.(jpg|jpeg|png|webp|avif)$/i.test(archivo.name)
    )
    .map((archivo) => {
      const { data } = supabase.storage
        .from("resenas")
        .getPublicUrl(archivo.name);

      return {
        nombre: archivo.name,
        url: data.publicUrl,
      };
    });

  // Preparar reseñas
  const resenas: Resena[] = (
    resenasResult.data ?? []
  ) as Resena[];

  // Renderizar el carrusel interactivo
  return (
    <ReviewsCarousel
      imagenes={imagenes}
      resenas={resenas}
    />
  );
}