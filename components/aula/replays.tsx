import React from "react";

export type BootcampReplay = {
  id: string;
  title: string;
  image: string;
  clase: string;
  rating: number;
  students: number;
};

interface BootcampsReplaysProps {
  bootcamps: BootcampReplay[];
  itemsPerPage?: number;
}

const BootcampsReplays: React.FC<BootcampsReplaysProps> = ({ bootcamps }) => {
    // Removed pagination logic to show all bootcamps in a horizontal scroll

  return (
    <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {bootcamps.map(b => (
        <div key={b.id} className="rounded-xl shadow-sm border flex-shrink-0 w-72">
          <div className="rounded-t-xl overflow-hidden h-32 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.image} alt={b.title} className="w-100% h-100% object-contain" />
          </div>
          <div className="p-4">
            <div className="font-semibold text-lg mb-2">{b.title}</div>
            <div className="text-sm mb-2">{b.clase}</div>
            <div className="flex items-center text-sm">
              <span className="mr-2">⭐ {b.rating}</span>
              <span>·</span>
              <span className="ml-2">{b.students} Estudiantes</span>
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

export default BootcampsReplays;