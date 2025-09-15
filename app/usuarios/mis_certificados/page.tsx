'use client'

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import BarranavAula from "@/components/aula/barranav";
import { Download, Star } from "lucide-react";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

type Certificado = {
  id: string;
  titulo: string;
  tipo: 'curso' | 'bootcamp' | 'ruta' | 'replay' | 'evento' | 'laboratorio';
  fecha: string;
  codigo: string;
  nombre_usuario: string;
  descarga_url?: string;
};

const categorias = [
  { id: 'todos', label: 'Todos' },
  { id: 'bootcamps', label: 'Bootcamps' },
  { id: 'cursos', label: 'Cursos' },
  { id: 'rutas', label: 'Rutas de estudio' },
  { id: 'replays', label: 'Bootcamps Replays' },
  { id: 'eventos', label: 'Eventos' },
  { id: 'laboratorios', label: 'Laboratorios' },
];

export default function MisCertificadosPage() {
  const [certificados, setCertificados] = useState<Certificado[]>([]);
  const [categoriaActiva, setCategoriaActiva] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarCertificados() {
      setLoading(true);
      setError(null);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;

        if (!userId) {
          setError('Usuario no autenticado');
          return;
        }

        // Consultar certificados del usuario
        const { data, error } = await supabase
          .from('certificados_usuarios')
          .select('*')
          .eq('user_id', userId);

        if (error) throw error;

        const mapeados: Certificado[] = (data || []).map((c: Record<string, unknown>) => ({
          id: String(c.id),
          titulo: String(c.titulo || c.title),
          tipo: (c.tipo as 'curso' | 'bootcamp' | 'ruta' | 'replay' | 'evento' | 'laboratorio') || 'curso',
          fecha: String(c.fecha_completado || c.fecha),
          codigo: String(c.codigo_certificado || c.codigo),
          nombre_usuario: String(c.nombre_usuario || user.user_metadata?.nombre || 'Usuario'),
          descarga_url: String(c.descarga_url || c.url_descarga),
        }));

        setCertificados(mapeados);
      } catch {
        setError('No se pudieron cargar los certificados.');
      }
      setLoading(false);
    }
    cargarCertificados();
  }, []);

  const certificadosFiltrados = categoriaActiva === 'todos' 
    ? certificados 
    : certificados.filter(c => c.tipo === categoriaActiva);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col items-center py-8 sm:py-12 space-y-4 sm:space-y-6">
        <BarranavAula />
      </div>

      <h1 className="text-2xl sm:text-3xl font-extrabold mb-6">Todos mis certificados</h1>

      {/* Barra de navegación de categorías */}
      <div
        className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 mb-6 sm:mb-8 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          overscrollBehaviorX: 'contain',
          WebkitOverflowScrolling: 'touch',
          touchAction: 'pan-x'
        }}
      >
        {categorias.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategoriaActiva(cat.id)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors relative ${
              categoriaActiva === cat.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {cat.id === 'laboratorios' && <Star className="w-4 h-4" />}
            {cat.label}
            {categoriaActiva === cat.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-2 border-transparent border-t-blue-600" />
            )}
          </button>
        ))}
        <style>{`
          .overflow-x-auto::-webkit-scrollbar { display: none; }
        `}</style>
      </div>

      {/* Se elimina el estado de carga con esqueletos para certificados */}

      {error && (
        <div className="text-center py-6 font-semibold text-red-600">{error}</div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificadosFiltrados.map((cert) => (
            <div key={cert.id} className="bg-white rounded-lg border shadow-sm overflow-hidden">
              {/* Certificado visual */}
              <div className="relative h-64 bg-gradient-to-b from-gray-50 to-gray-100 p-6">
                <div className="absolute top-4 left-4 text-xs text-gray-500 font-medium">
                  montesion
                </div>
                
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-green-600 font-semibold text-lg mb-2">
                    {cert.nombre_usuario}
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-900 mb-4">
                      Curso en Monte Sion
                    </div>
                    <div className="text-xs text-gray-500 mb-4">
                      {new Date(cert.fecha).toLocaleDateString('es-ES', { 
                        year: 'numeric', 
                        month: 'long' 
                      })}
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {cert.codigo}
                    </div>
                  </div>
                </div>

                {/* Patrón de fondo */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-200 opacity-30">
                  <div className="flex h-full">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="bg-gray-300 mr-1"
                        style={{ 
                          width: '4px', 
                          height: `${Math.random() * 60 + 20}%` 
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Información del curso */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {cert.titulo}
                </h3>
                <button
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                  onClick={() => {
                    if (cert.descarga_url) {
                      window.open(cert.descarga_url, '_blank');
                    } else {
                      // Generar PDF o descarga
                      console.log('Descargar certificado:', cert.id);
                    }
                  }}
                >
                  <Download className="w-4 h-4" />
                  Descargar certificado
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && !error && certificadosFiltrados.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg mb-4">
            No tienes certificados en esta categoría
          </div>
          <div className="text-gray-400">
            Completa cursos para obtener tus certificados
          </div>
        </div>
      )}
    </main>
  );
}
