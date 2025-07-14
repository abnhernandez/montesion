'use client'

import { FaWhatsapp } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

const whatsappNumber = "5586449993";
const whatsappMsg = encodeURIComponent(
  "¡Hola! Me gustaría planificar mi visita a Monte Sion. Tengo algunas dudas y me gustaría recibir recomendaciones."
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

export default function PlanificaVisitaPage() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <main className="min-h-screen bg-white dark:bg-black flex flex-col items-center justify-center py-12 px-2 sm:px-4">
      <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-20 items-stretch rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden px-2 sm:px-8 lg:px-24 py-10 lg:py-24">
        {/* Columna principal (2/3) */}
        <div className="col-span-2 flex flex-col items-center justify-center px-2 sm:px-8">
          <span className="text-base lg:text-lg font-medium mb-3 tracking-wide uppercase px-4 py-1 rounded-full bg-secondary text-secondary-foreground shadow-sm">
            Bienvenido a Monte Sion
          </span>
          <h1
            className="text-4xl lg:text-7xl font-semibold mb-4 lg:mb-8 text-center tracking-tight rounded-xl whitespace-nowrap"
            style={{ fontFamily: 'Quicksand, Nunito, Arial, sans-serif' }}
          >
            <span className="text-foreground">Planifica tu visita</span>
          </h1>
          <style>{`
            :root { --planifica-title-color: #111; }
            html.dark :root { --planifica-title-color: #fff; }
          `}</style>
          <p className="text-lg lg:text-2xl text-muted-foreground mb-7 font-medium max-w-2xl text-center">
            Nuestro mayor deseo es que experimentes la hermosa presencia de Dios y seas lleno del Espíritu Santo. Queremos que vivas una experiencia auténtica, de fe y amor, y te sientas como en casa.
          </p>
          <div className="mb-8 space-y-4 max-w-2xl w-full">
            <div>
              <span className="block italic text-lg lg:text-xl font-medium text-blue-700 dark:text-blue-300 text-center">Donde está el Espíritu del Señor, allí hay libertad.</span>
              <span className="block text-xs text-muted-foreground text-center">2 Corintios 3:17</span>
            </div>
            <div>
              <span className="block italic text-lg lg:text-xl font-semibold text-purple-700 dark:text-purple-300 text-center">Jesús te dice: Venid a mí todos los que estáis trabajados y cargados, y yo os haré descansar.</span>
              <span className="block text-xs text-muted-foreground text-center">Mateo 11:28</span>
            </div>
            <div>
              <span className="block italic text-lg lg:text-xl font-semibold text-green-700 dark:text-green-300 text-center">Serás lleno del Espíritu Santo.</span>
              <span className="block text-xs text-muted-foreground text-center">Hechos 1:8</span>
            </div>
          </div>
          <ul className="list-disc pl-6 text-base lg:text-lg text-gray-700 dark:text-gray-300 space-y-2 mb-10 max-w-2xl w-full mx-auto">
            <li>Ambiente de adoración, fe y libertad en el Espíritu.</li>
            <li>Ministerio infantil seguro y divertido para los niños.</li>
            <li>Ven como te sientas cómodo, no importa tu vestimenta.</li>
            <li>No te señalaremos ni pediremos nada especial, solo queremos conocerte.</li>
            <li>Contamos con un espacio seguro para los niños durante las reuniones.</li>
          </ul>
          <div className="mb-6 w-full max-w-2xl mx-auto">
            <div className="text-xs lg:text-base text-muted-foreground mb-1 text-center">
              Domingos 02:30 PM · Cuicatlán 184, Colonia Niños Héroes, Santa María Atzompa, 71222 Oaxaca de Juárez, Oax.
            </div>
            <div className="flex justify-center">
              <a
                href="https://www.google.com/maps/search/?api=1&query=36HQ%2B24+Oaxaca+de+Ju%C3%A1rez%2C+Oaxaca"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 px-8 py-3 bg-white dark:bg-black text-gray-900 dark:text-gray-100 rounded-full font-semibold shadow hover:bg-gray-100 dark:hover:bg-gray-900 transition text-base focus:outline-none border-2 border-[#831111] dark:border-[#e57373] focus:ring-2 focus:ring-[#831111]"
              >
                <FaMapMarkedAlt className="w-5 h-5 text-[#831111] dark:text-[#e57373]" /> Ver ubicación exacta en Google Maps
              </a>
            </div>
            <div className="text-xs text-muted-foreground mt-2 text-center">
              Puedes llegar en taxi, mototaxi o transporte público. Hay tiendas y estacionamiento cerca del templo.
            </div>
          </div>
        </div>
        {/* Columna derecha: Agenda visual */}
        <aside className="col-span-1 flex flex-col items-center justify-center mt-12 lg:mt-0">
          <span className="text-base lg:text-lg font-semibold mb-3 tracking-wide uppercase px-4 py-1 rounded-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 shadow-sm flex items-center gap-2 bg-transparent">
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-500 dark:text-gray-300"><rect x="3" y="5" width="18" height="16" rx="3" fill="none" className="opacity-10"/><rect x="3" y="5" width="18" height="16" rx="3" strokeWidth="2"/><path strokeWidth="2" d="M16 3v4M8 3v4"/><path strokeWidth="2" d="M3 10h18"/></svg>
            Agenda semanal
          </span>
          <div className="w-full max-w-xs bg-white dark:bg-neutral-900 rounded-2xl shadow border border-[#831111] dark:border-[#e57373] p-6 flex flex-col gap-4">
            {/* Domingo */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center mr-2">
                <span className="text-lg font-bold text-[#00796b] dark:text-[#4dd0e1]">Dom</span>
                <span className="w-2 h-2 rounded-full bg-[#00796b] dark:bg-[#4dd0e1] mt-1" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">Domingo</div>
                <div className="text-xs text-gray-600 dark:text-gray-300 mb-1 italic">Ayuno congregacional (solo el 1er domingo del mes) <span className="font-normal">a las 10:30 AM</span></div>
                <div className="font-semibold text-gray-900 dark:text-white mt-2">Reunión general</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">2:30–5:00 PM</div>
              </div>
            </div>
            {/* Jueves */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center mr-2">
                <span className="text-lg font-bold text-[#a15c11] dark:text-[#ffd699]">Jue</span>
                <span className="w-2 h-2 rounded-full bg-[#a15c11] dark:bg-[#ffd699] mt-1" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">Estudio y oración de mujeres</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">6:00–8:00 PM</div>
              </div>
            </div>
            {/* Viernes */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center mr-2">
                <span className="text-lg font-bold text-[#7b1fa2] dark:text-[#d1aaff]">Vie</span>
                <span className="w-2 h-2 rounded-full bg-[#7b1fa2] dark:bg-[#d1aaff] mt-1" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-900 dark:text-white">Estudio bíblico y reunión general</div>
                <div className="text-sm text-gray-700 dark:text-gray-200">6:00–8:00 PM</div>
              </div>
            </div>
            {/* Días cerrados */}
            <div className="flex items-start gap-3 opacity-50">
              <div className="flex flex-col items-center mr-2">
                <span className="text-lg font-bold text-gray-400 dark:text-gray-600">Lun</span>
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 mt-1" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-400 dark:text-gray-600 line-through">Sin actividades</div>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-50">
              <div className="flex flex-col items-center mr-2">
                <span className="text-lg font-bold text-gray-400 dark:text-gray-600">Mar</span>
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 mt-1" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-400 dark:text-gray-600 line-through">Sin actividades</div>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-50">
              <div className="flex flex-col items-center mr-2">
                <span className="text-lg font-bold text-gray-400 dark:text-gray-600">Mié</span>
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 mt-1" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-400 dark:text-gray-600 line-through">Sin actividades</div>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-50">
              <div className="flex flex-col items-center mr-2">
                <span className="text-lg font-bold text-gray-400 dark:text-gray-600">Sáb</span>
                <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600 mt-1" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-gray-400 dark:text-gray-600 line-through">Sin actividades</div>
              </div>
            </div>
          </div>
        </aside>
        {/* Botón de ayuda flotante, sobre toda la página */}
        <button
          className="fixed bottom-8 right-8 z-50 bg-[#831111] hover:bg-[#a13a3a] text-white rounded-full p-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#831111]"
          aria-label="Ayuda"
          onClick={() => setShowHelp(true)}
        >
          <HelpCircle className="w-7 h-7" />
        </button>
        {/* Panel/modal de ayuda */}
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-2xl p-8 max-w-xs w-full flex flex-col items-center gap-6 relative">
              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                aria-label="Cerrar ayuda"
                onClick={() => setShowHelp(false)}
              >
                <span className="text-2xl">×</span>
              </button>
              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Si tienes alguna pregunta o necesitas más información, visita nuestra sección de <a href="/faq" className="underline text-[#831111] dark:text-[#e57373] hover:text-[#a13a3a] dark:hover:text-[#ffb3b3]">Preguntas Frecuentes</a> o no dudes en contactarnos.
              </div>
              <div className="flex items-center gap-2 text-[#831111] dark:text-[#e57373] text-2xl font-semibold text-center">
                <HelpCircle className="w-7 h-7 text-[#831111] dark:text-[#e57373]" />
                ¿Tienes dudas?
              </div>
              <div className="text-lg text-gray-700 dark:text-gray-300 text-center">
                Puedes escribirnos por WhatsApp y te ayudamos personalmente.
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-black text-green-600 dark:text-green-400 rounded-full font-bold shadow-lg transition text-lg focus:outline-none border-2 border-[#25D366] focus:ring-2 focus:ring-[#25D366]"
              >
                <FaWhatsapp className="w-6 h-6 text-[#25D366]" /> Escribir por WhatsApp
              </a>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
