"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CarrouselLetrasFE from '@/components/ui/AnimacionCarruselLetrasFE';

// Utilidad para convertir referencia bíblica a URL de bible.com
function bibleUrl(ref: string) {
  // Ejemplo: "Juan 3:16" => "https://www.bible.com/es/bible/149/JHN.3.16.RVR60"
  // Mapeo de libros abreviados a códigos de bible.com (RVR60)
  const bookMap: Record<string, string> = {
    "Génesis": "GEN",
    "Éxodo": "EXO",
    "Levítico": "LEV",
    "Números": "NUM",
    "Deuteronomio": "DEU",
    "Josué": "JOS",
    "Jueces": "JDG",
    "Rut": "RUT",
    "1 Samuel": "1SA",
    "2 Samuel": "2SA",
    "1 Reyes": "1KI",
    "2 Reyes": "2KI",
    "1 Crónicas": "1CH",
    "2 Crónicas": "2CH",
    "Esdras": "EZR",
    "Nehemías": "NEH",
    "Ester": "EST",
    "Job": "JOB",
    "Salmos": "PSA",
    "Proverbios": "PRO",
    "Eclesiastés": "ECC",
    "Cantares": "SNG",
    "Isaías": "ISA",
    "Jeremías": "JER",
    "Lamentaciones": "LAM",
    "Ezequiel": "EZK",
    "Daniel": "DAN",
    "Oseas": "HOS",
    "Joel": "JOL",
    "Amós": "AMO",
    "Abdías": "OBA",
    "Jonás": "JON",
    "Miqueas": "MIC",
    "Nahúm": "NAM",
    "Habacuc": "HAB",
    "Sofonías": "ZEP",
    "Hageo": "HAG",
    "Zacarías": "ZEC",
    "Malaquías": "MAL",
    "Mateo": "MAT",
    "Marcos": "MRK",
    "Lucas": "LUK",
    "Juan": "JHN",
    "Hechos": "ACT",
    "Romanos": "ROM",
    "1 Corintios": "1CO",
    "2 Corintios": "2CO",
    "Gálatas": "GAL",
    "Efesios": "EPH",
    "Filipenses": "PHP",
    "Colosenses": "COL",
    "1 Tesalonicenses": "1TH",
    "2 Tesalonicenses": "2TH",
    "1 Timoteo": "1TI",
    "2 Timoteo": "2TI",
    "Tito": "TIT",
    "Filemón": "PHM",
    "Hebreos": "HEB",
    "Santiago": "JAS",
    "1 Pedro": "1PE",
    "2 Pedro": "2PE",
    "1 Juan": "1JN",
    "2 Juan": "2JN",
    "3 Juan": "3JN",
    "Judas": "JUD",
    "Apocalipsis": "REV",
  };
  const match = ref.match(/([1-3]?\s?[A-Za-zÁÉÍÓÚáéíóúñüÑ]+)\s(\d+)(?::(\d+))?/);
  if (!match) return "#";
  const book = match[1].replace(/\s+/g, " ").trim();
  const chapter = match[2];
  const verse = match[3];
  const code = bookMap[book] || "";
  if (!code) return "#";
  return `https://www.bible.com/es/bible/149/${code}.${chapter}${verse ? "." + verse : ""}.RVR60`;
}

// Función para abrir enlaces en una ventana PiP
function openPiP(url: string) {
  const width = 600;
  const height = 400;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  window.open(
    url,
    "bible-verse-pip",
    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`
  );
}

const declaraciones = [
  {
    title: "La Santa Biblia",
    content:
      "La Biblia, y solo la Biblia, es la completa Palabra de Dios. Es la autoridad final en la determinación de todas las verdades doctrinales. En su escritura original, es inspirada por Dios, infalible e inequívoca.",
    refs: [
      "2 Timoteo 3:16",
      "2 Pedro 1:20-21",
      "Proverbios 30:5",
      "Romanos 16:25-26",
    ],
  },
  {
    title: "Trinidad",
    content:
      "Hay un solo Dios, eternamente coexistente en tres personas: el Padre, el Hijo Jesucristo y el Espíritu Santo. Estos tres son co-iguales y co-eternos.",
    refs: [
      "1 Juan 5:7",
      "Génesis 1:26",
      "Mateo 3:16-17",
      "Mateo 28:19",
      "Lucas 1:35",
      "Isaías 9:6",
      "Hebreos 3:7-11",
    ],
  },
  {
    title: "Jesucristo",
    content:
      "Jesucristo es Dios Hijo, la segunda persona de la Trinidad. Jesús es 100% Dios y 100% hombre. Él es la única persona que ha vivido una vida sin pecado. Nació de María virgen, hizo milagros, murió en la cruz por la humanidad y, a través del derramamiento de su sangre, expió nuestros pecados. Resucitó de los muertos al tercer día, ascendió a la diestra del Padre y regresará de nuevo en poder y gloria.",
    refs: [
      "Juan 1:1",
      "Juan 1:14",
      "Juan 20:28",
      "1 Timoteo 3:16",
      "Isaías 9:6",
      "Filipenses 2:5-6",
      "1 Timoteo 2:5",
    ],
  },
  {
    title: "Nacimiento virginal",
    content:
      "Jesucristo fue concebido por el Espíritu Santo en el vientre de María virgen y se revela en la Biblia como el Hijo de Dios.",
    refs: [
      "Mateo 1:18",
      "Mateo 1:25",
      "Lucas 1:35",
      "Isaías 7:14",
      "Lucas 1:27-35",
    ],
  },
  {
    title: "La sangre de Jesús",
    content:
      "La sangre de Jesús es suficiente para limpiar a la humanidad de todo pecado. Representa libertad, sanidad, limpieza y perdón de toda culpa y consecuencia eterna del pecado.",
    refs: [
      "1 Juan 1:7",
      "Apocalipsis 1:5",
      "Apocalipsis 5:9",
      "Colosenses 1:20",
      "Romanos 3:10-12",
      "Romanos 3:23",
      "Romanos 5",
    ],
  },
  {
    title: "Espíritu Santo",
    content:
      "El Espíritu Santo es Dios, la tercera persona de la Trinidad. Habita en el creyente, testifica que somos hijos de Dios, guía a toda verdad, da testimonio del Padre y del Hijo e intercede por nosotros.",
    refs: [
      "Ezequiel 36:26-27",
      "Juan 6:44-45",
      "Juan 15:26",
      "1 Corintios 3:16",
      "Gálatas 4:6",
    ],
  },
  {
    title: "Redención",
    content:
      "La redención es la liberación de nuestros pecados mediante el pago de un rescate, el sacrificio de Cristo a nuestro favor. El hombre fue creado bueno y recto, pero por su transgresión voluntaria cayó en pecado y su única esperanza de redención está en Jesucristo, el Hijo de Dios.",
    refs: [
      "Génesis 1:26-31",
      "Génesis 3:1-7",
      "Romanos 5:12-21",
    ],
  },
  {
    title: "Regeneración",
    content:
      "La regeneración o nuevo nacimiento es el cambio de la vieja naturaleza pecaminosa efectuado en el corazón del creyente por el Espíritu Santo. Una persona que ha nacido de nuevo es reconocida como un hijo o una hija de Dios.",
    refs: [
      "Juan 6:44",
      "Juan 6:65",
      "Mateo 19:28",
      "Tito 3:5",
    ],
  },
  {
    title: "Arrepentimiento",
    content:
      "El arrepentimiento es reconocer que tenemos la necesidad del perdón de nuestros pecados y aceptar que hemos tomado decisiones que van en contra de la voluntad de Dios. Una persona arrepentida recibe la obra de Cristo a su favor, el perdón de sus pecados y una restaurada relación con Dios como Padre.",
    refs: [
      "Hechos 2:21",
      "Hechos 3:19",
      "1 Juan 1:9",
    ],
  },
  {
    title: "Salvación",
    content:
      "La salvación es la obra de redención aplicada a quien ha puesto su fe en Jesús. Somos salvos por gracia, no como resultado de nuestras obras ni esfuerzo humano, sino como un regalo de Dios.",
    refs: [
      "Efesios 2:8-9",
      "Gálatas 2:16",
      "Gálatas 3:8",
      "Tito 3:5",
      "Romanos 10:9-10",
      "Hechos 16:31",
      "Hebreos 9:22",
    ],
  },
  {
    title: "Santificación",
    content:
      "La santificación es un cambio que Dios hace en el creyente desde el momento de la salvación y es un proceso continuo en el que se desarrolla el carácter de Cristo con ayuda del Espíritu Santo.",
    refs: [
      "1 Tesalonicenses 4:3",
      "1 Tesalonicenses 5:23",
      "2 Corintios 3:18",
      "2 Corintios 6:14-18",
      "2 Tesalonicenses 2:1-3",
      "Romanos 8:29",
      "Romanos 12:1-2",
      "Hebreos 2:11",
    ],
  },
  {
    title: "Discípulos de Jesús",
    content:
      "Un discípulo de Jesús ha creído en la salvación por medio de la obra de Cristo en la cruz, reconoce que Dios habita en su corazón y vive diariamente sometido a su voluntad.",
    refs: [
      "Juan 1:12",
      "Juan 14:17",
      "Juan 14:23",
      "Juan 15:4",
      "Romanos 8:11",
      "Apocalipsis 3:20",
    ],
  },
  {
    title: "Bautismo en el Espíritu Santo",
    content:
      "Es la promesa de Dios dada en Pentecostés. Todos los hijos de Dios son morada del Espíritu Santo, quien es recibido por fe y actúa como defensor y ayudador.",
    refs: [
      "Joel 2:28-29",
      "Mateo 3:11",
      "Marcos 16:17",
      "Hechos 1:5",
      "Hechos 2:1-4",
      "Hechos 2:17",
      "Hechos 2:38-39",
      "Hechos 8:14-17",
      "Hechos 10:38",
      "Hechos 10:44-47",
      "Hechos 11:15-17",
      "Hechos 19:1-6",
    ],
  },
  {
    title: "Dones del Espíritu Santo",
    content:
      "Son manifestaciones sobrenaturales para edificar la iglesia y confirmar el mensaje del evangelio. Deben usarse en armonía con la Biblia.",
    refs: [
      "Hebreos 2:4",
      "Romanos 1:11",
      "Romanos 12:4-8",
      "Efesios 4:16",
      "1 Timoteo 4:14",
      "2 Timoteo 1:6-7",
      "1 Corintios 12",
      "1 Corintios 14",
      "1 Pedro 4:10",
    ],
  },
  {
    title: "Sanidad de los enfermos",
    content:
      "Dios puede sanar toda enfermedad. La iglesia debe orar por los enfermos.",
    refs: [
      "Salmos 103:2-3",
      "Isaías 53:5",
      "Mateo 8:16-17",
      "Marcos 16:17-18",
      "Hechos 8:6-7",
      "Santiago 5:14-16",
      "1 Corintios 12:9",
      "1 Corintios 12:28",
      "Romanos 11:29",
    ],
  },
  {
    title: "Provisión de Dios para nuestras vidas",
    content:
      "Espiritual: Juan 3:3-11; 2 Corintios 5:17-21; Romanos 10:9-10. Mental y emocional: 1 Timoteo 1:7; Filipenses 4:7-8; Romanos 12:2; Isaías 26:3. Física: Isaías 53:4-5; Mateo 8:17; 1 Pedro 2:24. Financiera: Josué 1:8; Malaquías 3:10-11; Lucas 6:38; 2 Corintios 9:6-10; Deuteronomio 28:1-14; Salmos 34:10; Salmos 84:11; Filipenses 4:19.",
    refs: [
      "Juan 3:3-11",
      "2 Corintios 5:17-21",
      "Romanos 10:9-10",
      "1 Timoteo 1:7",
      "Filipenses 4:7-8",
      "Romanos 12:2",
      "Isaías 26:3",
      "Isaías 53:4-5",
      "Mateo 8:17",
      "1 Pedro 2:24",
      "Josué 1:8",
      "Malaquías 3:10-11",
      "Lucas 6:38",
      "2 Corintios 9:6-10",
      "Deuteronomio 28:1-14",
      "Salmos 34:10",
      "Salmos 84:11",
      "Filipenses 4:19",
    ],
  },
  {
    title: "Cuerpo de Cristo (La Iglesia)",
    content:
      "La Iglesia es el Cuerpo de Cristo y morada del Espíritu Santo, compuesta por todos los que han recibido a Jesús como Salvador. Es la herramienta para cumplir la Gran Comisión.",
    refs: [
      "Efesios 1:22",
      "Efesios 2:19-22",
      "Hebreos 12:23",
      "Juan 17:11",
      "Juan 17:20-23",
      "Romanos 10:9-10",
      "Juan 1:11-12",
    ],
  },
  {
    title: "Autonomía de la iglesia local",
    content:
      "Cada iglesia local debe tener un gobierno propio, con liderazgo organizado y sujeto a autoridad reconocida.",
    refs: [
      "Hechos 14:19-23",
      "Efesios 4:11-12",
      "Colosenses 1:18",
    ],
  },
  {
    title: "Sacramentos: Bautismo en agua",
    content:
      "Símbolo del lavamiento de pecados, en obediencia a la orden de Jesús.",
    refs: [
      "Mateo 28:19",
      "Hechos 2:38",
      "Hechos 8:12",
      "Hechos 8:36-38",
      "Hechos 10:47-48",
      "Marcos 16:16",
    ],
  },
  {
    title: "Sacramentos: Santa Cena",
    content:
      "Recordatorio del sacrificio de Jesús, se celebra periódicamente hasta su regreso.",
    refs: [
      "Mateo 26:26-29",
      "1 Corintios 10:16",
      "1 Corintios 11:23-25",
    ],
  },
  {
    title: "El valor de la vida humana",
    content:
      "Toda vida humana es valiosa desde la concepción hasta la muerte.",
    refs: [
      "Génesis 1:27",
      "Salmos 139:13-14",
    ],
  },
  {
    title: "Matrimonio",
    content:
      "Pacto sagrado entre un hombre y una mujer, instituido por Dios.",
    refs: [
      "Mateo 19:4-6",
    ],
  },
  {
    title: "Ofrendas y diezmos",
    content:
      "Es deber del creyente contribuir con su presencia, servicio y generosidad.",
    refs: [
      "Hechos 10:25",
      "2 Corintios 8:8",
      "1 Pedro 4:10",
      "Génesis 14:20",
      "Malaquías 3:8-12",
    ],
  },
  {
    title: "Evangelismo y misiones",
    content:
      "La iglesia debe cumplir la Gran Comisión.",
    refs: [
      "Hechos 1:8",
      "Marcos 16:15-18",
    ],
  },
  {
    title: "Resurrección",
    content:
      "Jesús resucitó físicamente y todos serán resucitados, unos para vida eterna y otros para condenación.",
    refs: [
      "Lucas 24:16",
      "Lucas 24:36",
      "Lucas 24:39",
      "Juan 2:19-21",
      "Juan 20:26-28",
      "Juan 21:4",
      "Hechos 24:15",
      "1 Corintios 15:42",
      "1 Corintios 15:44",
      "Filipenses 1:21-23",
      "Filipenses 3:21",
    ],
  },
  {
    title: "Cielo",
    content:
      "Morada eterna de los creyentes.",
    refs: [
      "Mateo 5:3",
      "Mateo 5:12",
      "Mateo 5:20",
      "Mateo 6:20",
      "Mateo 19:21",
      "Mateo 25:34",
      "Juan 17:24",
      "2 Corintios 5:1",
      "Hebreos 11:16",
      "1 Pedro 1:4",
    ],
  },
  {
    title: "Infierno",
    content:
      "Destino final de quienes rechazan el Evangelio, lugar de juicio eterno.",
    refs: [
      "Mateo 25:41",
      "Marcos 9:43-48",
      "Hebreos 9:27",
      "Apocalipsis 14:9-11",
      "Apocalipsis 20:12-15",
      "Apocalipsis 21:8",
    ],
  },
  {
    title: "Segunda Venida",
    content:
      "Jesucristo volverá visiblemente para establecer su Reino.",
    refs: [
      "Mateo 24:30",
      "Mateo 26:63-64",
      "Hechos 1:9-11",
      "1 Tesalonicenses 4:15-17",
      "2 Tesalonicenses 1:7-8",
      "Apocalipsis 1:7",
    ],
  },
];

const categorias = {
  "Fundamentos de nuestra fe": [
    "La Santa Biblia",
    "Trinidad",
    "Jesucristo",
    "Nacimiento virginal",
    "La sangre de Jesús",
    "Espíritu Santo",
  ],
  "El plan de salvación": [
    "Redención",
    "Regeneración",
    "Arrepentimiento",
    "Salvación",
  ],
  "Una nueva vida en Cristo": [
    "Santificación",
    "Discípulos de Jesús",
    "Bautismo en el Espíritu Santo",
    "Dones del Espíritu Santo",
    "Sanidad de los enfermos",
    "Provisión de Dios para nuestras vidas",
  ],
  "La comunidad del Reino": [
    "Cuerpo de Cristo (La Iglesia)",
    "Autonomía de la iglesia local",
    "Sacramentos: Bautismo en agua",
    "Sacramentos: Santa Cena",
    "El valor de la vida humana",
    "Matrimonio",
    "Ofrendas y diezmos",
    "Evangelismo y misiones",
  ],
  "Nuestra esperanza eterna": [
    "Resurrección",
    "Cielo",
    "Infierno",
    "Segunda Venida",
  ],
};

const SECTIONS = Object.entries(categorias).map(([categoria, titulos]) => ({
  categoria,
  declaraciones: titulos.map(
    (titulo) => declaraciones.find((d) => d.title === titulo)!
  ),
}));

const HeroDeclaracionDeFe = () => {
  return (
    <div className="bg-gray-50 text-black dark:bg-black dark:text-white py-20 px-4 md:px-8" style={{ zoom: '150%' }}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4">
            Declaración de Fe
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            En MásVida creemos firmemente que cada persona es amada por Dios y
            llamada a vivir una vida plena en Él. Nuestro fundamento es la
            Palabra de Dios, la Biblia, que reconocemos como la única autoridad
            suprema e inspirada para nuestras vidas.
          </p>
          <Button asChild variant="outline" className="rounded-full bg-transparent border-black text-black hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black">
            <Link href="#💖">
              Conoce más <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="md:w-1/2 flex justify-center items-center">
          {/* Placeholder for the circular text animation */}
          <div className="w-48 h-48 rounded-full border-2 border-gray-400 dark:border-gray-500 flex items-center justify-center">
            <p className="text-gray-500 dark:text-gray-400">creemos</p>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center items-center space-x-4 overflow-hidden">
        <CarrouselLetrasFE />
      </div>
    </div>
  );
};

const DeclaracionDeFePage = () => {
  return (
    <div className="bg-white dark:bg-[#141414]">
      <HeroDeclaracionDeFe />
      <div id="💖" className="p-4 md:p-8">
        <h2 className="text-3xl font-bold text-center mb-8 dark:text-white">
          <br />
        </h2>
        <div className="w-full max-w-4xl mx-auto">
          {SECTIONS.map(({ categoria, declaraciones }) => (
            <div key={categoria} className="mb-12">
              <h3 className="text-3xl font-bold text-center mb-8 dark:text-white">
                {categoria}
              </h3>
              <Accordion
                type="single"
                collapsible
                className="space-y-4"
                defaultValue={declaraciones[0]?.title}
              >
                {declaraciones.map(
                  (item) =>
                    item && (
                      <AccordionItem
                        key={item.title}
                        value={item.title}
                        className="bg-gray-100 dark:bg-[#2c2c2c] rounded-lg border-none"
                      >
                        <AccordionTrigger className="text-xl text-left font-semibold px-6 py-4 dark:text-gray-200 hover:no-underline">
                          {item.title}
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <div className="space-y-4">
                            <p className="text-gray-700 dark:text-gray-300 mb-3">
                              {item.content}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.refs.map((ref) => (
                                <Button
                                  key={ref}
                                  variant="link"
                                  className="p-0 h-auto text-blue-600 dark:text-blue-400 hover:underline"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    openPiP(bibleUrl(ref));
                                  }}
                                >
                                  {ref}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    )
                )}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeclaracionDeFePage;