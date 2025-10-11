'use client'

import { useEffect, useMemo, useState } from "react";
import BannerAlert from "@/components/ui/BannerAlert";
import { createClient } from '@/utils/supabase/client';
import { useAuth } from '@/app/auth-context';
import { useSearchParams, useRouter } from "next/navigation";
import BienvenidaUsuarios from "@/components/aula/bienvenida_usuarios";
import Navbar from "@/components/aula/navbar";
import BarranavAula from "@/components/aula/barranav";
import MisBootcamps from "@/components/aula/misbootcamps";
import Aviso from "@/components/aula/aviso";
import CursosPopulares from "@/components/aula/cursospopulares";
import BootcampsReplays from "@/components/aula/replays";
import RutasAprendizaje from "@/components/aula/rutasaprendizaje";
import CursosNuevos from "@/components/aula/cursosnuevos";

import type { Bootcamp } from "@/components/aula/misbootcamps";
import type { AvisoProps } from "@/components/aula/aviso";
import type { CursoPopular } from "@/components/aula/cursospopulares";
import type { BootcampReplay } from "@/components/aula/replays";
import type { RutaAprendizaje } from "@/components/aula/rutasaprendizaje";
import type { CursoNuevo } from "@/components/aula/cursosnuevos";

// Create supabase client inside the component via useMemo to reuse the project's helper

type Favorito = {
  id: string;
  title: string;
  image?: string;
  students?: number;
  teacher?: string;
  badge?: string;
};

export default function MisCursosPage() {
  const [username, setUsername] = useState<string>("");
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [bootcamps, setBootcamps] = useState<Bootcamp[]>([]);
  const [aviso, setAviso] = useState<AvisoProps | null>(null);
  const [cursosPopulares, setCursosPopulares] = useState<CursoPopular[]>([]);
  const [replays, setReplays] = useState<BootcampReplay[]>([]);
  const [rutas, setRutas] = useState<RutaAprendizaje[]>([]);
  const [cursosNuevos, setCursosNuevos] = useState<CursoNuevo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const viewFavoritos = useMemo(() => searchParams?.get("favoritos") === "true", [searchParams]);

  // Mostrar banner si viene de redirección por login ya iniciado
  const showBanner = searchParams?.get("alert") === "already-logged-in";

  // Use centralized auth context
  const { user, loading: authLoading } = useAuth();

  const router = useRouter();
  // Create supabase client using project helper (memoized)
  const supabase: ReturnType<typeof createClient> | null = useMemo(() => {
    try {
      return createClient();
    } catch (err) {
      console.warn('Could not create supabase client:', err)
      return null
    }
  }, []);

  useEffect(() => {
    // Redirect unauthenticated users to the sign-in page
    if (!authLoading && !user) {
      // preserve redirect back to this page after login
      const redirectTo = encodeURIComponent('/usuarios/mis_cursos')
      router.replace(`/users/sign_in?redirect=${redirectTo}`)
      return
    }

    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        // Wait until auth initializes
        if (authLoading) return;

        // If there's no user (e.g. unauthenticated), don't attempt to fetch private data
        if (!user) {
          setLoading(false)
          return
        }

        // Ensure supabase client exists before calling DB
        if (!supabase) {
          console.warn('Supabase client not available in MisCursosPage')
          setLoading(false)
          return
        }

        setUsername(user?.user_metadata?.username || user?.email || "Usuario");

        if (viewFavoritos) {
          // Vista Mi lista (favoritos): si falla, mostramos landing vacía
          if (!user?.id) {
            setFavoritos([]);
          } else {
            const { data, error } = await supabase
              .from('cursos_favoritos')
              .select('*')
              .eq('user_id', user.id);
            if (!error) {
              setFavoritos((data || []).map((c: Record<string, unknown>) => ({
                id: String(c.id || c.course_id),
                title: String(c.title || c.titulo),
                image: String(c.image || c.imagen_url),
                students: Number(c.students || c.estudiantes) || 0,
                teacher: String(c.teacher || c.profesor),
                badge: String(c.badge || c.etiqueta),
              })));
            } else {
              setFavoritos([]);
            }
          }
        } else {
          const [
            { data: bootcampsData },
            { data: avisoData },
            { data: cursosPopularesData },
            { data: replaysData },
            { data: rutasData },
            { data: cursosNuevosData }
          ] = await Promise.all([
            supabase.from('bootcamps').select('*').eq('activo', true),
            supabase.from('avisos').select('*').eq('destacado', true).single(),
            supabase.from('cursos_populares').select('*'),
            supabase.from('bootcamp_replays').select('*'),
            supabase.from('rutas_aprendizaje').select('*'),
            supabase.from('cursos_nuevos').select('*'),
          ]);

          setBootcamps((bootcampsData || []).map((b: Record<string, unknown>) => ({
            id: String(b.id),
            title: String(b.titulo || b.title),
            description: String(b.descripcion || b.description),
            image: String(b.imagen_url || b.image),
            badge: String(b.etiqueta || b.badge),
          })));

          if (avisoData) {
            setAviso({
              title: avisoData.title || avisoData.titulo,
              subtitle: avisoData.subtitle || avisoData.subtitulo,
              buttonText: avisoData.buttonText || avisoData.boton_texto,
              buttonUrl: avisoData.buttonUrl || avisoData.boton_url,
              note: avisoData.note || avisoData.nota,
              background: avisoData.background,
            });
          } else {
            setAviso(null);
          }

          setCursosPopulares((cursosPopularesData || []).map((c: Record<string, unknown>) => ({
            id: String(c.id),
            title: String(c.title || c.titulo),
            image: String(c.image || c.imagen_url),
            teacher: String(c.teacher || c.profesor),
            teacherAvatar: String(c.teacherAvatar || c.avatar_url),
            rating: Number(c.rating) || 0,
            students: Number(c.students || c.estudiantes) || 0,
            top: Boolean(c.top || c.es_top),
          })));

          setReplays((replaysData || []).map((r: Record<string, unknown>) => ({
            id: String(r.id),
            title: String(r.title || r.titulo),
            image: String(r.image || r.imagen_url || r.thumbnails),
            clase: String(r.clase),
            rating: Number(r.rating) || 0,
            students: Number(r.students || r.estudiantes) || 0,
          })));

          setRutas((rutasData || []).map((r: Record<string, unknown>) => ({
            id: String(r.id),
            title: String(r.title || r.titulo),
            cursos: Number(r.cursos) || 0,
            tiempo: String(r.tiempo),
            nivel: String(r.nivel),
          })));

          setCursosNuevos((cursosNuevosData || []).map((c: Record<string, unknown>) => ({
            id: String(c.id),
            title: String(c.title || c.titulo),
            image: String(c.image || c.imagen_url),
            teacher: String(c.teacher || c.profesor),
            students: Number(c.students || c.estudiantes) || 0,
          })));
        }

        // Solo mostrar error si ocurre una excepción real
      } catch {
        setError('Error al cargar datos.');
      }
      setLoading(false);
    }
    fetchAll();
  }, [viewFavoritos, authLoading, user, supabase, router]);




  return (
    <>
      {showBanner && (
        <>
          <BannerAlert message="Ya iniciaste sesión." duration={4000} />
        </>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
        {!viewFavoritos && (
          <div>
            <Navbar/>
            <BienvenidaUsuarios username={username} />
          </div>
        )}
        <div className={`flex flex-col items-center space-y-4 sm:space-y-6 ${viewFavoritos ? 'mt-8 sm:mt-12' : ''}`}>
          <BarranavAula />
        </div>

          {/* Spinner de carga eliminado */}

        {error && (
          <div className="text-center py-4 font-semibold text-lg">{error}</div>
        )}

        {!loading && !error && (
          <div className="space-y-10">
            {viewFavoritos ? (
              <section>
                <h2 className="text-3xl font-extrabold mb-6">Mi lista</h2>
                {favoritos.length === 0 ? (
                  <div className="flex flex-col items-center text-center py-8">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/assets-favoritos.png" alt="Mi lista vacía" className="w-[420px] max-w-full mb-6" />
                    <p className="text-lg mb-6">Aún no has agregado ningún curso</p>
                    <a href="/cursos" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition-colors">
                      Explorar librería
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {favoritos.map(f => (
                      <article key={f.id} className="rounded-2xl overflow-hidden shadow-sm border bg-white">
                        <div className="h-28 bg-gradient-to-b from-slate-900 to-slate-800 relative flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                            {f.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={f.image} alt={f.title} className="w-10 h-10 object-contain" />
                            ) : (
                              <span className="text-white text-lg">🎓</span>
                            )}
                          </div>
                          <div className="absolute left-4 right-4 bottom-0 h-3 rounded-full bg-emerald-400" />
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                            {typeof f.students === 'number' && (
                              <span>{f.students} Estudiantes</span>
                            )}
                          </div>
                          {f.teacher && (
                            <div className="text-sm">Por: {f.teacher}</div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            ) : (
              <section>
                {bootcamps.length > 0 && (
                  <MisBootcamps bootcamps={bootcamps} />
                )}
              </section>
            )}

            {!viewFavoritos && aviso && (
              <section>
                <Aviso {...aviso} />
              </section>
            )}

            {!viewFavoritos && (
              <>
                <section>
                  <h2 className="text-xl font-bold mb-4">Cursos Populares</h2>
                  {cursosPopulares.length > 0 && (
                    <div className="sm:grid-cols-2">
                      <CursosPopulares cursos={cursosPopulares} />
                    </div>
                  )}
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-4">Replays de Bootcamps</h2>
                  {replays.length > 0 && (
                    <div className="sm:grid-cols-2">
                      <BootcampsReplays bootcamps={replays} />
                    </div>
                  )}
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-4">Rutas de Aprendizaje</h2>
                  {rutas.length > 0 && (
                    <div className="sm:grid-cols-2">
                      <RutasAprendizaje rutas={rutas} />
                    </div>
                  )}
                </section>

                <section>
                  <h2 className="text-xl font-bold mb-4">Cursos Nuevos</h2>
                  {cursosNuevos.length > 0 && (
                    <div className="sm:grid-cols-2">
                      <CursosNuevos cursos={cursosNuevos} />
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        )}
      </main>
    </>
  );
}