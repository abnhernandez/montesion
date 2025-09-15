import React from "react";

export type CursoNuevo = {
  id: string;
  title: string;
  image: string;
  teacher: string;
  students: number;
};

interface CursosNuevosProps {
  cursos: CursoNuevo[];
}

const CursosNuevos: React.FC<CursosNuevosProps> = ({ cursos }) => (
  <section>
    <div className="flex gap-4 overflow-x-auto">
      {cursos.map(c => (
        <div key={c.id} className="rounded-xl shadow-sm border flex-shrink-0 w-72">
          <div className="rounded-t-xl overflow-hidden h-32 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.image} alt={c.title} className="w-16 h-16 object-contain" />
          </div>
          <div className="p-4">
            <div className="font-semibold text-lg mb-2">{c.title}</div>
            <div className="flex items-center text-sm mb-2">
              <span className="mr-2">65 {c.students} Estudiantes</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{c.teacher}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default CursosNuevos;