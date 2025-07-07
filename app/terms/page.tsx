export default function TermsPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-4">
      <div className="max-w-2xl w-full text-center py-24">
        <h1 className="text-3xl font-semibold mb-6">Términos y Condiciones</h1>
        <div className="text-left space-y-7 max-w-2xl mx-auto text-base">
          <section>
            <p className="text-muted-foreground text-sm italic mb-2">El uso de este sitio web, aplicaciones y servicios de Monte Sion implica la aceptación de estos Términos y Condiciones. Por favor, léelos cuidadosamente. Si tienes dudas, contáctanos.</p>
          </section>
          <section>
            <h2 className="font-medium text-lg mb-1">1. Definiciones</h2>
            <ul className="list-disc ml-6">
              <li><strong>Usuario:</strong> Persona que accede o utiliza los servicios de Monte Sion.</li>
              <li><strong>Suscriptor:</strong> Usuario que se registra o participa en actividades, eventos o servicios especiales.</li>
            </ul>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">2. Crear cuenta</h2>
            <p>Para acceder a ciertos servicios, es necesario registrarse con datos válidos y mantenerlos actualizados. Consulta nuestro <a href="/privacy" className="underline hover:text-primary">Aviso de Privacidad</a> para saber cómo protegemos tus datos.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">3. Acceso a la cuenta personal</h2>
            <p>El acceso es personal e intransferible. El usuario es responsable de la confidencialidad de su contraseña y de las actividades realizadas en su cuenta.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">4. Generales de usuarios y suscripciones</h2>
            <p>Monte Sion puede ofrecer membresías, eventos o servicios especiales con condiciones y beneficios específicos. Nos reservamos el derecho de modificar estos beneficios y notificar a los usuarios.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">5. Acceso, disponibilidad y actualización</h2>
            <p>El acceso a servicios puede requerir registro y estar sujeto a disponibilidad. Monte Sion no garantiza la disponibilidad continua de todos los servicios y puede actualizar o modificar contenidos sin previo aviso.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">6. Uso y restricciones</h2>
            <p>El contenido es para uso personal y no comercial. No está permitido modificar, distribuir, reproducir o explotar el contenido sin autorización. Se prohíbe el uso ofensivo, discriminatorio o ilegal de los servicios.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">7. Propiedad intelectual</h2>
            <p>Todos los derechos sobre el contenido, marca y materiales de Monte Sion pertenecen a la iglesia. No se otorgan licencias de uso salvo autorización expresa.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">8. Cancelación y eliminación de cuenta</h2>
            <p>El usuario puede cancelar su cuenta en cualquier momento. Monte Sion puede cancelar cuentas por incumplimiento de estos términos.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">9. Donaciones</h2>
            <p>Las donaciones o aportes voluntarios se utilizarán conforme a los fines de la iglesia. Consulta condiciones específicas en la sección de donativos.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">10. Responsabilidad</h2>
            <p>Monte Sion no se hace responsable por daños derivados del uso de sus plataformas, salvo por negligencia directa.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">11. Cambios en los términos</h2>
            <p>Monte Sion puede actualizar estos términos y notificará a los usuarios.</p>
          </section>
          <section>
            <h2 className="font-semibold text-lg mb-1">12. Contacto</h2>
            <p>Para dudas o aclaraciones, contáctanos a través de los medios oficiales publicados en este sitio.</p>
          </section>
        </div>
        <p className="text-sm text-muted-foreground mt-12">Última actualización: 11 de junio de 2025</p>
      </div>
    </main>
  );
}
