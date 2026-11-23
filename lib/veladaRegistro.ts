"use server";
import { createAdminDb } from "@/lib/supabase/admin";
import { validarRegistro, edadExacta, type Registro } from "@/lib/veladaValidacion";

type Resultado = { ok: boolean; mensaje: string; folio?: string; menor?: boolean };
const txt = (x: unknown, max = 500) => typeof x === "string" ? x.trim().slice(0,max) : "";
const telefonoValido = (v: string) => /^[+\d()\s.-]{10,22}$/.test(v);
const correoValido = (v: string) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
export async function registrarVelada(payload: Record<string, unknown>): Promise<Resultado> {
 try {
  // Never trust client-side validation or an age supplied by the browser.
  const original = payload as unknown as Registro;
  const mismoTutor = original?.menor?.recogida_mismo_tutor === true;
  const raw: Registro = mismoTutor ? {
   ...original,
   menor: { ...original.menor,
    recogida_nombre: original.menor.tutor_nombre,
    recogida_parentesco: original.menor.tutor_parentesco,
    recogida_telefono: original.menor.tutor_telefono,
   },
  } : original;
  if (!raw || typeof raw !== "object" || !raw.salud || !raw.menor || !Array.isArray(raw.contactos)) return {ok:false,mensaje:"Registro incompleto."};
  const errores = validarRegistro(raw);
  const primerError = Object.values(errores)[0];
  if (primerError) return {ok:false,mensaje:primerError};
  const edadServidor = edadExacta(String(payload.fecha_nacimiento ?? ""));
  if (edadServidor === null) return {ok:false,mensaje:"Fecha de nacimiento inválida."};
  const nacimiento = txt(payload.fecha_nacimiento,10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(nacimiento)) return {ok:false,mensaje:"Fecha de nacimiento inválida."};
  const [y,m,d] = nacimiento.split("-").map(Number);
  const fecha = new Date(Date.UTC(y,m-1,d));
  if (fecha.toISOString().slice(0,10) !== nacimiento) return {ok:false,mensaje:"Fecha de nacimiento inválida."};
  const hoy = new Date();
  let edad = hoy.getUTCFullYear()-y;
  if ((hoy.getUTCMonth()+1)*100+hoy.getUTCDate() < m*100+d) edad--;
  if (edad < 0 || edad > 115) return {ok:false,mensaje:"Verifica la fecha de nacimiento."};
  const menor = edad < 18;
  const contactos = Array.isArray(payload.contactos) ? payload.contactos.slice(0,2) : [];
  if (contactos.length !== 2) return {ok:false,mensaje:"Se requieren dos contactos de emergencia."};
  const cs = contactos.map(c=>({nombre:txt(c?.nombre,120),parentesco:txt(c?.parentesco,80),telefono:txt(c?.telefono,22)}));
  if (cs.some(c=>c.nombre.length<2 || !telefonoValido(c.telefono) || !c.parentesco)) return {ok:false,mensaje:"Completa los dos contactos de emergencia con teléfonos válidos."};
  const tel=txt(payload.telefono,22), email=txt(payload.email,160);
  if (!tel || !email || !telefonoValido(tel) || !correoValido(email)) return {ok:false,mensaje:"Proporciona un teléfono o correo válido."};
  const salud = (payload.salud && typeof payload.salud === "object") ? payload.salud as Record<string,unknown> : {};
  const tutor = (raw.menor && typeof raw.menor === "object") ? raw.menor as unknown as Record<string,unknown> : {};
  const t = { modalidad: txt(tutor.modalidad,30) || "sin_tutor_presente", tutor_nombre:txt(tutor.tutor_nombre,120), tutor_parentesco:txt(tutor.tutor_parentesco,80), tutor_telefono:txt(tutor.tutor_telefono,22), tutor_email:txt(tutor.tutor_email,160), recogida_nombre:txt(tutor.recogida_nombre,120), recogida_parentesco:txt(tutor.recogida_parentesco,80), recogida_telefono:txt(tutor.recogida_telefono,22) };
  if (menor && (!t.tutor_nombre || !t.tutor_parentesco || !telefonoValido(t.tutor_telefono) || !t.recogida_nombre || !t.recogida_parentesco || !telefonoValido(t.recogida_telefono) || !["sin_tutor_presente","con_tutor_presente"].includes(t.modalidad))) return {ok:false,mensaje:"Completa los datos del tutor y la persona autorizada para recoger al menor."};
  if (payload.consentimiento_privacidad !== true || payload.consentimiento_participacion !== true) return {ok:false,mensaje:"Debes aceptar los consentimientos obligatorios."};
  const db = createAdminDb();
  const datos = {
   evento_id:txt(payload.evento_id,36), nombres:txt(payload.nombres,120), apellido_paterno:txt(payload.apellido_paterno,120), apellido_materno:txt(payload.apellido_materno,120), fecha_nacimiento:nacimiento,
   telefono:tel,email,municipio:txt(payload.municipio,120),congregacion:txt(payload.congregacion,120), modalidad:txt(payload.modalidad,20),hora_salida_prevista:txt(payload.hora_salida_prevista,40),transporte:txt(payload.transporte,80),
   contactos:cs, salud:{alergias:txt(salud.alergias),medicamentos:txt(salud.medicamentos),condiciones:txt(salud.condiciones),accesibilidad:txt(salud.accesibilidad),indicaciones:txt(salud.indicaciones),tipo_sangre:txt(salud.tipo_sangre,15)},menor:t,
   consentimiento_privacidad:true, consentimiento_participacion:true,
  };
  if (datos.nombres.length<2 || datos.apellido_paterno.length<2 || datos.municipio.length<2 || !["toda_noche","parcial"].includes(datos.modalidad)) return {ok:false,mensaje:"Completa los datos personales y modalidad de asistencia."};
  const {data,error} = await db.rpc("velada_crear_registro",{p:datos});
  if(error) {console.error("Error registro velada:",error.message);return {ok:false,mensaje:"No fue posible registrar la inscripción. Verifica los datos e inténtalo nuevamente."};}
  return {ok:true,mensaje:menor?"Solicitud recibida. Falta verificar la autorización del tutor; no equivale a una aprobación.":"Solicitud recibida. Conserva tu folio y espera confirmación.",folio:data.folio,menor};
 } catch(e) {console.error("Error registro:",e);return {ok:false,mensaje:"No fue posible procesar el registro."};}
}