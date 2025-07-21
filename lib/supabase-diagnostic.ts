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
    
    // Verificar conexión básica
    console.log('🔄 Verificando conexión...');
    const { error: healthError } = await supabase
      .from('prayer_requests')
      .select('count')
      .limit(1);
    
    if (healthError) {
      console.error('❌ Error de conexión:', healthError);
      console.log('💡 Posibles causas:');
      console.log('   1. La tabla prayer_requests no existe');
      console.log('   2. Las credenciales son incorrectas');
      console.log('   3. Las políticas RLS están mal configuradas');
      return false;
    }
    
    console.log('✅ Conexión exitosa');
    
    // Verificar estructura de tabla
    console.log('🔄 Verificando estructura de tabla...');
    try {
      const { error: structureError } = await supabase
        .from('prayer_requests')
        .select('*')
        .limit(0);
      
      if (structureError) {
        console.warn('⚠️ No se pudo verificar la estructura de la tabla:', structureError.message);
      } else {
        console.log('✅ Estructura de tabla verificada');
      }
    } catch (structureError) {
      console.warn('⚠️ Error verificando estructura:', structureError);
    }
    
    console.log('🎉 Diagnóstico completado - Supabase está funcionando');
    return true;
    
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
