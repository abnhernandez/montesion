import { motion } from "framer-motion";

// Colores y emojis/íconos para cada paso
const stepData = [
  { bg: "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 dark:from-blue-900 dark:via-blue-800 dark:to-blue-700", icon: "✨", label: "Nuevos Creyentes" },
  { bg: "bg-gradient-to-br from-sky-100 via-sky-300 to-sky-500 dark:from-sky-900 dark:via-sky-800 dark:to-sky-700", icon: null, label: "Bautismo en Agua" }, // SVG animado
  { bg: "bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-400 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700", icon: "📖", label: "Fundamentos de la Fe" },
  { bg: "bg-gradient-to-br from-pink-100 via-pink-200 to-pink-400 dark:from-pink-900 dark:via-pink-800 dark:to-pink-700", icon: "🤝", label: "Vida en Comunidad" },
  { bg: "bg-gradient-to-br from-purple-100 via-purple-200 to-purple-400 dark:from-purple-900 dark:via-purple-800 dark:to-purple-700", icon: "🎯", label: "Descubriendo tu Propósito" },
  { bg: "bg-gradient-to-br from-green-100 via-green-200 to-green-400 dark:from-green-900 dark:via-green-800 dark:to-green-700", icon: "🤲", label: "Servicio y Ministerio" },
  { bg: "bg-gradient-to-br from-yellow-200 via-yellow-400 to-yellow-600 dark:from-yellow-900 dark:via-yellow-800 dark:to-yellow-700", icon: "👑", label: "Liderazgo y Multiplicación" },
];

export const stepCardBackgrounds = [
  // Paso 1: Fondo azul + emoji ✨ (emoji en esquina superior izquierda)
  () => (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl flex items-center justify-center ${stepData[0].bg}`}>      
      <motion.span
        className="absolute left-4 top-4 text-6xl md:text-7xl lg:text-8xl select-none pointer-events-none opacity-60"
        style={{ filter: 'drop-shadow(0 0 8px #fff6) drop-shadow(0 2px 8px #0003)' }}
        initial={{ scale: 0.9, opacity: 0.5, filter: 'blur(1.5px) drop-shadow(0 0 8px #fff6)' }}
        animate={{ scale: [0.9, 1.08, 0.95, 1], opacity: 0.6, filter: [
          'blur(1.5px) drop-shadow(0 0 8px #fff6)',
          'blur(0.5px) drop-shadow(0 0 12px #fff6)',
          'blur(0.5px) drop-shadow(0 0 6px #fff6)',
          'blur(1.5px) drop-shadow(0 0 8px #fff6)'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        aria-label={stepData[0].label}
      >
        {stepData[0].icon}
      </motion.span>
    </div>
  ),
  // Paso 2: SVG animado (bautismo, opacidad más baja)
  () => (
    <motion.svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full z-0 rounded-2xl ${stepData[1].bg}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 0.5, y: 0 }}
      transition={{ duration: 0.8, type: "spring" }}
    >
      <rect width="100" height="100" fill="#38bdf8" fillOpacity="0.08" />
      <motion.path d="M0 70 Q25 90 50 70 T100 70 V100 H0Z" fill="#38bdf8" fillOpacity="0.18"
        animate={{ y: [0, 2, 0] }} transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }} />
      <motion.path d="M0 80 Q25 100 50 80 T100 80 V100 H0Z" fill="#0ea5e9" fillOpacity="0.12"
        animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }} />
      <motion.path d="M0 90 Q25 110 50 90 T100 90 V100 H0Z" fill="#0ea5e9" fillOpacity="0.09"
        animate={{ y: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }} />
      <ellipse cx="50" cy="95" rx="40" ry="4" fill="#fff" fillOpacity="0.07" />
    </motion.svg>
  ),
  // Paso 3: Fondo amarillo + emoji 📖 (emoji en esquina superior derecha)
  () => (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl flex items-center justify-center ${stepData[2].bg}`}>      
      <motion.span
        className="absolute right-4 top-4 text-6xl md:text-7xl lg:text-8xl select-none pointer-events-none opacity-60"
        style={{ filter: 'drop-shadow(0 0 8px #fff6) drop-shadow(0 2px 8px #0003)' }}
        initial={{ scale: 0.9, opacity: 0.5, filter: 'blur(1.5px) drop-shadow(0 0 8px #fff6)' }}
        animate={{ scale: [0.9, 1.08, 0.95, 1], opacity: 0.6, filter: [
          'blur(1.5px) drop-shadow(0 0 8px #fff6)',
          'blur(0.5px) drop-shadow(0 0 12px #fff6)',
          'blur(0.5px) drop-shadow(0 0 6px #fff6)',
          'blur(1.5px) drop-shadow(0 0 8px #fff6)'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        aria-label={stepData[2].label}
      >
        {stepData[2].icon}
      </motion.span>
    </div>
  ),
  // Paso 4: Fondo rosa + emoji 🤝 (emoji en esquina inferior izquierda)
  () => (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl flex items-center justify-center ${stepData[3].bg}`}>      
      <motion.span
        className="absolute left-4 bottom-4 text-6xl md:text-7xl lg:text-8xl select-none pointer-events-none opacity-60"
        style={{ filter: 'drop-shadow(0 0 8px #fff6) drop-shadow(0 2px 8px #0003)' }}
        initial={{ scale: 0.9, opacity: 0.5, filter: 'blur(1.5px) drop-shadow(0 0 8px #fff6)' }}
        animate={{ scale: [0.9, 1.08, 0.95, 1], opacity: 0.6, filter: [
          'blur(1.5px) drop-shadow(0 0 8px #fff6)',
          'blur(0.5px) drop-shadow(0 0 12px #fff6)',
          'blur(0.5px) drop-shadow(0 0 6px #fff6)',
          'blur(1.5px) drop-shadow(0 0 8px #fff6)'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        aria-label={stepData[3].label}
      >
        {stepData[3].icon}
      </motion.span>
    </div>
  ),
  // Paso 5: Fondo morado + emoji 🎯 (emoji en esquina inferior derecha)
  () => (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl flex items-center justify-center ${stepData[4].bg}`}>      
      <motion.span
        className="absolute right-4 bottom-4 text-6xl md:text-7xl lg:text-8xl select-none pointer-events-none opacity-60"
        style={{ filter: 'drop-shadow(0 0 8px #fff6) drop-shadow(0 2px 8px #0003)' }}
        initial={{ scale: 0.9, opacity: 0.5, filter: 'blur(1.5px) drop-shadow(0 0 8px #fff6)' }}
        animate={{ scale: [0.9, 1.08, 0.95, 1], opacity: 0.6, filter: [
          'blur(1.5px) drop-shadow(0 0 8px #fff6)',
          'blur(0.5px) drop-shadow(0 0 12px #fff6)',
          'blur(0.5px) drop-shadow(0 0 6px #fff6)',
          'blur(1.5px) drop-shadow(0 0 8px #fff6)'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        aria-label={stepData[4].label}
      >
        {stepData[4].icon}
      </motion.span>
    </div>
  ),
  // Paso 6: Fondo verde + emoji 🤲 (emoji en centro-izquierda, opacidad baja)
  () => (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl flex items-center justify-center ${stepData[5].bg}`}>      
      <motion.span
        className="absolute left-4 top-1/2 -translate-y-1/2 text-6xl md:text-7xl lg:text-8xl select-none pointer-events-none opacity-50"
        style={{ filter: 'drop-shadow(0 0 8px #fff6) drop-shadow(0 2px 8px #0003)' }}
        initial={{ scale: 0.9, opacity: 0.4, filter: 'blur(1.5px) drop-shadow(0 0 8px #fff6)' }}
        animate={{ scale: [0.9, 1.08, 0.95, 1], opacity: 0.5, filter: [
          'blur(1.5px) drop-shadow(0 0 8px #fff6)',
          'blur(0.5px) drop-shadow(0 0 12px #fff6)',
          'blur(0.5px) drop-shadow(0 0 6px #fff6)',
          'blur(1.5px) drop-shadow(0 0 8px #fff6)'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        aria-label={stepData[5].label}
      >
        {stepData[5].icon}
      </motion.span>
    </div>
  ),
  // Paso 7: Fondo dorado + emoji 👑 (emoji en centro-derecha, opacidad baja)
  () => (
    <div className={`absolute inset-0 w-full h-full z-0 overflow-hidden rounded-2xl flex items-center justify-center ${stepData[6].bg}`}>      
      <motion.span
        className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl md:text-7xl lg:text-8xl select-none pointer-events-none opacity-50"
        style={{ filter: 'drop-shadow(0 0 8px #fff6) drop-shadow(0 2px 8px #0003)' }}
        initial={{ scale: 0.9, opacity: 0.4, filter: 'blur(1.5px) drop-shadow(0 0 8px #fff6)' }}
        animate={{ scale: [0.9, 1.08, 0.95, 1], opacity: 0.5, filter: [
          'blur(1.5px) drop-shadow(0 0 8px #fff6)',
          'blur(0.5px) drop-shadow(0 0 12px #fff6)',
          'blur(0.5px) drop-shadow(0 0 6px #fff6)',
          'blur(1.5px) drop-shadow(0 0 8px #fff6)'] }}
        transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        aria-label={stepData[6].label}
      >
        {stepData[6].icon}
      </motion.span>
    </div>
  ),
];
