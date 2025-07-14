'use client'

import { UserPlus, Droplet, BookOpen, Users, Star, HeartHandshake, Crown } from "lucide-react";
import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

const steps = [
	{
		icon: <UserPlus size={32} className="text-primary" />,
		emoji: "🌱",
		title: "Primer Paso",
		desc: "Descubre la fe y da tus primeros pasos en comunidad.",
	},
	{
		icon: <Droplet size={32} className="text-sky-600" />,
		emoji: "💧",
		title: "Bautismo",
		desc: "Haz pública tu fe y celebra una nueva vida.",
	},
	{
		icon: <BookOpen size={32} className="text-yellow-600" />,
		emoji: "📖",
		title: "Fundamentos",
		desc: "Aprende, ora y crece en la Palabra y la oración.",
	},
	{
		icon: <Users size={32} className="text-emerald-600" />,
		emoji: "🤝",
		title: "Comunidad",
		desc: "Conéctate, comparte y crece junto a otros.",
	},
	{
		icon: <Star size={32} className="text-indigo-600" />,
		emoji: "✨",
		title: "Propósito",
		desc: "Descubre tus dones y tu llamado único.",
	},
	{
		icon: <HeartHandshake size={32} className="text-pink-600" />,
		emoji: "👐",
		title: "Servicio",
		desc: "Sirve y haz la diferencia en tu entorno.",
	},
	{
		icon: <Crown size={32} className="text-orange-600" />,
		emoji: "👑",
		title: "Multiplicación",
		desc: "Lidera, inspira y ayuda a otros a crecer.",
	},
];




export function CaminoDeCrecimiento() {
  const [activeStep, setActiveStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const dragStartX = useRef<number | null>(null);
  const dragEndX = useRef<number | null>(null);
  const isDragging = useRef(false);

  // Touch events (mobile)
  const handleTouchStart = (e: React.TouchEvent) => {
	dragStartX.current = e.touches[0].clientX;
	isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
	if (isDragging.current) {
	  dragEndX.current = e.touches[0].clientX;
	}
  };

  const handleTouchEnd = () => {
	if (isDragging.current && dragStartX.current !== null && dragEndX.current !== null) {
	  const diff = dragStartX.current - dragEndX.current;
	  if (Math.abs(diff) > 50) {
		if (diff > 0) {
		  // Siguiente (loop)
		  setDirection(1);
		  setActiveStep((prev) => (prev + 1) % steps.length);
		} else if (diff < 0) {
		  // Anterior (loop)
		  setDirection(-1);
		  setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
		}
	  }
	}
	dragStartX.current = null;
	dragEndX.current = null;
	isDragging.current = false;
  };

  // Mouse events (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
	dragStartX.current = e.clientX;
	isDragging.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
	if (isDragging.current) {
	  dragEndX.current = e.clientX;
	}
  };

  const handleMouseUp = () => {
	if (isDragging.current && dragStartX.current !== null && dragEndX.current !== null) {
	  const diff = dragStartX.current - dragEndX.current;
	  if (Math.abs(diff) > 50) {
		if (diff > 0) {
		  setDirection(1);
		  setActiveStep((prev) => (prev + 1) % steps.length);
		} else if (diff < 0) {
		  setDirection(-1);
		  setActiveStep((prev) => (prev - 1 + steps.length) % steps.length);
		}
	  }
	}
	dragStartX.current = null;
	dragEndX.current = null;
	isDragging.current = false;
  };

  return (
	<section className="w-full max-w-3xl mx-auto px-4 py-16 flex flex-col items-center min-h-[60vh]">
	  <div className="w-full flex flex-col items-center">
		<div className="flex items-center justify-center w-full relative">
		  <div
			className="w-full flex justify-center select-none"
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			onMouseDown={handleMouseDown}
			onMouseMove={handleMouseMove}
			onMouseUp={handleMouseUp}
			onMouseLeave={handleMouseUp}
			style={{ cursor: 'grab' }}
		  >
			<AnimatePresence mode="wait" initial={false}>
			  <motion.div
				key={activeStep}
				initial={{ opacity: 0, x: direction === 1 ? 80 : -80 }}
				animate={{ opacity: 1, x: 0 }}
				exit={{ opacity: 0, x: direction === 1 ? -80 : 80 }}
				transition={{ duration: 0.4, type: "spring" }}
				className="w-full max-w-md flex flex-col items-center rounded-2xl shadow-xl px-8 py-8 mx-8"
			  >
				<span className="w-14 h-14 flex items-center justify-center rounded-full text-3xl shadow-lg mb-4 animate-bounce-slow">
				  {steps[activeStep].emoji}
				</span>
				<span className="mb-2 scale-110 drop-shadow-md">{steps[activeStep].icon}</span>
				<h3 className="text-2xl font-bold text-center mb-2">
				  {steps[activeStep].title}
				</h3>
				<p className="text-center mb-2 leading-snug font-medium">
				  {steps[activeStep].desc}
				</p>
			  </motion.div>
			</AnimatePresence>
		  </div>
		</div>
		{/* Animación y texto para invitar a deslizar */}
		<div className="flex flex-col items-center mt-8">
		  <motion.div
			initial={{ x: 0 }}
			animate={{ x: [0, 24, -24, 0] }}
			transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
			className="text-3xl mb-2 select-none"
			aria-hidden="true"
		  >
		  </motion.div>
		  <span className="text-sm text-foreground/60 animate-pulse">Desliza para ver más pasos</span>
		</div>
	  </div>
	</section>
  );
}