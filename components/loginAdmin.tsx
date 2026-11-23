
"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  ArrowRight,
  LoaderCircle,
} from "lucide-react";

import {
  adminLogin,
  type LoginState,
} from "@/lib/loginAdmin";

type AdminLoginProps = {
  redirectTo?: string;
  title?: string;
  subtitle?: string;
};

const initialState: LoginState = {
  error: null,
  success: false,
};

export default function AdminLogin({
  redirectTo = "/admin",
  title = "ACCESO ADMINISTRATIVO",
  subtitle = "Ingresa tus credenciales para continuar.",
}: AdminLoginProps) {
  const router = useRouter();

  const [mostrarPassword, setMostrarPassword] =
    useState(false);

  const [state, formAction, pending] = useActionState(
    adminLogin,
    initialState
  );

  // Redirigir después de iniciar sesión correctamente
  useEffect(() => {
    if (state.success) {
      router.replace(redirectTo);
      router.refresh();
    }
  }, [state.success, redirectTo, router]);

  return (
    <div className="w-full max-w-[440px]">

      {/* ENCABEZADO */}
      <div className="mb-10 text-center">

        {/* Icono administrativo */}
        <div className="mx-auto mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#F5BE52]/20 bg-[#F5BE52]/10">
          <LockKeyhole
            size={24}
            className="text-[#F5BE52]"
            strokeWidth={1.7}
          />
        </div>

        {/* Nombre de la iglesia */}
        <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.35em] text-[#F5BE52]">
          MONTE SION ATZOMPA
        </p>

        {/* Título */}
        <h1 className="text-[clamp(1.6rem,4vw,2.1rem)] font-black uppercase leading-tight tracking-[-0.05em] text-white">
          {title}
        </h1>

        {/* Descripción */}
        <p className="mt-3 text-sm text-neutral-500">
          {subtitle}
        </p>
      </div>

      {/* FORMULARIO */}
      <form
        action={formAction}
        className="space-y-6"
      >

        {/* CAMPO USUARIO */}
        <div>
          <label
            htmlFor="admin-usuario"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400"
          >
            Usuario
          </label>

          <div className="relative">

            <UserRound
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              id="admin-usuario"
              name="usuario"
              type="text"
              autoComplete="username"
              autoCapitalize="none"
              spellCheck={false}
              placeholder="Nombre de usuario"
              minLength={3}
              maxLength={32}
              pattern="[a-z0-9._-]{3,32}"
              title="Utiliza letras minúsculas, números, puntos, guiones o guiones bajos."
              required
              disabled={pending || state.success}
              className="h-14 w-full rounded-xl border border-white/10 bg-[#151515] pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-[#F5BE52]/60 focus:ring-2 focus:ring-[#F5BE52]/10 disabled:opacity-60"
            />
          </div>
        </div>

        {/* CAMPO CONTRASEÑA */}
        <div>
          <label
            htmlFor="admin-password"
            className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400"
          >
            Contraseña
          </label>

          <div className="relative">

            <LockKeyhole
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"
            />

            <input
              id="admin-password"
              name="password"
              type={mostrarPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Introduce tu contraseña"
              minLength={1}
              maxLength={1024}
              required
              disabled={pending || state.success}
              className="h-14 w-full rounded-xl border border-white/10 bg-[#151515] pl-12 pr-14 text-sm text-white outline-none transition placeholder:text-neutral-600 focus:border-[#F5BE52]/60 focus:ring-2 focus:ring-[#F5BE52]/10 disabled:opacity-60"
            />

            {/* Mostrar / ocultar contraseña */}
            <button
              type="button"
              onClick={() =>
                setMostrarPassword((actual) => !actual)
              }
              aria-label={
                mostrarPassword
                  ? "Ocultar contraseña"
                  : "Mostrar contraseña"
              }
              aria-pressed={mostrarPassword}
              disabled={pending || state.success}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              {mostrarPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>
          </div>
        </div>

        {/* MENSAJES DE ERROR */}
        {state.error && (
          <div
            role="alert"
            aria-live="polite"
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm leading-relaxed text-red-300"
          >
            {state.error}
          </div>
        )}

        {/* BOTÓN DE INICIO DE SESIÓN */}
        <button
          type="submit"
          disabled={pending || state.success}
          className="group flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#F5BE52] px-6 text-sm font-bold uppercase tracking-[0.08em] text-black transition-all duration-300 hover:bg-[#E9AE43] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending || state.success ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin"
                aria-hidden="true"
              />

              {state.success
                ? "REDIRIGIENDO..."
                : "VERIFICANDO..."}
            </>
          ) : (
            <>
              INICIAR SESIÓN

              <ArrowRight
                size={18}
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </>
          )}
        </button>

      </form>

      {/* PIE DEL FORMULARIO */}
      <p className="mt-8 text-center text-[11px] leading-relaxed text-neutral-600">
        Acceso restringido al personal autorizado.
      </p>

    </div>
  );
}