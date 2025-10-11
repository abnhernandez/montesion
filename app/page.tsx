"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth-context";
import BlurText from "../components/ui/BlurText";
import SpotlightCard from "../components/ui/SpotlightCard";
import Acercade from "../components/ui/acercade";
import { motion } from "framer-motion";
import HeroSection from "../components/ui/hero";
import MapsMonteSion from "../components/ui/montesionmaps";

export default function Page() {	
	const router = useRouter();
	const { user } = useAuth() || {};

	useEffect(() => {
		if (user) {
			router.replace("/usuarios/mis_cursos");
		}
	}, [user, router]);
	// Si el usuario está autenticado, no renderizar nada
	if (user) return null;

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
								Somos una comunidad y una familia de familias en la que eres bienvenid@, valorad@ y acompañad@ con amor ❤️ en Jesús 🙌🏻.
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
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="w-full max-w-2xl mx-auto mb-8 text-center"
					>
						<BlurText
							text="Te esperamos en Monte Sion ❤️"
							className="text-3xl md:text-4xl font-bold text-center mb-4"
							animateBy="words"
							direction="top"
						/>
						<p className="text-lg text-muted-foreground">
							Encuentra nuestras ubicaciones y planifica tu visita. 
							Estamos aquí para recibirte con amor y acompañarte en tu crecimiento espiritual.
						</p>
					</motion.div>
                    
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						viewport={{ once: true }}
						className="flex-1 w-full h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-border bg-background"
					>
						<MapsMonteSion />
					</motion.div>
				</section>
			</main>
		</div>
	);
}
