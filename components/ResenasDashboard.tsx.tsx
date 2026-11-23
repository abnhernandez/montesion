"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { MessageSquareQuote, Plus, Search, Star, Eye, EyeOff, Pencil, Trash2, X, Loader2, AlertTriangle, ExternalLink } from "lucide-react";
import { guardarResena, eliminarResena, cambiarVisibilidadResena } from "@/lib/resenasAdmin";

export type ResenaAdmin = {
  id: string; autor: string; comentario: string | null; calificacion: number | null;
  fecha_publicacion: string | null; fuente: string; url_fuente: string | null;
  avatar_url: string | null; visible: boolean; orden: number;
  created_at: string | null; fecha_relativa: string | null;
};

type Props = { resenas: ResenaAdmin[]; error: string | null };
const field = "mt-1.5 w-full rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-sm text-white outline-none focus:border-[#F5BE52]";
const label = "block text-xs font-semibold text-neutral-300";
const empty: ResenaAdmin = { id: "", autor: "", comentario: null, calificacion: null, fecha_publicacion: null, fuente: "Google Maps", url_fuente: null, avatar_url: null, visible: true, orden: 0, created_at: null, fecha_relativa: null };

function fechaLocal(iso: string | null) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Mexico_City", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const p = (key: string) => parts.find((x) => x.type === key)?.value ?? "";
  return `${p("year")}-${p("month")}-${p("day")}`;
}

export default function ResenasDashboard({ resenas, error }: Props) {
  const router = useRouter();
  const [busqueda, setBusqueda] = useState("");
  const [filtro, setFiltro] = useState("todas");
  const [editando, setEditando] = useState<ResenaAdmin | null>(null);
  const [abierto, setAbierto] = useState(false);
  const [borrando, setBorrando] = useState<ResenaAdmin | null>(null);
  const [mensaje, setMensaje] = useState("");
  const [pending, startTransition] = useTransition();
  const [visibleFormulario, setVisibleFormulario] = useState(true);

  const visibles = resenas.filter((r) => r.visible).length;
  const filtradas = useMemo(() => resenas.filter((r) => {
    const texto = `${r.autor} ${r.comentario ?? ""} ${r.fuente}`.toLowerCase();
    return texto.includes(busqueda.trim().toLowerCase()) && (filtro === "todas" || (filtro === "visibles" ? r.visible : !r.visible));
  }), [resenas, busqueda, filtro]);

  function abrir(r?: ResenaAdmin) {
    const actual = r ?? empty;
    setEditando(actual);
    setVisibleFormulario(actual.visible);
    setMensaje("");
    setAbierto(true);
  }

  function guardar(formData: FormData) {
    formData.set("visible", String(visibleFormulario));
    startTransition(async () => {
      const result = await guardarResena(formData);
      if (!result.ok) { setMensaje(result.error ?? "No se pudo guardar."); return; }
      setAbierto(false);
      setEditando(null);
      setMensaje("");
      router.refresh();
    });
  }

  function visibilidad(r: ResenaAdmin) {
    setMensaje("");
    startTransition(async () => {
      const result = await cambiarVisibilidadResena(r.id, !r.visible);
      if (!result.ok) setMensaje(result.error ?? "No se pudo actualizar la visibilidad.");
      else router.refresh();
    });
  }

  function eliminar() {
    if (!borrando) return;
    startTransition(async () => {
      const result = await eliminarResena(borrando.id);
      if (!result.ok) { setMensaje(result.error ?? "No se pudo eliminar."); setBorrando(null); return; }
      setBorrando(null);
      setMensaje("");
      router.refresh();
    });
  }

  return (
    <div className="space-y-7 text-white">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#F5BE52]"><MessageSquareQuote size={16} /> Administración de testimonios</p>
          <h1 className="text-3xl font-black tracking-tight md:text-5xl">RESEÑAS</h1>
          <p className="mt-3 text-sm text-neutral-400">Administra las reseñas que aparecen en la página principal.</p>
        </div>
        <button type="button" onClick={() => abrir()} className="flex items-center gap-2 rounded-xl bg-[#F5BE52] px-5 py-3 text-sm font-bold text-black hover:bg-[#FFD277]"><Plus size={18} /> Nueva reseña</button>
      </header>

      <section className="grid gap-4 sm:grid-cols-3">
        {[["Total", resenas.length], ["Visibles", visibles], ["Ocultas", resenas.length - visibles]].map(([nombre, numero]) => (
          <div key={nombre} className="rounded-2xl border border-white/10 bg-[#151515] p-5"><p className="text-3xl font-black">{numero}</p><p className="mt-2 text-sm text-neutral-400">{nombre}</p></div>
        ))}
      </section>

      {(error || mensaje) && <div role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">{error || mensaje}</div>}

      <section className="overflow-hidden rounded-2xl border border-white/10 bg-[#111111]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 p-5">
          <div><h2 className="font-bold">Listado de reseñas</h2><p className="mt-1 text-xs text-neutral-500">{filtradas.length} resultados</p></div>
          <div className="flex flex-wrap gap-3">
            <div className="relative"><Search size={16} className="absolute left-3 top-3.5 text-neutral-500"/><input aria-label="Buscar reseñas" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar autor o comentario" className="w-full rounded-xl border border-white/10 bg-[#202020] py-3 pl-10 pr-3 text-sm outline-none focus:border-[#F5BE52] sm:w-64"/></div>
            <select aria-label="Filtrar reseñas" value={filtro} onChange={(e) => setFiltro(e.target.value)} className="rounded-xl border border-white/10 bg-[#202020] px-3 text-sm"><option value="todas">Todas</option><option value="visibles">Visibles</option><option value="ocultas">Ocultas</option></select>
          </div>
        </div>
        {filtradas.length === 0 ? <p className="p-12 text-center text-sm text-neutral-400">No hay reseñas para mostrar.</p> : (
          <div className="divide-y divide-white/10">
            {filtradas.map((r) => (
              <article key={r.id} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex min-w-0 items-start gap-4">
                  {r.avatar_url ? <img src={r.avatar_url} alt="" className="h-12 w-12 shrink-0 rounded-full object-cover" /> : <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5BE52]/10 font-bold text-[#F5BE52]">{r.autor.slice(0, 1).toUpperCase()}</div>}
                  <div className="min-w-0"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold">{r.autor}</h3><span className={`rounded-full px-2 py-1 text-[10px] font-bold ${r.visible ? "bg-emerald-500/10 text-emerald-400" : "bg-amber-500/10 text-amber-400"}`}>{r.visible ? "Visible" : "Oculta"}</span></div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-neutral-400"><span>{r.fuente}</span><span>· Orden {r.orden}</span>{r.calificacion !== null && <span className="flex items-center gap-1 text-[#F5BE52]"><Star size={12} fill="currentColor" /> {r.calificacion}/5</span>}{r.fecha_relativa && <span>· {r.fecha_relativa}</span>}</div>
                    {r.comentario && <p className="mt-2 line-clamp-3 max-w-2xl text-sm leading-relaxed text-neutral-300">{r.comentario}</p>}
                    {r.url_fuente && <a href={r.url_fuente} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex items-center gap-1 text-xs text-[#F5BE52] hover:underline">Ver fuente <ExternalLink size={12}/></a>}
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap gap-2">
                  <button disabled={pending} onClick={() => visibilidad(r)} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/10">{r.visible ? <EyeOff size={15}/> : <Eye size={15}/>} {r.visible ? "Ocultar" : "Mostrar"}</button>
                  <button disabled={pending} onClick={() => abrir(r)} className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/10"><Pencil size={15}/> Editar</button>
                  <button disabled={pending} onClick={() => { setMensaje(""); setBorrando(r); }} className="flex items-center gap-2 rounded-lg border border-red-500/20 px-3 py-2 text-xs text-red-300 hover:bg-red-500/10"><Trash2 size={15}/> Eliminar</button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {abierto && editando && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm" onMouseDown={(e) => { if (e.target === e.currentTarget && !pending) setAbierto(false); }}>
        <div role="dialog" aria-modal="true" aria-labelledby="resena-modal-title" className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#121212] shadow-2xl">
          <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#121212] p-5"><div><p className="text-[10px] font-bold tracking-[.2em] text-[#F5BE52]">MONTE SION · ADMIN</p><h2 id="resena-modal-title" className="mt-1 text-xl font-black">{editando.id ? "Editar reseña" : "Nueva reseña"}</h2></div><button aria-label="Cerrar" disabled={pending} onClick={() => setAbierto(false)}><X size={22}/></button></div>
          <form action={guardar} className="space-y-5 p-5 sm:p-6">
            <input type="hidden" name="id" value={editando.id}/>
            <div><label className={label} htmlFor="resena-autor">Autor *</label><input id="resena-autor" name="autor" required maxLength={160} defaultValue={editando.autor} className={field}/></div>
            <div><label className={label} htmlFor="resena-comentario">Comentario</label><textarea id="resena-comentario" name="comentario" rows={4} maxLength={5000} defaultValue={editando.comentario ?? ""} className={field}/></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label className={label} htmlFor="resena-calificacion">Calificación (1–5)</label><select id="resena-calificacion" name="calificacion" defaultValue={editando.calificacion ?? ""} className={field}><option value="">Sin calificación</option>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n} estrellas</option>)}</select></div><div><label className={label} htmlFor="resena-orden">Orden en carrusel</label><input id="resena-orden" name="orden" type="number" min={-100000} max={100000} defaultValue={editando.orden} className={field}/></div></div>
            <div className="grid gap-4 sm:grid-cols-2"><div><label className={label} htmlFor="resena-fuente">Fuente *</label><input id="resena-fuente" name="fuente" required maxLength={120} defaultValue={editando.fuente} className={field}/></div><div><label className={label} htmlFor="resena-fecha">Fecha de publicación</label><input id="resena-fecha" name="fecha_publicacion" type="date" defaultValue={fechaLocal(editando.fecha_publicacion)} className={field}/></div></div>
            <div><label className={label} htmlFor="resena-relativa">Fecha relativa</label><input id="resena-relativa" name="fecha_relativa" placeholder="Ej. Hace 2 meses" maxLength={100} defaultValue={editando.fecha_relativa ?? ""} className={field}/></div>
            <div><label className={label} htmlFor="resena-url">Enlace de la reseña original</label><input id="resena-url" name="url_fuente" type="url" placeholder="https://..." defaultValue={editando.url_fuente ?? ""} className={field}/></div>
            <div><label className={label} htmlFor="resena-avatar">URL de fotografía/avatar</label><input id="resena-avatar" name="avatar_url" type="url" placeholder="https://..." defaultValue={editando.avatar_url ?? ""} className={field}/></div>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm"><input type="checkbox" checked={visibleFormulario} onChange={(e) => setVisibleFormulario(e.target.checked)} className="accent-[#F5BE52]"/> Mostrar esta reseña en la página pública</label>
            {mensaje && <p role="alert" className="text-sm text-red-300">{mensaje}</p>}
            <div className="flex justify-end gap-3 border-t border-white/10 pt-5"><button type="button" disabled={pending} onClick={() => setAbierto(false)} className="rounded-xl border border-white/10 px-5 py-3 text-sm">Cancelar</button><button type="submit" disabled={pending} className="flex items-center gap-2 rounded-xl bg-[#F5BE52] px-5 py-3 text-sm font-bold text-black disabled:opacity-50">{pending && <Loader2 size={16} className="animate-spin"/>} {pending ? "Guardando..." : "Guardar reseña"}</button></div>
          </form>
        </div>
      </div>}

      {borrando && <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 p-4"><div role="alertdialog" aria-modal="true" aria-labelledby="resena-borrar-title" className="w-full max-w-md rounded-2xl border border-red-500/20 bg-[#151515] p-6"><AlertTriangle className="mb-4 text-red-400" size={28}/><h2 id="resena-borrar-title" className="text-xl font-bold">¿Eliminar reseña?</h2><p className="mt-3 text-sm text-neutral-400">Se eliminará definitivamente la reseña de <strong className="text-white">{borrando.autor}</strong>. Esta acción no se puede deshacer.</p><div className="mt-6 flex justify-end gap-3"><button disabled={pending} onClick={() => setBorrando(null)} className="rounded-xl border border-white/10 px-4 py-3 text-sm">Cancelar</button><button disabled={pending} onClick={eliminar} className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white disabled:opacity-50">{pending && <Loader2 size={16} className="animate-spin"/>} Eliminar</button></div></div></div>}
    </div>
  );
}