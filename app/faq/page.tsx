'use client';

import { useState } from "react";
import Link from "next/link";

const faqs = [
	{
		question: "¿Cómo son las reuniones?",
		answer: (
			<>
				Cada domingo en{" "}
				<span className="font-bold">Monte Sion</span> encontrarás un ambiente
				relajado y cálido, con música contemporánea y un mensaje relevante y
				práctico de la Biblia.
				<br />
				<span className="block mt-2">
					Los niños son atendidos con excelencia y seguridad por el{" "}
					<span className="font-bold">ministerio de niños de Monte Sion</span>.
					Nuestras reuniones duran aproximadamente una hora y media.
				</span>
			</>
		),
	},
	{
		question: "¿Qué sucede cuando visito por primera vez?",
		answer: (
			<>
				No te vamos a señalar, pedir que te pongas de pie ni que des dinero.
				Sabemos que mucha gente quiere conocer las reuniones y mantener anonimato
				durante algún tiempo, y no tenemos problema con eso.{" "}
				<span className="font-bold">
					¡Acompáñanos, nos encantaría conocerte!
				</span>
			</>
		),
	},
	{
		question: "¿Cómo debo vestirme?",
		answer: (
			<>
				Encontrarás de todo, desde ropa casual hasta más formal.{" "}
				<span className="font-bold">Ven como tú te sientas cómodo</span>,
				porque en Monte Sion no se trata de cómo te ves o cómo te vistes. Ven tal
				y como eres.
			</>
		),
	},
	{
		question: "¿Cuándo y en dónde se reúnen?",
		answer: (
			<>
				<div className="mb-2">
					<span className="font-bold">Dirección:</span> Nuestras instalaciones
					están en{" "}
					<span className="font-bold">
						Cuicatlán número 184, Colonia Niños Héroes, Santa María Atzompa,
						código postal 71222, Oaxaca de Juárez, Oaxaca
					</span>
					.
				</div>
				<ul className="list-disc ml-6 mb-2">
					<li>
						<span className="font-bold text-primary">
							Primer domingo de cada mes:
						</span>{" "}
						10:30 am
					</li>
					<li>
						<span className="font-bold text-primary">
							Demás domingos del mes:
						</span>{" "}
						2:30 pm
					</li>
				</ul>
				<div>
					<span className="font-bold">Repeticiones:</span> Las repeticiones de
					los servicios están disponibles en nuestro canal de{" "}
					<a
						href="https://www.youtube.com/@montesionoaxacatv"
						className="text-primary underline"
						target="_blank"
						rel="noopener noreferrer"
					>
						YouTube
					</a>{" "}
					días hábiles después de cada reunión.
				</div>
			</>
		),
	},
	{
		question: "¿Hay reuniones entre semana?",
		answer: (
			<ul className="list-disc ml-6">
				<li>
					<span className="font-bold">Jueves:</span> Estudio y oración de
					mujeres, <span className="text-primary">6:00–8:00 PM</span>
				</li>
				<li>
					<span className="font-bold">Viernes:</span> Estudio bíblico y reunión
					general, <span className="text-primary">6:00–8:00 PM</span>
				</li>
			</ul>
		),
	},
	{
		question: "¿Qué pasará con mis hijos?",
		answer: (
			<>
				El{" "}
				<span className="font-bold">ministerio de niños de Monte Sion</span>{" "}
				provee un ambiente seguro, limpio y divertido donde los niños
				experimentan el amor de Jesús en reuniones diseñadas para ellos.
				<br />
				<span className="block mt-2">
					Las reuniones para niños se realizan al mismo tiempo que las generales y
					están dirigidas a niños desde el segundo año de preescolar hasta el
					quinto año de primaria.
				</span>
				<br />
				<span className="block mt-2">
					La seguridad es muy importante para nosotros, por eso tenemos un sistema
					seguro de registro (check-in) de niños. ¡Nos encantaría que tus hijos
					nos acompañaran! Si prefieres, también pueden permanecer contigo en las
					reuniones generales (solo pedimos que las distracciones se mantengan a
					un mínimo).
				</span>
			</>
		),
	},
	{
		question: "¿Cómo puedo contactar con Monte Sion Oaxaca?",
		answer: (
			<>
				Puedes ponerte en contacto con nosotros por WhatsApp al{" "}
				<a
					href="https://wa.me/525586449993?text=Hola%2C%20quiero%20más%20información%20sobre%20Monte%20Sion%20Oaxaca"
					className="text-primary underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					55 8644 9993
				</a>{" "}
				o desde la sección{" "}
				<Link href="/contact" className="text-primary underline">
					Contacto
				</Link>
				.
			</>
		),
	},
];

export default function FAQPage() {
	const [open, setOpen] = useState(0);
	return (
		<>
			<main className="max-w-2xl mx-auto py-12 px-4 bg-background text-foreground">
				<h1 className="text-4xl font-semibold mb-10 mt-20 text-center tracking-tight">
					Preguntas Frecuentes
				</h1>
				<section className="w-full flex flex-col gap-4">
					{faqs.map((faq, i) => (
						<div
							key={i}
							className="border-b border-border"
						>
							<button
								className={`w-full text-left py-6 px-2 md:px-6 focus:outline-none flex items-center justify-between text-lg md:text-xl font-medium transition-colors duration-300 group ${
									open === i
										? "text-primary"
										: "text-gray-700 dark:text-gray-200"
								}`}
								aria-expanded={open === i}
								aria-controls={`faq-panel-${i}`}
								onClick={() => setOpen(open === i ? -1 : i)}
							>
								<span>{faq.question}</span>
								<span
									className={`ml-4 transform transition-transform duration-300 ${
										open === i ? "rotate-90 text-primary" : "rotate-0"
									}`}
								>
									▶
								</span>
							</button>
							<div
								id={`faq-panel-${i}`}
								className={`overflow-hidden transition-all duration-500 ease-in-out ${
									open === i
										? "max-h-[500px] opacity-100 py-2"
										: "max-h-0 opacity-0 py-0"
								}`}
								aria-hidden={open !== i}
							>
								<div className="text-base md:text-lg leading-relaxed px-2 md:px-6 pb-6 text-gray-700 dark:text-gray-200">
									{faq.answer}
								</div>
							</div>
						</div>
					))}
				</section>
			</main>
		</>
	);
}
