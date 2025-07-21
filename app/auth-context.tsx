"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session, AuthError, AuthChangeEvent } from '@supabase/supabase-js'
import { createClient } from '@/utils/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  error: string | null
  signUp: (email: string, password: string, userData?: { nombre?: string; apellido?: string }) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  confirmPasswordReset: (token: string, newPassword: string) => Promise<void>
  updateProfile: (data: { nombre?: string; apellido?: string }) => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Obtener sesión inicial
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Error getting session:', error)
          setError(error.message)
        } else {
          setSession(session)
          setUser(session?.user ?? null)
        }
      } catch (error) {
        console.error('Error initializing auth:', error)
        setError(error instanceof Error ? error.message : 'Error de inicialización')
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: AuthChangeEvent, session: Session | null) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        // Manejar eventos específicos
        if (event === 'SIGNED_IN') {
          setError(null)
        } else if (event === 'SIGNED_OUT') {
          setError(null)
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('Token refreshed')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const signUp = async (email: string, password: string, userData?: { nombre?: string; apellido?: string }) => {
    setLoading(true)
    setError(null)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            nombre: userData?.nombre || '',
            apellido: userData?.apellido || '',
          }
        }
      })

      if (error) throw error

      // Si no hay confirmación automática, mostrar mensaje
      if (!data.session) {
        setError('Te hemos enviado un email de confirmación. Por favor, revisa tu bandeja de entrada.')
      }
    } catch (error) {
      const authError = error as AuthError
      console.error('Error signing up:', authError)
      setError(getErrorMessage(authError))
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // El estado se actualiza automáticamente por onAuthStateChange
    } catch (error) {
      const authError = error as AuthError
      console.error('Error signing in:', authError)
      setError(getErrorMessage(authError))
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      const authError = error as AuthError
      console.error('Error signing out:', authError)
      setError(getErrorMessage(authError))
      throw error
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/users/reset_password`,
      })

      if (error) throw error

      setError('Te hemos enviado un enlace para restablecer tu contraseña. Revisa tu email.')
    } catch (error) {
      const authError = error as AuthError
      console.error('Error resetting password:', authError)
      setError(getErrorMessage(authError))
      throw error
    } finally {
      setLoading(false)
    }
  }

  const confirmPasswordReset = async (token: string, newPassword: string) => {
    setLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })

      if (error) throw error

      setError('Contraseña actualizada exitosamente.')
    } catch (error) {
      const authError = error as AuthError
      console.error('Error confirming password reset:', authError)
      setError(getErrorMessage(authError))
      throw error
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (data: { nombre?: string; apellido?: string }) => {
    if (!user) throw new Error('No hay usuario autenticado')
    
    setLoading(true)
    setError(null)

    try {
      // Actualizar metadatos del usuario
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
        }
      })

      if (userError) throw userError

      // También actualizar en la tabla de perfiles si existe
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          nombre: data.nombre,
          apellido: data.apellido,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)

      if (profileError) {
        console.warn('Error updating profile table:', profileError)
        // No lanzar error aquí, ya que los metadatos se actualizaron
      }
    } catch (error) {
      const authError = error as AuthError
      console.error('Error updating profile:', authError)
      setError(getErrorMessage(authError))
      throw error
    } finally {
      setLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  const value: AuthContextType = {
    user,
    session,
    loading,
    error,
    signUp,
    signIn,
    signOut,
    resetPassword,
    confirmPasswordReset,
    updateProfile,
    clearError,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

// Función helper para manejar errores de Supabase
function getErrorMessage(error: AuthError | Error | unknown): string {
  if (!error) return 'Error desconocido'

  const errorObj = error as AuthError | Error
  
  // Errores específicos de Supabase Auth
  switch (errorObj.message) {
    case 'Invalid login credentials':
      return 'Credenciales incorrectas. Verifica tu email y contraseña.'
    case 'Email not confirmed':
      return 'Debes confirmar tu email antes de iniciar sesión.'
    case 'User already registered':
      return 'Este email ya está registrado. Intenta iniciar sesión.'
    case 'Password should be at least 6 characters':
      return 'La contraseña debe tener al menos 6 caracteres.'
    case 'Unable to validate email address: invalid format':
      return 'El formato del email no es válido.'
    case 'Email rate limit exceeded':
      return 'Has enviado demasiados emails. Espera un momento antes de intentar de nuevo.'
    case 'For security purposes, you can only request this after 60 seconds':
      return 'Por seguridad, debes esperar 60 segundos antes de intentar de nuevo.'
    default:
      return errorObj.message || 'Ha ocurrido un error inesperado.'
  }
}

// Tipos para TypeScript (opcional, crear archivo separado si se prefiere)
export type { AuthContextType }
