"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useAuth } from "@/app/auth-context"
import { useRouter } from "next/navigation"

export default function PasswordRecoveryPage() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { requestPasswordReset } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      await requestPasswordReset(email)
      router.push("/users/password/check_email") // Ruta opcional tras éxito
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError("Error al enviar el correo de recuperación")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground transition-colors duration-300">
      <main className="w-full max-w-sm px-3 py-8 space-y-8 z-10">
        <h1 className="text-2xl font-semibold text-center tracking-tight drop-shadow-sm mb-1 leading-tight">
          Recupera tu contraseña
        </h1>
        {error && (
          <div className="bg-red-100 text-red-800 rounded-md px-4 py-2 text-center text-sm font-medium mb-3">
            {error}
          </div>
        )}
        <p className="text-center text-muted-foreground text-base mb-6 leading-relaxed">
          Coloca tu correo para buscar tu usuario y enviarte un correo de recuperación de contraseña:
        </p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 block">
              Correo electrónico
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              className="w-full px-3 py-2 border rounded-lg text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all duration-150 bg-white dark:bg-neutral-900 border-gray-300 dark:border-neutral-600"
              autoComplete="email"
              required
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white py-2.5 text-base font-semibold rounded-lg shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-green-400 mt-2"
            disabled={loading}
          >
            {loading ? "Enviando..." : "Enviar correo de recuperación"}
          </Button>
        </form>
        <div className="text-center mt-4">
          <Link
            href="/users/sign_in"
            className="text-gray-900 dark:text-white underline font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-150 text-sm"
          >
            Iniciar sesión
          </Link>
        </div>
        <div className="text-center mt-1">
          <span className="text-gray-600 dark:text-gray-400 text-sm">¿No tienes cuenta? </span>
          <Link
            href="/users/sign_up"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all duration-150 text-sm"
          >
            Regístrate →
          </Link>
        </div>
      </main>
    </div>
  )
}