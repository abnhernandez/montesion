"use client";

import React, { useEffect, useState } from 'react';
import { getUserAndProfile } from '@/lib/user-profile';
import MiCuenta from '@/components/perfil/micuenta';
import EdicionProfile from '@/components/perfil/edicionprofile';

interface User {
 id: string;
 email?: string;
 [key: string]: unknown;
}
export default function PerfilPage() {
 const [user, setUser] = useState<User | null>(null);
 // const [perfil, setPerfil] = useState<unknown | null>(null); // Not used
 const [loading, setLoading] = useState(true);

	 useEffect(() => {
		async function fetchData() {
			setLoading(true);
			const data = await getUserAndProfile();
			if (data) {
				setUser(data);
				// setPerfil(data.perfil); // Not used
			}
			setLoading(false);
		}
		fetchData();
	 }, []);

	if (loading) return <div className="p-8 text-center">Cargando perfil...</div>;
	if (!user) return <div className="p-8 text-center">No hay usuario autenticado.</div>;

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-8">
			<h1 className="text-2xl font-bold mb-6">Mi Perfil</h1>
			{/* Datos de cuenta (email, estado, etc) */}
			<MiCuenta />
			{/* Edición de perfil personalizado */}
			<EdicionProfile />
		</div>
	);
}
