/**
 * Servicio de email que llama a la API Route de Next.js (versión cliente)
 */

/**
 * Envía email de confirmación de petición de oración
 */
export async function sendPrayerRequestConfirmation(
  toEmail: string,
  nombre: string,
  ticket: number,
  asunto: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'confirmation',
        data: { toEmail, nombre, ticket, asunto }
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Error enviando email');
    }

    console.log('✅ Email de confirmación enviado exitosamente');
    return { success: true };

  } catch (error) {
    console.error('❌ Error enviando email de confirmación:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error desconocido al enviar email'
    };
  }
}

/**
 * Envía notificación al equipo de Monte Sion sobre nueva petición
 */
export async function sendNewPrayerRequestNotification(
  nombre: string,
  correo_electronico: string,
  asunto: string,
  peticion: string,
  ticket: number
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'notification',
        data: { nombre, correo_electronico, asunto, peticion, ticket }
      }),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || 'Error enviando notificación');
    }

    console.log('✅ Notificación al equipo enviada exitosamente');
    return { success: true };

  } catch (error) {
    console.error('❌ Error enviando notificación:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Error al enviar notificación'
    };
  }
}
