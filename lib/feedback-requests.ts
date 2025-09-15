import { createClient } from "@/utils/supabase/client";
import type { Feedback, FeedbackInsert } from "@/types/supabase";

/**
 * Envía nuevo feedback a Supabase
 */
export async function createFeedback(
  feedbackData: FeedbackInsert
): Promise<{ success: boolean; data?: Feedback; error?: string }> {
  try {
    const supabase = createClient();
    
    // Verificar conexión con Supabase
    console.log('🔍 Intentando conectar a Supabase para feedback...');
    
    const dataToInsert: FeedbackInsert = {
      ...feedbackData,
      status: 'pending'
    };
    
    console.log('📝 Datos de feedback a insertar:', dataToInsert);
    
    // Insert feedback into Supabase
    const { data, error } = await supabase
      .from('feedback')
      .insert(dataToInsert)
      .select()
      .single();

    if (error) {
      console.error('❌ Error insertando feedback en Supabase:', error);
      return {
        success: false,
        error: `Error de base de datos: ${error.message}`
      };
    }

    console.log('✅ Feedback insertado exitosamente:', data);

    // Optionally send notification emails here
    // You could add email notifications similar to prayer requests
    
    return {
      success: true,
      data: data as Feedback
    };

  } catch (error: unknown) {
    console.error('❌ Error creando feedback:', error);
    
    let errorMessage = "Error desconocido al enviar feedback";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Provide more helpful error messages based on error type
      if (errorMessage.includes('relation "feedback" does not exist')) {
        errorMessage = "La tabla de feedback no existe en la base de datos. Por favor contacta al administrador.";
      } else if (errorMessage.includes('permission denied')) {
        errorMessage = "No tienes permisos para enviar feedback. Verifica la configuración de seguridad.";
      } else if (errorMessage.includes('connection')) {
        errorMessage = "Error de conexión con la base de datos. Intenta de nuevo en unos momentos.";
      }
    }
    
    return {
      success: false,
      error: errorMessage
    };
  }
}
