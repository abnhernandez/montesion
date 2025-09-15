'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import BarranavAula from "@/components/aula/barranav";
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Bootcamp {
  id: string;
  title: string;
  description: string;
  image: string;
}

export default function MisBootcampsPage() {
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBootcamps() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.from('bootcamps').select('*').eq('activo', true);
      if (error) setError('Error al cargar bootcamps');
      setBootcamps(
        (data || []).map((b: Record<string, unknown>) => ({
          id: String(b.id),
          title: String(b.titulo || b.title),
          description: String(b.descripcion || b.description),
          image: String(b.imagen_url || b.image),
        }))
      );
      setLoading(false);
    }
    fetchBootcamps();
  }, []);

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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={b.image} alt={b.title} className="object-contain h-32" />
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
