"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface TempleLocatorProps {
  className?: string;
}

// Configuración del localizador de templos
const TEMPLE_LOCATOR_CONFIG = {
  "locations": [
    {
      "title": "Iglesia Cristiana Monte Sion - Santa María Atzompa, Oaxaca",
      "address1": "Iglesia Cristiana Monte Sion, Cuicatlán 184, Colonia Niños Héroes",
      "address2": "Oaxaca de Juárez, Oax., Mexico",
      "coords": { "lat": 17.0776603, "lng": -96.7621633 },
      "placeId": "ChIJo7B-1_sZx4UR9BS_VW2hgAE"
    },
    {
      "title": "Confraternidad Más que Vencedores · Monte Sion",
      "address1": "Confraternidad Más que Vencedores, Monte Sion, Carretera Internacional",
      "address2": "Oaxaca de Juárez, Oax., Mexico",
      "coords": { "lat": 17.0911843, "lng": -96.7470356 },
      "placeId": "ChIJ-d1SEWIfx4URpN6xYNkUOJQ"
    }
  ],
  "mapOptions": {
    "center": { "lat": 17.084, "lng": -96.754 }, // Centro entre ambas ubicaciones
    "fullscreenControl": true,
    "mapTypeControl": false,
    "streetViewControl": false,
    "zoom": 12,
    "zoomControl": true,
    "maxZoom": 17,
    "mapId": ""
  },
  "mapsApiKey": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY_HERE",
  "capabilities": {
    "input": true,
    "autocomplete": true,
    "directions": true,
    "distanceMatrix": true,
    "details": true,
    "actions": false
  }
};

export default function TempleLocator({ className = "" }: TempleLocatorProps) {
  const locatorRef = useRef<HTMLElement>(null);
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Cargar la librería de Google Maps Extended Components
    const loadGoogleMapsLibrary = async () => {
      if (isLoadedRef.current) return;

      try {
        // Verificar si ya está cargado
        if (typeof customElements !== 'undefined' && customElements.get('gmpx-store-locator')) {
          initializeLocator();
          return;
        }

        // Cargar el script de la librería
        const script = document.createElement('script');
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/@googlemaps/extended-component-library/0.6.11/index.min.js';
        script.onload = () => {
          // Esperar a que el custom element esté definido
          customElements.whenDefined('gmpx-store-locator').then(() => {
            initializeLocator();
          });
        };
        script.onerror = () => {
          console.error('Error loading Google Maps Extended Component Library');
        };
        document.head.appendChild(script);

        isLoadedRef.current = true;
      } catch (error) {
        console.error('Error initializing Google Maps:', error);
      }
    };

    const initializeLocator = () => {
      if (locatorRef.current) {
        const locator = locatorRef.current as HTMLElement & { 
          configureFromQuickBuilder?: (config: typeof TEMPLE_LOCATOR_CONFIG) => void 
        };
        if (locator.configureFromQuickBuilder) {
          locator.configureFromQuickBuilder(TEMPLE_LOCATOR_CONFIG);
        }
      }
    };

    loadGoogleMapsLibrary();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full h-full relative overflow-hidden ${className}`}
    >
      {/* Estilos CSS para el localizador */}
      <style jsx>{`
        gmpx-store-locator {
          width: 100%;
          height: 100%;
          
          /* Personalización del tema para Monte Sion */
          --gmpx-color-surface: #ffffff;
          --gmpx-color-on-surface: #1a1a1a;
          --gmpx-color-on-surface-variant: #6b7280;
          --gmpx-color-primary: #2563eb;
          --gmpx-color-outline: #e5e7eb;
          --gmpx-fixed-panel-width-row-layout: 28.5em;
          --gmpx-fixed-panel-height-column-layout: 65%;
          --gmpx-font-family-base: "Inter", "Roboto", sans-serif;
          --gmpx-font-family-headings: "Inter", "Roboto", sans-serif;
          --gmpx-font-size-base: 0.875rem;
          --gmpx-hours-color-open: #059669;
          --gmpx-hours-color-closed: #dc2626;
          --gmpx-rating-color: #f59e0b;
          --gmpx-rating-color-empty: #d1d5db;
        }

        /* Modo oscuro */
        @media (prefers-color-scheme: dark) {
          gmpx-store-locator {
            --gmpx-color-surface: #1f2937;
            --gmpx-color-on-surface: #f9fafb;
            --gmpx-color-on-surface-variant: #9ca3af;
            --gmpx-color-primary: #3b82f6;
            --gmpx-color-outline: #374151;
          }
        }

        .dark gmpx-store-locator {
          --gmpx-color-surface: #1f2937;
          --gmpx-color-on-surface: #f9fafb;
          --gmpx-color-on-surface-variant: #9ca3af;
          --gmpx-color-primary: #3b82f6;
          --gmpx-color-outline: #374151;
        }
      `}</style>

      {/* API Loader */}
      {React.createElement('gmpx-api-loader', {
        key: TEMPLE_LOCATOR_CONFIG.mapsApiKey,
        'solution-channel': 'GMP_QB_locatorplus_v11_montesion'
      })}

      {/* Store Locator Component */}
      {React.createElement('gmpx-store-locator', {
        ref: locatorRef,
        'map-id': 'DEMO_MAP_ID',
        className: 'w-full h-full rounded-lg'
      })}

      {/* Overlay de carga */}
      <div className="absolute inset-0 bg-background/80 flex items-center justify-center pointer-events-none opacity-100 transition-opacity duration-500 z-10">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Cargando mapa de templos...</p>
        </div>
      </div>
    </motion.div>
  );
}
