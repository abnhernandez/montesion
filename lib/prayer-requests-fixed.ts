import { createClient } from "@/utils/supabase/client";
import type { PrayerRequest, PrayerRequestInsert } from "@/types/supabase";
import { 
  sendPrayerRequestConfirmation, 
  sendNewPrayerRequestNotification 
} from './email-service-client';
import { verifyRecaptchaToken } from './recaptcha-verification';

/**
 * Envía una nueva petición de oración a Supabase
 */
export async function createPrayerRequest(
  prayerRequestData: Omit<PrayerRequestInsert, 'ticket'> & { recaptchaToken?: string }
): Promise<{ success: boolean; data?: PrayerRequest; error?: string }> {
  try {
    // Verify reCAPTCHA token if provided
    if (prayerRequestData.recaptchaToken) {
      console.log('🔒 Verificando token reCAPTCHA...');
      const recaptchaResult = await verifyRecaptchaToken(
        prayerRequestData.recaptchaToken,
        'PRAYER_REQUEST',
        0.5 // Minimum score of 0.5
      );

      if (!recaptchaResult.success) {
        console.warn('⚠️ Verificación reCAPTCHA falló:', recaptchaResult.error);
        // Don't fail the prayer request if it's a development/configuration issue
        if (process.env.NODE_ENV === 'development') {
          console.log('🔧 Desarrollo: Continuando sin verificación reCAPTCHA');
        } else {
          return {
            success: false,
            error: 'Error de verificación de seguridad. Por favor, intenta de nuevo.'
          };
        }
      } else {
        console.log('✅ reCAPTCHA verificado exitosamente. Score:', recaptchaResult.score);
      }
    }

    const supabase = createClient();
    
    // Verificar conexión con Supabase
    console.log('🔍 Intentando conectar a Supabase...');
    
    // Generar ticket único
    const ticket = Math.floor(Math.random() * 1000000);
    
    // Extract recaptchaToken before inserting into database (we don't store it)
    const { recaptchaToken, ...cleanData } = prayerRequestData;
    
    const dataToInsert: PrayerRequestInsert = {
      ...cleanData,
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
        error: 'Error de configuración de base de datos. Por favor contacta al administrador.' 
      };
    }
    
    // Insertar petición de oración
    console.log('💾 Insertando petición de oración...');
    const { data, error } = await supabase
      .from('prayer_requests')
      .insert([dataToInsert])
      .select()
      .single();

    if (error) {
      console.error('❌ Error al insertar petición:', error);
      return { 
        success: false, 
        error: `Error al guardar la petición: ${error.message}` 
      };
    }

    console.log('✅ Petición de oración guardada exitosamente:', data);

    // Enviar confirmación por email al solicitante
    try {
      console.log('📧 Enviando email de confirmación...');
      await sendPrayerRequestConfirmation(
        cleanData.correo_electronico,
        cleanData.nombre,
        ticket,
        cleanData.asunto
      );
      console.log('✅ Email de confirmación enviado');
      
      await sendNewPrayerRequestNotification(
        cleanData.nombre,
        cleanData.correo_electronico,
        cleanData.asunto,
        cleanData.peticion,
        ticket
      );
      console.log('✅ Notificación enviada al administrador');
      
    } catch (emailError) {
      console.error('⚠️ Error al enviar emails:', emailError);
      // No fallar si el email falla, la petición ya fue guardada
    }

    return { success: true, data };
    
  } catch (error) {
    console.error('❌ Error general al crear petición de oración:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}

/**
 * Obtiene todas las peticiones de oración desde Supabase
 */
export async function getAllPrayerRequests(): Promise<{
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
      console.error('Error al obtener peticiones de oración:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error general al obtener peticiones de oración:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}

/**
 * Obtiene peticiones de oración paginadas desde Supabase
 */
export async function getPrayerRequests(
  page: number = 1,
  pageSize: number = 10,
  status?: string
): Promise<{
  success: boolean;
  data?: PrayerRequest[];
  count?: number;
  error?: string;
}> {
  try {
    const supabase = createClient();
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    let query = supabase
      .from('prayer_requests')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Error al obtener peticiones de oración paginadas:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data: data || [], count: count || 0 };
  } catch (error) {
    console.error('Error general al obtener peticiones de oración paginadas:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}

/**
 * Actualiza el status de una petición de oración
 */
export async function updatePrayerRequestStatus(
  id: string,
  status: string
): Promise<{ success: boolean; data?: PrayerRequest; error?: string }> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('prayer_requests')
      .update({ 
        status,
        processed_at: status === 'processed' ? new Date().toISOString() : null
      })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error al actualizar status de petición:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Error general al actualizar status de petición:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}

/**
 * Elimina una petición de oración
 */
export async function deletePrayerRequest(id: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    const supabase = createClient();

    const { error } = await supabase
      .from('prayer_requests')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error al eliminar petición de oración:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error('Error general al eliminar petición de oración:', error);
    const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
    return { success: false, error: errorMessage };
  }
}
