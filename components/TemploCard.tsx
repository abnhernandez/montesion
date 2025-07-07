import { MapPin, Phone, ExternalLink, Landmark, Plus, LocateFixed, Clock, Info } from "lucide-react";
import React from "react";

interface TemploCardProps {
  nombre: string;
  direccion: string;
  estado: string;
  cp: string;
  pluscode?: string;
  telefono?: string;
  mapsUrl?: string;
  distanciaKm?: number;
  horarios?: string;
  referencias?: string;
}

const TemploCard: React.FC<TemploCardProps> = ({
  nombre,
  direccion,
  estado,
  cp,
  pluscode,
  telefono,
  mapsUrl,
  distanciaKm,
  horarios,
  referencias,
}) => {
  // Utilidad para mostrar horarios de forma compacta
  function renderHorarios(horarios: string) {
    // Si el string contiene saltos de línea, procesar días abiertos y cerrados
    const lines = horarios.split('\n').map(l => l.trim()).filter(Boolean);
    const diasAbiertos: string[] = [];
    const diasCerrados: string[] = [];
    lines.forEach(line => {
      if (/cerrado/i.test(line)) {
        // Extraer día si está presente
        const match = line.match(/^(\w+):?\s*cerrado/i);
        if (match) diasCerrados.push(match[1]);
      } else {
        diasAbiertos.push(line);
      }
    });
    return (
      <div className="flex flex-col gap-0.5">
        {diasAbiertos.length > 0 && diasAbiertos.map((h, i) => (
          <span key={i}>{h}</span>
        ))}
        {diasCerrados.length > 0 && (
          <span className="text-gray-400">{diasCerrados.join(', ')}: Cerrado</span>
        )}
      </div>
    );
  }
  return (
    <article
      className="w-full flex flex-col gap-2 py-4 px-0 border-0 border-b border-dashed border-gray-300 dark:border-gray-700 bg-transparent min-w-0"
      tabIndex={0}
      aria-label={`Información de ${nombre}`}
    >
      {/* Nombre */}
      <header className="flex items-center gap-2 mb-1">
        <Landmark className="w-5 h-5 text-green-600 shrink-0" aria-hidden="true" />
        <h3 className="font-bold text-base md:text-lg text-black dark:text-white leading-tight break-words whitespace-pre-line">
          {nombre}
        </h3>
      </header>
      {/* Dirección y ubicación */}
      <div className="flex items-start gap-2 text-sm md:text-base text-gray-800 dark:text-gray-200 break-words whitespace-pre-line">
        <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" aria-hidden="true" />
        <span>{direccion}</span>
      </div>
      {/* Estado, CP, Pluscode */}
      <div className="flex flex-wrap items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
        <span className="font-semibold">{estado}</span>
        <span className="mx-1">•</span>
        <span>C.P. {cp}</span>
        {pluscode && (
          <span className="flex items-center gap-1 ml-2 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs font-mono">
            <Plus className="w-4 h-4 text-gray-400" />{pluscode}
          </span>
        )}
      </div>
      {/* Horarios */}
      {horarios && (
        <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 mt-1">
          <Clock className="w-4 h-4 text-yellow-500" />
          <span className="whitespace-pre-line">{renderHorarios(horarios)}</span>
        </div>
      )}
      {/* Referencias */}
      {referencias && (
        <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-300 mt-1">
          <Info className="w-4 h-4 text-gray-400" />
          <span className="whitespace-pre-line">{referencias}</span>
        </div>
      )}
      {/* Teléfono y Google Maps */}
      <div className="flex flex-wrap gap-2 mt-2">
        {telefono && (
          <a
            href={`https://wa.me/${telefono.replace(/[^\d]/g, "")}?text=${encodeURIComponent(`Hola, me gustaría recibir información sobre ${nombre}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-semibold text-xs hover:bg-green-100 dark:hover:bg-green-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
            aria-label={`Contactar por WhatsApp a ${telefono}`}
          >
            <Phone className="w-4 h-4" /> WhatsApp
          </a>
        )}
        {mapsUrl && (
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 font-semibold text-xs hover:bg-blue-100 dark:hover:bg-blue-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Ver en Google Maps"
          >
            <ExternalLink className="w-4 h-4" /> Google Maps
          </a>
        )}
      </div>
      {/* Distancia (solo si se conoce la ubicación del usuario) */}
      {typeof distanciaKm === "number" && (
        <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
          <LocateFixed className="w-4 h-4 text-gray-400" />
          <span>{distanciaKm.toFixed(2)} km de distancia</span>
        </div>
      )}
    </article>
  );
};

export default TemploCard;
