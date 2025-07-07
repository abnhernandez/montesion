"use client";

export default function TwoCourse() {
  return (
    <div className={`space-y-12 text-center`}>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">Cursos Destacados</h2>
      <p className="text-lg sm:text-xl text-gray-400">Descubre nuestros recursos más recientes.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <iframe
          className="w-full h-60 sm:h-80 rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/videoseries?list=PL-K5-yAqiI7YhbCFViFgeUyr06QsUhT9f"
          title="PRIMER PASO"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <iframe
          className="w-full h-60 sm:h-80 rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/videoseries?list=PL-K5-yAqiI7a3jxNNFUQ_WREMNbZTNiRt"
          title="LA GRAN COMISIÓN"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}