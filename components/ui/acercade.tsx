import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, User } from "lucide-react";

export default function TestimonialSection() {
  return (
    <section className="w-full h-auto flex items-center justify-center px-4 sm:px-8 lg:px-16 py-16 transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        viewport={{ once: true }}
        className="w-full max-w-4xl flex flex-col md:flex-row items-center gap-8"
      >
        {/* Imagen con degradado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, type: "spring" }}
          viewport={{ once: true }}
          className="relative w-full md:w-2/5 h-72 md:h-80 flex-shrink-0 mb-6 md:mb-0"
        >
          <div className="absolute inset-0 rounded-xl overflow-hidden select-none">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10 rounded-xl pointer-events-none" />
            <Image
              src="/assets/pastor-lemuel-acosta.webp"
              alt="Pastor Lemuel Acosta"
              fill
              className="w-full h-full object-cover object-center rounded-xl shadow-lg scale-100 translate-y-0 emd:scale-180 md:translate-y-25"
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              loading="eager"
              draggable="false"
              onContextMenu={(e) => e.preventDefault()}
              unselectable="on"
            />
          </div>
          <span className="absolute bottom-2 right-4 text-4xl md:text-5xl select-none animate-bounce hover:scale-125 transition-transform duration-300 cursor-pointer">🌟</span>
        </motion.div>

        {/* Contenido con glassmorphism */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, type: "spring" }}
          viewport={{ once: true }}
          className="flex-1 pl-0 md:pl-6"
        >
          <div className="backdrop-blur-md bg-white/60 dark:bg-black/40 rounded-xl shadow-lg p-6">
            <blockquote className="text-lg sm:text-xl leading-relaxed italic relative">
              <span className="absolute -left-4 -top-2 text-4xl text-blue-400 dark:text-blue-300 select-none">“</span>
              <span className="inline-block mr-2 align-middle text-blue-500 dark:text-blue-300"><MessageCircle size={32} /></span>
              En Monte Sion, Jesús es nuestro centro y la razón de nuestra pasión.
              Somos una comunidad cristocéntrica que desea caminar contigo de la mano, compartiendo las buenas nuevas de Su amor transformador. Aquí encontrarás un espacio donde tu vida importa, donde te acompañamos, te escuchamos y te apoyamos para crecer juntos en fe, esperanza y servicio.
              Creemos que el poder del Evangelio cambia vidas y une corazones, y queremos que experimentes ese amor vivo que renueva y fortalece. En Monte Sion, no solo eres parte de una iglesia, sino de una familia que te acoge y camina contigo en cada paso.
              <span className="absolute -right-4 -bottom-2 text-4xl text-blue-400 dark:text-blue-300 select-none">”</span>
            </blockquote>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="mt-4 flex flex-col gap-1"
            >
              <h3 className="text-lg font-bold flex items-center gap-2 relative group">
                <User className="text-blue-500 dark:text-blue-300" size={24} />
                <span className="inline-block group-hover:underline group-hover:decoration-blue-400 transition-all duration-300">PS. Lemuel Acosta</span>
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
              </h3>
              <p className="text-blue-600 dark:text-blue-400 flex items-center gap-2 text-base">
                Pastor Principal · Monte Sion
              </p>
              <span className="text-sm text-muted-foreground mt-1">Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna. Juan 3:16</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
