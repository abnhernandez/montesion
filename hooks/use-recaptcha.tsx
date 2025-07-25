'use client';

import { useCallback } from 'react';

declare global {
  interface Window {
    grecaptcha: {
      enterprise: {
        ready: (callback: () => void) => void;
        execute: (siteKey: string, options: { action: string }) => Promise<string>;
      };
    };
  }
}

const RECAPTCHA_SITE_KEY = '6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B';

export type RecaptchaAction = 
  | 'LOGIN' 
  | 'REGISTER' 
  | 'PRAYER_REQUEST' 
  | 'CONTACT_FORM' 
  | 'EMAIL_SEND'
  | 'SUBMIT_FORM';

export const useRecaptcha = () => {
  const executeRecaptcha = useCallback(async (action: RecaptchaAction): Promise<string | null> => {
    return new Promise((resolve) => {
      if (typeof window === 'undefined' || !window.grecaptcha?.enterprise) {
        console.warn('reCAPTCHA Enterprise is not loaded');
        resolve(null);
        return;
      }

      window.grecaptcha.enterprise.ready(async () => {
        try {
          const token = await window.grecaptcha.enterprise.execute(RECAPTCHA_SITE_KEY, {
            action: action
          });
          resolve(token);
        } catch (error) {
          console.error('Error executing reCAPTCHA:', error);
          
          // Si hay error de dominio, permitir continuar en desarrollo
          if (error instanceof Error && error.message.includes('Invalid domain')) {
            console.warn('⚠️ reCAPTCHA domain error - allowing in development mode');
            if (process.env.NODE_ENV === 'development') {
              resolve('dev-bypass-token');
              return;
            }
          }
          
          // For other errors, log but allow to continue (graceful degradation)
          console.warn('⚠️ reCAPTCHA execution failed, proceeding without verification');
          resolve(null);
        }
      });
    });
  }, []);

  return { executeRecaptcha };
};
