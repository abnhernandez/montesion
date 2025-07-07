"use client";

export default function Profile() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-xl w-full text-center py-32">
        <div className="flex flex-col items-center gap-6">
          <span className="inline-block rounded-full bg-secondary p-6 mb-2">
            {/* Icono minimalista estilo Apple */}
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="16" fill="currentColor" className="text-primary/20"/>
              <circle cx="24" cy="20" r="6" stroke="currentColor" strokeWidth="2" className="text-primary"/>
              <rect x="16" y="30" width="16" height="6" rx="3" stroke="currentColor" strokeWidth="2" className="text-primary"/>
            </svg>
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">Próximamente</h1>
          <p className="text-lg text-muted-foreground mb-6">La sección de perfil estará disponible muy pronto.<br />¡Gracias por tu paciencia!</p>
        </div>
      </div>
    </main>
  );
}