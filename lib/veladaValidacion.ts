/** Shared validation for client feedback and server enforcement. */
export type Registro = {
 nombres:string;apellido_paterno:string;apellido_materno:string;fecha_nacimiento:string;
 telefono:string;email:string;municipio:string;congregacion:string;modalidad:string;hora_salida_prevista:string;transporte:string;
 contactos:{nombre:string;parentesco:string;telefono:string}[];
 salud:{alergias:string;medicamentos:string;condiciones:string;accesibilidad:string;indicaciones:string;tipo_sangre:string};
 menor:{modalidad:string;tutor_nombre:string;tutor_parentesco:string;tutor_telefono:string;tutor_email:string;recogida_nombre:string;recogida_parentesco:string;recogida_telefono:string;recogida_mismo_tutor?:boolean};
 consentimiento_privacidad:boolean;consentimiento_participacion:boolean;
};
export type Errores = Record<string,string>;
const limpia=(s:string)=>s.trim().replace(/\s+/g," ");
const basura=/\b(?:test|testing|prueba|asdf|qwerty|ejemplo|example|fake|dummy|xxx|aaaa|bbbb|nombre|apellido|sin nombre|no se|nose|n\/a)\b/i;
const nombreValido=(s:string)=>{const v=limpia(s);return v.length>=2&&v.length<=120&&/^[\p{L}\p{M}][\p{L}\p{M} .'-]*$/u.test(v)&&!basura.test(v)&&!/(.)\1{4,}/u.test(v)&&!/^([\p{L}]{1,2})\1{2,}$/u.test(v)};
export function telefonoValido(s:string){const digits=s.replace(/\D/g,"");if(!/^(?:\+?52)?\d{10}$/.test(s.replace(/[\s().-]/g,"")))return false;const n=digits.startsWith("52")&&digits.length===12?digits.slice(2):digits;if(n.length!==10||/^([0-9])\1{9}$/.test(n)||/^(?:0123456789|1234567890|0987654321|9876543210)$/.test(n))return false;return true;}
export function correoValido(s:string){const v=s.trim().toLowerCase();if(v.length>160||!(/^[a-z0-9][a-z0-9._%+-]{0,63}@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/.test(v)))return false;const [local,domain]=v.split("@");if(local.includes("..")||domain.includes("..")||!/[a-z]{2,}$/.test(domain))return false;if(/^(?:example\.(?:com|org|net)|example\.com\.mx|test\.|invalid\.|localhost$)/.test(domain))return false;if(/^(?:test|prueba|example|ejemplo|fake|noemail|correo)(?:[._+\d-]|$)/.test(local))return false;return true;}
export function edadExacta(fecha:string,ahora=new Date()):number|null{if(!/^\d{4}-\d{2}-\d{2}$/.test(fecha))return null;const [y,m,d]=fecha.split("-").map(Number);const date=new Date(Date.UTC(y,m-1,d));if(date.toISOString().slice(0,10)!==fecha)return null;const hoy=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Mexico_City",year:"numeric",month:"2-digit",day:"2-digit"}).formatToParts(ahora);const p=Object.fromEntries(hoy.map(x=>[x.type,x.value]));const yy=Number(p.year),mm=Number(p.month),dd=Number(p.day);return yy-y-(mm<m||(mm===m&&dd<d)?1:0);}
export function validarRegistro(f:Registro):Errores{
 const e:Errores={};const err=(k:string,m:string)=>e[k]=m;
 for(const [key,title] of [["nombres","Nombre(s)"],["apellido_paterno","Apellido paterno"]] as const){if(!nombreValido(f[key]))err(key,`${title}: escribe un nombre real, sin números ni marcadores de prueba.`)}
 if(f.apellido_materno&&!nombreValido(f.apellido_materno))err("apellido_materno","Revisa el apellido materno.");
 const edad=edadExacta(f.fecha_nacimiento);if(edad===null||edad<0||edad>115)err("fecha_nacimiento","Introduce una fecha de nacimiento real y válida.");
 if(!f.telefono.trim())err("telefono","Necesitamos un número de contacto para localizarte durante la velada.");
 if(!f.email.trim())err("email","Escribe un correo electrónico de contacto.");
 if(f.telefono&&!telefonoValido(f.telefono))err("telefono","Introduce un número mexicano válido de 10 dígitos.");
 if(f.email&&!correoValido(f.email))err("email","Introduce un correo válido; no se admiten dominios de ejemplo.");
 if(f.municipio.trim().length<3||f.municipio.trim().length>120||basura.test(f.municipio)||/\d{5}/.test(f.municipio))err("municipio","Indica tu municipio o localidad real.");
 if(!f.congregacion.trim()||f.congregacion.trim().length<3||basura.test(f.congregacion))err("congregacion","Revisa el nombre de la congregación.");
 if(!f.transporte.trim()||f.transporte.trim().length<3)err("transporte","Cuéntanos cómo llegarás y regresarás, por ejemplo: transporte familiar.");
 for(const k of ["alergias","medicamentos","condiciones","accesibilidad","indicaciones"] as const){if(!f.salud[k]?.trim())err(`salud.${k}`,"Responde este campo. Si no aplica, escribe «Ninguna» o «No aplica».");}
 if(!f.salud.tipo_sangre)err("salud.tipo_sangre","Selecciona tu tipo de sangre o «No lo sé».");
 if(!["toda_noche","parcial"].includes(f.modalidad))err("modalidad","Selecciona una modalidad.");
 if(f.modalidad==="parcial"&&!/^([01]\d|2[0-3]):[0-5]\d$/.test(f.hora_salida_prevista))err("hora_salida_prevista","Indica una hora aproximada de salida.");
 if(f.contactos.length!==2)err("contactos","Se necesitan dos contactos de emergencia.");
 f.contactos.forEach((c,i)=>{if(!nombreValido(c.nombre))err(`contactos.${i}.nombre`,"Escribe el nombre real del contacto.");if(c.parentesco.trim().length<2||basura.test(c.parentesco))err(`contactos.${i}.parentesco`,"Indica el parentesco o relación.");if(!telefonoValido(c.telefono))err(`contactos.${i}.telefono`,"Introduce un teléfono mexicano válido.");});
 if(f.contactos.length===2&&f.contactos[0].telefono&&f.contactos[0].telefono.replace(/\D/g,"")===f.contactos[1].telefono.replace(/\D/g,""))err("contactos.1.telefono","Proporciona un contacto alternativo diferente.");
 if(edad!==null&&edad>=0&&edad<18){const t=f.menor;if(!["sin_tutor_presente","con_tutor_presente"].includes(t.modalidad))err("menor.modalidad","Selecciona una modalidad de acompañamiento.");if(!nombreValido(t.tutor_nombre))err("menor.tutor_nombre","Escribe el nombre completo del padre, madre o tutor.");
 if(t.tutor_parentesco.trim().length<2||basura.test(t.tutor_parentesco))err("menor.tutor_parentesco","Indica su parentesco.");
 if(!telefonoValido(t.tutor_telefono))err("menor.tutor_telefono","Escribe un teléfono mexicano válido para el tutor.");
 if(!correoValido(t.tutor_email))err("menor.tutor_email","Escribe un correo válido del tutor.");
 if(!t.recogida_mismo_tutor){
  if(!nombreValido(t.recogida_nombre))err("menor.recogida_nombre","Escribe el nombre de quien recogerá al menor.");
  if(t.recogida_parentesco.trim().length<2||basura.test(t.recogida_parentesco))err("menor.recogida_parentesco","Indica el parentesco de quien recogerá al menor.");
  if(!telefonoValido(t.recogida_telefono))err("menor.recogida_telefono","Escribe un teléfono válido de quien recogerá al menor.");
 }}
 if(!f.consentimiento_privacidad)err("consentimiento_privacidad","Debes aceptar el aviso de privacidad.");if(!f.consentimiento_participacion)err("consentimiento_participacion","Debes confirmar los datos de inscripción.");
 return e;
}