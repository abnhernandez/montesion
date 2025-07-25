"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SimpleTempleLocatorProps {
  className?: string;
}

const TEMPLE_LOCATIONS = [
  {
    title: "Iglesia Cristiana Monte Sion - Santa María Atzompa, Oaxaca",
    address: "Cuicatlán 184, Colonia Niños Héroes, Oaxaca de Juárez, Oax., Mexico",
    coords: { lat: 17.0776603, lng: -96.7621633 },
    description: "Templo principal de la Iglesia Cristiana Monte Sion",
    phone: "+52 951 123 4567",
    hours: "Lun-Vie: 9:00-18:00, Sáb-Dom: 8:00-20:00",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3813.898598618274!2d-96.76470832431872!3d17.07761198375773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c719fbd77eb0a3%3A0x180a16d55bf14f4!2sIglesia%20Cristiana%20Monte%20Sion%20-%20Santa%20Mar%C3%ADa%20Atzompa%2C%20Oaxaca!5e0!3m2!1ses-419!2smx!4v1751308568755!5m2!1ses-419!2smx"
  },
  {
    title: "Confraternidad Más que Vencedores · Monte Sion",
    address: "Carretera Internacional, Oaxaca de Juárez, Oax., Mexico",
    coords: { lat: 17.091243265406714, lng: -96.74704364687524 },
    description: "Confraternidad asociada a Monte Sion",
    phone: "+52 951 123 4568",
    hours: "Mié: 19:00-21:00, Dom: 10:00-13:00",
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d953.4052357089607!2d-96.74767933039253!3d17.091184298984142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85c71f621152ddf9%3A0x943814d960b1dea4!2sConfraternidad%20M%C3%A1s%20que%20Vencedores%20%C2%B7%20Monte%20Sion!5e0!3m2!1ses-419!2smx!4v1753478122119!5m2!1ses-419!2smx"
  }
];

export default function SimpleTempleLocator({ className = "" }: SimpleTempleLocatorProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);

  // Simulamos la carga del mapa
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
      <div className="w-full h-full relative">
        {/* Mapa con Google Maps Locator Plus */}
        <div className="w-full h-full relative">
          {/* Indicador de carga mejorado */}
          <AnimatePresence>
            {isLoading && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10"
              >
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary/20"></div>
                    <div className="animate-spin rounded-full h-10 w-10 border-2 border-primary border-t-transparent absolute inset-0"></div>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">Cargando localizador...</p>
                    <p className="text-xs text-muted-foreground">Google Maps Locator Plus</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Iframe del mapa con Google Maps Locator Plus */}
          <iframe
            title="Localizador de Templos Monte Sion - Google Maps"
            src="https://storage.googleapis.com/maps-solutions-4w4vvd2130/locator-plus/zwlo/locator-plus.html"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: '700px' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() => setIsLoading(false)}
            className="w-full h-full"
          />
          {/* Iconos flotantes discretos - Información complementaria */}
          <motion.div className="absolute bottom-4 left-4 md:left-105 md:top-145 z-20 flex flex-col gap-2">
            {/* Botón de información */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => setShowInfoModal(true)}
              className="w-10 h-10 bg-background/90 backdrop-blur-sm border border-border rounded-full shadow-lg hover:bg-background hover:scale-105 transition-all duration-200 flex items-center justify-center group"
              aria-label="Información del localizador"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-muted-foreground group-hover:text-foreground transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
              </svg>
              {/* Tooltip */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-background border border-border rounded-md text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Información del mapa
              </div>
            </motion.button>

            {/* Botón de contacto */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              onClick={() => setShowCallModal(true)}
              className="w-10 h-10 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center group text-foreground bg-background/90 backdrop-blur-sm border border-border hover:bg-background hover:scale-105"
              aria-label="Llamar"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-muted-foreground group-hover:text-foreground transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
              </svg>
              {/* Tooltip */}
              <div className="absolute left-12 top-1/2 -translate-y-1/2 px-2 py-1 bg-background border border-border rounded-md text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                Llamar ahora
              </div>
            </motion.button>

            {/* Modal para llamar */}
            <AnimatePresence>
              {showCallModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
                  onClick={() => setShowCallModal(false)}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-background/95 backdrop-blur-md border border-border rounded-2xl p-6 max-w-sm w-full mx-4 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-primary">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">Llamar a Monte Sion</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        ¿Deseas llamar a la sede principal?
                      </p>
                    </div>
                    
                    <div className="space-y-4 mb-6">
                      <div className="p-3 bg-muted/50 rounded-lg text-center">
                        <p className="font-medium text-foreground text-lg">+52 951 209 1644</p>
                        <p className="text-xs text-muted-foreground mt-1">Sede Principal - Santa María Atzompa</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                            <div className="relative">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full"></div>
                            </div>
                            <span className="text-xs text-muted-foreground">Disponible</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          window.location.href = 'tel:+529512091644';
                          setShowCallModal(false);
                        }}
                        className="flex-1 px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center justify-center gap-2"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>
                        </svg>
                        Llamar Ahora
                      </button>
                      <button
                        onClick={() => setShowCallModal(false)}
                        className="absolute top-2 right-2 p-2 rounded-lg hover:bg-muted transition-colors"
                      >
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      {/* Modal de información detallada */}
      <AnimatePresence>
        {showInfoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowInfoModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-background border border-border rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground">
                  Información detallada
                </h3>
                <button
                  onClick={() => setShowInfoModal(false)}
                  className="p-1 rounded-lg hover:bg-muted transition-colors"
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-primary">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">Localizador de Templos Monte Sion</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Usa nuestro mapa interactivo powered by Google Maps para encontrar la ubicación más cercana y obtener direcciones precisas.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <h5 className="font-medium text-foreground mb-2 text-sm">🏛️ Nuestras Ubicaciones:</h5>
                    <div className="space-y-2">
                      {TEMPLE_LOCATIONS.map((temple, index) => (
                        <div key={index} className="text-sm">
                          <p className="font-medium text-foreground">{temple.title}</p>
                          <p className="text-xs text-muted-foreground">{temple.address}</p>
                          <p className="text-xs text-muted-foreground">📞 {temple.phone}</p>
                          <p className="text-xs text-muted-foreground">🕒 {temple.hours}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                    <h5 className="font-medium text-foreground mb-2 text-sm">✨ Características del Mapa:</h5>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Vista satelital y Street View</li>
                      <li>• Direcciones paso a paso</li>
                      <li>• Búsqueda por ubicación</li>
                      <li>• Información de contacto completa</li>
                      <li>• Cálculo de distancias y tiempo</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-4 border-t border-border">
                  <button
                    onClick={() => {
                      window.location.href = '/contact';
                      setShowInfoModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    Más Información
                  </button>
                  <button
                    onClick={() => setShowInfoModal(false)}
                    className="px-4 py-2 bg-card border border-border text-foreground text-sm rounded-lg hover:bg-card/80 transition-colors font-medium"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
            </div>
      );
}
