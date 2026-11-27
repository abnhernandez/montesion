'use client';

import { useEffect, useState } from 'react';

export default function Home() {
	const [allowed, setAllowed] = useState(false);
	const [checked, setChecked] = useState(false);

	useEffect(() => {
		const checkDevice = () => {
			const mobileTouchDevice =
				window.matchMedia('(max-width: 767px) and (pointer: coarse)').matches &&
				navigator.maxTouchPoints > 0;

			setAllowed(mobileTouchDevice);
			setChecked(true);
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);
		return () => window.removeEventListener('resize', checkDevice);
	}, []);

	useEffect(() => {
		if (allowed) window.location.replace('/permanece/registro');
	}, [allowed]);

	if (!checked || allowed) return null;

	return (
		<main
		>
			<section aria-live="polite">
				<h1>Acceso no disponible</h1>
				<p>Esta experiencia está disponible únicamente en dispositivos móviles.</p>
			</section>
		</main>
	);
}
