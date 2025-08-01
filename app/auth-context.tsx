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
  updateProfile: (data: { 
    nombre?: string; 
    apellido?: string; 
    username?: string; 
    rol?: string; 
    descripcion?: string; 
    fechaNacimiento?: string; 
    instagram?: string;
    twitter?: string; 
    linkedin?: string; 
    github?: string; 
    youtube?: string;
    tiktok?: string;
  }) => Promise<void>
  deleteAccount: () => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Check if we're in the browser and if Supabase environment variables are available
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient> | null>(null)

  useEffect(() => {
    // Only initialize Supabase on the client side
    if (typeof window !== 'undefined') {
      try {
        const client = createClient()
        setSupabase(client)
      } catch (error) {
        console.error('Failed to initialize Supabase client:', error)
        setError('Failed to initialize authentication system')
        setLoading(false)
        return
      }
    }
  }, [])

  useEffect(() => {
    if (!supabase) {
      // If we're on the server or Supabase isn't available, just set loading to false
      if (typeof window !== 'undefined') {
        setLoading(false)
      }
      return
    }

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
  }, [supabase])

  const signUp = async (email: string, password: string, userData?: { nombre?: string; apellido?: string }) => {
    if (!supabase) {
      setError('Authentication system not initialized')
      throw new Error('Authentication system not initialized')
    }

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
          },
          // For development, disable email confirmation
          emailRedirectTo: undefined
        }
      })

      if (error) {
        console.error('Signup error details:', error)
        
        // Handle specific errors more gracefully
        if (error.message.includes('captcha verification process failed')) {
          console.warn('Captcha verification failed, but user signup may still proceed')
          setError('Problema con verificación. Intenta de nuevo o contacta soporte.')
          return
        }
        
        if (error.message.includes('User already registered')) {
          setError('Este email ya está registrado. ¿Quieres iniciar sesión?')
          return
        }
        
        if (error.message.includes('Invalid email')) {
          setError('Por favor verifica que el email sea válido.')
          return
        }
        
        throw error
      }

      // Check if user was created successfully
      if (data.user) {
        console.log('✅ Usuario creado exitosamente:', data.user.id)
        
        // Si no hay sesión automática, es porque requiere confirmación
        if (!data.session) {
          setError('Cuenta creada exitosamente. Si se requiere confirmación, revisa tu email.')
        } else {
          setError('¡Cuenta creada e iniciada sesión exitosamente!')
        }
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
    if (!supabase) {
      setError('Authentication system not initialized')
      throw new Error('Authentication system not initialized')
    }

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
    if (!supabase) {
      setError('Authentication system not initialized')
      throw new Error('Authentication system not initialized')
    }

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
    if (!supabase) {
      setError('Authentication system not initialized')
      throw new Error('Authentication system not initialized')
    }

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
    if (!supabase) {
      setError('Authentication system not initialized')
      throw new Error('Authentication system not initialized')
    }

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

  const updateProfile = async (data: { 
    nombre?: string; 
    apellido?: string; 
    username?: string; 
    rol?: string; 
    descripcion?: string; 
    fechaNacimiento?: string; 
    twitter?: string; 
    linkedin?: string; 
    github?: string; 
    sitioWeb?: string 
  }) => {
    if (!user) throw new Error('No hay usuario autenticado')
    if (!supabase) {
      setError('Authentication system not initialized')
      throw new Error('Authentication system not initialized')
    }
    
    setLoading(true)
    setError(null)

    try {
      // Actualizar metadatos del usuario
      const { error: userError } = await supabase.auth.updateUser({
        data: {
          nombre: data.nombre,
          apellido: data.apellido,
          username: data.username,
          rol: data.rol,
          descripcion: data.descripcion,
          fechaNacimiento: data.fechaNacimiento,
          twitter: data.twitter,
          linkedin: data.linkedin,
          github: data.github,
          sitioWeb: data.sitioWeb,
        }
      })

      if (userError) throw userError

      // Intentar actualizar en la tabla de users si existe
      try {
        const { error: profileError } = await supabase
          .from('users')
          .upsert({
            id: user.id,
            email: user.email,
            nombre: data.nombre,
            apellido: data.apellido,
            username: data.username,
            rol: data.rol,
            descripcion: data.descripcion,
            fecha_nacimiento: data.fechaNacimiento,
            twitter: data.twitter,
            linkedin: data.linkedin,
            github: data.github,
            sitio_web: data.sitioWeb,
            updated_at: new Date().toISOString(),
          })
          .eq('id', user.id)

        if (profileError) {
          console.warn('Error updating users table:', profileError)
          // No lanzar error aquí, ya que los metadatos se actualizaron
        }
      } catch (dbError) {
        console.warn('Database table update failed, but metadata was updated:', dbError)
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

  const deleteAccount = async () => {
    if (!user) throw new Error('No hay usuario autenticado')
    if (!supabase) {
      setError('Authentication system not initialized')
      throw new Error('Authentication system not initialized')
    }
    
    setLoading(true)
    setError(null)

    try {
      // Intentar usar la función RPC para eliminación completa
      try {
        const { error: rpcError } = await supabase.rpc('request_account_deletion')
        
        if (rpcError) {
          console.warn('RPC request_account_deletion failed:', rpcError)
          // Intentar con la función básica
          const { error: basicRpcError } = await supabase.rpc('delete_user')
          
          if (basicRpcError) {
            console.warn('RPC delete_user failed:', basicRpcError)
            throw basicRpcError
          }
        }
        
        console.log('Account deletion completed successfully via RPC')
        
        // Limpiar estado local inmediatamente
        setUser(null)
        setSession(null)
        
        return
        
      } catch (rpcError) {
        console.warn('RPC methods failed, falling back to manual deletion:', rpcError)
      }

      // Método de respaldo: eliminación manual de tablas
      try {
        // Eliminar de la tabla users si existe
        const { error: deleteUserError } = await supabase
          .from('users')
          .delete()
          .eq('id', user.id)

        if (deleteUserError && deleteUserError.code !== 'PGRST116') {
          console.warn('Error deleting user from users table:', deleteUserError)
        }

        // Eliminar de otras tablas relacionadas si existen
        const tables = ['user_courses', 'user_progress', 'user_achievements', 'user_preferences']
        
        for (const table of tables) {
          try {
            await supabase
              .from(table)
              .delete()
              .eq('user_id', user.id)
          } catch (tableError) {
            console.warn(`Table ${table} might not exist or user has no data:`, tableError)
          }
        }

        // Cerrar sesión del usuario
        const { error: signOutError } = await supabase.auth.signOut()
        
        if (signOutError) {
          console.warn('Error signing out:', signOutError)
        }

        // Limpiar estado local
        setUser(null)
        setSession(null)
        
        console.info('Account deletion process completed via manual method.')

      } catch (manualError) {
        console.error('Manual deletion also failed:', manualError)
        throw manualError
      }
      
    } catch (error) {
      const authError = error as AuthError
      console.error('Error deleting account:', authError)
      setError('Error durante el proceso de eliminación')
      throw new Error('Ocurrió un error durante el proceso de eliminación de cuenta.')
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
    deleteAccount,
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
