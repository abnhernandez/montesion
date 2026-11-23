"use client";

import GestionUsuarios from "@/components/gestionUsuarios";
import { useState, useTransition } from "react";
import { crearArea, solicitarTransferencia, aceptarTransferencia } from "@/lib/configuracionAdmin";
import { Settings2, Crown, Users, History, Plus, ArrowRightLeft, ShieldCheck } from "lucide-react";

type Area={id:string;codigo:string;nombre:string;es_general:boolean;activo:boolean;propietario_user_id:string|null};
type Usuario={user_id:string;username:string;nombre:string;activo:boolean;estado_cuenta:string;avatar_url:string|null};
type Transfer={id:string;area_id:string;nuevo_user_id:string;estado:string;created_at:string};
type Log={id:number;accion:string;actor_username_snapshot:string|null;created_at:string;detalles:unknown};
type Props={yo:string;esGeneral:boolean;areas:Area[];usuarios:Usuario[];transferencias:Transfer[];auditoria:Log[];error:string|null};

export default function ConfiguracionDashboard({yo,esGeneral,areas,usuarios,transferencias,auditoria,error}:Props){
 const [tab,setTab]=useState<"areas"|"usuarios"|"auditoria">("areas");
 const [mensaje,setMensaje]=useState("");
 const [pending,startTransition]=useTransition();
 const ejecutar=(action:(data:FormData)=>Promise<{ok:boolean;mensaje:string}>,form:HTMLFormElement)=>{
  const data=new FormData(form);
  startTransition(async()=>{const r=await action(data);setMensaje(`${r.ok?"✓":"⚠"} ${r.mensaje}`);});
 };
 const input="w-full rounded-xl border border-white/10 bg-[#1B1B1B] p-3 text-sm text-white outline-none focus:border-[#F5BE52]";
 const button="rounded-xl bg-[#F5BE52] px-4 py-3 text-sm font-bold text-black disabled:opacity-50";
 const usuario=(id:string|null)=>usuarios.find(u=>u.user_id===id);
 return <div className="space-y-7 text-white">
  <header><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[.2em] text-[#F5BE52]"><Settings2 size={16}/> Administración institucional</p><h1 className="mt-3 text-3xl font-black md:text-5xl">CONFIGURACIÓN</h1><p className="mt-3 text-sm text-neutral-400">Un propietario por área · control general · auditoría</p></header>
  {error&&<p role="alert" className="rounded-xl border border-red-500/30 p-4 text-red-300">{error}</p>}
  {mensaje&&<p role="status" className="rounded-xl border border-[#F5BE52]/30 bg-[#F5BE52]/10 p-4 text-sm">{mensaje}</p>}
  <div className="grid gap-3 sm:grid-cols-3">{[{label:"Áreas",value:areas.length,icon:Crown},{label:"Usuarios",value:usuarios.length,icon:Users},{label:"Auditorías recientes",value:auditoria.length,icon:History}].map(x=><div key={x.label} className="rounded-2xl border border-white/10 bg-[#151515] p-5"><x.icon className="text-[#F5BE52]"/><p className="mt-3 text-3xl font-black">{x.value}</p><p className="text-xs text-neutral-400">{x.label}</p></div>)}</div>
  <div className="flex flex-wrap gap-2">{(["areas","usuarios","auditoria"] as const).map(t=><button key={t} type="button" onClick={()=>setTab(t)} className={`rounded-xl px-5 py-3 text-sm font-semibold ${tab===t?"bg-[#F5BE52] text-black":"bg-[#191919] text-neutral-300"}`}>{t==="areas"?"Ministerios":t==="usuarios"?"Usuarios":"Auditoría"}</button>)}</div>
  {tab==="areas"&&<section className="space-y-4">
   {areas.map(a=><article key={a.id} className="rounded-2xl border border-white/10 bg-[#121212] p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="flex items-center gap-2 text-lg font-bold"><Crown size={18} className="text-[#F5BE52]"/>{a.nombre}</p><p className="mt-1 text-xs text-neutral-500">{a.codigo} · Propietario: {usuario(a.propietario_user_id)?.nombre??"Sin asignar"}</p></div>{a.es_general&&<span className="rounded-full bg-[#F5BE52]/10 px-3 py-1 text-xs text-[#F5BE52]">Control institucional</span>}</div>
    {esGeneral&&<form className="mt-4 flex flex-col gap-2 sm:flex-row" onSubmit={e=>{e.preventDefault();ejecutar(solicitarTransferencia,e.currentTarget)}}><input type="hidden" name="area_id" value={a.id}/><select className={input} name="nuevo_user_id" required defaultValue=""><option value="" disabled>Elegir nuevo propietario</option>{usuarios.filter(u=>u.activo&&u.estado_cuenta==="activo"&&u.user_id!==a.propietario_user_id).map(u=><option key={u.user_id} value={u.user_id}>{u.nombre} (@{u.username})</option>)}</select><button disabled={pending} className={button}><ArrowRightLeft size={15} className="mr-1 inline"/>Solicitar transferencia</button></form>}
   </article>)}
   {esGeneral&&<form className="grid gap-3 rounded-2xl border border-white/10 bg-[#151515] p-5 sm:grid-cols-[1fr_1fr_auto]" onSubmit={e=>{e.preventDefault();ejecutar(crearArea,e.currentTarget)}}><input name="nombre" className={input} placeholder="Nombre del ministerio" required/><input name="codigo" className={input} placeholder="codigo-sin-espacios" pattern="[a-z0-9_-]+" required/><button disabled={pending} className={button}><Plus size={16} className="mr-1 inline"/>Crear área</button></form>}
   {transferencias.filter(t=>t.nuevo_user_id===yo).map(t=><div key={t.id} className="rounded-2xl border border-[#F5BE52]/30 bg-[#F5BE52]/10 p-5"><p className="font-bold">Transferencia pendiente: {areas.find(a=>a.id===t.area_id)?.nombre}</p><p className="my-2 text-xs text-neutral-400">Al aceptar asumirás la propiedad única de esta área.</p><form onSubmit={e=>{e.preventDefault();ejecutar(aceptarTransferencia,e.currentTarget)}}><input type="hidden" name="transfer_id" value={t.id}/><button disabled={pending} className={button}>Aceptar propiedad</button></form></div>)}
  </section>}
  {tab==="usuarios"&&<section className="space-y-5">
    {esGeneral ? <GestionUsuarios usuarios={usuarios} areas={areas} yo={yo}/> : <p className="rounded-xl border border-white/10 p-5 text-sm text-neutral-400">Solo el propietario de Administración General puede gestionar cuentas.</p>}
  </section>}
  {tab==="auditoria"&&<section className="rounded-2xl border border-white/10 bg-[#121212] p-5"><h2 className="mb-4 flex items-center gap-2 font-bold"><ShieldCheck className="text-[#F5BE52]"/>Historial reciente</h2><div className="divide-y divide-white/10">{auditoria.map(l=><div key={l.id} className="py-3"><p className="text-sm font-semibold">{l.accion}</p><p className="mt-1 text-xs text-neutral-500">{l.actor_username_snapshot??"Sistema"} · {new Intl.DateTimeFormat("es-MX",{timeZone:"America/Mexico_City",dateStyle:"medium",timeStyle:"short"}).format(new Date(l.created_at))}</p></div>)}{!auditoria.length&&<p className="text-sm text-neutral-500">Sin registros todavía.</p>}</div></section>}
 </div>;
}