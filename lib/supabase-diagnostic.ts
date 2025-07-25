import { createClient } from "@/utils/supabase/client";

/**
 * Función de diagnóstico para verificar la configuración de Supabase
 */
export async function diagnosticSupabase() {
  console.log('🔍 === DIAGNÓSTICO DE SUPABASE ===');
  
  // Verificar variables de entorno
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  console.log('🔑 Variables de entorno:');
  console.log('- SUPABASE_URL:', supabaseUrl ? '✅ Configurada' : '❌ Faltante');
  console.log('- SUPABASE_ANON_KEY:', supabaseKey ? '✅ Configurada' : '❌ Faltante');
  
  if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variables de entorno faltantes. Verificar .env.local');
    return false;
  }
  
  try {
    const supabase = createClient();
    console.log('✅ Cliente Supabase creado');
    
    // Verificar autenticación
    console.log('🔄 Verificando autenticación...');
    const { data: authData, error: authError } = await supabase.auth.getSession();
    
    if (authError) {
      console.warn('⚠️ Error de autenticación:', authError.message);
    } else {
      console.log('✅ Auth working, user:', authData.session?.user?.email || 'None');
    }
    
    // Verificar tabla todos
    console.log('🔄 Verificando tabla todos...');
    const { error: todosError } = await supabase
      .from('todos')
      .select('*')
      .limit(1);
    
    if (todosError) {
      console.log('❌ Todos table not available:', todosError.message);
      if (todosError.message.includes('relation "public.todos" does not exist')) {
        console.log('ℹ️ Todos table not available yet. Create it manually or run setup script.');
      }
    } else {
      console.log('✅ Todos table accessible');
    }
    
    // Verificar tabla users
    console.log('🔄 Verificando tabla users...');
    const { error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (usersError) {
      console.log('❌ Users table not available:', usersError.message);
      if (usersError.message.includes('relation "public.users" does not exist')) {
        console.log('ℹ️ Users table not available yet. Create it manually or run setup script.');
      }
    } else {
      console.log('✅ Users table accessible');
    }
    
    // Si hay errores de tabla, pero la conexión funciona, el diagnóstico es parcialmente exitoso
    const hasConnectionIssues = !authData;
    const hasTableIssues = (todosError && todosError.message.includes('does not exist')) || 
                           (usersError && usersError.message.includes('does not exist'));
    
    if (!hasConnectionIssues) {
      if (hasTableIssues) {
        console.log('⚠️ Conexión exitosa pero faltan tablas - ejecutar setup SQL');
        return true; // Connection works, just need tables
      } else {
        console.log('🎉 Diagnóstico completado - Supabase está funcionando completamente');
        return true;
      }
    }
    
    return false;
    
  } catch (error) {
    console.error('❌ Error durante diagnóstico:', error);
    return false;
  }
}

/**
 * Función para crear la tabla si no existe
 */
export async function createTableIfNotExists() {
  console.log('🔧 Verificando si necesitamos crear la tabla...');
  
  try {
    const supabase = createClient();
    
    // Intentar hacer una consulta simple
    const { error } = await supabase
      .from('prayer_requests')
      .select('count')
      .limit(1);
    
    if (error && error.message.includes('relation "prayer_requests" does not exist')) {
      console.log('❌ La tabla prayer_requests no existe');
      console.log('📋 SQL necesario para crear la tabla:');
      console.log(`
-- Ejecutar este SQL en Supabase SQL Editor:
CREATE TABLE IF NOT EXISTS prayer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket INTEGER UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    peticion TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- Habilitar RLS
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserciones públicas
CREATE POLICY "Anyone can create prayer requests" 
    ON prayer_requests FOR INSERT 
    WITH CHECK (true);

-- Política para que usuarios autenticados puedan ver las peticiones
CREATE POLICY "Authenticated users can view prayer requests" 
    ON prayer_requests FOR SELECT 
    USING (auth.role() = 'authenticated');
      `);
      return false;
    }
    
    console.log('✅ La tabla prayer_requests existe');
    return true;
    
  } catch (error) {
    console.error('❌ Error verificando tabla:', error);
    return false;
  }
}
