"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { checkSupabaseStatus, setupSupabaseSimple } from '@/utils/setup-supabase'

export default function SupabaseSetupPage() {
  const [status, setStatus] = React.useState<any>(null)
  const [loading, setLoading] = React.useState(false)

  const handleCheck = async () => {
    setLoading(true)
    const result = await checkSupabaseStatus()
    setStatus(result)
    setLoading(false)
  }

  const handleSetup = async () => {
    setLoading(true)
    await setupSupabaseSimple()
    // Recheck status after setup
    const result = await checkSupabaseStatus()
    setStatus(result)
    setLoading(false)
  }

  React.useEffect(() => {
    handleCheck()
  }, [])

  return (
    <div className="min-h-screen p-8 bg-background">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>🔧 Configuración de Supabase</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button onClick={handleCheck} disabled={loading}>
                🔍 Verificar Estado
              </Button>
              <Button onClick={handleSetup} disabled={loading} variant="outline">
                🚀 Intentar Setup
              </Button>
            </div>

            {status && (
              <div className="space-y-2">
                <h3 className="font-semibold">Estado actual:</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-3 rounded ${status.auth ? 'bg-green-100' : 'bg-red-100'}`}>
                    {status.auth ? '✅' : '❌'} Auth
                  </div>
                  <div className={`p-3 rounded ${status.todos ? 'bg-green-100' : 'bg-red-100'}`}>
                    {status.todos ? '✅' : '❌'} Todos
                  </div>
                  <div className={`p-3 rounded ${status.users ? 'bg-green-100' : 'bg-red-100'}`}>
                    {status.users ? '✅' : '❌'} Users
                  </div>
                </div>
              </div>
            )}

            <div className="bg-yellow-50 p-4 rounded">
              <h4 className="font-semibold mb-2">💡 Si las tablas fallan:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Ve a tu <a href="https://supabase.com/dashboard" target="_blank" className="text-blue-600 underline">Dashboard de Supabase</a></li>
                <li>Ve a "SQL Editor"</li>
                <li>Ejecuta el archivo <code>supabase-setup-minimal.sql</code></li>
                <li>Vuelve aquí y presiona "Verificar Estado"</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
