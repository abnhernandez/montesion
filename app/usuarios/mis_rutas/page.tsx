'use client'

import { useEffect, useState } from "react";
import { createClient } from '@supabase/supabase-js';
import RutasAprendizaje, { type RutaAprendizaje } from "@/components/aula/rutasaprendizaje";
import BarranavAula from "@/components/aula/barranav";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function MisRutasPage() {
  const [rutas, setRutas] = useState<RutaAprendizaje[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function cargarRutas() {
      setLoading(true);
      setError(null);
      try {
        const { data: auth } = await supabase.auth.getUser();
        const userId = auth.user?.id;

        // 1) Intentar obtener rutas específicas del usuario, si existe tabla user-scoped
        let rutasUsuario: Record<string, unknown>[] | null = null;

        if (userId) {
          const { data, error } = await supabase
            .from('rutas_aprendizaje_usuarios')
            .select('*')
            .eq('user_id', userId);
          if (!error) rutasUsuario = data as Record<string, unknown>[];
        }

        // 2) Si no hay tabla/resultado, usar catálogo general de rutas
        if (!rutasUsuario || rutasUsuario.length === 0) {
          const { data, error } = await supabase.from('rutas_aprendizaje').select('*');
          if (error) throw error;
          rutasUsuario = data as Record<string, unknown>[];
        }

        const mapeadas: RutaAprendizaje[] = (rutasUsuario || []).map((r: Record<string, unknown>) => ({
          id: String(r.id),
          title: String(r.title || r.titulo),
          cursos: Number(r.cursos) || 0,
          tiempo: String(r.tiempo),
          nivel: String(r.nivel),
        }));

        setRutas(mapeadas);
      } catch {
        setError('No se pudieron cargar tus rutas.');
      }
      setLoading(false);
    }
    cargarRutas();
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
    <div className="flex flex-col items-center py-8 sm:py-12 space-y-4 sm:space-y-6">
        <BarranavAula />
      </div>
      <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6">Mis rutas de aprendizaje</h1>

      {loading && (
        <div className="space-y-4">
          <div className="animate-pulse h-8 w-40 sm:w-48 rounded bg-foreground/10" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-xl h-40 w-full border" />
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="text-center py-6 font-semibold">{error}</div>
      )}

      {!loading && !error && (
        <RutasAprendizaje rutas={rutas} />
      )}
    </main>
  );
}


