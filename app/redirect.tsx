'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader } from "lucide-react";

// Componente de utilidad para redirecciones rápidas
export default function QuickRedirect() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      // Redirigir a la página principal de redirect
      router.push('/redirect');
    }
  }, [router, mounted]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center animate-spin">
        <span className="text-2xl text-primary-foreground"><Loader /></span>
        </div>
        <p className="text-lg font-medium text-foreground/70">Redirigiendo...</p>
      </div>
    </div>
  );
}