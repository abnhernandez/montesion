"use client";

import { useAuth } from '@/app/auth-context';
import ComunidadShell from '@/components/aula/comunidad/ComunidadShell';

export default function ComunidadPage() {
  const { user } = useAuth();

  return (
    <main className="min-h-screen bg-neutral-50 dark:bg-neutral-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Comunidad</h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">Espacio para interactuar con otros usuarios: chat, salas de audio y feed social.</p>
        <ComunidadShell currentUserId={user?.id} />
      </div>
    </main>
  );
}
