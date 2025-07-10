"use client";

import React from "react";
import BlurText from "../components/ui/BlurText";
import SpotlightCard from "../components/ui/SpotlightCard";
import Maps from "../components/ui/maps";
import Acercade from "../components/ui/acercade";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HeroSection from "../components/ui/hero";
import { ChevronRight } from "lucide-react";
import { discipleshipIcons } from "../components/ui/discipleshipIcons";

// Utilidad para convertir referencia bíblica a URL de bible.com
function bibleUrl(ref: string) {
	const bookMap: Record<string, string> = {
		Génesis: "GEN",
		Éxodo: "EXO",
		Levítico: "LEV",
		Números: "NUM",
		Deuteronomio: "DEU",
		Josué: "JOS",
		Jueces: "JDG",
		Rut: "RUT",
		"1 Samuel": "1SA",
		"2 Samuel": "2SA",
		"1 Reyes": "1KI",
		"2 Reyes": "2KI",
		"1 Crónicas": "1CH",
		"2 Crónicas": "2CH",
		Esdras: "EZR",
		Nehemías: "NEH",
		Ester: "EST",
		Job: "JOB",
		Salmos: "PSA",
		Proverbios: "PRO",
		Eclesiastés: "ECC",
		Cantares: "SNG",
		Isaías: "ISA",
		Jeremías: "JER",
		Lamentaciones: "LAM",
		Ezequiel: "EZK",
		Daniel: "DAN",
		Oseas: "HOS",
		Joel: "JOL",
		Amós: "AMO",
		Abdías: "OBA",
		Jonás: "JON",
		Miqueas: "MIC",
		Nahúm: "NAM",
		Habacuc: "HAB",
		Sofonías: "ZEP",
		Hageo: "HAG",
		Zacarías: "ZEC",
		Malaquías: "MAL",
		Mateo: "MAT",
		Marcos: "MRK",
		Lucas: "LUK",
		Juan: "JHN",
		Hechos: "ACT",
		Romanos: "ROM",
		"1 Corintios": "1CO",
		"2 Corintios": "2CO",
		Gálatas: "GAL",
		Efesios: "EPH",
		Filipenses: "PHP",
		Colosenses: "COL",
		"1 Tesalonicenses": "1TH",
		"2 Tesalonicenses": "2TH",
		"1 Timoteo": "1TI",
		"2 Timoteo": "2TI",
		Tito: "TIT",
		Filemón: "PHM",
		Hebreos: "HEB",
		Santiago: "JAS",
		"1 Pedro": "1PE",
		"2 Pedro": "2PE",
		"1 Juan": "1JN",
		"2 Juan": "2JN",
		"3 Juan": "3JN",
		Judas: "JUD",
		Apocalipsis: "REV",
	};
	const match = ref.match(/([1-3]?\s?[A-Za-zÁÉÍÓÚáéíóúñüÑ]+)\s(\d+)(?::(\d+))?/);
	if (!match) return "#";
	const book = match[1].replace(/\s+/g, " ").trim();
	const chapter = match[2];
	const verse = match[3];
	const code = bookMap[book] || "";
	if (!code) return "#";
	return `https://www.bible.com/es/bible/149/${code}.${chapter}${
		verse ? "." + verse : ""
	}.RVR60`;
}

const discipleshipSteps = [
	{
		step: "Paso 1",
		title: "Nuevos Creyentes",
		description: "Primeros pasos en la fe cristiana.",
		details:
			"Aprende sobre la salvación, el arrepentimiento y la vida cristiana.",
		verse: "Proverbios 9:10 ",
		verseText:
			"El comienzo de la sabiduría es el temor del SEÑOR; conocer al Santo es tener entendimiento."
		verses: [
			"2 Corintios 5:17",
			"Juan 3:3",
			"Romanos 10:9",
			"Efesios 2:8",
		],
	},
	{
		step: "Paso 2",
		title: "Bautismo en Agua",
		description: "Un compromiso público con Cristo.",
		details:
			"De modo que si alguno está en Cristo, nueva criatura es; las cosas viejas pasaron; he aquí todas son hechas nuevas.",
			"El bautismo simboliza tu decisión de seguir a Jesús y representa una nueva vida en Él.",
		verse: "2 Corintios 5:17, Romanos 6:4",
		verseText:
			"Porque somos sepultados juntamente con él para muerte por el bautismo, a fin de que como Cristo resucitó de los muertos por la gloria del Padre, así también nosotros andemos en vida nueva.",
		verses: [
			"Romanos 6:4",
			"Hechos 2:38",
			"Mateo 28:19",
			"Gálatas 3:27",
		],
	},
	{
		step: "Paso 3",
		title: "Fundamentos de la Fe",
		description: "Crece en tu relación con el Creador, JESÚS 💕",
		details:
			"Oración, Biblia y comunión con Dios.",
		verse: "Hebreos 6:1",
		verseText:
			"Por tanto, dejando ya los rudimentos de la doctrina de Cristo, vamos adelante a la perfección...",
		verses: [
			"Hebreos 6:1",
			"2 Timoteo 3:16",
			"Colosenses 2:6",
			"Santiago 1:22",
		],
	},
	{
		step: "Paso 4",
		title: "Vida en Comunidad",
		description: "Conéctate con otros creyentes.",
		details:
			"Participa en grupos de discipulado y actividades donde crecerás en la fe junto a otros.",
		verse: "Hechos 2:44",
		verseText:
			"Todos los que habían creído estaban juntos, y tenían en común todas las cosas.",
		verses: [
			"Hechos 2:44",
			"Salmos 133:1",
			"Hebreos 10:24",
			"Gálatas 6:2",
		],
	},
	{
		step: "Paso 5",
		title: "Descubriendo tu Propósito",
		description: "Identifica tus dones y talentos.",
		details:
			"Aprende cómo Dios te ha equipado con habilidades únicas para servir en Su reino.",
		verse: "Efesios 2:10",
		verseText:
			"Porque somos hechura suya, creados en Cristo Jesús para buenas obras, las cuales Dios preparó de antemano para que anduviésemos en ellas.",
		verses: [
			"Efesios 2:10",
			"Romanos 12:6",
			"1 Corintios 12:7",
			"1 Pedro 4:10",
		],
	},
	{
		step: "Paso 6",
		title: "Servicio y Ministerio",
		description: "Comienza a servir en la iglesia.",
		details:
			"Forma parte de un ministerio y usa tus dones para bendecir a otros en la iglesia y la comunidad.",
		verse: "1 Pedro 4:10",
		verseText:
			"Cada uno según el don que ha recibido, minístrelo a los otros, como buenos administradores de la multiforme gracia de Dios.",
		verses: [
			"1 Pedro 4:10",
			"Mateo 20:28",
			"Gálatas 5:13",
			"Romanos 12:11",
		],
	},
	{
		step: "Paso 7",
		title: "Liderazgo y Multiplicación",
		description: "Guía a otros en su crecimiento espiritual.",
		details:
			"Forma nuevos discípulos, lidera grupos y ayuda a expandir el Reino de Dios.",
		verse: "Mateo 28:19",
		verseText:
			"Por tanto, id, y haced discípulos a todas las naciones, bautizándolos en el nombre del Padre, y del Hijo, y del Espíritu Santo.",
		verses: [
			"Mateo 28:19",
			"2 Timoteo 2:2",
			"Hechos 1:8",
			"Proverbios 11:14",
		],
	},
];

export default function Page() {
	const [activeStep, setActiveStep] = useState(0);
	const [isScrolling, setIsScrolling] = useState(false);
	const [bibleModal, setBibleModal] = useState<{ref: string, url: string} | null>(null);
	const timelineRef = useRef<HTMLDivElement>(null);
	// Estado para doble click en el botón de reinicio
	const [, setResetClicks] = React.useState(0);
	React.useEffect(() => { if (activeStep !== discipleshipSteps.length - 1) setResetClicks(0); }, [activeStep]);

	function handleMobileNext(e?: React.MouseEvent) {
		if (window.innerWidth >= 768) return;
		if (isScrolling) return;
		if (e) e.stopPropagation();
		setIsScrolling(true);
		setActiveStep((prev) =>
			prev + 1 > discipleshipSteps.length - 1 ? 0 : prev + 1
		);
		setTimeout(() => setIsScrolling(false), 500);
	}

	const isLastStep = activeStep === discipleshipSteps.length - 1;

	// Handler para doble click/tap
	function handleReset() {
		setResetClicks(c => {
			if (c + 1 >= 2) {
				setActiveStep(0);
				return 0;
			}
			return c + 1;
		});
	}

	return (
		<div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
			<main className="flex-1 flex flex-col items-center justify-center relative overflow-x-hidden">
				<HeroSection />

				<section className="w-full max-w-5xl mx-auto px-4 py-10 flex flex-col items-center justify-center">
					<BlurText
						text="¿Por qué unirte a la iglesia?"
						className="text-2xl md:text-3xl font-bold text-center mb-6"
						animateBy="words"
						direction="top"
					/>
					<motion.div
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, type: "spring" }}
						viewport={{ once: true }}
						className="w-full flex justify-center items-center"
					>
						<section
							className="w-full max-w-7xl mx-auto px-2 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-0 items-stretch relative overflow-visible select-none"
							style={{ userSelect: 'none', pointerEvents: 'auto' }}
							onContextMenu={e => { if (window.innerWidth < 768) e.preventDefault(); }}
						>
							{[
								{
									icon: "👥",
									text: "Comunidad Cristiana",
									desc: "Unidos en Cristo para crecer juntos, compartir y apoyarnos mutuamente."
								},
								{
									icon: "🔍",
									text: "Estudio Bíblico",
									desc: "Oportunidades para que puedas profundizar en el conocimiento de las Escrituras y fortalecer tu fe."
								},
								{
									icon: "📖",
									text: "Mensajes",
									desc: "Enseñanzas basadas en la Palabra de Dios para tu vida diaria."
								},
								{
									icon: "🤝",
									text: "Grupos",
									desc: "Grupos pequeños donde puedes compartir, orar y crecer en tu fe junto a otros hermanos."
								},
								{
									icon: "🌍",
									text: "Misiones",
									desc: "Llevamos el amor de Cristo a quienes más lo necesitan, dentro y fuera de nuestra comunidad."
								}
							].map((card, idx, arr) => (
								<div
									key={card.text}
									className={`relative flex items-stretch group/card transition-all duration-300
										${idx !== 0 ? 'md:-ml-8' : ''}
										w-full
									`}
									style={{ pointerEvents: 'auto' }}
								>
									<SpotlightCard
										className={`p-0 bg-background rounded-2xl transition-all duration-300 min-w-[260px] max-w-full h-full flex group/card
											md:hover:z-[9999] md:hover:scale-125 md:hover:shadow-2xl md:hover:ring-4 md:hover:ring-primary/30 md:hover:!bg-background/90
											md:group-hover/card:z-10 md:group-hover/card:opacity-40 md:group-hover/card:scale-95 md:group-hover/card:brightness-75
											md:group-hover/card:hover:z-[9999] md:group-hover/card:hover:opacity-100 md:group-hover/card:hover:scale-125 md:group-hover/card:hover:brightness-100
											${idx !== 0 ? ' md:-ml-8 md:group-hover/card:hover:ml-0' : ''}
											${card.text === 'Comunidad Cristiana' ? ' md:hover:min-w-[300px] md:md:hover:min-w-[320px]' : ''}
										`}
									>
										<button
											type="button"
											className="flex flex-col items-center gap-3 w-full h-full p-5 focus:outline-none cursor-default bg-transparent min-h-[180px] rounded-2xl select-none"
											onClick={undefined}
											tabIndex={0}
											role="button"
											aria-label={`Ir a declaración de fe: ${card.text}`}
											style={{ userSelect: 'none' }}
										>
											<span className="text-4xl mb-1">{card.icon}</span>
											<BlurText
												text={card.text}
												className={`text-xl font-bold text-primary mb-1 text-center ${card.text === 'Comunidad Cristiana' ? 'truncate whitespace-nowrap' : ''}`}
												animateBy="letters"
											/>
											<p className="text-sm text-muted-foreground text-center flex-1 flex items-center justify-center">
												{card.desc}
											</p>
										</button>
										{/* Flecha señalando la siguiente card SOLO en desktop */}
										{idx < arr.length - 1 && (
											<span className="hidden lg:block absolute right-[-18px] top-1/2 -translate-y-1/2 z-50 text-primary/60 group-hover/card:text-primary animate-pulse">
												<svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
											</span>
										)}
									</SpotlightCard>
								</div>
							))}
						</section>
					</motion.div>
				</section>

				<section className="w-full max-w-5xl mx-auto px-4 py-10">
					<Acercade />
				</section>

				<section
					className="w-full max-w-4xl mx-auto px-2 py-14 flex flex-col items-center"
					id="servicios"
					ref={timelineRef}
					style={{
						touchAction: "manipulation",
						WebkitUserSelect: "none",
						userSelect: "none",
					}}
				>
					<BlurText
						text="Tu Camino de Crecimiento"
						className="text-3xl md:text-4xl font-bold text-center mb-8"
						animateBy="words"
						direction="top"
					/>
					<div className="w-full flex flex-col items-center">
						<AnimatePresence mode="wait">
							<motion.div
								key={activeStep}
								initial={{ opacity: 0, y: 60, scale: 0.98 }}
								animate={{ opacity: 1, y: 0, scale: 1 }}
								exit={{ opacity: 0, y: -60, scale: 0.98 }}
								transition={{ duration: 0.5, type: "spring" }}
								className="relative w-full min-h-[260px] flex flex-col md:flex-row items-center justify-between rounded-3xl md:rounded-4xl p-8 md:p-12 mb-8 overflow-hidden bg-transparent"
								style={{ boxShadow: 'none', border: 'none', margin: '0 0.5rem', background: 'none' }}
							>
								<div className="flex flex-col items-center md:items-start text-center md:text-left z-10 w-full md:w-auto">
									<div className="flex items-center gap-4 mb-2">
										<span className="flex items-center justify-center w-16 h-16 rounded-2xl shadow-lg border-4 border-background bg-background/80 text-primary-foreground transition-all duration-500">
											{discipleshipIcons[activeStep] && (
												React.createElement(
													discipleshipIcons[activeStep],
													{
														size: 36,
														strokeWidth: 2,
														className: "drop-shadow",
													}
												)
											)}
										</span>
										<div>
											<div className="text-xs uppercase text-muted-foreground tracking-widest">
												{discipleshipSteps[activeStep]?.step}
											</div>
											<div className="text-2xl font-semibold">
												{discipleshipSteps[activeStep]?.title}
											</div>
										</div>
									</div>
									<p className="text-lg text-muted-foreground mb-2">
										{discipleshipSteps[activeStep]?.description}
									</p>
									<motion.div
										initial={{ opacity: 0, scale: 0.97 }}
										animate={{ opacity: 1, scale: 1 }}
										transition={{ delay: 0.2, duration: 0.4 }}
										className="text-base text-foreground rounded-lg mt-2 animate-fade-in-up text-justify"
									>
										{discipleshipSteps[activeStep]?.details}
										{discipleshipSteps[activeStep]?.verses && (
											<div className="mt-4 flex flex-col items-start gap-1">
												<span className="text-sm font-semibold mb-1" style={{ color: '#831111' }}>Referencias:</span>
												<div className="flex flex-wrap items-center gap-1 flex-row">
													{discipleshipSteps[activeStep].verses.map((ref, idx, arr) => (
														<React.Fragment key={ref}>
															<button
																className="underline underline-offset-2 font-medium transition text-left px-1 py-0.5 rounded focus:outline-none focus:ring-2 focus:ring-primary/40 text-black dark:text-white"
																style={{ color: undefined }}
																onClick={() => setBibleModal({ref, url: bibleUrl(ref)})}
																type="button"
															>
																{ref}
															</button>
															{idx < arr.length - 1 ? <span className="text-black dark:text-white">,&nbsp;</span> : <span className="text-black dark:text-white">.</span>}
														</React.Fragment>
													))}
												</div>
											</div>
										)}
									</motion.div>
								</div>
								<div className="hidden md:block absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-primary/10 to-transparent rounded-r-3xl pointer-events-none" />
								<div className="absolute left-0 top-0 bottom-0 w-1/6 bg-gradient-to-r from-primary/10 to-transparent rounded-l-3xl pointer-events-none" />
								{/* Botón avanzar/reiniciar */}
								{(() => {
									const buttonBase =
										"absolute bottom-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition";
									const buttonMobile = "md:hidden";
									const buttonDesktop = "hidden md:flex";
									return (
										<>
											{/* Mobile */}
											{!isLastStep ? (
												<button
													type="button"
													className={`${buttonBase} ${buttonMobile} bg-background border border-border text-foreground hover:bg-primary hover:text-primary-foreground`}
													onClick={handleMobileNext}
													aria-label="Siguiente paso"
												>
													<ChevronRight />
												</button>
											) : (
												<button
													type="button"
													className={`${buttonBase} ${buttonMobile}`}
													style={{ background: '#065f46', color: '#fff', border: 'none' }}
													onClick={handleReset}
													aria-label="Reiniciar pasos"
												>
													<svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
													</svg>
												</button>
											)}
										{/* Desktop */}
											{!isLastStep ? (
												<button
													type="button"
													className={`${buttonBase} ${buttonDesktop} bg-primary text-primary-foreground border border-primary hover:bg-primary/90`}
													onClick={e => {
														e.stopPropagation();
														setActiveStep(prev => prev < discipleshipSteps.length - 1 ? prev + 1 : 0);
													}}
													aria-label="Siguiente paso"
												>
													<ChevronRight size={28} />
												</button>
											) : (
												<button
													type="button"
													className={`${buttonBase} ${buttonDesktop}`}
													style={{ background: '#065f46', color: '#fff', border: 'none' }}
													onClick={handleReset}
													aria-label="Reiniciar pasos"
												>
													<svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
													</svg>
												</button>
											)}
										</>
									);
								})()}
							</motion.div>
						</AnimatePresence>
						<div className="flex justify-center gap-2 mt-2">
							{discipleshipSteps.map((_, idx) => {
								const isActive = activeStep === idx;
								const isCompleted = idx < activeStep;
								const isLastStep = activeStep === discipleshipSteps.length - 1;
								const green = "#059669"; // Verde fuerte
								const blue = "#2563eb";
								// Si es el último paso, todos verdes fuertes, sin palomita
								const fillColor = isLastStep ? green : isCompleted ? blue : "transparent";
								const borderColor = isLastStep ? green : isActive ? blue : "#d1d5db";
								return (
									<button
										key={idx}
										onClick={() => setActiveStep(idx)}
										className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/60`}
										aria-label={`Ir al paso ${idx + 1}`}
										style={{
											background: fillColor,
											borderColor: borderColor,
											boxShadow: isActive ? `0 0 0 4px rgba(37,99,235,0.15)` : undefined,
											scale: isActive ? 1.1 : 1,
										}}
									>
										<span
											className={`block w-2.5 h-2.5 rounded-full ${fillColor !== "transparent" ? "bg-white/80" : ""}`}
										/>
									</button>
								);
							})}
						</div>
					</div>
				</section>

				<section className="w-full max-w-6xl mx-auto px-2 py-14 grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
					<SpotlightCard className="p-0 bg-background rounded-2xl transition-all duration-300 hover:scale-110 min-w-[260px] md:min-w-[320px] max-w-full h-full flex">
						<button
							type="button"
							className="flex flex-col items-center gap-4 w-full h-full p-8 focus:outline-none cursor-pointer bg-transparent min-h-[220px] rounded-2xl"
							onClick={() => window.location.href = '/declaraciondefe'}
							tabIndex={0}
							role="button"
							aria-label="Ir a declaración de fe"
						>
							<span className="text-5xl mb-2">🙏</span>
							<BlurText
								text="Fe"
								className="text-3xl font-bold text-primary mb-2"
								animateBy="letters"
							/>
							<p className="text-lg text-muted-foreground text-center flex-1 flex items-center justify-center">
								Creemos en el poder de Jesús para levantarte, sanarte y darte salvación. Sabemos que Dios tiene un propósito en tu vida.
							</p>
						</button>
					</SpotlightCard>
					<SpotlightCard className="p-0 bg-background rounded-2xl transition-all duration-300 hover:scale-110 min-w-[260px] md:min-w-[320px] max-w-full h-full flex">
						<button
							type="button"
							className="flex flex-col items-center gap-4 w-full h-full p-8 focus:outline-none cursor-pointer bg-transparent min-h-[220px] rounded-2xl"
							onClick={() => window.location.href = '/declaraciondefe'}
							tabIndex={0}
							role="button"
							aria-label="Ir a declaración de fe"
						>
							<span className="text-5xl mb-2">🤝</span>
							<BlurText
								text="Comunidad"
								className="text-3xl font-bold text-primary mb-2"
								animateBy="letters"
							/>
							<p className="text-lg text-muted-foreground text-center flex-1 flex items-center justify-center">
								Somos una comunidad y familia de familias en la que eres bienvenid@, valorad@ y acompañad@ con amor ❤️ en Jesús 🙌🏻.
							</p>
						</button>
					</SpotlightCard>
					<SpotlightCard className="p-0 bg-background rounded-2xl transition-all duration-300 hover:scale-110 min-w-[260px] md:min-w-[320px] max-w-full h-full flex">
						<button
							type="button"
							className="flex flex-col items-center gap-4 w-full h-full p-8 focus:outline-none cursor-pointer bg-transparent min-h-[220px] rounded-2xl"
							onClick={() => window.location.href = '/declaraciondefe'}
							tabIndex={0}
							role="button"
							aria-label="Ir a declaración de fe"
						>
							<span className="text-5xl mb-2">👐</span>
							<BlurText
								text="Servicio"
							 className="text-3xl font-bold text-primary mb-2"
								animateBy="letters"
							/>
							<p className="text-lg text-muted-foreground text-center flex-1 flex items-center justify-center">
								Servimos a Jesús con todo, porque fuimos llamados a ir, amar y hacer discípulos. Queremos llevar Su esperanza a nuestra ciudad… y hasta lo último de la tierra 🌎.
							</p>
						</button>
					</SpotlightCard>
					<SpotlightCard className="p-0 bg-background rounded-2xl transition-all duration-300 hover:scale-110 min-w-[260px] md:min-w-[320px] max-w-full h-full flex">
						<button
							type="button"
							className="flex flex-col items-center gap-4 w-full h-full p-8 focus:outline-none cursor-pointer bg-transparent min-h-[220px] rounded-2xl"
							onClick={() => window.location.href = '/declaraciondefe'}
							tabIndex={0}
							role="button"
							aria-label="Ir a declaración de fe"
						>
							<span className="text-5xl mb-2">✨</span>
							<BlurText
								text="Salvación"
							 className="text-3xl font-bold text-primary mb-2"
								animateBy="letters"
							/>
							<p className="text-lg text-muted-foreground text-center flex-1 flex items-center justify-center">
								Jesús te ofrece salvación la cuál es un regalo, no por lo que haces, sino por lo que Él hizo. Acéptalo y empieza de nuevo.
							</p>
						</button>
					</SpotlightCard>
				</section>
				<div id="declaraciondefe-scroll" />
				<section className="w-full max-w-6xl mx-auto px-2 py-14 flex flex-col items-center">
				<div className="w-full max-w-2xl mx-auto mb-6">
					<h3 className="text-3xl font-semibold text-center mb-4 text-green-600">
						Jesús te espera con los brazos abiertos… y nosotros también. ¡Visítanos, nos encantaría conocerte! ❤️
					</h3>
    			</div>
					<div className="flex-1 w-full h-[350px] rounded-3xl overflow-hidden shadow-2xl border border-border bg-background">
						<Maps />
					</div>
				</section>
			</main>
			{bibleModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
					<div className="bg-background rounded-2xl shadow-2xl p-4 max-w-2xl w-full relative flex flex-col items-center">
						<button
							className="absolute top-2 right-2 text-xl text-muted-foreground hover:text-primary font-bold px-2 py-1 rounded"
							onClick={() => setBibleModal(null)}
							aria-label="Cerrar versículo"
						>✕</button>
						<div className="w-full h-[400px] rounded-xl overflow-hidden border mt-4">
							{bibleModal.url && (
								<iframe
									src={bibleModal.url}
									title={bibleModal.ref}
									className="w-full h-full border-0"
									allowFullScreen
								/>
							)}
						</div>
						<div className="mt-2 text-sm text-center text-muted-foreground">{bibleModal.ref} en bible.com un proyecto de YouVersion 🙌🏻</div>
					</div>
				</div>
			)}
		</div>
	);
}
