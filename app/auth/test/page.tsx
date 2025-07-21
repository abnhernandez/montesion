"use client"

import React, { useState } from 'react'
import { useSupabaseAuth } from '@/app/supabase-auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SimpleAuthTest() {
  const { user, signIn, signUp, signOut, loading, error } = useSupabaseAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    await signUp(email, password, 'Test', 'User')
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn(email, password)
  }

  if (user) {
    return (
      <div className="p-4">
        <Card>
          <CardHeader>
            <CardTitle>✅ Autenticación Exitosa</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>Email: {user.email}</p>
              <p>ID: {user.id}</p>
              <p>Confirmado: {user.email_confirmed_at ? 'Sí' : 'No'}</p>
            </div>
            <Button onClick={signOut} className="mt-4">
              Cerrar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Prueba de Autenticación</CardTitle>
          <CardDescription>
            Test básico sin tabla personalizada
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="test@example.com"
              />
            </div>
            
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password123"
              />
            </div>
            
            <div className="flex gap-2">
              <Button onClick={handleSignUp} disabled={loading}>
                Registrar
              </Button>
              <Button onClick={handleSignIn} disabled={loading} variant="outline">
                Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
