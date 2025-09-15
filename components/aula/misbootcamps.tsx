import React from "react";

export type Bootcamp = {
  id: string;
  title: string;
  description: string;
  image: string;
  badge?: string;
};

interface MisBootcampsProps {
  bootcamps: Bootcamp[];
  itemsPerPage?: number;
}

const MisBootcamps: React.FC<MisBootcampsProps> = ({ bootcamps }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
      {bootcamps.map((b) => (
        <div key={b.id} className="rounded-xl shadow-sm border flex-shrink-0 w-72">
          <div className="rounded-t-xl overflow-hidden h-36 relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={b.image} alt={b.title} className="object-cover w-full h-full" />
            {b.badge && (
              <span className="absolute top-2 left-2 text-xs font-bold px-2 py-1 rounded">{b.badge}</span>
            )}
          </div>
          <div className="p-4">
            <div className="font-semibold text-lg mb-2">{b.title}</div>
            <div className="text-base">{b.description}</div>
          </div>
        </div>
      ))}
      <style>{`
        .overflow-x-auto::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default MisBootcamps;