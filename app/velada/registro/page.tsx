import { connection } from "next/server";
import { createAdminDb } from "@/lib/supabase/admin";
import FormularioVelada from "@/components/veladaRegistro";

export const instant = false;

export default async function Page(){
 await connection();
 const db=createAdminDb();
 const {data}=await db.from("velada_eventos").select("id,titulo,inicio,fin,lugar").eq("inscripciones_abiertas",true).order("inicio",{ascending:true}).limit(1).maybeSingle();
 if(!data)return <main className="mx-auto max-w-xl px-5 py-20"><h1 className="text-3xl font-bold">Registro de velada</h1><p className="mt-3">Por el momento no hay inscripciones abiertas.</p></main>;
 return <FormularioVelada evento={data}/>;
}