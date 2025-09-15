"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import BlurText from "@/components/ui/BlurText";
import TiltedCard from '@/components/ui/TiltedCard';

const handleAnimationComplete = () => {};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function AboutPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-black dark:via-black dark:to-black pt-24 pb-24">
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        className="mx-auto max-w-5xl space-y-16 px-2 sm:px-4 md:px-0"
      >
        {/* Hero/Encabezado */}
        <motion.div
          variants={fadeInUp}
          className="relative rounded-3xl bg-white/80 dark:bg-black/80 shadow-xl p-6 sm:p-10 md:p-16 flex flex-col items-center text-center gap-6 overflow-hidden border border-gray-200 dark:border-gray-800"
        >
          <div className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full blur-2xl z-0 animate-pulse" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-purple-400/30 to-blue-400/30 rounded-full blur-2xl z-0 animate-pulse" />
          <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-foreground leading-tight drop-shadow-sm">
            Iglesia Monte Sion
          </h1>
          <p className="relative z-10 text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Una iglesia cristiana evangélica fundamentada en toda la Palabra de Dios. Creemos que Dios es el mismo de ayer, hoy y por los siglos; Él no cambia, su fidelidad permanece para siempre.
          </p>
          <motion.button
            whileHover={{ x: 8, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="relative z-10 mt-2 inline-flex items-center gap-2 px-7 py-3 bg-white/90 dark:bg-black/90 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 font-semibold rounded-full shadow-lg hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-blue-400 group"
            onClick={() => window.open("https://www.instagram.com/montesionoaxaca")}
            aria-label="Conócenos"
          >
            <span>Conócenos</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>

        {/* Misión y Valores */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Imagen de perfil arriba en mobile, a la derecha en desktop */}
            <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex justify-center order-1 md:order-2 mb-4 md:mb-0 w-full"
            >
            <TiltedCard
              imageSrc="./assets/congregacion-vistageneneral.webp"
              altText="Congregación Monte Sion"
              captionText="Congregación Monte Sion"
              containerHeight="400px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text"></p>
              }
            />
            </motion.div>
          {/* Bio y valores */}
          <div className="space-y-6 order-2 md:order-1 w-full text-center md:text-left">
            <BlurText
             text="Nuestra Misión"
             delay={200}
             animateBy="words"
             direction="top"
             onAnimationComplete={handleAnimationComplete}
             className="text-4xl font-bold mb-8"
            />
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Proclamar el evangelio de Jesucristo, guiando a las personas a una relación viva con Dios mediante la enseñanza fiel de toda Su Palabra.
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Servimos a nuestra comunidad con amor, compasión y verdad, edificando vidas conforme a los principios eternos de Dios.
            </p>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start mt-4">
              <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">Fe</span>
              <span className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">Amor</span>
              <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">Servicio</span>
            </div>
          </div>
        </motion.div>

        {/* Visión */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-col md:grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Imagen de perfil arriba en mobile, a la IZQUIERDA en desktop */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="flex justify-center order-1 md:order-1 mb-4 md:mb-0 w-full"
          >
            <TiltedCard
              imageSrc="/assets/congregacion-adorando.webp"
              altText="Adoración - Monte Sion"
              captionText="Adoración - Monte Sion"
              containerHeight="400px"
              containerWidth="100%"
              imageHeight="100%"
              imageWidth="100%"
              rotateAmplitude={12}
              scaleOnHover={1.2}
              showMobileWarning={false}
              showTooltip={true}
              displayOverlayContent={true}
              overlayContent={
                <p className="tilted-card-demo-text"></p>
              }
            />
          </motion.div>
          {/* Visión y valores */}
          <div className="space-y-6 order-2 md:order-2 w-full text-center md:text-left">
            <BlurText
             text="Nuestra Visión"
             delay={200}
             animateBy="words"
             direction="bottom"
             onAnimationComplete={handleAnimationComplete}
             className="text-4xl font-bold mb-8"
            />
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              Ser una iglesia que impacta a Oaxaca y las naciones, formando discípulos comprometidos que reflejan el carácter de Cristo en cada área de sus vidas.
            </p>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
              Queremos ser un faro de esperanza, restauración y unidad, donde cada persona descubra su propósito en Dios y sea equipada para servir con excelencia.
            </p>
            <div className="flex gap-2 flex-wrap justify-center md:justify-start mt-4">
              <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">Esperanza</span>
              <span className="bg-pink-100 dark:bg-pink-900 text-pink-700 dark:text-pink-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">Unidad</span>
              <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-200 px-3 py-1 rounded-full font-medium text-xs sm:text-sm">Propósito</span>
            </div>
          </div>
        </motion.div>

        {/* CTA final */}
        <motion.div variants={fadeInUp} className="text-center space-y-4 pt-10 sm:pt-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Visítanos</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Domingos 02:30 PM · Calle Cuicatlán #186, Niños Heroés, 71222, Santa María Atzompa, Oaxaca, México.</p>
          <motion.a
            whileHover={{ x: 8, scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="mt-2 inline-flex items-center gap-2 bg-white/90 dark:bg-black/90 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 px-6 sm:px-8 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl transition focus:outline-none focus:ring-2 focus:ring-blue-400 group"
            href="/planifica-visita"
          >
            <span>Planifica tu visita</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  )
}