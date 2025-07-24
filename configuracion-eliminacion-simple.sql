-- Configuración alternativa para eliminación de cuentas SIN funciones RPC personalizadas
-- Esta configuración funciona con el código actual sin necesidad de crear funciones adicionales

-- 1. Asegúrate de que tu tabla users tenga las políticas RLS correctas
-- Si tienes una tabla 'users', ejecuta estas políticas:

-- Política para permitir que los usuarios eliminen sus propios datos
DROP POLICY IF EXISTS "Users can delete their own data" ON public.users;
CREATE POLICY "Users can delete their own data" ON public.users
    FOR DELETE USING (auth.uid() = id);

-- 2. Si tienes otras tablas relacionadas con usuarios, agrega políticas similares
-- Ejemplo para tabla user_courses (ajusta según tu esquema):

-- DROP POLICY IF EXISTS "Users can delete their own courses" ON public.user_courses;
-- CREATE POLICY "Users can delete their own courses" ON public.user_courses
--     FOR DELETE USING (auth.uid() = user_id);

-- DROP POLICY IF EXISTS "Users can delete their own progress" ON public.user_progress;
-- CREATE POLICY "Users can delete their own progress" ON public.user_progress
--     FOR DELETE USING (auth.uid() = user_id);

-- DROP POLICY IF EXISTS "Users can delete their own achievements" ON public.user_achievements;
-- CREATE POLICY "Users can delete their own achievements" ON public.user_achievements
--     FOR DELETE USING (auth.uid() = user_id);

-- 3. Habilitar RLS en todas las tablas (si no está habilitado)
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.user_courses ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- NOTA IMPORTANTE:
-- El código actual ya NO requiere las funciones RPC personalizadas.
-- Simplemente elimina los datos de las tablas y cierra la sesión.
-- La eliminación completa de la cuenta de auth.users requeriría:
-- 1. Un backend con permisos admin, O
-- 2. Una Edge Function con service role key, O  
-- 3. Configuración manual en el dashboard de Supabase

-- Para una eliminación más completa, puedes crear esta Edge Function:
-- Nombre: delete-user
-- Código TypeScript para la Edge Function:

/*
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Create admin client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get user from auth header
    const authHeader = req.headers.get('Authorization')
    if (!authHeader) {
      throw new Error('No authorization header')
    }

    // Verify user token and get user info
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(
      authHeader.replace('Bearer ', '')
    )

    if (userError || !user) {
      throw new Error('Invalid user token')
    }

    // Delete user data from custom tables
    const { error: deleteError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', user.id)

    // Delete user from auth.users
    const { error: authDeleteError } = await supabaseAdmin.auth.admin.deleteUser(
      user.id
    )

    if (authDeleteError) {
      console.error('Error deleting user from auth:', authDeleteError)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'User deleted successfully' }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in delete-user function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400 
      }
    )
  }
})
*/
