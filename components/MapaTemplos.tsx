import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useState, useEffect, useRef } from 'react';

export type Templo = {
  nombre: string;
  direccion: string;
  coords: { lat: number; lng: number };
  link: string;
  telefono?: string;
};

const templos: Templo[] = [
  {
    nombre: 'Iglesia Cristiana Monte Sion - Santa María Atzompa, Oaxaca',
    direccion: 'Cuicatlán 184, Colonia Niños Héroes Santa María Atzompa, 71222 Oaxaca de Juárez, Oax. (36HQ+24)',
    coords: { lat: 17.077604, lng: -96.762164 }, // Plus code 36HQ+24 17.077604, -96.762164
    link: 'https://maps.app.goo.gl/w7p2aZXmHTwubbi16',
  },
  {
    nombre: 'Iglesia Monte Sinai - Montealban, Oaxaca de Juárez, Oax.',
    direccion: 'Carretera a Montealban s/n, Montealban, Oaxaca de Juárez, Oax. (363X+26)',
    coords: { lat: 17.052489, lng: -96.751980 }, // Plus code 363X+26 17.052489, -96.751980
    link: 'https://maps.app.goo.gl/Mk5GSm2TXJHUqTu86',
  },
  {
    nombre: 'Iglesia Rey de Gloria',
    direccion: 'Manuel Avila Camacho, 68020 Oaxaca de Juárez, Oax. (37XW+54)',
    coords: { lat: 17.098005885105255, lng: -96.70466507939226 },
    link: 'https://maps.app.goo.gl/WHAD8AttBarCooYR6',
    telefono: '+529512953336',
  },
];

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '400px',
  borderRadius: '1rem',
};

export default function MapaTemplos({ selectedTemplo }: { selectedTemplo?: Templo }) {
  const [selected, setSelected] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: false || '',
  });

  // Detectar tema (claro/oscuro)
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  // Para evitar problemas de SSR con Next.js
  useEffect(() => {
    // Nada, solo para asegurar que se ejecute en cliente
  }, []);

  // Si hay un templo seleccionado desde la búsqueda, resáltalo automáticamente
  useEffect(() => {
    if (selectedTemplo) {
      const idx = templos.findIndex(t =>
        t.nombre.toLowerCase() === selectedTemplo.nombre?.toLowerCase() ||
        t.direccion.toLowerCase().includes(selectedTemplo.direccion?.toLowerCase() || '')
      );
      if (idx !== -1) setSelected(idx);
    }
  }, [selectedTemplo]);

  if (!isLoaded) return <div className="w-full h-full flex items-center justify-center">Cargando mapa...</div>;

  // Ajustar el zoom para mostrar todos los templos
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    const bounds = new window.google.maps.LatLngBounds();
    templos.forEach(t => bounds.extend(t.coords));
    map.fitBounds(bounds, 80); // 80px padding
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      // center y zoom serán ignorados por fitBounds
      center={templos[0].coords}
      zoom={14}
      onLoad={onLoad}
      options={{
        disableDefaultUI: true,
        zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        clickableIcons: false,
        styles: [
          // General
          { elementType: 'geometry', stylers: [{ color: isDark ? '#212121' : '#f8f8f8' }, { saturation: -40 }, { lightness: 30 }] },
          { elementType: 'labels.text.fill', stylers: [{ color: isDark ? '#e0e0e0' : '#222' }, { saturation: -40 }, { lightness: 30 }] },
          { elementType: 'labels.text.stroke', stylers: [{ color: isDark ? '#212121' : '#f8f8f8' }, { saturation: -40 }, { lightness: 30 }] },
          // Administrativos
          { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: isDark ? '#757575' : '#e0e0e0' }, { saturation: -40 }, { lightness: 30 }] },
          // Puntos de interés
          { featureType: 'poi', elementType: 'geometry', stylers: [{ color: isDark ? '#181818' : '#f0f0f0' }, { saturation: -40 }, { lightness: 30 }] },
          { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: isDark ? '#181818' : '#e8ffe8' }, { saturation: -40 }, { lightness: 30 }] },
          // Calles
          { featureType: 'road', elementType: 'geometry', stylers: [{ color: isDark ? '#383838' : '#ffffff' }, { saturation: -40 }, { lightness: 30 }] },
          { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: isDark ? '#212121' : '#e0e0e0' }, { saturation: -40 }, { lightness: 30 }] },
          // Agua
          { featureType: 'water', elementType: 'geometry', stylers: [{ color: isDark ? '#0e1626' : '#b3e5fc' }, { saturation: -40 }, { lightness: 30 }] },
        ],
      }}
    >
      {templos.map((templo, idx) => (
        <Marker
          key={idx}
          position={templo.coords}
          onClick={() => setSelected(idx)}
          icon={selected === idx ? {
            url: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"%3E%3Cpath d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" fill="%23000"/%3E%3C/svg%3E',
            scaledSize: new window.google.maps.Size(30, 30),
          } : undefined}
        >
          {selected === idx && (
            <InfoWindow onCloseClick={() => setSelected(null)}>
              <div className={`p-2 rounded-xl shadow-lg text-sm font-medium flex flex-col items-center gap-2 ${isDark ? 'bg-neutral-900 text-white' : 'bg-white text-black'}` }>
                <a
                  href={templo.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 mb-1 rounded-full border-2 border-white bg-black text-white font-semibold shadow transition hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
                  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.10)' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-5 h-5" style={{ minWidth: 20 }}>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" fill="#fff" stroke="#fff" strokeWidth="1.2"/>
                  </svg>
                  <span className="font-bold text-base">Ver en Google Maps</span>
                </a>
                <b>{templo.nombre}</b><br />
                {templo.direccion}
              </div>
            </InfoWindow>
          )}
        </Marker>
      ))}
    </GoogleMap>
  );
}