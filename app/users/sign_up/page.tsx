"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, CheckCircle, XCircle } from "lucide-react"
import { useAuth } from "@/app/auth-context"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo_electronico: "",
    password: "",
  })
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const { register } = useAuth()
  const router = useRouter()

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email)

  // Reglas para contraseña segura
  const passwordRules = {
    length: formData.password.length >= 8,
    uppercase: /[A-Z]/.test(formData.password),
    lowercase: /[a-z]/.test(formData.password),
    number: /\d/.test(formData.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  }

  const isPasswordValid = Object.values(passwordRules).every(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const nombre = formData.nombre.trim()
    const apellido = formData.apellido.trim()
    const correo_electronico = formData.correo_electronico.trim()
    const password = formData.password

    if (!nombre || !apellido || !correo_electronico || !password) {
      setError("Todos los campos son obligatorios")
      return
    }

    if (!isValidEmail(correo_electronico)) {
      setError("Por favor, ingresa un correo electrónico válido")
      return
    }

    if (!isPasswordValid) {
      setError("La contraseña no cumple con los requisitos de seguridad")
      return
    }

    setLoading(true)
    try {
      await register({
        nombre,
        apellido,
        correo_electronico,
        password,
      })
      router.push("/dashboard")
    } catch (err: unknown) {
      if (err instanceof Error) {
        if (
          err.message.toLowerCase().includes("correo") ||
          err.message.toLowerCase().includes("email") ||
          err.message.toLowerCase().includes("existe")
        ) {
          setError("El correo ya está en uso. Por favor usa otro.")
        } else {
          setError(err.message || "Error al registrar")
        }
      } else {
        setError("Error al registrar")
      }
    } finally {
      setLoading(false)
    }
  }

  const RuleItem = ({ valid, children }: { valid: boolean; children: React.ReactNode }) => (
    <li
      className={`flex items-center gap-2 text-sm ${
        valid ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"
      }`}
    >
      {valid ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
      {children}
    </li>
  )

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300 flex items-center justify-center relative">
      <main className="w-full max-w-md px-4 space-y-7 z-10">
        <h1 className="text-3xl font-semibold text-center tracking-tight drop-shadow-sm">Regístrate</h1>

        {error && (
          <div
            role="alert"
            className="p-3 mb-4 text-sm rounded-lg bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400 border border-red-200 dark:border-red-800/30"
          >
            {error}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit} noValidate>
          <div className="lg:flex lg:gap-4 space-y-4 lg:space-y-0">
            <div className="lg:flex-1">
              <Label
                htmlFor="nombre"
                className="text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Nombre
              </Label>
              <Input
                id="nombre"
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange("nombre", e.target.value)}
                placeholder="Nombre"
                className="mt-1 w-full px-3 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all duration-150 bg-white dark:bg-neutral-900"
                required
                disabled={loading}
                aria-invalid={!!error && !formData.nombre.trim()}
              />
            </div>
            <div className="lg:flex-1">
              <Label
                htmlFor="apellido"
                className="text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Apellido
              </Label>
              <Input
                id="apellido"
                type="text"
                value={formData.apellido}
                onChange={(e) => handleInputChange("apellido", e.target.value)}
                placeholder="Apellido"
                className="mt-1 w-full px-3 py-3 border border-gray-300 dark:border-neutral-600 rounded-lg text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all duration-150 bg-white dark:bg-neutral-900"
                required
                disabled={loading}
                aria-invalid={!!error && !formData.apellido.trim()}
              />
            </div>
          </div>

          <div>
            <Label
              htmlFor="correo_electronico"
              className="text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Correo electrónico
            </Label>
            <div className="relative">
              <Input
                id="correo_electronico"
                type="email"
                value={formData.correo_electronico}
                onChange={(e) => handleInputChange("correo_electronico", e.target.value)}
                placeholder="Correo electrónico"
                className={`mt-1 w-full px-3 py-3 border rounded-lg text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all duration-150 bg-white dark:bg-neutral-900 ${
                  error.toLowerCase().includes("correo") || error.toLowerCase().includes("email")
                    ? "border-red-500 ring-2 ring-red-400"
                    : "border-gray-300 dark:border-neutral-600"
                }`}
                required
                disabled={loading}
                aria-invalid={!!error && (error.toLowerCase().includes("correo") || error.toLowerCase().includes("email"))}
                aria-describedby={
                  error && (error.toLowerCase().includes("correo") || error.toLowerCase().includes("email"))
                    ? "email-error"
                    : undefined
                }
              />
              {(error.toLowerCase().includes("correo") || error.toLowerCase().includes("email")) && (
                <div
                  id="email-error"
                  className="absolute left-0 top-full mt-1 w-full bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded shadow-lg animate-fade-in z-20 text-sm flex items-center gap-2"
                  role="alert"
                >
                  <svg
                    className="w-4 h-4 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          <div className="relative">
            <Label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 dark:text-gray-200"
            >
              Contraseña
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                placeholder="Contraseña"
                className="w-full px-3 py-3 pr-10 border border-gray-300 dark:border-neutral-600 rounded-lg text-base placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-300 focus:border-blue-400 dark:focus:ring-blue-600 dark:focus:border-blue-600 transition-all duration-150 bg-white dark:bg-neutral-900"
                required
                disabled={loading}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                aria-describedby="password-rules"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                tabIndex={-1}
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={loading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                ) : (
                  <Eye className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                )}
              </button>

              {/* Tooltip reglas de contraseña */}
              {passwordFocused && (
                <div
                  id="password-rules"
                  role="region"
                  aria-live="polite"
                  className="absolute top-full left-0 mt-2 w-72 p-4 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 rounded-lg shadow-lg text-gray-700 dark:text-gray-300 z-50"
                  style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}
                >
                  <p className="font-semibold mb-2">Tu contraseña debe contener:</p>
                  <ul className="list-none space-y-1 m-0 p-0">
                    <RuleItem valid={passwordRules.length}>Al menos 8 caracteres</RuleItem>
                    <RuleItem valid={passwordRules.uppercase}>Una letra mayúscula</RuleItem>
                    <RuleItem valid={passwordRules.lowercase}>Una letra minúscula</RuleItem>
                    <RuleItem valid={passwordRules.number}>Un número</RuleItem>
                    <RuleItem valid={passwordRules.specialChar}>Un carácter especial (!@#$%^&*)</RuleItem>
                  </ul>
                </div>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 text-center leading-relaxed">
            Al continuar con tu correo o tu red social aceptas los{" "}
            <Link
              href="#"
              className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150"
            >
              términos y condiciones
            </Link>{" "}
            y el{" "}
            <Link
              href="#"
              className="text-blue-500 dark:text-blue-400 underline hover:text-blue-700 dark:hover:text-blue-300 transition-all duration-150"
            >
              aviso de privacidad
            </Link>
          </p>

          <Button
            type="submit"
            className="w-full bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-500 text-white py-3 text-base font-semibold rounded-lg shadow-md transition-all duration-150 focus-visible:ring-2 focus-visible:ring-green-400"
            disabled={loading}
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </Button>
        </form>

        <div className="text-center">
          <span className="text-gray-600 dark:text-gray-400">¿Ya tienes cuenta? </span>
          <Link
            href="/users/sign_in"
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all duration-150"
          >
            Inicia sesión →
          </Link>
        </div>
      </main>
    </div>
  )
}