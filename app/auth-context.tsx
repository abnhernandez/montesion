"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: number
  nombre: string
  apellido: string
  correo_electronico: string
  is_active: boolean
}

interface AuthContextType {
  user: User | null
  loading: boolean
  error: string | null
  login: (correo_electronico: string, password: string) => Promise<void>
  register: (data: {
    nombre: string
    apellido: string
    correo_electronico: string
    password: string
  }) => Promise<void>
  logout: () => void
  requestPasswordReset: (correo_electronico: string) => Promise<void>
  confirmPasswordReset: (token: string, newPassword: string) => Promise<void> // Verificar si tienes esta ruta en backend
  deleteAccount: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const API_BASE_URL = process.env.NEXT_PUBLIC_AUTH_URL || "https://montesion-backend.onrender.com/auth"

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function fetchUser() {
    const token = localStorage.getItem("access_token")
    if (!token) {
      setUser(null)
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) throw new Error("No se pudo autenticar al usuario")

      const userData = await response.json()
      setUser(userData)
    } catch (err) {
      console.error("Error al obtener el usuario:", err)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  async function login(correo_electronico: string, password: string): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          username: correo_electronico,
          password,
        }),
      })

      if (!response.ok) throw new Error("Credenciales inválidas")

      const data = await response.json()
      localStorage.setItem("access_token", data.access_token)
      await fetchUser()
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Error desconocido")
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function register(data: {
    nombre: string
    apellido: string
    correo_electronico: string
    password: string
  }): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Error al registrar")
      }

      await login(data.correo_electronico, data.password)
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Error desconocido")
      throw err
    } finally {
      setLoading(false)
    }
  }

  function logout() {
    localStorage.removeItem("access_token")
    setUser(null)
  }

  async function requestPasswordReset(correo_electronico: string): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/password-reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo_electronico }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Error al solicitar reset de contraseña")
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Error desconocido")
      throw err
    } finally {
      setLoading(false)
    }
  }

  // Nota: Verifica que tengas implementada esta ruta en backend
  async function confirmPasswordReset(token: string, newPassword: string): Promise<void> {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/password-reset/confirm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, new_password: newPassword }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Error al confirmar reset de contraseña")
      }
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Error desconocido")
      throw err
    } finally {
      setLoading(false)
    }
  }

  async function deleteAccount(): Promise<void> {
    if (!user) throw new Error("No hay usuario autenticado")
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${API_BASE_URL}/delete`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}` || "" },
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || "Error al eliminar cuenta")
      }

      logout()
    } catch (err) {
      if (err instanceof Error) setError(err.message)
      else setError("Error desconocido")
      throw err
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        requestPasswordReset,
        confirmPasswordReset,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider")
  }
  return context
}