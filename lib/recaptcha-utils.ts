'use client';

import { type RecaptchaAction } from '@/hooks/use-recaptcha';

/**
 * Generic function to execute reCAPTCHA for any form
 * Usage example:
 * 
 * const onClick = async (e) => {
 *   e.preventDefault();
 *   
 *   const token = await executeFormRecaptcha('CONTACT_FORM');
 *   if (!token) {
 *     alert('Error de verificación. Intenta de nuevo.');
 *     return;
 *   }
 *   
 *   // Proceed with form submission
 *   submitForm({ ...formData, recaptchaToken: token });
 * };
 */
export const executeFormRecaptcha = async (action: RecaptchaAction): Promise<string | null> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.grecaptcha?.enterprise) {
      console.warn('reCAPTCHA Enterprise is not loaded');
      resolve(null);
      return;
    }

    window.grecaptcha.enterprise.ready(async () => {
      try {
        const token = await window.grecaptcha.enterprise.execute(
          '6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B', 
          { action: action }
        );
        resolve(token);
      } catch (error) {
        console.error('Error executing reCAPTCHA:', error);
        resolve(null);
      }
    });
  });
};

/**
 * Generic onClick handler with reCAPTCHA protection
 * This can be used with any button or form that needs reCAPTCHA protection
 */
export const createProtectedClickHandler = (
  action: RecaptchaAction,
  onSuccess: (token: string) => void | Promise<void>,
  onError?: (error: string) => void
) => {
  return async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      const token = await executeFormRecaptcha(action);
      
      if (!token) {
        const errorMsg = 'Error de verificación de seguridad. Por favor, intenta de nuevo.';
        if (onError) {
          onError(errorMsg);
        } else {
          console.error(errorMsg);
        }
        return;
      }
      
      await onSuccess(token);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error inesperado';
      if (onError) {
        onError(errorMsg);
      } else {
        console.error('Error in protected click handler:', errorMsg);
      }
    }
  };
};

/**
 * Example usage with inline implementation:
 * 
 * <script>
 *   function onClick(e) {
 *     e.preventDefault();
 *     grecaptcha.enterprise.ready(async () => {
 *       const token = await grecaptcha.enterprise.execute('6LewOY4rAAAAAHFM3cVheqX82ITHy0JPNhTj11_B', {action: 'LOGIN'});
 *       // Use the token for your form submission
 *       submitForm({ ...formData, recaptchaToken: token });
 *     });
 *   }
 * </script>
 */
