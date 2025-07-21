import { createClient } from "@/utils/supabase/client";
import type { PrayerRequest, PrayerRequestInsert } from "@/types/supabase";
import { 
  sendPrayerRequestConfirmation, 
  sendNewPrayerRequestNotification 
} from './email-service-client';

/**
 * Envía una nueva petición de oración a Supabase
 */
export async function createPrayerRequest(
  prayerRequestData: Omit<PrayerRequestInsert, 'ticket'>
): Promise<{ success: boolean; data?: PrayerRequest; error?: string }> {
  try {
    const supabase = createClient();
    
    // Verificar conexión con Supabase
    console.log('🔍 Intentando conectar a Supabase...');
    
    // Generar ticket único
    const ticket = Math.floor(Math.random() * 1000000);
    
    const dataToInsert: PrayerRequestInsert = {
      ...prayerRequestData,
      ticket,
      status: 'pending'
    };
    
    console.log('📝 Datos a insertar:', dataToInsert);
    
    // Primero verificar si la tabla existe haciendo un select simple
    const { error: testError } = await supabase
      .from('prayer_requests')
      .select('count')
      .limit(1);
    
    if (testError) {
      console.error('❌ Error al verificar tabla:', testError);
      return {
        success: false,
        error: `Error de conexión: ${testError.message || 'Tabla no encontrada'}`
      };
    }
    
    console.log('✅ Tabla verificada, insertando datos...');
    
    const { data, error } = await supabase
      .from('prayer_requests')
      .insert(dataToInsert)
      .select()
      .single();

    if (error) {
      console.error('❌ Error al insertar petición:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      });
      return {
        success: false,
        error: `Error en la base de datos: ${error.message || 'Error desconocido'} (Código: ${error.code || 'N/A'})`
      };
    }

    console.log('✅ Petición insertada exitosamente:', data);
    
    // Enviar emails de confirmación (no bloquear si fallan)
    Promise.all([
      // Email de confirmación al usuario
      sendPrayerRequestConfirmation(
        prayerRequestData.correo_electronico,
        prayerRequestData.nombre,
        ticket,
        prayerRequestData.asunto
      ).catch(err => console.warn('⚠️ Error enviando confirmación:', err)),
      
      // Notificación al equipo de Monte Sion
      sendNewPrayerRequestNotification(
        prayerRequestData.nombre,
        prayerRequestData.correo_electronico,
        prayerRequestData.asunto,
        prayerRequestData.peticion,
        ticket
      ).catch(err => console.warn('⚠️ Error enviando notificación:', err))
    ]);
    
    return {
      success: true,
      data: data
    };
  } catch (error) {
    console.error('❌ Error inesperado completo:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido en la aplicación'
    };
  }
}

/**
 * Obtiene todas las peticiones de oración (requiere autenticación)
 */
export async function getPrayerRequests(): Promise<{
  success: boolean;
  data?: PrayerRequest[];
  error?: string;
}> {
  try {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from('prayer_requests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    return {
      success: true,
      data: data || []
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

/**
 * Actualiza el estado de una petición de oración
 */
export async function updatePrayerRequestStatus(
  id: string,
  status: 'pending' | 'in_progress' | 'completed'
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = createClient();
    
    const updateData: { status: string; processed_at?: string } = { status };
    
    // Si se marca como completada, agregar timestamp
    if (status === 'completed') {
      updateData.processed_at = new Date().toISOString();
    }
    
    const { error } = await supabase
      .from('prayer_requests')
      .update(updateData)
      .eq('id', id);

    if (error) {
      return {
        success: false,
        error: error.message
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}
