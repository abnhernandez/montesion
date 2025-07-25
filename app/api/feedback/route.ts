import { NextRequest, NextResponse } from 'next/server';
import { verifyRecaptchaToken } from '@/lib/recaptcha-verification';

export async function POST(request: NextRequest) {
  try {
    const { recaptchaToken, ...data } = await request.json();
    
    // Verify reCAPTCHA token if provided
    if (recaptchaToken) {
      console.log('🔒 Verificando token reCAPTCHA Enterprise para feedback...');
      
      // Get user IP address for enhanced verification
      const userIpAddress = request.headers.get('x-forwarded-for') || 
                           request.headers.get('x-real-ip') || 
                           'unknown';
      
      const recaptchaResult = await verifyRecaptchaToken(
        recaptchaToken,
        'CONTACT_FORM',
        0.5, // Minimum score of 0.5
        userIpAddress
      );

      if (!recaptchaResult.success) {
        console.error('❌ Verificación reCAPTCHA Enterprise falló:', recaptchaResult.error);
        return NextResponse.json(
          { success: false, error: 'Error de verificación de seguridad. Por favor, intenta de nuevo.' },
          { status: 400 }
        );
      }
      
      console.log('✅ reCAPTCHA Enterprise verificado exitosamente para feedback. Score:', recaptchaResult.score);
    }

    // Log the feedback data (in a real app, you'd save this to a database)
    console.log('📝 Feedback recibido:', {
      type: data.type,
      timestamp: new Date().toISOString(),
      ...data
    });

    // In a real application, you would:
    // 1. Save to database
    // 2. Send notification emails
    // 3. Create tickets in your system
    // For now, we'll just simulate success

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ 
      success: true, 
      message: 'Feedback enviado exitosamente' 
    });
    
  } catch (error) {
    console.error('❌ Error procesando feedback:', error);
    return NextResponse.json(
      { success: false, error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
