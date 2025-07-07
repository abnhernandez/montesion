"use client";

import { useEffect } from 'react';

export function useLocale(defaultLocale: string = 'es') {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userLang = navigator.language || navigator.languages[0];
      if (userLang && userLang !== defaultLocale) {
        // Aquí podrías redirigir o cargar recursos del idioma
        // window.location.pathname = `/${userLang}${window.location.pathname}`;
      }
    }
  }, [defaultLocale]);
}
