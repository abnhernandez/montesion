'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
import { ageOf } from '../../../lib/validation';

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

	async function submit(e: React.SubmitEvent<HTMLFormElement>) {
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
			<main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-center text-white">
				<div className="max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl">
					<div className="mb-5 text-4xl" aria-hidden="true">📱</div>
					<h2 className="text-2xl font-bold tracking-tight">Continúa desde tu celular</h2>
				</div>
			</main>
		);
	}

	return (
		<main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-12 text-slate-100 sm:px-6 sm:py-16">
			<div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-amber-400/10 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-48 -right-32 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />
			<div className="relative mx-auto max-w-3xl">
			<header className="mb-10 text-center">
			<small className="font-semibold uppercase tracking-[0.3em] text-amber-300">MONTE SION PRESENTA</small>
			<h1 className="mt-4 text-5xl font-black leading-none tracking-tight text-white sm:text-7xl">
				PERMANECE
				<br />
				2027
			</h1>
			<p className="mx-auto mt-5 max-w-lg text-base leading-7 text-slate-300 sm:text-lg">De Génesis a Malaquías. Una experiencia de estudio bíblico.</p>
			</header>
			<section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl shadow-black/30 backdrop-blur sm:p-9">
				{result ? (
					<>
						<div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 text-2xl text-emerald-300" aria-hidden="true">✓</div>
						<h2 className="text-2xl font-bold text-white">Solicitud recibida</h2>
						<p className="mt-3 text-amber-200">Folio: {result.folio}</p>
						<p className="mt-4 leading-7 text-slate-300">
							La organización revisará tu solicitud antes de autorizar la incorporación.
						</p>
					</>
				) : step === 3 ? (
					<>
						<h2 className="text-2xl font-bold text-white">Participación de adolescentes</h2>
						<p className="mt-4 leading-7 text-slate-300">
							Solicita a tu madre, padre o tutor que contacte a Monte Sion para gestionar tu
							participación supervisada. No necesitas proporcionar aquí tus datos de contacto.
						</p>
						<button className="mt-6 rounded-xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10" onClick={() => S(0)}>Volver</button>
					</>
				) : (
					<form className="space-y-6" onSubmit={submit}>
						<div>
							<small className="font-semibold uppercase tracking-[0.2em] text-amber-300">PASO {step + 1} DE 3</small>
							<div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10" aria-label={`Paso ${step + 1} de 3`}>
								<div className="h-full rounded-full bg-amber-300 transition-all" style={{ width: `${((step + 1) / 3) * 100}%` }} />
							</div>
							<h2 className="mt-5 text-2xl font-bold tracking-tight text-white">{['Comienza tu camino', 'Mantengamos el contacto', 'Confirma tu solicitud'][step]}</h2>
						</div>

						{step === 0 ? (
							<div className="space-y-5">
								<p className="text-sm leading-6 text-slate-300">Convocatoria para personas solteras desde los 12 años.</p>
								<label className="block space-y-2 text-sm font-medium text-slate-200">
									Nombre completo
									<input
										className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
										required
										minLength={2}
										maxLength={120}
										value={d.name}
										onChange={(e) => field('name', e.target.value)}
									/>
								</label>
								<label className="block space-y-2 text-sm font-medium text-slate-200">
									Fecha de nacimiento
									<input
										className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
										required
										type="date"
										value={d.birth}
										onChange={(e) => field('birth', e.target.value)}
									/>
								</label>
								<label className="block space-y-2 text-sm font-medium text-slate-200">
									Estado civil
									<select
										className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
										required
										value={d.civil}
										onChange={(e) => field('civil', e.target.value)}
									>
										<option value="">Selecciona</option>
										<option value="soltero">Soltero/a</option>
										<option value="otro">Otro</option>
									</select>
								</label>
							</div>
						) : step === 1 ? (
							<div className="space-y-5">
								<label className="block space-y-2 text-sm font-medium text-slate-200">
									País (código ISO de dos letras)
									<input
										className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
										required
										pattern="[A-Z]{2}"
										placeholder="MX"
										value={d.country}
										onChange={(e) => field('country', e.target.value.toUpperCase())}
									/>
								</label>
								<label className="block space-y-2 text-sm font-medium text-slate-200">
									Correo
									<input
										className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
										required
										type="email"
										value={d.email}
										onChange={(e) => field('email', e.target.value)}
									/>
								</label>
								<label className="block space-y-2 text-sm font-medium text-slate-200">
									Teléfono internacional
									<input
										className="w-full rounded-xl border border-white/15 bg-slate-900/80 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300 focus:ring-2 focus:ring-amber-300/20"
										required
										type="tel"
										placeholder="+52…"
										value={d.phone}
										onChange={(e) => field('phone', e.target.value)}
									/>
								</label>
							</div>
						) : (
							<>
								<p className="rounded-xl bg-white/5 px-4 py-3 text-slate-200">
									{d.name} · {d.email}
								</p>
								<p className="leading-7 text-slate-300">
									Tu solicitud será revisada por la organización. Tus datos se usarán para gestionar
									el registro y contacto.
								</p>
								<label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
									<input
										className="mt-1 h-4 w-4 shrink-0 accent-amber-300"
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
							<p role="alert" className="rounded-xl border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-200">
								{error}
							</p>
						)}
						<div className="flex flex-wrap gap-3 pt-1">
						<button className="rounded-xl bg-amber-300 px-6 py-3 font-bold text-slate-950 shadow-lg shadow-amber-300/10 transition hover:bg-amber-200 disabled:cursor-not-allowed disabled:opacity-50" disabled={busy || (step === 2 && !token)}>
							{busy ? 'Enviando…' : step === 2 ? 'Enviar registro' : 'Continuar'}
						</button>
						{step > 0 && (
							<button className="rounded-xl border border-white/15 px-5 py-3 font-semibold text-white transition hover:bg-white/10" type="button" onClick={() => S(step - 1)}>
								Volver
							</button>
						)}
						</div>
					</form>
				)}
			</section>
			<p className="mt-7 text-center text-xs tracking-wide text-slate-400">
				🔒 Conexión segura · Monte Sion
			</p>
			</div>
		</main>
	);
}