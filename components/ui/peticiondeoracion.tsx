"use client";

import React, { useState, useCallback, useEffect } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import clsx from "clsx";

type Campos = "nombre" | "correo_electronico" | "asunto" | "peticion";

const placeholders: Record<Campos, string> = {
  nombre: "Nombre",
  correo_electronico: "Correo electrónico",
  asunto: "Asunto",
  peticion: "Describe tu petición",
};

const mensajesError: Record<Campos, string> = {
  nombre: "Por favor ingresa un nombre válido (mín. 2 caracteres).",
  correo_electronico: "Verifica este dato.",
  asunto: "Por favor ingresa un asunto válido (mín. 2 caracteres).",
  peticion: "Por favor describe tu petición (mín. 10 caracteres).",
};

const validarEmail = (correo_electronico: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo_electronico);

const validarCampo = (field: Campos, value: string): boolean => {
  const val = value.trim();
  if (!val) return false;

  if (field === "correo_electronico") return validarEmail(val);
  if (field === "peticion") return val.length >= 10;
  if (field === "nombre" || field === "asunto") return val.length >= 2;
  return false;
};

const validarTodosCampos = (inputs: Record<Campos, string>): Record<Campos, "valid" | "invalid" | "unset"> => ({
  nombre: validarCampo("nombre", inputs.nombre) ? "valid" : "invalid",
  correo_electronico: validarCampo("correo_electronico", inputs.correo_electronico)
    ? "valid"
    : "invalid",
  asunto: validarCampo("asunto", inputs.asunto) ? "valid" : "invalid",
  peticion: validarCampo("peticion", inputs.peticion) ? "valid" : "invalid",
});

interface InputProps {
  field: Campos;
  value: string;
  validationState: "valid" | "invalid" | "unset";
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: (field: Campos, value: string) => void;
  isTextarea?: boolean;
}

const inputBaseClasses =
  "w-full p-3 rounded-2xl bg-[var(--color-background)] text-[var(--color-foreground)] placeholder-[var(--color-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--color-foreground)]";

const InputField: React.FC<InputProps> = ({
  field,
  value,
  validationState,
  onChange,
  onBlur,
  isTextarea = false,
}) => {
  const isInvalid = validationState === "invalid";
  const isValid = validationState === "valid";

  return (
    <div className="w-full relative">
      <label htmlFor={field} className="sr-only">
        {placeholders[field]}
      </label>

      {isTextarea ? (
        <textarea
          id={field}
          name={field}
          rows={4}
          required
          placeholder={placeholders[field]}
          value={value}
          onChange={onChange}
          onBlur={(e) => onBlur(field, e.target.value)}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${field}-error` : undefined}
          className={clsx(
            inputBaseClasses,
            "autofill-fix resize-none",
            isInvalid && "border-2 border-red-600"
          )}
        />
      ) : (
        <input
          id={field}
          name={field}
          type={field === "correo_electronico" ? "email" : "text"}
          required
          placeholder={placeholders[field]}
          value={value}
          onChange={onChange}
          onBlur={(e) => onBlur(field, e.target.value)}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${field}-error` : undefined}
          className={clsx(
            inputBaseClasses,
            "autofill-fix",
            isInvalid && "border-2 border-red-600"
          )}
        />
      )}

      {isValid && (
        <CheckCircle2
          size={20}
          className="absolute right-3 top-3 text-green-500 transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {isInvalid && (
        <>
          <XCircle
            size={20}
            className="absolute right-3 top-3 text-red-600 transition-opacity duration-300"
            aria-hidden="true"
          />
          <p
            id={`${field}-error`}
            className="mt-1 text-sm text-red-600 font-semibold"
            role="alert"
          >
            {mensajesError[field]}
          </p>
        </>
      )}
    </div>
  );
};

const PeticionDeOracion = () => {
  const [inputs, setInputs] = useState<Record<Campos, string>>({
    nombre: "",
    correo_electronico: "",
    asunto: "",
    peticion: "",
  });

  const [validaciones, setValidaciones] = useState<
    Record<Campos, "valid" | "invalid" | "unset">
  >({
    nombre: "unset",
    correo_electronico: "unset",
    asunto: "unset",
    peticion: "unset",
  });

  const [mensajeEnvio, setMensajeEnvio] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleBlur = useCallback((field: Campos, value: string) => {
    if (value.trim() === "") {
      setValidaciones((prev) => ({ ...prev, [field]: "unset" }));
      return;
    }

    setValidaciones((prev) => ({
      ...prev,
      [field]: validarCampo(field, value) ? "valid" : "invalid",
    }));
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      const field = name as Campos;
      setInputs((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nuevasValidaciones = validarTodosCampos(inputs);
    setValidaciones(nuevasValidaciones);

    const tieneError = Object.values(nuevasValidaciones).some(
      (estado) => estado !== "valid"
    );
    if (tieneError) {
      setMensajeEnvio("Por favor corrige los errores antes de enviar.");
      return;
    }

    setLoading(true);
    setMensajeEnvio(null);

    const API_URL = process.env.NEXT_PUBLIC_PETICIONES_URL || "https://montesion.me/peticiones";

    try {
      const response = await fetch(`${API_URL}/peticion`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ticket: Math.floor(Math.random() * 1000000),
          nombre: inputs.nombre.trim(),
          correo_electronico: inputs.correo_electronico.trim(),
          asunto: inputs.asunto.trim(),
          peticion: inputs.peticion.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.detail || `Error en la petición: ${response.statusText}`
        );
      }

      await response.json();
      setMensajeEnvio("Petición enviada con éxito. ¡Gracias!");
      setInputs({ nombre: "", correo_electronico: "", asunto: "", peticion: "" });
      setValidaciones({
        nombre: "unset",
        correo_electronico: "unset",
        asunto: "unset",
        peticion: "unset",
      });
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error desconocido";
      setMensajeEnvio(`Error al enviar la petición: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (isDark: boolean) => {
      root.style.setProperty("--color-background", isDark ? "#0a0a0a" : "#ffffff");
      root.style.setProperty("--color-foreground", isDark ? "#ededed" : "#171717");
    };

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    applyTheme(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => applyTheme(e.matches);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  return (
    <main className="flex flex-col justify-center min-h-screen bg-background px-6 py-36">
      <div className="w-full max-w-2xl mx-auto flex flex-col gap-16">
        <header className="text-left">
          <h1 className="text-5xl font-semibold text-foreground mb-6">
            Petición de Oración
          </h1>
          <p className="text-lg text-foreground text-justify">
            Comparte tus peticiones con nosotros. Estamos aquí para orar contigo y
            apoyarte en tus necesidades espirituales.
          </p>
        </header>

        <section className="w-full shadow-lg rounded-lg bg-background p-8">
          <form
            className="flex flex-col gap-7 items-start"
            onSubmit={handleSubmit}
            noValidate
          >
            {(["nombre", "correo_electronico", "asunto"] as Campos[]).map((field) => (
              <InputField
                key={field}
                field={field}
                value={inputs[field]}
                validationState={validaciones[field]}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            ))}

            <InputField
              field="peticion"
              value={inputs.peticion}
              validationState={validaciones.peticion}
              onChange={handleChange}
              onBlur={handleBlur}
              isTextarea
            />

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full py-3 font-bold rounded-2xl bg-black text-white focus:ring-2 focus:ring-white transition-opacity duration-300",
                loading && "opacity-60 cursor-not-allowed"
              )}
              aria-busy={loading}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
          </form>
        </section>

        {mensajeEnvio && (
          <section className="text-left mt-4" role="alert" aria-live="polite">
            <p
              className={clsx(
                "font-semibold",
                mensajeEnvio.startsWith("Error") ? "text-red-600" : "text-green-600"
              )}
            >
              {mensajeEnvio}
            </p>
          </section>
        )}

        <section className="text-left">
          <p className="opacity-70 text-[var(--color-foreground)] text-justify">
            Tu petición de oración será compartida con los voluntarios del Equipo de
            Oración de Monte Sion. Ellos se comprometen a orar por cada petición
            recibida.
            <br />
            Al enviar este formulario, aceptas que te contactemos por correo
            electrónico para informarte sobre el estado de tu petición y cualquier
            actualización relacionada, siempre manteniendo confidencialidad y respeto por tu privacidad, incluyendo la eliminación de información sensible si así lo solicitas.
            <br />
            Si tienes alguna pregunta o inquietud, no dudes en contactarnos a través de <br />
            <a href="mailto:ministeriomontesionoaxaca@gmail.com">ministeriomontesionoaxaca@gmail.com</a>.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PeticionDeOracion;