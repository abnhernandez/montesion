"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Camera, Eye, EyeOff, KeyRound, Save, UserRound } from "lucide-react";
import { guardarPerfil, cambiarPassword, subirAvatar } from "@/lib/perfilAdmin";

type Props = { perfil: { nombre: string; username: string; avatar_url: string | null } };
type Accion = (form: FormData) => Promise<{ ok: boolean; mensaje: string }>;

export default function MiPerfil({ perfil }: Props) {
  const router = useRouter();
  const [pendiente, iniciar] = useTransition();
  const [mensaje, setMensaje] = useState<{ok:boolean;texto:string}|null>(null);
  const [mostrar, setMostrar] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatarVersion, setAvatarVersion] = useState(0);
  const ejecutar = (accion: Accion, form: HTMLFormElement, limpiar = false) => {
    const datos = new FormData(form);
    iniciar(async () => {
      try {
        const resultado = await accion(datos);
        setMensaje({ ok: resultado.ok, texto: resultado.mensaje });
        if (resultado.ok) {
          if (limpiar) form.reset();
          router.refresh();
        }
      } catch {
        setMensaje({ ok: false, texto: "No fue posible completar la operación." });
      }
    });
  };
  const input = "mt-2 w-full rounded-xl border border-white/10 bg-[#1B1B1B] px-4 py-3 text-sm text-white outline-none focus:border-[#F5BE52]/60";
  const label = "block text-xs font-bold uppercase tracking-wider text-neutral-400";
  const boton = "inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5BE52] px-5 py-3 text-sm font-black text-black hover:bg-[#FFD277] disabled:opacity-50";
  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-[.2em] text-[#F5BE52]">Cuenta personal</p>
        <h2 className="mt-2 text-2xl font-black text-white">Personaliza tu perfil</h2>
        <p className="mt-2 text-sm text-neutral-400">Tu fotografía, nombre, usuario y contraseña de acceso.</p>
      </div>
      {mensaje && <p role="status" className={`rounded-xl border p-4 text-sm ${mensaje.ok ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300" : "border-red-500/30 bg-red-500/10 text-red-300"}`}>{mensaje.texto}</p>}
      <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
          <h3 className="mb-5 flex items-center gap-2 font-bold text-white"><Camera size={18} className="text-[#F5BE52]"/> Fotografía de perfil</h3>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-[#F5BE52]/50 bg-[#242424]">
              {(preview || perfil.avatar_url) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={preview || `${perfil.avatar_url}${perfil.avatar_url?.includes("?")?"&":"?"}v=${avatarVersion}`} alt="Tu foto de perfil" className="h-full w-full object-cover"/>
              ) : <UserRound size={44} className="text-[#F5BE52]"/>}
            </div>
            <p className="text-sm font-semibold text-white">{perfil.nombre}</p>
            <p className="text-xs text-neutral-500">@{perfil.username}</p>
            <form className="w-full space-y-4" onSubmit={e => {e.preventDefault();ejecutar(subirAvatar,e.currentTarget);}}>
              <input ref={avatarRef} type="file" name="avatar" accept="image/jpeg,image/png,image/webp" required className="block w-full text-xs text-neutral-400 file:mr-3 file:rounded-lg file:border-0 file:bg-white/10 file:px-3 file:py-2 file:text-white" onChange={e => {
                const file = e.target.files?.[0];
                if (preview) URL.revokeObjectURL(preview);
                setPreview(file ? URL.createObjectURL(file) : null);
                setAvatarVersion(v => v+1);
              }}/>
              <p className="text-xs text-neutral-500">JPG, PNG o WebP · Máximo 2 MB · Bucket media</p>
              <button disabled={pendiente} className={boton}><Camera size={16}/> {pendiente?"Guardando...":"Guardar fotografía"}</button>
            </form>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
          <h3 className="mb-5 flex items-center gap-2 font-bold text-white"><UserRound size={18} className="text-[#F5BE52]"/> Información personal</h3>
          <form className="space-y-5" onSubmit={e => {e.preventDefault();ejecutar(guardarPerfil,e.currentTarget);}}>
            <div><label htmlFor="perfil-nombre" className={label}>Nombre</label><input id="perfil-nombre" name="nombre" defaultValue={perfil.nombre} required maxLength={120} className={input}/></div>
            <div><label htmlFor="perfil-username" className={label}>Nombre de usuario</label><input id="perfil-username" name="username" defaultValue={perfil.username} required minLength={3} maxLength={40} autoCapitalize="none" autoComplete="username" className={input}/></div>
            <button disabled={pendiente} className={boton}><Save size={16}/> Guardar cambios</button>
          </form>
        </div>
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#141414] p-6">
        <h3 className="mb-2 flex items-center gap-2 font-bold text-white"><KeyRound size={18} className="text-[#F5BE52]"/> Cambiar contraseña</h3>
        <p className="mb-5 text-xs text-neutral-500">Introduce tu contraseña actual. La nueva debe tener al menos 12 caracteres.</p>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={e => {e.preventDefault();ejecutar(cambiarPassword,e.currentTarget,true);}}>
          <div className="md:col-span-2"><label htmlFor="pass-actual" className={label}>Contraseña actual</label><input id="pass-actual" name="password_actual" type={mostrar?"text":"password"} autoComplete="current-password" required className={input}/></div>
          <div><label htmlFor="pass-nueva" className={label}>Nueva contraseña</label><input id="pass-nueva" name="password_nueva" type={mostrar?"text":"password"} autoComplete="new-password" minLength={12} required className={input}/></div>
          <div><label htmlFor="pass-confirmar" className={label}>Confirmar contraseña</label><input id="pass-confirmar" name="password_confirmar" type={mostrar?"text":"password"} autoComplete="new-password" minLength={12} required className={input}/></div>
          <div className="flex flex-wrap items-center gap-3 md:col-span-2">
            <button type="button" onClick={()=>setMostrar(v=>!v)} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm text-neutral-300">{mostrar?<EyeOff size={16}/>:<Eye size={16}/>} {mostrar?"Ocultar":"Mostrar"}</button>
            <button disabled={pendiente} className={boton}><KeyRound size={16}/> Actualizar contraseña</button>
          </div>
        </form>
      </div>
    </section>
  );
}