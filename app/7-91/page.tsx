"use client";

import { Button } from "@/components/ui/button";

export default function Page() {
  const handleRedirect = () => {
    window.location.href = "/"; // Redirigir al inicio
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 pt-20 bg-background text-foreground">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-2xl font-semibold text-center mb-4">Salmos 91</h1>
        <p className="text-lg font-medium text-center mb-6">
          Morando bajo la sombra del Omnipotente
        </p>
        <div className="text-md leading-relaxed text-justify max-w-2xl space-y-2">
          <p>
            El que habita al abrigo del Altísimo Morará bajo la sombra del
            Omnipotente.
          </p>
          <p>
            Diré yo a Jehová: Esperanza mía, y castillo mío; Mi Dios, en quien
            confiaré.
          </p>
          <p>Él te librará del lazo del cazador, De la peste destructora.</p>
          <p>
            Con sus plumas te cubrirá, Y debajo de sus alas estarás seguro;
            Escudo y adarga es su verdad.
          </p>
          <p>
            No temerás el terror nocturno, Ni saeta que vuele de día, Ni
            pestilencia que ande en oscuridad, Ni mortandad que en medio del día
            destruya.
          </p>
          <p>
            Caerán a tu lado mil, Y diez mil a tu diestra; Mas a ti no llegará.
          </p>
          <p>
            Ciertamente con tus ojos mirarás Y verás la recompensa de los
            impíos.
          </p>
          <p>
            Porque has puesto a Jehová, que es mi esperanza, Al Altísimo por tu
            habitación, No te sobrevendrá mal, Ni plaga tocará tu morada.
          </p>
          <p>
            Pues a sus ángeles mandará acerca de ti, Que te guarden en todos tus
            caminos.
          </p>
          <p>
            En las manos te llevarán, Para que tu pie no tropiece en piedra.
          </p>
          <p>
            Sobre el león y el áspid pisarás; Hollarás al cachorro del león y al
            dragón.
          </p>
          <p>
            Por cuanto en mí ha puesto su amor, yo también lo libraré; Le pondré
            en alto, por cuanto ha conocido mi nombre.
          </p>
          <p>
            Me invocará, y yo le responderé; Con él estaré yo en la angustia; Lo
            libraré y le glorificaré.
          </p>
          <p>Lo saciaré de larga vida, Y le mostraré mi salvación.</p>
        </div>

        <div className="flex justify-center w-full mt-6">
          <p>Amén, gloria a Dios.</p>
        </div>
        <div>
          <Button onClick={handleRedirect}>Volver a inicio</Button>
        </div>
      </div>
    </div>
  );
}
