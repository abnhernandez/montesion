"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/app/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, user, loading: authLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!authLoading && user) {
      router.push("/dashboard")
    }
  }, [user, authLoading, router])

  // Validación simple de email
  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validaciones básicas antes de enviar
    if (!email || !password) {
      setError("Por favor, completa todos los campos")
      return
    }

    if (!isValidEmail(email)) {
      setError("Por favor, ingresa un correo electrónico válido")
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      // No necesitas router.push aquí, el useEffect lo manejará
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Error al iniciar sesión")
      } else {
        setError("Error al iniciar sesión")
      }
    } finally {
      setLoading(false)
    }
  }

  if (authLoading) return <div>Cargando...</div>
  if (!authLoading && user) return <div>Redirigiendo a dashboard...</div>

  const inputClass =
    "w-full px-3 py-3 border rounded-lg text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all duration-150 bg-white dark:bg-neutral-900"

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex items-center justify-center">
      <main className="w-full max-w-md px-4 space-y-7 z-10">
        <h1 className="text-3xl font-semibold text-center tracking-tight drop-shadow-sm">
          Inicia sesión
        </h1>

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div>
            <Label htmlFor="email" className="text-sm font-medium">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className={`${inputClass} border-gray-300 dark:border-neutral-600`}
              autoComplete="email"
              required
              disabled={loading}
              aria-invalid={!!error && !isValidEmail(email)}
              aria-describedby="email-error"
            />
            {error && !isValidEmail(email) && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {error}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Contraseña
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className={`${inputClass} pr-10 border-gray-300 dark:border-neutral-600`}
                autoComplete="current-password"
                required
                disabled={loading}
                aria-invalid={!!error && password.length === 0}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                ) : (
                  <Eye className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                )}
              </button>
            </div>
            {error && password.length === 0 && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {error}
              </p>
            )}
          </div>

          {error && email && password && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-green-400"
            disabled={loading}
          >
            {loading ? "Iniciando sesión..." : "Iniciar sesión"}
          </Button>
        </form>

        <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed">
          Al continuar con tu correo o tu red social aceptas los{" "}
          <Link
            href="/terms"
            className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150"
          >
            términos y condiciones
          </Link>{" "}
          y el{" "}
          <Link
            href="/privacy"
            className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150"
          >
            aviso de privacidad
          </Link>
        </p>

        <div className="text-center">
          <Link
            href="/users/password/new"
            className="text-gray-900 dark:text-white underline font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150"
          >
            Olvidé mi contraseña
          </Link>
        </div>

        <div className="text-center">
          <span className="text-gray-600 dark:text-gray-400">¿No tienes cuenta? </span>
          <Link
            href="/users/sign_up"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all duration-150"
          >
            Regístrate →
          </Link>
        </div>
      </main>
    </div>
  )
}