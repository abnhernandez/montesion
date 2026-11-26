'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ageOf } from '../../lib/validation';

declare global {
	interface Window {
		turnstile?: { reset: () => void };
		onCaptcha?: (token: string) => void;
	}
}

export default function Page() {
	const [step, S] = useState(0);
	const [d, D] = useState({
		name: '',
		birth: '',
		civil: '',
		country: '',
		email: '',
		phone: '',
		consent: false,
	});
	const [token, T] = useState('');
	const [error, E] = useState('');
	const [busy, B] = useState(false);
	const [result, R] = useState<{ folio: string; menor: boolean } | null>(null);
	const [blocked, Q] = useState(false);
	const lock = useRef(false);

	useEffect(() => {
		Q(navigator.maxTouchPoints < 1 || !matchMedia('(pointer: coarse)').matches);
		window.onCaptcha = T;

		return () => {
			delete window.onCaptcha;
		};
	}, []);

	const age = ageOf(d.birth);
	const field = (k: keyof typeof d, v: string | boolean) =>
		D((x) => ({ ...x, [k]: v }));

	async function submit(e: React.FormEvent) {
		e.preventDefault();
		E('');

		if (step === 0 && (age < 12 || age > 125 || d.civil !== 'soltero')) {
			E('La convocatoria requiere tener al menos 12 años y ser soltero/a.');
			return;
		}

		if (step === 0 && age < 18) {
			S(3);
			return;
		}

		if (step < 2) {
			S(step + 1);
			return;
		}

		if (lock.current || !token) return;

		lock.current = true;
		B(true);

		try {
			const r = await fetch('/api/registro', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...d, token }),
			});
			const j = await r.json();

			if (!r.ok) throw Error(j.error);
			R(j);
		} catch (e) {
			E(e instanceof Error ? e.message : 'Error de conexión');
			T('');
			window.turnstile?.reset();
		} finally {
			B(false);
			lock.current = false;
		}
	}

	if (blocked) {
		return (
			<main>
				<h2>Continúa desde tu celular</h2>
			</main>
		);
	}

	return (
		<main>
			<small>MONTE SION PRESENTA</small>
			<h1>
				PERMANECE
				<br />
				2027
			</h1>
			<p>De Génesis a Malaquías. Una experiencia de estudio bíblico.</p>
			<section>
				{result ? (
					<>
						<h2>Solicitud recibida</h2>
						<p>Folio: {result.folio}</p>
						<p>
							La organización revisará tu solicitud antes de autorizar la incorporación.
						</p>
					</>
				) : step === 3 ? (
					<>
						<h2>Participación de adolescentes</h2>
						<p>
							Solicita a tu madre, padre o tutor que contacte a Monte Sion para gestionar tu
							participación supervisada. No necesitas proporcionar aquí tus datos de contacto.
						</p>
						<button onClick={() => S(0)}>Volver</button>
					</>
				) : (
					<form onSubmit={submit}>
						<small>PASO {step + 1} DE 3</small>
						<h2>{['Comienza tu camino', 'Mantengamos el contacto', 'Confirma tu solicitud'][step]}</h2>

						{step === 0 ? (
							<>
								<p>Convocatoria para personas solteras desde los 12 años.</p>
								<label>
									Nombre completo
									<input
										required
										minLength={2}
										maxLength={120}
										value={d.name}
										onChange={(e) => field('name', e.target.value)}
									/>
								</label>
								<label>
									Fecha de nacimiento
									<input
										required
										type="date"
										value={d.birth}
										onChange={(e) => field('birth', e.target.value)}
									/>
								</label>
								<label>
									Estado civil
									<select
										required
										value={d.civil}
										onChange={(e) => field('civil', e.target.value)}
									>
										<option value="">Selecciona</option>
										<option value="soltero">Soltero/a</option>
										<option value="otro">Otro</option>
									</select>
								</label>
							</>
						) : step === 1 ? (
							<>
								<label>
									País (código ISO de dos letras)
									<input
										required
										pattern="[A-Z]{2}"
										placeholder="MX"
										value={d.country}
										onChange={(e) => field('country', e.target.value.toUpperCase())}
									/>
								</label>
								<label>
									Correo
									<input
										required
										type="email"
										value={d.email}
										onChange={(e) => field('email', e.target.value)}
									/>
								</label>
								<label>
									Teléfono internacional
									<input
										required
										type="tel"
										placeholder="+52…"
										value={d.phone}
										onChange={(e) => field('phone', e.target.value)}
									/>
								</label>
							</>
						) : (
							<>
								<p>
									{d.name} · {d.email}
								</p>
								<p>
									Tu solicitud será revisada por la organización. Tus datos se usarán para gestionar
									el registro y contacto.
								</p>
								<label>
									<input
										required
										type="checkbox"
										checked={d.consent}
										onChange={(e) => field('consent', e.target.checked)}
									/>{' '}
									Acepto el tratamiento de mis datos conforme al aviso de privacidad publicado por
									Monte Sion.
								</label>
								<Script
									src="https://challenges.cloudflare.com/turnstile/v0/api.js"
									strategy="afterInteractive"
								/>
								<div
									className="cf-turnstile"
									data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
									data-callback="onCaptcha"
								/>
							</>
						)}

						{error && (
							<p role="alert" className="error">
								{error}
							</p>
						)}
						<button disabled={busy || (step === 2 && !token)}>
							{busy ? 'Enviando…' : step === 2 ? 'Enviar registro' : 'Continuar'}
						</button>
						{step > 0 && (
							<button type="button" onClick={() => S(step - 1)}>
								Volver
							</button>
						)}
					</form>
				)}
			</section>
			<p>
				<small>🔒 Conexión segura · Monte Sion</small>
			</p>
		</main>
	);
}