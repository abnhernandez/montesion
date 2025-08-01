"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { useAuth } from "@/app/auth-context"

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get("token")

  const { confirmPasswordReset } = useAuth()

  // Reglas de validación para contraseña segura (igual que registro)
  const passwordRules = {
    length: newPassword.length >= 8,
    uppercase: /[A-Z]/.test(newPassword),
    lowercase: /[a-z]/.test(newPassword),
    number: /\d/.test(newPassword),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
  }
  const isPasswordValid = Object.values(passwordRules).every(Boolean)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden")
      return
    }

    if (!isPasswordValid) {
      setError("La contraseña no cumple con los requisitos de seguridad")
      return
    }

    if (!token) {
      setError("Token no válido o expirado")
      return
    }

    setLoading(true)
    try {
      await confirmPasswordReset(token, newPassword)
      router.push("/users/sign_in")
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Error al restablecer la contraseña"
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  const RuleItem = ({ valid, children }: { valid: boolean; children: React.ReactNode }) => (
    <li className={`flex items-center gap-2 text-sm ${valid ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
      {valid ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
      {children}
    </li>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <main className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-center">Nueva contraseña</h1>

        {error && (
          <div className="bg-destructive/10 text-destructive rounded-md px-4 py-2 text-center text-sm font-medium border border-destructive/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div>
            <Label htmlFor="new-password" className="text-sm font-medium">
              Nueva contraseña
            </Label>
            <div className="relative">
              <Input
                id="new-password"
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                disabled={loading}
                placeholder="Nueva contraseña"
                className="mt-1 pr-10"
                aria-describedby="password-rules"
                aria-invalid={!!error && !isPasswordValid}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5 text-primary" /> : <Eye className="w-5 h-5 text-primary" />}
              </button>
            </div>

            <ul
              id="password-rules"
              role="region"
              aria-live="polite"
              className="mt-2 list-none space-y-1 m-0 p-0 text-gray-700 dark:text-gray-300 text-sm"
            >
              <RuleItem valid={passwordRules.length}>Al menos 8 caracteres</RuleItem>
              <RuleItem valid={passwordRules.uppercase}>Una letra mayúscula</RuleItem>
              <RuleItem valid={passwordRules.lowercase}>Una letra minúscula</RuleItem>
              <RuleItem valid={passwordRules.number}>Un número</RuleItem>
              <RuleItem valid={passwordRules.specialChar}>Un carácter especial (!@#$%^&*)</RuleItem>
            </ul>
          </div>

          <div>
            <Label htmlFor="confirm-password" className="text-sm font-medium">
              Confirmar contraseña
            </Label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              placeholder="Confirma tu nueva contraseña"
              className="mt-1"
              aria-invalid={!!error && newPassword !== confirmPassword}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2.5 text-base font-semibold rounded-lg shadow-md"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </Button>
        </form>
      </main>
    </div>
  )
}