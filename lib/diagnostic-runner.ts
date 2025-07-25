import { diagnosticSupabase } from '@/lib/supabase-diagnostic';
import { setupDatabase } from '@/lib/database-setup';

// Function to run diagnostics and setup
export async function runSystemDiagnostic() {
  console.log('🚀 === INICIANDO DIAGNÓSTICO DEL SISTEMA ===\n');
  
  // Run Supabase diagnostic
  const supabaseOk = await diagnosticSupabase();
  
  console.log('\n');
  
  // If Supabase connection works, check database setup
  if (supabaseOk) {
    console.log('🔧 === VERIFICANDO CONFIGURACIÓN DE BASE DE DATOS ===');
    const dbOk = await setupDatabase();
    
    if (dbOk) {
      console.log('✅ === SISTEMA COMPLETAMENTE CONFIGURADO ===');
      return true;
    } else {
      console.log('⚠️ === SISTEMA PARCIALMENTE CONFIGURADO ===');
      console.log('💡 Ejecuta el script SQL en Supabase para completar la configuración');
      return false;
    }
  } else {
    console.log('❌ === PROBLEMAS DE CONFIGURACIÓN DETECTADOS ===');
    console.log('💡 Revisa las variables de entorno y la configuración de Supabase');
    return false;
  }
}

// Make it available globally for console debugging
if (typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).runSystemDiagnostic = runSystemDiagnostic;
  console.log('🔧 Diagnostic function available as: window.runSystemDiagnostic()');
}
