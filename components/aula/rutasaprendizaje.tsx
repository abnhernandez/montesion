import React from "react";

export type RutaAprendizaje = {
  id: string;
  title: string;
  cursos: number;
  tiempo: string;
  nivel: string;
};

interface RutasAprendizajeProps {
  rutas: RutaAprendizaje[];
  itemsPerPage?: number;
}

const RutasAprendizaje: React.FC<RutasAprendizajeProps> = ({ rutas }) => {
  return (
    <div className="px-4">
      <div
        className="grid grid-flow-col auto-cols-[minmax(260px,1fr)] gap-6 overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {rutas.map(r => (
          <div key={r.id} className="rounded-xl shadow-sm border p-4 flex flex-col justify-between h-full">
            <div>
              <div className="font-semibold text-lg mb-2">{r.title}</div>
              <div className="text-sm mb-2">{r.cursos} cursos</div>
              <div className="text-sm mb-2">{r.tiempo}</div>
              <div className="text-sm mb-2">{r.nivel}</div>
            </div>
            <button className="mt-4 border rounded px-4 py-2 font-semibold self-start">Ver ruta →</button>
          </div>
        ))}
      </div>
      <style>{`
        .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default RutasAprendizaje;