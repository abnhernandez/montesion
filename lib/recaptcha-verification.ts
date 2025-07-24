// Utility for verifying reCAPTCHA tokens on the server side using Enterprise API
export interface RecaptchaEnterpriseResult {
  name: string;
  event: {
    token: string;
    siteKey: string;
    userAgent: string;
    userIpAddress: string;
    expectedAction: string;
  };
  riskAnalysis: {
    score: number;
    reasons: string[];
  };
  tokenProperties: {
    valid: boolean;
    invalidReason?: string;
    hostname: string;
    action: string;
    createTime: string;
  };
}

export async function verifyRecaptchaToken(
  token: string,
  expectedAction?: string,
  minimumScore: number = 0.5,
  userIpAddress?: string
): Promise<{ success: boolean; score?: number; error?: string; details?: any }> {
  try {
    const apiKey = process.env.RECAPTCHA_API_KEY;
    const projectId = process.env.RECAPTCHA_PROJECT_ID || 'crack-muse-466920-q8';
    
    if (!apiKey) {
      console.error('RECAPTCHA_API_KEY is not configured');
      return { success: false, error: 'reCAPTCHA configuration error' };
    }

    if (!token) {
      return { success: false, error: 'No reCAPTCHA token provided' };
    }

    // Create the request body as specified in the documentation
    const requestBody = {
      event: {
        token: token,
        expectedAction: expectedAction || "SUBMIT_FORM",
        siteKey: "6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B",
        ...(userIpAddress && { userIpAddress })
      }
    };

    console.log('🔍 Enviando solicitud a reCAPTCHA Enterprise API:', {
      projectId,
      expectedAction: expectedAction || "SUBMIT_FORM",
      hasToken: !!token
    });

    // Send request to reCAPTCHA Enterprise API
    const response = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${projectId}/assessments?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ reCAPTCHA Enterprise API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return { 
        success: false, 
        error: `API request failed: ${response.status} ${response.statusText}` 
      };
    }

    const result: RecaptchaEnterpriseResult = await response.json();

    console.log('📊 reCAPTCHA Enterprise resultado:', {
      valid: result.tokenProperties.valid,
      score: result.riskAnalysis.score,
      action: result.tokenProperties.action,
      hostname: result.tokenProperties.hostname,
      reasons: result.riskAnalysis.reasons
    });

    // Check if token is valid
    if (!result.tokenProperties.valid) {
      console.error('❌ Token inválido:', result.tokenProperties.invalidReason);
      return { 
        success: false, 
        error: `Token inválido: ${result.tokenProperties.invalidReason || 'Unknown reason'}`,
        details: result.tokenProperties
      };
    }

    // Verify the action if provided
    if (expectedAction && result.tokenProperties.action !== expectedAction) {
      console.error(`❌ Acción no coincide: esperada ${expectedAction}, recibida ${result.tokenProperties.action}`);
      return { 
        success: false, 
        error: 'Action verification failed',
        details: { 
          expected: expectedAction, 
          actual: result.tokenProperties.action 
        }
      };
    }

    // Check the risk score
    const score = result.riskAnalysis.score;
    if (score < minimumScore) {
      console.warn(`⚠️ Puntuación baja: ${score} (mínimo: ${minimumScore})`);
      console.warn('🔍 Razones:', result.riskAnalysis.reasons);
      return { 
        success: false, 
        score: score,
        error: 'Security verification failed - low trust score',
        details: {
          score,
          reasons: result.riskAnalysis.reasons,
          minimumRequired: minimumScore
        }
      };
    }

    console.log('✅ reCAPTCHA Enterprise verificación exitosa:', {
      score,
      action: result.tokenProperties.action,
      hostname: result.tokenProperties.hostname
    });

    return { 
      success: true, 
      score: score,
      details: {
        action: result.tokenProperties.action,
        hostname: result.tokenProperties.hostname,
        reasons: result.riskAnalysis.reasons,
        createTime: result.tokenProperties.createTime
      }
    };

  } catch (error) {
    console.error('❌ Error verificando token reCAPTCHA Enterprise:', error);
    return { 
      success: false, 
      error: 'reCAPTCHA verification error',
      details: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
