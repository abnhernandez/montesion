'use client'

// app/page.jsx

import MetaBalls from '@/components/ui/MetaBalls';
import SpotlightCard from '@/components/ui/SpotlightCard';

export default function Page() {
  return (
    <div className="relative w-full max-w-5xl p-8 flex flex-row items-center justify-between bg-background text-foreground">
      <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
        <div className="p-8">
          <h1 className="text-3xl font-semibold mb-4">Pastor Lemuel Acosta & Irma Ruelas</h1>
          <p className="text-lg mb-4">
            Los pastores Lemuel Acosta e Irma Ruelas han dedicado su vida al ministerio y servicio en la iglesia. Con más de dos décadas de experiencia pastoral, han guiado a la congregación con sabiduría y amor.
          </p>
          <p className="text-lg mb-4">
            Como líderes espirituales, han impactado positivamente en la vida de muchas familias a través de su enseñanza y ejemplo. Su dedicación al trabajo pastoral y su compromiso con la comunidad han sido fundamentales en el crecimiento de la iglesia.
          </p>
          <p className="text-lg">
            Juntos han formado un equipo ministerial sólido, complementándose en sus dones y talentos para servir mejor a la congregación y expandir el Reino de Dios.
          </p>
        </div>
      </SpotlightCard>
      <MetaBalls
        color="#ffffff"
        cursorBallColor="#ffffff"
        cursorBallSize={6} // Aumentado para hacerlo más grande
        ballCount={30} // Incrementado para más bolas
        animationSize={70} // Aumentado para mayor tamaño de animación
        enableMouseInteraction={true}
        enableTransparency={true}
        hoverSmoothness={0.05}
        clumpFactor={1}
        speed={0.7} // Incrementado para animaciones más rápidas
      />
    </div>
  );
}