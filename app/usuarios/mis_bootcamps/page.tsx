'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth-context";
import { supabase } from '@/lib/supabase-client';
import BarranavAula from "@/components/aula/barranav";
import Image from 'next/image';

interface Bootcamp {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function MisBootcampsPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth() || {};
  // Redirigir si no está autenticado
  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/users/sign_in");
    }
  }, [user, authLoading, router]);
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBootcamps() {
      setLoading(true);
      setError(null);

      try {
        // Esperar que auth esté listo
        if (authLoading) return;

        // Si no hay usuario, no intentar obtener datos privados
        if (!user) {
          setLoading(false);
          return;
        }

        // 1) Intentar obtener inscripciones junto con los datos del bootcamp (join) para ahorrar queries
        type JoinedRow = {
          progreso?: number;
          completado?: boolean;
          bootcamp?: Record<string, unknown> | null;
        };

        let bootcampRows: Record<string, unknown>[] = [];

        try {
          // Intentar select relacional: alias 'bootcamp' desde fk bootcamp_id
          const { data: joined, error: joinErr } = await supabase
            .from('inscripciones_bootcamps')
            .select('progreso, completado, bootcamp:bootcamp_id(id, titulo, descripcion, imagen_url, estudiantes, activo)')
            .eq('user_id', user.id);

          if (!joinErr && joined && Array.isArray(joined) && joined.length > 0) {
            // Supabase may return nested arrays for the joined table; normalize shape
            const rowsRaw = joined as unknown as Record<string, unknown>[];
            const rows: JoinedRow[] = rowsRaw.map(r => {
              // r.bootcamp may be an array (if fk produces array) or object
              const rObj = r as Record<string, unknown>;
              const bootRaw = rObj['bootcamp'] as unknown;
              const bootObj = Array.isArray(bootRaw) ? (bootRaw[0] as Record<string, unknown>) : (bootRaw as Record<string, unknown> | undefined);
              return {
                progreso: rObj['progreso'] as number | undefined,
                completado: rObj['completado'] as boolean | undefined,
                bootcamp: (bootObj as Record<string, unknown>) || null,
              };
            });
            // Extraer sólo los bootcamps activos y acompañarlos con progreso/completado
            const mapped: Record<string, unknown>[] = rows
              .map(r => ({ ...((r.bootcamp as Record<string, unknown>) || {}), progreso: r.progreso, completado: r.completado }))
              .filter((b: Record<string, unknown>) => Boolean(b) && (b['activo'] === undefined || b['activo'] === true));

            // Priorizar: items con progreso>0 primero, luego completados, luego por progreso desc, luego por estudiantes desc
            mapped.sort((a: Record<string, unknown>, b: Record<string, unknown>) => {
              const aProg = Number(a['progreso'] || 0);
              const bProg = Number(b['progreso'] || 0);
              const aComp = Boolean(a['completado']) ? 1 : 0;
              const bComp = Boolean(b['completado']) ? 1 : 0;
              if ((aProg > 0) !== (bProg > 0)) return (bProg > 0 ? 1 : 0) - (aProg > 0 ? 1 : 0);
              if (aComp !== bComp) return bComp - aComp;
              if (aProg !== bProg) return bProg - aProg;
              return Number(b['estudiantes'] || 0) - Number(a['estudiantes'] || 0);
            });

            bootcampRows = mapped as Record<string, unknown>[];
          }
        } catch (e) {
          console.warn('Join select failed, will fallback to ids approach', e);
        }

        // 2) Si no encontró inscripciones o no devolvió filas, usar catálogo general ordenado por popularidad
        if (!bootcampRows || bootcampRows.length === 0) {
          const { data: catalogData, error } = await supabase
            .from('bootcamps')
            .select('*')
            .eq('activo', true)
            .order('estudiantes', { ascending: false })
            .limit(12);
          if (error) throw error;
          bootcampRows = catalogData as Record<string, unknown>[];
        }

        setBootcamps(
          (bootcampRows || []).map((b: Record<string, unknown>) => ({
            id: String(b.id || b.bootcamp_id || b.course_id),
            title: String(b.titulo || b.title || b.nombre || ''),
            description: String(b.descripcion || b.description || b.summary || ''),
            image: String(b.imagen_url || b.image || b.thumbnail || ''),
          }))
        );
      } catch (err) {
        console.error('fetchBootcamps error', err);
        setError('Error al cargar bootcamps');
      } finally {
        setLoading(false);
      }
    }

    fetchBootcamps();
  }, [user, authLoading]);
 
  // Si no hay usuario, no renderizar nada
  if (!user) return null;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col items-center py-12 space-y-6">
        <BarranavAula />
      </div>

      <h1 className="text-3xl font-extrabold mb-8">Mis Bootcamps</h1>
      {loading && <div className="py-8">Cargando bootcamps...</div>}
      {error && <div className="text-red-500 py-8">{error}</div>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-start">
          {bootcamps.map(b => (
            <div key={b.id} className="rounded-2xl shadow border overflow-hidden flex flex-col">
              <div className="h-48 w-full flex items-center justify-center bg-gray-100">
                {b.image ? (
                  <Image
                    src={b.image}
                    alt={b.title}
                    width={400}
                    height={160}
                    className="object-contain h-32"
                    unoptimized
                  />
                ) : (
                  <div className="text-gray-400">No image</div>
                )}
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="font-bold text-lg mb-2">{b.title}</h2>
                  <p className="text-base">{b.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );

}
