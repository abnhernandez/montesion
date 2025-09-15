import React from "react";

export type CursoPopular = {
  id: string;
  title: string;
  image: string;
  teacher: string;
  teacherAvatar: string;
  rating: number;
  students: number;
  top?: boolean;
};

interface CursosPopularesProps {
  cursos: CursoPopular[];
  itemsPerPage?: number;
}

const CursosPopulares: React.FC<CursosPopularesProps> = ({ cursos }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {cursos.map(c => (
        <div key={c.id} className="rounded-xl shadow-sm border flex-shrink-0 w-72">
          <div className="rounded-t-xl overflow-hidden h-32 relative flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={c.title} className="w-16 h-16 object-contain" />
            {c.top && (
              <span className="absolute top-2 right-2 text-xs font-bold px-2 py-1 rounded">Curso TOP</span>
            )}
          </div>
          <div className="p-4">
            <div className="font-semibold text-lg mb-2">{c.title}</div>
            <div className="flex items-center text-sm mb-2">
              <span className="mr-2">⭐ {c.rating}</span>
              <span>·</span>
              <span className="ml-2">{c.students} Estudiantes</span>
            </div>
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.teacherAvatar} alt={c.teacher} className="w-6 h-6 rounded-full" />
              <span>{c.teacher}</span>
            </div>
          </div>
        </div>
      ))}
      <style>{`
        .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default CursosPopulares;