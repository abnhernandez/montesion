"use client";

import { useState, useEffect } from 'react';
import { Search, LocateFixed, List, Map as MapIcon } from "lucide-react";
import dynamic from 'next/dynamic';
import CircularText from '@/components/ui/CircularText';
import Link from 'next/link';
import TemploCard from "@/components/TemploCard";
import type { Templo } from '@/components/MapaTemplos';

// Importar el mapa de forma dinámica para evitar problemas de SSR
const MapaTemplos = dynamic(() => import('@/components/MapaTemplos'), { ssr: false });

export default function TemplosBanner() {
  // Detectar tema para CircularText
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      setIsDark(mq.matches);
      mq.addEventListener('change', (e) => setIsDark(e.matches));
      return () => mq.removeEventListener('change', (e) => setIsDark(e.matches));
    }
  }, []);
  const [showBanner, setShowBanner] = useState(true);
  // Estados para el buscador
  type Direccion = {
    direccion: string;
    estado: string;
    cp: string;
    lat?: number;
    lng?: number;
    nombre?: string;
    pluscode?: string;
    telefono?: string;
    mapsUrl?: string;
    horarios?: string;
    referencias?: string;
  };
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState<Direccion[]>([]);
  // Estado para loading y templos
  const [loading, setLoading] = useState(false);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  // Lista local de "direcciones" simuladas con coordenadas
  const DIRECCIONES: Direccion[] = [
    {
      nombre: "Iglesia Cristiana Monte Sion - Santa María Atzompa, Oaxaca",
      direccion: "Cuicatlán 184, Colonia Niños Héroes Santa María Atzompa, Oaxaca de Juárez, Oax.",
      estado: "Oaxaca",
      cp: "71222",
      lat: 17.0905,
      lng: -96.7841,
      pluscode: "36HQ+24 Oaxaca de Juárez, Oaxaca",
      telefono: "+525586449993",
      mapsUrl: "https://maps.app.goo.gl/w7p2aZXmHTwubbi16",
      horarios: `Domingo: 2:30–5 p.m.\nJueves: 6–8 p.m.\nViernes: 6–8 p.m.\nSábado, Lunes, Martes, Miércoles: Cerrado`,
      referencias: "A dos cuadras de Plaza Bella Oaxaca"
    },
    {
      nombre: "Iglesia Monte Sinai",
      direccion: "Carretera a Monte Albán, S/N, Monte Albán, Oaxaca de Juárez, Oax.",
      estado: "Oaxaca",
      cp: "68154",
      lat: 17.0432,
      lng: -96.7675,
      pluscode: "363X+26 Oaxaca de Juárez, Oaxaca",
      telefono: "+529511460919",
      mapsUrl: "https://maps.app.goo.gl/Mk5GSm2TXJHUqTu86",
      horarios: undefined,
      referencias: "Sobre carretera Monte Albán a 150m de Farmacias Bienestar San Martin"
    },
    {
      nombre: "Iglesia Rey de Gloria",
      direccion: "Manuel Avila Camacho, 68020 Oaxaca de Juárez, Oax.",
      estado: "Oaxaca",
      cp: "68020",
      lat: 17.0735,
      lng: -96.7266,
      pluscode: "37XW+54 Oaxaca de Juárez, Oaxaca",
      telefono: "+529512953336",
      mapsUrl: "https://maps.app.goo.gl/WHAD8AttBarCooYR6",
      horarios: `Sábado: 4–7 p.m.\nDomingo: 4–7 p.m.\nMartes: 4–7 p.m.\nLunes, Miércoles, Jueves, Viernes: Cerrado`,
      referencias: "En esquina, a media cuadra de la gasolinera Mobil y a 2 cuadras de la calle Vicente Guerrero."
    }
  ];
  const TODOS_TEMPOS = DIRECCIONES; // Puedes expandir esta lista si tienes más
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [ordenados, setOrdenados] = useState<Direccion[] | null>(null);
  // Nuevo estado para tabs en mobile
  const [tab, setTab] = useState<'list' | 'map'>('list');
  const [selectedTemplo, setSelectedTemplo] = useState<Direccion | null>(null);

  // Filtrar sugerencias al escribir (por nombre, dirección, estado o CP)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length > 0) {
      const filtered = DIRECCIONES.filter(dirObj =>
        (dirObj.nombre && dirObj.nombre.toLowerCase().includes(value.toLowerCase())) ||
        dirObj.direccion.toLowerCase().includes(value.toLowerCase()) ||
        dirObj.estado.toLowerCase().includes(value.toLowerCase()) ||
        dirObj.cp.includes(value)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  // Al seleccionar sugerencia: mostrar solo ese templo
  const handleSuggestionClick = (suggestion: typeof DIRECCIONES[number]) => {
    setSearch(suggestion.nombre ? suggestion.nombre : `${suggestion.direccion}, ${suggestion.estado}, C.P. ${suggestion.cp}`);
    setSuggestions([]);
    setSelectedTemplo(suggestion);
    setMostrarTodos(true);
  };

  // Simular carga al mostrar todos los templos
  useEffect(() => {
    if (mostrarTodos) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 1200); // 1.2s de loading
      return () => clearTimeout(timer);
    }
  }, [mostrarTodos]);

  // Calcular distancia entre dos puntos (Haversine)
  function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    const toRad = (v: number) => v * Math.PI / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  // Usar ubicación actual y ordenar templos
  const handleUseLocation = () => {
    if (!navigator.geolocation) return alert('Geolocalización no soportada');
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserLocation({ lat: latitude, lng: longitude });
        // Ordenar por distancia
        const ordenados = [...DIRECCIONES].sort((a, b) => {
          const dA = getDistance(latitude, longitude, a.lat!, a.lng!);
          const dB = getDistance(latitude, longitude, b.lat!, b.lng!);
          return dA - dB;
        });
        setOrdenados(ordenados);
        setMostrarTodos(true);
        setLoading(false);
      },
      () => {
        alert('No se pudo obtener la ubicación');
        setLoading(false);
      }
    );
  };

  // Buscar y mostrar solo el templo seleccionado al presionar Enter
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search.trim().length > 0) {
      const match = DIRECCIONES.find(dirObj =>
        dirObj.direccion.toLowerCase().includes(search.toLowerCase()) ||
        dirObj.estado.toLowerCase().includes(search.toLowerCase()) ||
        dirObj.cp.includes(search) ||
        (dirObj.nombre && dirObj.nombre.toLowerCase().includes(search.toLowerCase()))
      );
      if (match) {
        setSelectedTemplo(match);
        setMostrarTodos(true);
        setSuggestions([]);
      }
    }
  };

  // Helper to map Direccion to Templo
  function direccionToTemplo(d: Direccion | null): Templo | undefined {
    if (!d || d.lat === undefined || d.lng === undefined || !d.mapsUrl) return undefined;
    return {
      nombre: d.nombre || '',
      direccion: d.direccion,
      coords: { lat: d.lat, lng: d.lng },
      link: d.mapsUrl,
      telefono: d.telefono,
    };
  }

  // Cantidad dinámica de templos mostrados
  const templosMostrados = (ordenados || TODOS_TEMPOS);
  const cantidadTemplos = templosMostrados.length;

  return (
    <div className="relative w-full min-h-[600px] pt-16 sm:pt-20 px-2 sm:px-4 pb-8 sm:pb-12 flex flex-col items-center justify-center box-border">
      {/* Sección superior: Banner principal centrado verticalmente */}
      <div className="w-full min-h-[400px] sm:min-h-[500px] flex flex-col items-center justify-center">
        {/* Contenedor flex: en mobile el círculo va abajo, en desktop a la izquierda */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-4 sm:mb-6 w-full max-w-4xl mx-auto">
          <div className="flex-shrink-0 mt-4 sm:mt-0">
            <CircularText
              onHover="speedUp"
              spinDuration={20}
              className="custom-class"
              color={isDark ? "#fff" : "#000"}
              text="CONOCE·NUESTROS·TEMPLOS·"
            />
          </div>
          <div className="relative z-10 text-black dark:text-white max-w-full sm:max-w-2xl p-6 sm:p-10 rounded-xl w-full">
            <div className="border-l-4 border-black dark:border-white pl-4 sm:pl-6">
              <h1 className="text-3xl sm:text-5xl font-semibold mb-2 sm:mb-4 leading-tight text-left">Templos</h1>
                <p className="text-base sm:text-lg leading-relaxed text-left">
                Somos parte del Cuerpo de Cristo, llamados a ser Su morada y a vivir en unidad como familia de fe. 
                <br /> <b className='text-green-700'>¡Te esperamos con los brazos abiertos!</b>
                </p>
            </div>
          </div>
        </div>
      </div>
      {/* Banner de inicio de sesión fuera de la sección superior */}
      {showBanner && (
        <div
          className="w-full sm:w-2/3 mx-auto mt-10 sm:mt-20 flex flex-col sm:flex-row items-center justify-between rounded-2xl bg-white/80 dark:bg-black/60 backdrop-blur-md shadow-lg px-4 sm:px-6 py-3 sm:py-4 gap-2 sm:gap-0"
        >
          <span className="text-sm sm:text-base font-medium text-black dark:text-white text-center sm:text-left">
            ¡Mejora tu experiencia!{' '}
            <Link href="/users/sign_in" className="underline font-bold">Inicia sesión</Link> o{' '}
            <Link href="/users/sign_up" className="underline font-bold">regístrate</Link> para agendar en un pestañeo y enterarte de las noticias.{' '}
            <Link href="/planifica-visita" className='underline font-bold text-gray-400'>Continuar como invitado</Link>
          </span>
          <button
            className="sm:ml-4 text-xl font-bold hover:opacity-70 transition-opacity text-black dark:text-white"
            aria-label="Cerrar"
            onClick={() => setShowBanner(false)}
          >
            <span className="block text-black dark:text-white">×</span>
          </button>
        </div>
      )}
      {/* Separador horizontal */}
      <div className="w-full flex justify-center">
        <hr className="w-11/12 sm:w-2/3 my-6 sm:my-10 border-t-2 border-black dark:border-white rounded-full opacity-10" />
      </div>
      {/* Encabezado dinámico y tabs mobile */}
      <div className="w-full max-w-6xl flex flex-col gap-2 mb-2">
        {/* Tabs solo en mobile */}
        <div className="block md:hidden w-full flex justify-center gap-2 mb-2">
          <button
            className={`flex-1 py-2 font-semibold border-b-2 transition-colors ${tab === 'list' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
            onClick={() => setTab('list')}
          >
            <List className="inline w-5 h-5 mr-1" />Ver listado
          </button>
          <button
            className={`flex-1 py-2 font-semibold border-b-2 transition-colors ${tab === 'map' ? 'border-black dark:border-white text-black dark:text-white' : 'border-transparent text-gray-400'}`}
            onClick={() => setTab('map')}
          >
            <MapIcon className="inline w-5 h-5 mr-1" />Ver mapa
          </button>
        </div>
        {/* Encabezado cantidad y enlace */}
        <div className="w-full flex items-center justify-between px-1">
          <span className="font-semibold text-base sm:text-lg text-black dark:text-white">
            {cantidadTemplos} Templo{cantidadTemplos !== 1 ? 's' : ''} disponible{cantidadTemplos !== 1 ? 's' : ''}
          </span>
          {!mostrarTodos && (
            <button
              className="underline text-black dark:text-white font-medium text-sm sm:text-base"
              onClick={() => setMostrarTodos(true)}
            >
              Ver todos los templos
            </button>
          )}
        </div>
      </div>
      {/* Layout principal: contenido a la izquierda, mapa a la derecha */}
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-6 md:gap-8 mt-2 md:mt-4 items-stretch justify-center">
        {/* Columna izquierda: buscador, mensaje, botones, listado */}
        {(tab === 'list' || typeof window === 'undefined' || window.innerWidth >= 768) && (
          <div className="w-full md:w-2/5 flex flex-col justify-between gap-4 md:gap-6 md:max-h-[500px] md:overflow-y-auto">
            {/* Buscador */}
            <div className="w-full mb-4 md:mb-6 flex flex-col items-center">
              <div className="w-full flex items-center border border-gray-400 dark:border-gray-600 rounded-full px-3 md:px-4 py-2 bg-white dark:bg-black/30">
                <input
                  type="text"
                  placeholder="Busca por C.P. estado o dirección..."
                  className="flex-1 bg-transparent outline-none text-sm md:text-base text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  value={search}
                  onChange={handleInputChange}
                  onKeyDown={handleInputKeyDown}
                  autoComplete="off"
                />
                {/* Ícono de lupa Lucide React */}
                <Search className="w-6 h-6 md:w-7 md:h-7 text-gray-600 dark:text-gray-200 ml-2" strokeWidth={2.2} />
              </div>
              {/* Sugerencias */}
              {suggestions.length > 0 && (
                <ul className="w-full bg-white dark:bg-black/80 border border-gray-300 dark:border-gray-700 rounded-b-xl shadow z-20 mt-0 max-h-48 overflow-y-auto">
                  {suggestions.map((s, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-black dark:text-white text-sm md:text-base"
                      onClick={() => handleSuggestionClick(s)}
                    >
                      <span className="font-semibold">{s.nombre || ''}</span>
                      {s.nombre && <span className="text-gray-400"> — </span>}
                      <span>{s.direccion}</span>
                    </li>
                  ))}
                </ul>
              )}
              {/* Lista de templos o loading justo debajo del buscador */}
              {mostrarTodos && (
                loading ? (
                  <div className="text-center text-lg font-semibold py-8 w-full">Cargando templos...</div>
                ) : (
                  <>
                    {/* Listado solo si tab=list o en desktop */}
                    {(tab === 'list' || typeof window === 'undefined' || window.innerWidth >= 768) && (
                      <ul className="w-full max-w-lg bg-transparent border-none shadow-none p-0 mt-6 flex flex-col gap-4">
                        {selectedTemplo
                          ? (
                            <li className="list-none">
                              <TemploCard
                                nombre={selectedTemplo.nombre || ''}
                                direccion={selectedTemplo.direccion}
                                estado={selectedTemplo.estado}
                                cp={selectedTemplo.cp}
                                pluscode={selectedTemplo.pluscode}
                                telefono={selectedTemplo.telefono}
                                mapsUrl={selectedTemplo.mapsUrl}
                                distanciaKm={userLocation && selectedTemplo.lat && selectedTemplo.lng ? getDistance(userLocation.lat, userLocation.lng, selectedTemplo.lat, selectedTemplo.lng) : undefined}
                                horarios={selectedTemplo.horarios}
                                referencias={selectedTemplo.referencias}
                              />
                            </li>
                          )
                          : templosMostrados.map((t, i) => (
                            <li key={i} className="list-none">
                              <TemploCard
                                nombre={t.nombre || ''}
                                direccion={t.direccion}
                                estado={t.estado}
                                cp={t.cp}
                                pluscode={t.pluscode}
                                telefono={t.telefono}
                                mapsUrl={t.mapsUrl}
                                distanciaKm={userLocation && t.lat && t.lng ? getDistance(userLocation.lat, userLocation.lng, t.lat, t.lng) : undefined}
                                horarios={t.horarios}
                                referencias={t.referencias}
                              />
                            </li>
                          ))}
                        {/* Al final de la lista, solo en desktop */}
                        {!selectedTemplo && (
                          <li className="hidden md:flex list-none mt-4 flex-col items-center justify-center">
                            <hr className="w-full border-t border-gray-300 dark:border-gray-700 mb-2" />
                            <div className="text-center text-sm md:text-base font-medium mb-2">Fin de la lista</div>
                            <button
                              className="px-4 py-1 border border-black dark:border-white rounded-full font-semibold text-black dark:text-white bg-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm"
                              onClick={() => {
                                const list = document.querySelector('.max-w-lg');
                                if (list) list.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }}
                            >
                              Ir al inicio del listado
                            </button>
                          </li>
                        )}
                      </ul>
                    )}
                  </>
                )
              )}
              {/* Botón para usar ubicación actual */}
              {!mostrarTodos && (
                <button
                  className="flex items-center justify-center gap-2 mt-7 mb-2 mr-4 text-black dark:text-white font-medium text-center text-base underline bg-transparent border-none outline-none cursor-pointer transition-transform duration-200 hover:scale-105 hover:shadow-md focus-visible:outline-none"
                  style={{ boxShadow: 'none' }}
                  onClick={handleUseLocation}
                  type="button"
                >
                  <LocateFixed className="w-5 h-5" />
                  Usar mi ubicación
                </button>
              )}
            </div>
            {/* Sección mensaje/botón/enlace solo si NO se muestran todos los templos */}
            {!mostrarTodos && (
              <>
                {/* Mensaje */}
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="font-bold text-sm md:text-base text-black dark:text-white mb-0 text-center max-w-xl whitespace-nowrap">
                    Por el momento no estamos ahí.
                  </div>
                  <div className="text-xs md:text-sm text-black dark:text-gray-300 text-center max-w-xl mb-0 whitespace-nowrap">
                    Seguimos trabajando para ofrecerte una experiencia completa.
                  </div>
                </div>
                {/* Botón */}
                <Link href="/campus-online" passHref className='mx-auto'>
                  <button className="mx-auto mb-0 px-4 md:px-6 py-2 border-2 border-black dark:border-white rounded-full font-bold text-black dark:text-white bg-transparent hover:bg-black/10 dark:hover:bg-white/10 transition-colors w-auto min-w-[140px] md:min-w-[180px] text-sm md:text-base">
                    Ir a campus online
                  </button>
                </Link>
                {/* Enlace */}
                <button
                  className="underline text-black dark:text-white font-medium text-center block text-sm md:text-base mb-4 md:mb-25 mt-0"
                  onClick={() => setMostrarTodos(true)}
                >
                  Ver todos los templos
                </button>
              </>
            )}
          </div>
        )}
        {/* Columna derecha: mapa */}
        {(tab === 'map' || typeof window === 'undefined' || window.innerWidth >= 768) && (
          <div className="flex-1 min-h-[180px] md:min-h-[400px] max-h-[500px] bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden flex flex-col items-center justify-center mt-4 md:mt-0 w-full max-w-sm sm:max-w-full mx-auto">
            {/* Mostrar mapa solo si tab=map en mobile o siempre en desktop */}
            <MapaTemplos selectedTemplo={direccionToTemplo(selectedTemplo)} />
          </div>
        )}
      </div>
      {/* Sección "Y recuerda..." debajo del mapa, alineada con el inicio del mapa */}
      <div className="w-full flex justify-center">
        <div className="max-w-full sm:max-w-sm w-full mt-8 sm:mt-12 ml-0 sm:ml-auto mr-0 sm:mr-16 lg:mr-32 xl:mr-110 px-2 sm:px-0">
          <hr className="w-12 sm:w-16 border-t-2 border-black dark:border-white mb-2" />
          <h2 className="text-xl sm:text-2xl font-serif font-normal mb-2 sm:mb-3 text-black dark:text-white">Y recuerda...</h2>
          <p className="mb-1 sm:mb-2 text-sm sm:text-base text-black dark:text-white"><b>No dejemos de congregarnos, </b>como acostumbran hacer algunos, <b>sino animémonos unos a otros, </b> y con mayor razón ahora que vemos que aquel día se acerca.</p>
            <p className="text-sm sm:text-base text-black dark:text-white font-['Playfair_Display'] italic"><b>Hebreos 10:25 NVI</b></p>
          <hr className="w-12 sm:w-16 border-t-2 border-black dark:border-white mt-3 sm:mt-4" />
        </div>
      </div>
    </div>
  );
}