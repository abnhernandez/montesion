"use client"

import React from 'react'
import Link from 'next/link'
import { useAuth } from '@/app/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AuthPage() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando...</p>
        </div>
      </div>
    )
  }

  if (user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>¡Bienvenido!</CardTitle>
            <CardDescription>
              Ya tienes una sesión activa como {user.email}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href="/">Ir al inicio</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/perfil">Ver perfil</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Acceso a tu cuenta</CardTitle>
          <CardDescription>
            Inicia sesión o crea una cuenta nueva
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-3">
            <Button asChild size="lg">
              <Link href="/users/sign_in">Iniciar sesión</Link>
            </Button>
            <Button variant="outline" asChild size="lg">
              <Link href="/users/sign_up">Crear cuenta nueva</Link>
            </Button>
          </div>
          
          <div className="text-center">
            <Link 
              href="/users/password" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
