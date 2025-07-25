import { createClient } from "@/utils/supabase/client";
import type { Feedback, FeedbackInsert } from "@/types/supabase";
import { verifyRecaptchaToken } from './recaptcha-verification';

/**
 * Envía nuevo feedback a Supabase
 */
export async function createFeedback(
  feedbackData: FeedbackInsert & { recaptchaToken?: string }
): Promise<{ success: boolean; data?: Feedback; error?: string }> {
  try {
    // Verify reCAPTCHA token if provided
    if (feedbackData.recaptchaToken) {
      console.log('🔒 Verificando token reCAPTCHA para feedback...');
      const recaptchaResult = await verifyRecaptchaToken(
        feedbackData.recaptchaToken,
        'CONTACT_FORM',
        0.5 // Minimum score of 0.5
      );

      if (!recaptchaResult.success) {
        console.warn('⚠️ Verificación reCAPTCHA falló:', recaptchaResult.error);
        // Don't fail the feedback if it's a development/configuration issue
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
    console.log('🔍 Intentando conectar a Supabase para feedback...');
    
    // Extract recaptchaToken before inserting into database (we don't store it)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { recaptchaToken: _, ...cleanData } = feedbackData;
    
    const dataToInsert: FeedbackInsert = {
      ...cleanData,
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
