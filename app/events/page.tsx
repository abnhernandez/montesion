"use client";

export default function EventsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-xl w-full text-center py-32">
        <div className="flex flex-col items-center gap-6">
          <span className="inline-block rounded-full bg-secondary p-6 mb-2">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="48" height="48" rx="16" fill="currentColor" className="text-primary/20"/>
              <path d="M16 20h16M16 28h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-primary"/>
              <rect x="12" y="12" width="24" height="24" rx="8" stroke="currentColor" strokeWidth="2" className="text-primary"/>
            </svg>
          </span>
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">No hay eventos programados</h1>
          <p className="text-lg text-muted-foreground mb-6">Por el momento no hay eventos próximos. Vuelve pronto para descubrir nuevas actividades y experiencias.</p>
        </div>
      </div>
    </main>
  );
}
