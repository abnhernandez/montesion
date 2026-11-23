"use client";
import {useState,useTransition} from "react";
import {useRouter} from "next/navigation";
import {crearAdministrador,gestionarAdministrador} from "@/lib/usuariosAdmin";
import {UserPlus,ShieldAlert,KeyRound,Lock,Unlock,Trash2,Clock} from "lucide-react";
type Usuario={user_id:string;username:string;nombre:string;activo:boolean;estado_cuenta:string;avatar_url:string|null};
type Area={id:string;nombre:string;propietario_user_id:string|null};
export default function GestionUsuarios({usuarios,areas,yo}:{usuarios:Usuario[];areas:Area[];yo:string}){
 const router=useRouter();const [pending,start]=useTransition();
 const [msg,setMsg]=useState("");const [clave,setClave]=useState("");
 const [operacion,setOperacion]=useState<{id:string;op:string}|null>(null);
 const input="w-full rounded-xl border border-white/10 bg-[#202020] px-4 py-3 text-sm text-white outline-none focus:border-[#F5BE52]";
 const btn="rounded-xl bg-[#F5BE52] px-4 py-3 text-sm font-bold text-black disabled:opacity-50";
 function ejecutar(accion:(f:FormData)=>Promise<{ok:boolean;mensaje:string;claveTemporal?:string}>,form:HTMLFormElement){
  const datos=new FormData(form);setMsg("");setClave("");
  start(async()=>{try{const r=await accion(datos);setMsg(`${r.ok?"✓":"⚠"} ${r.mensaje}`);if(r.claveTemporal)setClave(r.claveTemporal);if(r.ok){router.refresh();if(accion===crearAdministrador)form.reset();setOperacion(null);}}catch{setMsg("Error de conexión.");}});
 }
 return <section className="space-y-6">
  <div className="rounded-2xl border border-white/10 bg-[#141414] p-5">
   <h3 className="mb-4 flex items-center gap-2 font-bold"><UserPlus size={18} className="text-[#F5BE52]"/> Crear administrador</h3>
   <form onSubmit={e=>{e.preventDefault();ejecutar(crearAdministrador,e.currentTarget)}} className="grid gap-3 md:grid-cols-3">
    <input name="nombre" placeholder="Nombre completo" minLength={2} required className={input}/>
    <input name="username" placeholder="usuario.montesion" minLength={3} required autoCapitalize="none" className={input}/>
    <input name="password" placeholder="Contraseña inicial (12+ caracteres)" type="password" minLength={12} required className={input}/>
    <button disabled={pending} className={`${btn} md:col-span-3`}>Crear cuenta</button>
   </form>
  </div>
  {msg&&<p role="status" className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm">{msg}</p>}
  {clave&&<div className="rounded-xl border border-amber-500/40 bg-amber-500/10 p-4"><p className="text-sm font-bold text-amber-300">Contraseña temporal (se muestra una sola vez)</p><code className="mt-2 block break-all rounded-lg bg-black/40 p-3 text-sm">{clave}</code><p className="mt-2 text-xs text-neutral-400">Compártela por un canal seguro y solicita al usuario cambiarla inmediatamente.</p></div>}
  <div className="space-y-3">{usuarios.map(u=>{
   const propietario=areas.filter(a=>a.propietario_user_id===u.user_id);
   return <article key={u.user_id} className="rounded-2xl border border-white/10 bg-[#141414] p-5">
    <div className="flex flex-wrap items-center justify-between gap-3"><div><p className="font-bold">{u.nombre} {u.user_id===yo&&<span className="text-xs text-[#F5BE52]">(Tú)</span>}</p><p className="text-xs text-neutral-400">@{u.username} · {u.activo?u.estado_cuenta:"Desactivado"}</p>{propietario.map(a=><p key={a.id} className="text-xs text-[#F5BE52]">Propietario: {a.nombre}</p>)}</div>
    {u.user_id!==yo&&<div className="flex flex-wrap gap-2">{[{op:"suspender",icon:Clock,label:"Suspender"},{op:"bloquear",icon:Lock,label:"Bloquear"},{op:"activar",icon:Unlock,label:"Activar"},{op:"restablecer",icon:KeyRound,label:"Restablecer clave"},{op:"eliminar",icon:Trash2,label:"Eliminar"}].map(x=><button key={x.op} type="button" disabled={pending} onClick={()=>{setOperacion({id:u.user_id,op:x.op});setMsg("");setClave("");}} className="rounded-lg border border-white/10 px-3 py-2 text-xs text-neutral-300 hover:border-[#F5BE52]/50"><x.icon size={13} className="mr-1 inline"/>{x.label}</button>)}</div>}
    </div>
    {operacion?.id===u.user_id&&<form className="mt-4 space-y-3 rounded-xl border border-[#F5BE52]/20 bg-black/20 p-4" onSubmit={e=>{e.preventDefault();if(operacion.op==="eliminar"&&!window.confirm(`¿Eliminar la cuenta de ${u.nombre}? Se desactivará definitivamente y se conservará su auditoría.`))return;ejecutar(gestionarAdministrador,e.currentTarget);}}>
     <input type="hidden" name="user_id" value={u.user_id}/><input type="hidden" name="operacion" value={operacion.op}/>
     <p className="flex items-center gap-2 text-sm font-semibold"><ShieldAlert size={16} className="text-[#F5BE52]"/> Confirmar: {operacion.op} · @{u.username}</p>
     {operacion.op==="suspender"&&<label className="block text-xs text-neutral-300">Suspender hasta <input name="hasta" type="datetime-local" required className={`${input} mt-2`}/></label>}
     {["suspender","bloquear"].includes(operacion.op)&&<textarea name="motivo" maxLength={500} required placeholder="Motivo administrativo" className={input}/>}
     {operacion.op==="eliminar"&&<p className="text-xs text-red-300">Esta acción desactiva la cuenta, anonimiza el perfil y cierra sus sesiones. Si posee un ministerio o asignaciones, primero deben transferirse o retirarse.</p>}
     <div className="flex gap-2"><button disabled={pending} className={btn}>Confirmar operación</button><button type="button" onClick={()=>setOperacion(null)} className="rounded-xl border border-white/10 px-4 py-2 text-sm">Cancelar</button></div>
    </form>}
   </article>;
  })}</div>
 </section>;
}