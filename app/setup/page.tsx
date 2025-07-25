'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { setupDatabase, createSampleData } from '@/lib/database-setup';
import { diagnosticSupabase } from '@/lib/supabase-diagnostic';
import { toast } from 'sonner';

export default function SetupPage() {
  const [checking, setChecking] = useState(false);
  const [setupStatus, setSetupStatus] = useState<{
    database: boolean | null;
    diagnostic: boolean | null;
  }>({
    database: null,
    diagnostic: null
  });

  const runDiagnostic = async () => {
    setChecking(true);
    try {
      const result = await diagnosticSupabase();
      setSetupStatus(prev => ({ ...prev, diagnostic: result }));
      
      if (result) {
        toast.success('Diagnóstico completado - Todo funcionando correctamente');
      } else {
        toast.error('Se encontraron problemas en el diagnóstico');
      }
    } catch (error) {
      console.error('Error running diagnostic:', error);
      toast.error('Error ejecutando diagnóstico');
    } finally {
      setChecking(false);
    }
  };

  const runSetup = async () => {
    setChecking(true);
    try {
      const dbResult = await setupDatabase();
      setSetupStatus(prev => ({ ...prev, database: dbResult }));
      
      if (dbResult) {
        await createSampleData();
        toast.success('Base de datos configurada correctamente');
      } else {
        toast.error('Error configurando la base de datos');
      }
    } catch (error) {
      console.error('Error running setup:', error);
      toast.error('Error en la configuración');
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Configuración del Sistema</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Diagnóstico del Sistema</CardTitle>
            <CardDescription>
              Verifica que Supabase esté configurado correctamente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runDiagnostic} 
              disabled={checking}
              className="w-full"
            >
              {checking ? 'Ejecutando...' : 'Ejecutar Diagnóstico'}
            </Button>
            
            {setupStatus.diagnostic !== null && (
              <div className={`mt-4 p-3 rounded ${
                setupStatus.diagnostic 
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
              }`}>
                {setupStatus.diagnostic 
                  ? '✅ Sistema funcionando correctamente' 
                  : '❌ Se encontraron problemas en la configuración'
                }
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Configuración de Base de Datos</CardTitle>
            <CardDescription>
              Verifica y configura las tablas necesarias
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={runSetup} 
              disabled={checking}
              className="w-full"
              variant="outline"
            >
              {checking ? 'Configurando...' : 'Verificar Base de Datos'}
            </Button>
            
            {setupStatus.database !== null && (
              <div className={`mt-4 p-3 rounded ${
                setupStatus.database 
                  ? 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300' 
                  : 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
              }`}>
                {setupStatus.database 
                  ? '✅ Base de datos configurada correctamente' 
                  : '❌ Faltan tablas en la base de datos'
                }
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Instrucciones Manual</CardTitle>
          <CardDescription>
            Si el diagnóstico falla, sigue estos pasos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">1. Configura las tablas en Supabase:</h3>
            <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
              <li>Ve a tu proyecto en <a href="https://supabase.com/dashboard" target="_blank" className="text-blue-600 hover:underline">Supabase Dashboard</a></li>
              <li>Navega a SQL Editor</li>
              <li>Copia el contenido del archivo <code className="bg-muted px-1 rounded">scripts/setup-database.sql</code></li>
              <li>Pega y ejecuta el script en el editor SQL</li>
            </ol>
          </div>
          
          <div>
            <h3 className="font-semibold mb-2">2. Verifica las variables de entorno:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li><code className="bg-muted px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
              <li><code className="bg-muted px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">3. Configuración de reCAPTCHA:</h3>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>Verifica que la clave del sitio esté correcta</li>
              <li>Asegúrate de que el dominio esté autorizado en Google reCAPTCHA</li>
              <li>El sistema continuará funcionando incluso si reCAPTCHA falla</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
