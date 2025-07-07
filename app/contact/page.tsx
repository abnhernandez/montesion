import { CircleDot } from "lucide-react" // Only CircleDot is used from lucide-react
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden transition-colors duration-300">
      {/* Contact Us Speech Bubble minimalista */}
      <div className="flex justify-center relative mt-10 sm:mt-20 md:mt-28 lg:mt-32 mb-4 sm:mb-8 md:mb-10">
        <div className="relative z-10 flex flex-col items-center gap-4 bg-background rounded-[36px] px-8 py-10 border border-border" style={{boxShadow: 'none'}}>
          <span className="block mb-1 text-5xl sm:text-7xl font-semibold tracking-tight leading-tight">Contáctanos</span>
          <span className="text-lg sm:text-xl font-normal text-muted-foreground max-w-2xl mx-auto text-center">¿Tienes dudas, necesitas oración o quieres conocer más sobre nuestra comunidad? <span className="font-medium">¡Estamos para ti!</span></span>
            <a href="https://wa.me/525586449993?text=¡Hola!%20👋%20¡Me%20emociona%20mucho%20conocer%20más%20sobre%20Monte%20Sion!%20✨%20Me%20encantaría%20formar%20parte%20de%20esta%20hermosa%20comunidad%20🙏%20¡Estoy%20muy%20entusiasmado(a)!%20💖" className="mt-3" target="_blank" rel="noopener noreferrer">
            <Button className="rounded-full px-7 py-3 bg-primary text-primary-foreground border border-border shadow-none hover:bg-primary/90 transition-colors text-lg font-medium focus:outline-none focus:ring-2 focus:ring-ring">
              Escríbenos ahora
            </Button>
          </a>
          {/* Cola minimalista */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[-18px] w-0 h-0">
            <div className="w-0 h-0 border-l-[18px] border-r-[18px] border-t-[18px] border-l-transparent border-r-transparent border-t-background"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-10 sm:py-16 md:py-20 px-2 sm:px-4 md:px-8 lg:px-12">
        {/* Top two sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-4 sm:mt-6 md:mt-8">
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col space-y-5 bg-background">
            <h2 className="text-2xl sm:text-3xl font-semibold">Soporte y oración</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              ¿Necesitas ayuda, tienes dudas o quieres que oremos por ti? Nuestro equipo y comunidad están listos para apoyarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6">
                <a href="https://wa.me/525586449993?text=Hola%2C%20necesito%20soporte." target="_blank" rel="noopener noreferrer">
                <Button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl text-base font-medium hover:bg-primary/90 transition-colors border-0">
                  Solicitar ayuda
                </Button>
              </a>
              <a href="https://wa.me/525586449993?text=Hola%2C%20quiero%20compartir%20una%20petici%C3%B3n%20de%20oraci%C3%B3n." target="_blank" rel="noopener noreferrer">
                <Button className="bg-background text-foreground px-6 py-3 rounded-2xl text-base font-medium hover:bg-accent transition-colors flex items-center border-0">
                  <CircleDot className="h-4 w-4 mr-2 text-foreground fill-foreground" />
                  Enviar solicitud de oración
                </Button>
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col space-y-5 bg-white dark:bg-black">
            <h2 className="text-2xl sm:text-3xl font-bold">Habla con nuestro equipo pastoral</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              ¿Tienes preguntas, necesitas oración o quieres conocer más sobre nuestra comunidad? Estamos aquí para ti.
            </p>
            <div className="mt-auto pt-6">
                <a href="https://wa.me/525586449993?text=¡Hola!%20👋%20¡Me%20emociona%20muchísimo%20poder%20hablar%20con%20el%20equipo%20pastoral!%20✨%20Me%20encantaría%20compartir%20y%20recibir%20guía%20espiritual.%20🙏%20¡Estoy%20muy%20entusiasmado(a)!%20💖" target="_blank" rel="noopener noreferrer">
                <Button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors border-0">
                  Contactar equipo
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Middle three sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-10 sm:mt-12 md:mt-16">
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col space-y-5 bg-white dark:bg-black">
            <h2 className="text-xl sm:text-2xl font-bold">Encuentra un ministerio</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              Descubre cómo puedes servir y crecer junto a otros.
            </p>
            <div className="mt-auto pt-6">
                <a href="mailto:ministeriomontesionoaxaca@gmail.com?subject=¡Me%20emociona%20servir%20en%20los%20ministerios!%20✨&body=¡Hola!%20👋%20¡Me%20llena%20de%20alegría%20poder%20escribirles!%20💖%0A%0A¡Estoy%20súper%20emocionado(a)%20por%20conocer%20más%20sobre%20los%20ministerios%20y%20descubrir%20cómo%20puedo%20servir%20en%20nuestra%20hermosa%20iglesia!%20🙏%20¡Mi%20corazón%20está%20dispuesto%20a%20ser%20parte%20de%20este%20increíble%20equipo!%20✨%20¡Gracias!" target="_blank" rel="noopener noreferrer">
                <Button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors border-0">
                  Ver ministerios
                </Button>
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col space-y-5 bg-white dark:bg-black">
            <h2 className="text-xl sm:text-2xl font-bold">Síguenos en redes sociales</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              Mantente al tanto de los avisos, eventos y recursos relevantes que tenemos para ti.
            </p>
            <div className="mt-auto pt-6">
                <a href="https://instagram.com/montesionoaxaca" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors border-0">
                    Seguir en Instagram
                  </Button>
                </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col space-y-5 bg-white dark:bg-black">
            <h2 className="text-xl sm:text-2xl font-bold">Únete a nuestra comunidad</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              Participa en grupos, actividades y foros para crecer en fe y amistad.
            </p>
            <div className="mt-auto pt-6">
                <a href="https://wa.me/525586449993?text=¡Hola!%20👋%20¡Estoy%20súper%20emocionado(a)%20por%20unirme%20a%20un%20grupo%20de%20conexión!%20✨%20¡Mi%20corazón%20está%20listo%20para%20crecer%20en%20comunidad%20y%20hacer%20nuevos%20amigos!%20🤗%20¡Es%20una%20bendición%20poder%20conectar!%20🙏%20¡Gracias!" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors border-0">
                    Quiero ser parte de un grupo de conexión
                  </Button>
                </a>
            </div>
          </div>
        </div>

        {/* Bottom two sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-10 sm:mt-12 md:mt-16">
          <div className="p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col space-y-5 bg-white dark:bg-black">
            <h2 className="text-2xl sm:text-3xl font-bold">¿Listo para dar el siguiente paso?</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              Comienza tu camino con nosotros. Si tienes dudas, ¡habla con un líder o pastor!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6">
                <a href="https://wa.me/525586449993?text=¡Hola!%20👋%20¡Estoy%20increíblemente%20emocionado(a)%20por%20dar%20el%20siguiente%20paso%20en%20mi%20camino%20de%20fe!%20✨%20¡Mi%20corazón%20está%20lleno%20de%20alegría%20y%20gratitud%20por%20esta%20oportunidad!%20🙏%20¡No%20puedo%20esperar%20para%20comenzar%20esta%20hermosa%20aventura!%20💖" target="_blank" rel="noopener noreferrer">
                <Button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors border-0">
                  Quiero unirme
                </Button>
              </a>
                <a href="https://wa.me/525586449993?text=¡Hola!%20👋%20¡Estoy%20increíblemente%20emocionado(a)%20por%20recibir%20orientación%20para%20este%20siguiente%20paso!%20✨%20¡Mi%20corazón%20está%20dispuesto%20a%20conocer%20el%20camino%20que%20Dios%20tiene%20para%20mí!%20🙏%20¡Gracias%20por%20esta%20maravillosa%20oportunidad!%20💖" target="_blank" rel="noopener noreferrer">
                <Button className="bg-white text-black dark:bg-black dark:text-white px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors border-0">
                  Hablar con un líder
                </Button>
              </a>
            </div>
          </div>

          <div className="p-6 sm:p-8 md:p-10 rounded-2xl flex flex-col space-y-5 bg-white dark:bg-black">
            <h2 className="text-2xl sm:text-3xl font-bold">Explora Monte Sion</h2>
            <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed">
              Conoce más sobre nuestra iglesia, visión y próximos eventos especiales.
            </p>
            <div className="mt-auto pt-6">
                <a href="https://wa.me/525586449993?text=¡Hola!%20👋%20¡Estoy%20muy%20emocionado(a)%20por%20conocer%20Monte%20Sion!%20🙏%20Me%20encantaría%20visitarlos%20físicamente%20y%20ser%20parte%20de%20sus%20reuniones.%20¿Podrían%20darme%20más%20información%20sobre%20cómo%20llegar%20y%20los%20horarios%20de%20culto%3F%20✨%20¡Muchas%20gracias!" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-black text-white dark:bg-white dark:text-black px-6 py-3 rounded-2xl text-base font-semibold hover:bg-gray-900 dark:hover:bg-gray-200 transition-colors border-0">
                    Visitar iglesia
                  </Button>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}