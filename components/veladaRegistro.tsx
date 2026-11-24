"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  HeartPulse,
  Info,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { registrarVelada } from "@/lib/veladaRegistro";
import {
  edadExacta,
  validarRegistro,
  type Errores,
  type Registro,
} from "@/lib/veladaValidacion";

type Evento = {
  id: string;
  titulo: string;
  inicio: string;
  fin: string;
  lugar: string;
};

const contacto = () => ({ nombre: "", parentesco: "", telefono: "" });

const inicial: Registro = {
  nombres: "",
  apellido_paterno: "",
  apellido_materno: "",
  fecha_nacimiento: "",
  telefono: "",
  email: "",
  municipio: "",
  congregacion: "",
  modalidad: "toda_noche",
  hora_salida_prevista: "",
  transporte: "",
  contactos: [contacto(), contacto()],
  salud: {
    alergias: "",
    medicamentos: "",
    condiciones: "",
    accesibilidad: "",
    indicaciones: "",
    tipo_sangre: "",
  },
  menor: {
    modalidad: "sin_tutor_presente",
    tutor_nombre: "",
    tutor_parentesco: "",
    tutor_telefono: "",
    tutor_email: "",
    recogida_mismo_tutor: true,
    recogida_nombre: "",
    recogida_parentesco: "",
    recogida_telefono: "",
  },
  consentimiento_privacidad: false,
  consentimiento_participacion: false,
};

const COOKIE_PROGRESO = "velada_registro_progreso";
const TAMANO_FRAGMENTO_COOKIE = 3000;
type FuenteRecogida = "tutor" | "contacto1" | "contacto2" | "otra";
type FuenteTutor = "contacto1" | "contacto2" | "otra";

const pasos = [
  { nombre: "Tus datos", icon: UserRound },
  { nombre: "Salud y contactos", icon: HeartPulse },
  { nombre: "Responsables", icon: UsersRound },
  { nombre: "Revisar y enviar", icon: ShieldCheck },
];

const estiloCampo =
  "mt-2 w-full min-h-11 rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] backdrop-blur-md outline-none transition-all duration-200 placeholder:font-normal placeholder:text-white/50 focus:border-white/40 focus:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/15";
const estiloEtiqueta =
  "block text-[13px] font-semibold tracking-tight text-white";
const textoBoton =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/30 bg-black/25 px-5 py-3 text-[14px] font-semibold tracking-tight text-white shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.55),inset_0_-1px_1px_rgba(0,0,0,0.2),0_8px_20px_rgba(0,0,0,0.18)] backdrop-blur-2xl backdrop-saturate-150 transition-all duration-200 ease-out hover:bg-white/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40";

const grupo = (n: number, k: string) =>
  n === 0
    ? [
      "nombres",
      "apellido_paterno",
      "apellido_materno",
      "fecha_nacimiento",
      "telefono",
      "email",
      "municipio",
      "congregacion",
      "modalidad",
      "hora_salida_prevista",
      "transporte",
    ].includes(k)
    : n === 1
      ? k.startsWith("contactos") || k.startsWith("salud.")
      : n === 2
        ? k.startsWith("menor.")
        : k.startsWith("consentimiento_");

const pasoDeError = (k: string) =>
  k.startsWith("contactos") || k.startsWith("salud.")
    ? 1
    : k.startsWith("menor.")
      ? 2
      : k.startsWith("consentimiento_")
        ? 3
        : 0;

type OpcionesInput = {
  type?: string;
  placeholder?: string;
  ayuda?: string;
  maxLength?: number;
  required?: boolean;
  autoComplete?: string;
  accionVacia?: string;
  accionVaciaTexto?: string;
};

const renderInput = (
  id: string,
  titulo: string,
  valor: string,
  cambio: (v: string) => void,
  errores: Errores,
  opciones: OpcionesInput = {},
) => (
  <div className="min-w-0">
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={id} className={estiloEtiqueta}>
        {titulo}
        {id === "apellido_materno" && (
          <span className="ml-1.5 font-normal text-white/45">(Opcional)</span>
        )}
      </label>
      {opciones.accionVacia && (
        <button
          type="button"
          onClick={() =>
            cambio(valor === opciones.accionVacia ? "" : opciones.accionVacia!)
          }
          aria-pressed={valor === opciones.accionVacia}
          className="shrink-0 text-xs font-medium text-white/70 underline underline-offset-2 hover:text-white"
        >
          {valor === opciones.accionVacia
            ? "Restablecer respuesta"
            : opciones.accionVaciaTexto || "Ninguna / No aplica"}
        </button>
      )}
    </div>
    <input
      id={id}
      name={id}
      className={`${estiloCampo} ${errores[id] ? "border-red-300 bg-red-500/15 focus:ring-red-200/30" : ""}`}
      type={opciones.type || "text"}
      placeholder={opciones.placeholder}
      value={valor === opciones.accionVacia ? "" : valor}
      onChange={(e) => cambio(e.target.value)}
      disabled={!!opciones.accionVacia && valor === opciones.accionVacia}
      aria-disabled={!!opciones.accionVacia && valor === opciones.accionVacia}
      aria-invalid={!!errores[id]}
      aria-describedby={
        errores[id]
          ? `${id}-error`
          : opciones.ayuda
            ? `${id}-ayuda`
            : undefined
      }
      maxLength={
        opciones.maxLength ??
        (opciones.type === "email"
          ? 160
          : opciones.type === "tel"
            ? 22
            : 120)
      }
      autoComplete={opciones.autoComplete}
      required={opciones.required !== false}
    />
    {opciones.ayuda && !errores[id] && (
      <p
        id={`${id}-ayuda`}
        className="mt-1.5 text-xs leading-relaxed text-neutral-500"
      >
        {opciones.ayuda}
      </p>
    )}
    {errores[id] && (
      <p
        id={`${id}-error`}
        role="alert"
        className="mt-1.5 text-xs font-medium text-red-700"
      >
        {errores[id]}
      </p>
    )}
  </div>
);

const renderSelect = (
  id: string,
  titulo: string,
  valor: string,
  cambio: (v: string) => void,
  items: { value: string; label: string }[],
  errores: Errores,
) => (
  <div>
    <label htmlFor={id} className={estiloEtiqueta}>
      {titulo}
    </label>
    <div className="relative">
      <select
        id={id}
        value={valor}
        onChange={(e) => cambio(e.target.value)}
        className={`${estiloCampo} appearance-none pr-10`}
        aria-invalid={!!errores[id]}
      >
        {items.map((o) => (
          <option key={o.value} value={o.value} className="bg-neutral-900 text-white">
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown
        size={17}
        className="pointer-events-none absolute right-4 top-1/2 translate-y-0 text-neutral-500"
      />
    </div>
    {errores[id] && <p className="mt-1 text-xs text-red-300">{errores[id]}</p>}
  </div>
);

export default function FormularioVelada({ evento }: { evento: Evento }) {
  const [f, setF] = useState<Registro>(inicial);
  const [progresoCargado, setProgresoCargado] = useState(false);
  const [errores, setErrores] = useState<Errores>({});
  const [paso, setPaso] = useState(0);
  const [fuenteRecogida, setFuenteRecogida] = useState<FuenteRecogida>("tutor");
  const [fuenteTutor, setFuenteTutor] = useState<FuenteTutor>("otra");
  const [sinContactoAlternativo, setSinContactoAlternativo] = useState(false);
  const [aviso, setAviso] = useState("");
  const [pendiente, iniciar] = useTransition();
  const [resultado, setResultado] = useState<{
    folio: string;
    menor: boolean;
    mensaje: string;
  } | null>(null);

  const encabezado = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const cantidadCookie = cookies.find((item) => item.startsWith(`${COOKIE_PROGRESO}_cantidad=`));
    const cantidad = Number(cantidadCookie?.split("=")[1] ?? 0);

    if (Number.isInteger(cantidad) && cantidad > 0 && cantidad <= 20) {
      try {
        const guardado = Array.from({ length: cantidad }, (_, i) =>
          cookies.find((item) => item.startsWith(`${COOKIE_PROGRESO}_${i}=`))
            ?.slice(`${COOKIE_PROGRESO}_${i}=`.length) ?? "",
        ).join("");
        if (guardado) {
          const datos = JSON.parse(decodeURIComponent(guardado)) as Registro;
          setF(datos);
          const mismoTutor = (persona: Registro["contactos"][number]) =>
            !!datos.menor?.tutor_nombre &&
            datos.menor.tutor_nombre === persona.nombre &&
            datos.menor.tutor_parentesco === persona.parentesco &&
            datos.menor.tutor_telefono === persona.telefono;
          setFuenteTutor(
            mismoTutor(datos.contactos[0])
              ? "contacto1"
              : mismoTutor(datos.contactos[1])
                ? "contacto2"
                : "otra",
          );
          setSinContactoAlternativo(
            !datos.contactos[1].nombre &&
              !datos.contactos[1].parentesco &&
              !datos.contactos[1].telefono,
          );
          if (datos.menor?.recogida_mismo_tutor) {
            setFuenteRecogida("tutor");
          } else {
            const recogida = datos.menor;
            const coincide = (persona: Registro["contactos"][number]) =>
              !!recogida.recogida_nombre &&
              recogida.recogida_nombre === persona.nombre &&
              recogida.recogida_parentesco === persona.parentesco &&
              recogida.recogida_telefono === persona.telefono;
            setFuenteRecogida(
              coincide(datos.contactos[0])
                ? "contacto1"
                : coincide(datos.contactos[1])
                  ? "contacto2"
                  : "otra",
            );
          }
        }
      } catch {
        document.cookie = `${COOKIE_PROGRESO}_cantidad=; max-age=0; path=/; SameSite=Lax`;
      }
    }
    setProgresoCargado(true);
  }, []);

  useEffect(() => {
    if (!progresoCargado) return;

    const valor = encodeURIComponent(JSON.stringify(f));
    const cantidad = Math.ceil(valor.length / TAMANO_FRAGMENTO_COOKIE);
    if (cantidad > 20) return;

    const atributos = `max-age=2592000; path=/; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
    const anterior = Number(
      document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${COOKIE_PROGRESO}_cantidad=`))
        ?.split("=")[1] ?? 0,
    );

    for (let i = 0; i < cantidad; i += 1) {
      document.cookie = `${COOKIE_PROGRESO}_${i}=${valor.slice(i * TAMANO_FRAGMENTO_COOKIE, (i + 1) * TAMANO_FRAGMENTO_COOKIE)}; ${atributos}`;
    }
    for (let i = cantidad; i < anterior; i += 1) {
      document.cookie = `${COOKIE_PROGRESO}_${i}=; max-age=0; path=/; SameSite=Lax`;
    }
    document.cookie = `${COOKIE_PROGRESO}_cantidad=${cantidad}; ${atributos}`;
  }, [f, progresoCargado]);

  const eliminarProgreso = () => {
    if (!window.confirm("¿Quieres eliminar el progreso guardado y borrar todos tus datos del formulario?")) return;

    const cookies = document.cookie.split("; ");
    const cantidad = Number(
      cookies.find((item) => item.startsWith(`${COOKIE_PROGRESO}_cantidad=`))?.split("=")[1] ?? 0,
    );
    for (let i = 0; i < cantidad; i += 1) {
      document.cookie = `${COOKIE_PROGRESO}_${i}=; max-age=0; path=/; SameSite=Lax`;
    }
    document.cookie = `${COOKIE_PROGRESO}_cantidad=; max-age=0; path=/; SameSite=Lax`;
    setF(inicial);
    setErrores({});
    setAviso("");
    setPaso(0);
  };

  const edad = useMemo(() => edadExacta(f.fecha_nacimiento), [f.fecha_nacimiento]);
  const esMenor = edad !== null && edad >= 0 && edad < 18;
  const secciones = esMenor ? pasos : pasos.filter((_, i) => i !== 2);
  const pasoVisible = esMenor ? paso : paso === 3 ? 2 : paso;
  const ir = (n: number) => {
    setPaso(n);
    setAviso("");
    requestAnimationFrame(() =>
      encabezado.current?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const limpiar = (k: string) =>
    setErrores((prev) => {
      if (!prev[k]) return prev;
      const next = { ...prev };
      delete next[k];
      return next;
    });

  const cambiar = <K extends keyof Registro>(k: K, v: Registro[K]) => {
    setF((s) => ({ ...s, [k]: v }));
    limpiar(k);
  };

  const salud = (k: keyof Registro["salud"], v: string) => {
    setF((s) => ({ ...s, salud: { ...s.salud, [k]: v } }));
    limpiar(`salud.${k}`);
  };

  const responsable = (k: keyof Registro["menor"], v: string | boolean) => {
    setF((s) => ({ ...s, menor: { ...s.menor, [k]: v } }));
    limpiar(`menor.${k}`);
  };

  const contactoEditar = (
    i: number,
    k: keyof Registro["contactos"][number],
    v: string,
  ) => {
    setF((s) => ({
      ...s,
      contactos: s.contactos.map((c, j) =>
        i === j ? { ...c, [k]: v } : c,
      ),
    }));
    limpiar(`contactos.${i}.${k}`);
  };

  const normalizado = (): Registro => {
    const tutor =
      fuenteTutor === "contacto1"
        ? {
            nombre: f.contactos[0].nombre,
            parentesco: f.contactos[0].parentesco,
            telefono: f.contactos[0].telefono,
          }
        : fuenteTutor === "contacto2"
          ? {
              nombre: f.contactos[1].nombre,
              parentesco: f.contactos[1].parentesco,
              telefono: f.contactos[1].telefono,
            }
          : {
              nombre: f.menor.tutor_nombre,
              parentesco: f.menor.tutor_parentesco,
              telefono: f.menor.tutor_telefono,
            };
    const persona =
      fuenteRecogida === "tutor"
        ? tutor
        : fuenteRecogida === "contacto1"
          ? f.contactos[0]
          : fuenteRecogida === "contacto2"
            ? f.contactos[1]
            : {
                nombre: f.menor.recogida_nombre,
                parentesco: f.menor.recogida_parentesco,
                telefono: f.menor.recogida_telefono,
              };

    return {
      ...f,
      menor: {
        ...f.menor,
        tutor_nombre: tutor.nombre,
        tutor_parentesco: tutor.parentesco,
        tutor_telefono: tutor.telefono,
        recogida_mismo_tutor: fuenteRecogida === "tutor",
        recogida_nombre: persona.nombre,
        recogida_parentesco: persona.parentesco,
        recogida_telefono: persona.telefono,
      },
    };
  };

  const cambiarFuenteRecogida = (fuente: FuenteRecogida) => {
    setFuenteRecogida(fuente);
    if (fuente === "tutor") {
      setF((s) => ({
        ...s,
        menor: {
          ...s.menor,
          recogida_mismo_tutor: true,
          recogida_nombre: s.menor.tutor_nombre,
          recogida_parentesco: s.menor.tutor_parentesco,
          recogida_telefono: s.menor.tutor_telefono,
        },
      }));
    } else if (fuente === "contacto1" || fuente === "contacto2") {
      const indice = fuente === "contacto1" ? 0 : 1;
      setF((s) => ({
        ...s,
        menor: {
          ...s.menor,
          recogida_mismo_tutor: false,
          recogida_nombre: s.contactos[indice].nombre,
          recogida_parentesco: s.contactos[indice].parentesco,
          recogida_telefono: s.contactos[indice].telefono,
        },
      }));
    } else {
      setF((s) => ({
        ...s,
        menor: { ...s.menor, recogida_mismo_tutor: false },
      }));
    }
  };

  const cambiarFuenteTutor = (fuente: FuenteTutor) => {
    setFuenteTutor(fuente);
    if (fuente === "contacto1" || fuente === "contacto2") {
      const contactoSeleccionado = f.contactos[fuente === "contacto1" ? 0 : 1];
      setF((s) => ({
        ...s,
        menor: {
          ...s.menor,
          tutor_nombre: contactoSeleccionado.nombre,
          tutor_parentesco: contactoSeleccionado.parentesco,
          tutor_telefono: contactoSeleccionado.telefono,
        },
      }));
    }
  };

  const input = (
    id: string,
    titulo: string,
    valor: string,
    cambio: (v: string) => void,
    opciones: OpcionesInput = {},
  ) => renderInput(id, titulo, valor, cambio, errores, opciones);

  const select = (
    id: string,
    titulo: string,
    valor: string,
    cambio: (v: string) => void,
    items: { value: string; label: string }[],
  ) => renderSelect(id, titulo, valor, cambio, items, errores);
  const validarPaso = () => {
    const todos = validarRegistro(normalizado());
    if (sinContactoAlternativo) {
      delete todos["contactos.1.nombre"];
      delete todos["contactos.1.parentesco"];
      delete todos["contactos.1.telefono"];
    }
    const filtrados = Object.fromEntries(
      Object.entries(todos).filter(([k]) => grupo(paso, k)),
    );
    setErrores(filtrados);

    if (Object.keys(filtrados).length) {
      setAviso(
        `Hay ${Object.keys(filtrados).length} ${Object.keys(filtrados).length === 1 ? "dato que necesita" : "datos que necesitan"} atención en esta sección. Los marcamos debajo de cada campo.`,
      );
      return false;
    }

    setAviso("");
    return true;
  };

  const continuar = () => {
    if (validarPaso()) ir(paso === 1 && !esMenor ? 3 : paso + 1);
  };

  const enviar = () => {
    const datos = normalizado();
    const todos = validarRegistro(datos);
    if (sinContactoAlternativo) {
      delete todos["contactos.1.nombre"];
      delete todos["contactos.1.parentesco"];
      delete todos["contactos.1.telefono"];
    }

    if (Object.keys(todos).length) {
      const primer = Object.keys(todos)[0];
      setErrores(todos);
      setPaso(pasoDeError(primer));
      setAviso(`Antes de enviar, revisa: ${todos[primer]}`);
      return;
    }

    setAviso("");
    iniciar(async () => {
      try {
        const r = await registrarVelada({ ...datos, evento_id: evento.id });
        if (r.ok && r.folio) {
          setResultado({ folio: r.folio, menor: !!r.menor, mensaje: r.mensaje });
        } else {
          setAviso(
            r.mensaje ||
              "No pudimos guardar tu inscripción. Inténtalo nuevamente.",
          );
        }
      } catch {
        setAviso(
          "Se interrumpió la conexión. Conservamos tus respuestas; inténtalo otra vez.",
        );
      }
    });
  };

  const volver = () =>
    ir(paso === 3 && !esMenor ? 1 : Math.max(0, paso - 1));
  if (resultado) {
    return (
      <main className="min-h-[70vh] px-4 py-16">
        <div className="mx-auto max-w-xl rounded-[32px] border border-white/25 bg-black/25 p-8 text-center shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.45),0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150 sm:p-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <CheckCircle2 size={34} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[.18em] text-[#a47728]">
            Monte Sion · Velada
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            ¡Recibimos tu registro!
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            {resultado.mensaje}
          </p>
          <div className="mt-6 rounded-2xl border border-white/15 bg-white/5 p-5">
            <p className="text-xs font-medium text-white/70">
              Tu folio de seguimiento
            </p>
            <p className="mt-1 break-all font-mono text-xl font-bold">
              {resultado.folio}
            </p>
          </div>
          {resultado.menor && (
            <p className="mt-5 rounded-xl bg-amber-50 p-4 text-left text-sm leading-6 text-amber-950">
              La inscripción del menor sigue{" "}
              <strong>pendiente de verificación</strong>. El tutor deberá
              presentar y validar su autorización antes de que se permita el
              ingreso.
            </p>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-8 sm:py-12">
      <div
        ref={encabezado}
        className="mx-auto max-w-[1000px] scroll-mt-8"
      >
        <header className="overflow-hidden rounded-[32px] border border-white/25 bg-black/25 p-7 text-white shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.45),0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150 sm:p-10">
          <h1 className="mt-5 max-w-2xl text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.1] tracking-[-.045em]">
            {evento.titulo}
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/70">
            Una noche para permanecer juntos.
          </p>
          <p className="mt-1 text-xs text-white/60">
            {new Date(evento.inicio).toLocaleString("es-MX", {
              dateStyle: "long",
              timeStyle: "short",
            })}
          </p>
        </header>

        <div className="mx-auto mt-7 max-w-auto">
          <section className="min-w-0 rounded-[28px] border border-white/20 bg-black/25 p-5 shadow-[inset_0_1px_1.5px_rgba(255,255,255,0.35),0_20px_40px_rgba(0,0,0,0.25)] backdrop-blur-2xl backdrop-saturate-150 sm:p-7">
            <div className="mb-7">
              <div className="mb-2 flex items-center justify-between text-xs text-white/60">
                <span>Paso {paso + 1} de 4</span>
              </div>
              <div
                className="h-1 w-full overflow-hidden rounded-full bg-white/10"
                role="progressbar"
                aria-label={`Paso ${paso + 1} de 4`}
                aria-valuemin={1}
                aria-valuemax={4}
                aria-valuenow={paso + 1}
              >
                <div
                  className="h-full rounded-full bg-white/75 transition-[width] duration-300"
                  style={{ width: `${((paso + 1) / 4) * 100}%` }}
                />
              </div>
            </div>

            {paso === 0 && (
              <div className="space-y-7">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Empecemos por ti
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Cuéntanos quién eres y cómo participarás en esta noche
                    especial.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {input("nombres", "Nombre(s)", f.nombres, (v) => cambiar("nombres", v), {
                    placeholder: "Como aparecen en tus documentos",
                  })}
                  {input(
                    "apellido_paterno",
                    "Primer apellido",
                    f.apellido_paterno,
                    (v) => cambiar("apellido_paterno", v),
                  )}
                  {input(
                    "apellido_materno",
                    "Segundo apellido",
                    f.apellido_materno,
                    (v) => cambiar("apellido_materno", v),
                    {
                      required: false,
                      ayuda:
                        "Déjalo vacío si legalmente no tienes segundo apellido.",
                    },
                  )}
                  {input(
                    "fecha_nacimiento",
                    "Fecha de nacimiento",
                    f.fecha_nacimiento,
                    (v) => cambiar("fecha_nacimiento", v),
                    { type: "date" },
                  )}
                  {input(
                    "telefono",
                    "Teléfono móvil",
                    f.telefono,
                    (v) => cambiar("telefono", v),
                    { type: "tel", placeholder: "10 dígitos", autoComplete: "tel" },
                  )}
                  {input(
                    "email",
                    "Correo electrónico",
                    f.email,
                    (v) => cambiar("email", v),
                    {
                      type: "email",
                      placeholder: "nombre@correo.com",
                      autoComplete: "email",
                    },
                  )}
                  {input(
                    "municipio",
                    "Municipio o localidad",
                    f.municipio,
                    (v) => cambiar("municipio", v),
                    { placeholder: "¿De dónde nos visitas?" },
                  )}
                  {input(
                    "congregacion",
                    "Congregación o comunidad",
                    f.congregacion,
                    (v) => cambiar("congregacion", v),
                    {
                      placeholder:
                        "Escribe 'No pertenezco a una congregación'",
                      accionVacia: "No pertenezco a una congregación",
                      accionVaciaTexto: "No pertenezco a una congregación",
                    },
                  )}
                </div>
                {edad !== null && edad >= 0 && edad <= 115 && (
                  <div className="flex gap-3 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm text-white/80 backdrop-blur-md">
                    <Info size={18} className="shrink-0" />
                    <span>
                      <strong>{edad} años.</strong>{" "}
                      {esMenor
                        ? "Como eres menor de edad, al final solicitaremos los datos y autorización de tu responsable."
                        : "Tu inscripción se realizará como persona adulta."}
                    </span>
                  </div>
                )}
                <div className="grid grid-cols-1 gap-4">
                  {select(
                    "modalidad",
                    "¿Cuánto tiempo asistirás?",
                    f.modalidad,
                    (v) => cambiar("modalidad", v),
                    [
                      { value: "toda_noche", label: "Toda la noche" },
                      { value: "parcial", label: "Solo parte de la noche" },
                    ],
                  )}
                  {f.modalidad === "parcial" &&
                    input(
                      "hora_salida_prevista",
                      "Hora aproximada de salida",
                      f.hora_salida_prevista,
                      (v) => cambiar("hora_salida_prevista", v),
                      { type: "time" },
                    )}
                </div>
                {input(
                  "transporte",
                  "¿Cómo llegarás y regresarás?",
                  f.transporte,
                  (v) => cambiar("transporte", v),
                  { placeholder: "Por ejemplo: transporte familiar" },
                )}
              </div>
            )}

            {paso === 1 && (
              <div className="space-y-7">
                <div>
                  <h2 className="text-2xl font-semibold tracking-[-.035em]">
                    Queremos cuidarte bien
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">
                    Estos datos ayudan a localizar a alguien de confianza y
                    atender necesidades durante la velada.
                  </p>
                </div>
                <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-white/25 bg-white/10 p-4 text-sm leading-6 text-white/90 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-md">
                  <input
                    type="checkbox"
                    checked={sinContactoAlternativo}
                    onChange={(e) => {
                      const omitir = e.target.checked;
                      setSinContactoAlternativo(omitir);
                      if (omitir) {
                        setF((s) => ({
                          ...s,
                          contactos: [s.contactos[0], contacto()],
                        }));
                        setErrores((prev) => {
                          const siguiente = { ...prev };
                          delete siguiente["contactos.1.nombre"];
                          delete siguiente["contactos.1.parentesco"];
                          delete siguiente["contactos.1.telefono"];
                          return siguiente;
                        });
                        if (fuenteTutor === "contacto2") cambiarFuenteTutor("otra");
                      }
                    }}
                    className="mt-1 h-4 w-4 shrink-0 appearance-none rounded-full border border-white/35 bg-white/20 checked:border-white checked:bg-white/80 checked:shadow-[inset_0_0_0_4px_rgba(15,23,42,0.8)] focus:ring-2 focus:ring-white/30"
                  />
                  <span>
                    <strong>No cuento con un segundo contacto de emergencia.</strong>{" "}
                    Se puede continuar con una sola persona adulta registrada, incluso si también será tutor legal y persona autorizada para recoger. No es lo recomendable: un contacto alternativo facilita responder si no se logra localizar al contacto principal.
                  </span>
                </label>
                {f.contactos.map((c, i) =>
                  sinContactoAlternativo && i === 1 ? null : (
                  <div key={i} className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
                    <h3 className="mb-4 text-sm font-semibold tracking-tight text-white">
                      {i === 0
                        ? "Contacto principal de emergencia"
                        : "Contacto alternativo"}
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {input(
                        `contactos.${i}.nombre`,
                        "Nombre completo",
                        c.nombre,
                        (v) => contactoEditar(i, "nombre", v),
                      )}
                      {input(
                        `contactos.${i}.parentesco`,
                        "Parentesco o relación",
                        c.parentesco,
                        (v) => contactoEditar(i, "parentesco", v),
                      )}
                      <div className="sm:col-span-2">
                        {input(
                          `contactos.${i}.telefono`,
                          "Teléfono",
                          c.telefono,
                          (v) => contactoEditar(i, "telefono", v),
                          { type: "tel", placeholder: "10 dígitos" },
                        )}
                      </div>
                    </div>
                  </div>
                  ),
                )}
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    Información importante de salud
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-white/70">
                    Responde todos los apartados. Si no tienes alguna condición,
                    escribe «Ninguna» o «No aplica». No necesitas compartir un
                    historial clínico completo.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {input(
                    "salud.alergias",
                    "Alergias relevantes",
                    f.salud.alergias,
                    (v) => salud("alergias", v),
                    { placeholder: "Especifica si aplica", accionVacia: "Ninguna" },
                  )}
                  {input(
                    "salud.medicamentos",
                    "Medicamentos necesarios durante la velada",
                    f.salud.medicamentos,
                    (v) => salud("medicamentos", v),
                    { placeholder: "Especifica si aplica", accionVacia: "Ninguna" },
                  )}
                  {input(
                    "salud.condiciones",
                    "Condiciones que requieran apoyo",
                    f.salud.condiciones,
                    (v) => salud("condiciones", v),
                    { placeholder: "Especifica si aplica", accionVacia: "Ninguna" },
                  )}
                  {input(
                    "salud.accesibilidad",
                    "Necesidades de accesibilidad",
                    f.salud.accesibilidad,
                    (v) => salud("accesibilidad", v),
                    { placeholder: "Especifica si aplica", accionVacia: "Ninguna" },
                  )}
                </div>
                {input(
                  "salud.indicaciones",
                  "Indicaciones útiles en una emergencia",
                  f.salud.indicaciones,
                  (v) => salud("indicaciones", v),
                  { placeholder: "Especifica si aplica", accionVacia: "Ninguna" },
                )}
                {select(
                  "salud.tipo_sangre",
                  "Tipo de sangre",
                  f.salud.tipo_sangre,
                  (v) => salud("tipo_sangre", v),
                  [
                    { value: "", label: "Selecciona una respuesta" },
                    ...[
                      "A+",
                      "A-",
                      "B+",
                      "B-",
                      "AB+",
                      "AB-",
                      "O+",
                      "O-",
                      "desconocido",
                    ].map((x) => ({
                      value: x,
                      label: x === "desconocido" ? "No lo sé" : x,
                    })),
                  ],
                )}
                <p className="rounded-2xl border border-white/15 bg-white/5 p-3 text-xs leading-5 text-white/70">
                  El tipo de sangre declarado nunca se utilizará para tomar
                  decisiones de transfusión. Solo personal autorizado debería
                  acceder a los datos de salud.
                </p>
              </div>
            )}

            {paso === 2 && esMenor && (
              <div className="space-y-7">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Tu familia y tu autorización
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Necesitamos los datos de una persona con responsabilidad
                    legal para revisar tu participación.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-6 text-white/85 backdrop-blur-md">
                  <ShieldCheck size={19} className="mb-2" />La inscripción no
                  autoriza automáticamente el ingreso. La carta firmada y la
                  identidad del tutor deben verificarse antes de la velada.
                </div>
                {select(
                  "menor.modalidad",
                  "¿Tu padre, madre o tutor estará presente?",
                  f.menor.modalidad,
                  (v) => responsable("modalidad", v),
                  [
                    {
                      value: "sin_tutor_presente",
                      label: "No, asistiré sin mi tutor (predeterminado)",
                    },
                    {
                      value: "con_tutor_presente",
                      label: "Sí, me acompañará durante la velada",
                    },
                  ],
                )}
                <div>
                  <h3 className="mb-4 text-lg font-semibold tracking-tight text-white">
                    Padre, madre o tutor legal
                  </h3>
                  <label htmlFor="fuente-tutor" className={estiloEtiqueta}>
                    Datos del tutor legal
                  </label>
                  <select
                    id="fuente-tutor"
                    value={fuenteTutor}
                    onChange={(e) => cambiarFuenteTutor(e.target.value as FuenteTutor)}
                    className={`${estiloCampo} appearance-none`}
                  >
                    <option value="contacto1" className="bg-neutral-900 text-white">Usar el contacto principal de emergencia</option>
                    <option value="contacto2" disabled={sinContactoAlternativo} className="bg-neutral-900 text-white">Usar el contacto alternativo de emergencia</option>
                    <option value="otra" className="bg-neutral-900 text-white">Capturar otra persona</option>
                  </select>
                  {fuenteTutor !== "otra" && (
                    <p className="mt-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-sm text-white/75">
                      {f.contactos[fuenteTutor === "contacto1" ? 0 : 1].nombre || "Contacto"} · {f.contactos[fuenteTutor === "contacto1" ? 0 : 1].telefono || "Teléfono pendiente"}
                    </p>
                  )}
                  {fuenteTutor === "otra" && <div className="mt-4 grid grid-cols-1 gap-4">
                    {input(
                      "menor.tutor_nombre",
                      "Nombre completo",
                      f.menor.tutor_nombre,
                      (v) => responsable("tutor_nombre", v),
                    )}
                    {input(
                      "menor.tutor_parentesco",
                      "Parentesco",
                      f.menor.tutor_parentesco,
                      (v) => responsable("tutor_parentesco", v),
                      { placeholder: "Madre, padre o tutor legal" },
                    )}
                    {input(
                      "menor.tutor_telefono",
                      "Teléfono",
                      f.menor.tutor_telefono,
                      (v) => responsable("tutor_telefono", v),
                      { type: "tel", placeholder: "10 dígitos" },
                    )}
                    <div>
                      {input(
                        "menor.tutor_email",
                        "Correo electrónico",
                        f.menor.tutor_email,
                        (v) => responsable("tutor_email", v),
                        { type: "email", placeholder: "correo@dominio.com" },
                      )}
                      {f.email && (
                        <button
                          type="button"
                          onClick={() => responsable("tutor_email", f.email)}
                          className="mt-2 text-xs font-medium text-white/70 underline underline-offset-2 hover:text-white"
                        >
                          Usar el correo del asistente
                        </button>
                      )}
                    </div>
                  </div>}
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 sm:p-5">
                  <h3 className="text-lg font-semibold tracking-tight text-white">
                    ¿Quién te recogerá?
                  </h3>
                  <p className="mt-1 text-sm text-white/70">
                    Elige una persona ya registrada o agrega a alguien diferente.
                  </p>
                  <label htmlFor="fuente-recogida" className={`${estiloEtiqueta} mt-4`}>
                    Persona autorizada para recoger
                  </label>
                  <select
                    id="fuente-recogida"
                    value={fuenteRecogida}
                    onChange={(e) => cambiarFuenteRecogida(e.target.value as FuenteRecogida)}
                    className={`${estiloCampo} appearance-none`}
                  >
                    <option value="tutor" className="bg-neutral-900 text-white">El padre, madre o tutor registrado</option>
                    <option value="contacto1" className="bg-neutral-900 text-white">Contacto principal de emergencia</option>
                    <option value="contacto2" className="bg-neutral-900 text-white">Contacto alternativo de emergencia</option>
                    <option value="otra" className="bg-neutral-900 text-white">Otra persona (capturar sus datos)</option>
                  </select>
                  {fuenteRecogida !== "otra" && (
                    <p className="mt-3 rounded-2xl border border-white/15 bg-white/10 p-3 text-sm text-white/75">
                      {fuenteRecogida === "tutor"
                        ? `${f.menor.tutor_nombre || "Tutor"} · ${f.menor.tutor_telefono || "Teléfono pendiente"}`
                        : `${f.contactos[fuenteRecogida === "contacto1" ? 0 : 1].nombre || "Contacto"} · ${f.contactos[fuenteRecogida === "contacto1" ? 0 : 1].telefono || "Teléfono pendiente"}`}
                    </p>
                  )}
                  {fuenteRecogida === "otra" && (
                    <div className="mt-5 grid grid-cols-1 gap-4">
                      {input(
                        "menor.recogida_nombre",
                        "Nombre de la persona autorizada",
                        f.menor.recogida_nombre,
                        (v) => responsable("recogida_nombre", v),
                      )}
                      {input(
                        "menor.recogida_parentesco",
                        "Parentesco",
                        f.menor.recogida_parentesco,
                        (v) => responsable("recogida_parentesco", v),
                      )}
                      <div className="sm:col-span-2">
                        {input(
                          "menor.recogida_telefono",
                          "Teléfono",
                          f.menor.recogida_telefono,
                          (v) => responsable("recogida_telefono", v),
                          { type: "tel" },
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-xs leading-5 text-neutral-500">
                  Si cambian las personas autorizadas, comunícalo al equipo
                  organizador. La entrega de menores estará sujeta a
                  verificación presencial.
                </p>
              </div>
            )}

            {paso === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-white">
                    Ya casi terminamos
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Revisa tu información y confirma que todo sea correcto.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-5 text-sm leading-7 text-white">
                  <p>
                    <span className="text-white/60">Asistente:</span>{" "}
                    <strong>
                      {f.nombres} {f.apellido_paterno} {f.apellido_materno}
                    </strong>
                  </p>
                  <p>
                    <span className="text-white/60">Edad:</span>{" "}
                    <strong>{edad ?? "Por confirmar"} años</strong>
                  </p>
                  <p>
                    <span className="text-white/60">Asistencia:</span>{" "}
                    <strong>
                      {f.modalidad === "toda_noche" ? "Toda la noche" : "Parcial"}
                    </strong>
                  </p>
                  {esMenor && (
                    <p>
                      <span className="text-white/60">Responsable:</span>{" "}
                      <strong>{normalizado().menor.tutor_nombre}</strong>
                    </p>
                  )}
                  <p>
                    <span className="text-white/60">Estado:</span>{" "}
                    <strong>Pendiente de revisión</strong>
                  </p>
                </div>
                <div className="space-y-4">
                  {(
                    [
                      {
                        key: "consentimiento_privacidad",
                        titulo:
                          "He leído el aviso de privacidad y comprendo cómo se tratarán mis datos.",
                      },
                      {
                        key: "consentimiento_participacion",
                        titulo:
                          "Confirmo que la información proporcionada es correcta y solicito mi inscripción.",
                      },
                    ] as const
                  ).map((x) => (
                    <div key={x.key}>
                      <label className="flex cursor-pointer items-start gap-3 text-sm leading-6">
                        <input
                          type="checkbox"
                          checked={f[x.key]}
                          onChange={(e) => cambiar(x.key, e.target.checked)}
                          className="mt-1 h-4 w-4 appearance-none rounded-full border border-white/35 bg-white/20 checked:border-white checked:bg-white/80 checked:shadow-[inset_0_0_0_4px_rgba(15,23,42,0.8)] focus:ring-2 focus:ring-white/30"
                        />
                        <span>
                          {x.titulo}{" "}
                        </span>
                      </label>
                      {errores[x.key] && (
                        <p className="ml-7 text-xs text-red-300">
                          {errores[x.key]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
                {esMenor && (
                  <p className="rounded-2xl border border-white/20 bg-white/10 p-4 text-sm leading-6 text-white/85">
                    Esta solicitud seguirá pendiente hasta verificar la carta
                    responsiva y la autorización del tutor. El formulario no
                    constituye una firma legal.
                  </p>
                )}
              </div>
            )}

            {aviso && (
              <div
                role="alert"
                aria-live="assertive"
                className="mt-7 rounded-2xl border border-red-300/30 bg-red-500/15 p-4 text-sm leading-6 text-red-100 backdrop-blur-md"
              >
                <strong>Revisa tu información.</strong> {aviso}
              </div>
            )}

            <div className="mt-9 flex items-center justify-between gap-3 pt-6">
              <button
                type="button"
                disabled={paso === 0 || pendiente}
                onClick={volver}
                className={`${textoBoton} text-white/85`}
              >
                <ArrowLeft size={16} /> Atrás
              </button>
              {paso !== 3 ? (
                <button
                  type="button"
                  onClick={continuar}
                  className={`${textoBoton} bg-white/30 hover:bg-white/40`}
                >
                  Continuar <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={pendiente}
                  onClick={enviar}
                  className={`${textoBoton} bg-white/30 hover:bg-white/40`}
                >
                  {pendiente ? "Enviando inscripción..." : "Enviar mi inscripción"}{" "}
                  {!pendiente && <ArrowRight size={16} />}
                </button>
              )}
            </div>
            <p className="mt-6 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-5 text-white/55">
              <LockKeyhole size={15} className="mt-0.5 shrink-0" />
              <span>
                Solo pedimos información necesaria para organizar la velada y atender
                emergencias. No compartas información que no se solicite.
              </span>
            </p>
          </section>
        </div>
        <div className="mx-auto mt-7 max-w-[1000px] text-right">
          <button
            type="button"
            onClick={eliminarProgreso}
            className="text-sm font-medium text-white/65 underline underline-offset-4 hover:text-red-300"
          >
            Eliminar progreso guardado
          </button>
        </div>
        <p className="mx-auto mt-5 max-w-xl text-center text-xs leading-5 text-white/60">
          Monte Sion · Tu registro será revisado por el equipo organizador. Si
          tienes alguna dificultad para completarlo, solicita apoyo a un
          responsable de la iglesia.
        </p>
      </div>
    </main>
  );
}