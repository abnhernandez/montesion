import { FaRegHandshake, FaRegSmile, FaRegComments } from 'react-icons/fa';
import { MdReportProblem, MdSecurity, MdPeopleAlt } from 'react-icons/md';
import { BsShieldExclamation } from 'react-icons/bs';

export default function CodigoConducta() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 bg-background text-foreground w-full md:w-11/12 lg:w-3/4 xl:w-2/3">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6 flex flex-wrap items-center gap-2 text-center justify-center">
        <BsShieldExclamation className="text-yellow-400" /> Código de Conducta
      </h1>
      <section className="mb-8">
        <p className="mb-2 flex items-center gap-2 flex-wrap"><FaRegHandshake className="text-green-400" />
          En Monte Sion, creemos que <span className="font-bold text-green-400">todos son bienvenidos</span> y llamados a vivir en amor, respeto y unidad, siguiendo el ejemplo de Jesús. Nos comprometemos a construir una comunidad cristiana inclusiva, libre de abuso, con tolerancia <span className="font-bold text-red-400">0</span> a cualquier forma de agresión.
        </p>
        <p className="mb-2 flex items-center gap-2 flex-wrap"><FaRegSmile className="text-green-300" />
          Este código de conducta busca que todos se sientan en confianza y seguros de formar parte de la familia de la iglesia. Si respetas a los demás, no habrá ningún problema <span className="text-green-400">💚</span>
        </p>
        <p className="mb-2 flex items-center gap-2 flex-wrap"><FaRegComments className="text-blue-400" />
          Un buen código de conducta que se hace valer, nos bendice y edifica a todos <span className="text-yellow-300">🎉</span>
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><MdPeopleAlt className="text-pink-400" /> Alcance del código de conducta</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Este código aplica a todos los espacios bajo el cuidado y liderazgo de Monte Sion.</li>
          <li>Incluye reuniones presenciales, foros, chats, eventos en vivo, grupos pequeños, y cualquier espacio administrado por la iglesia.</li>
          <li>También aplica a plataformas digitales y redes sociales de la comunidad.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><MdSecurity className="text-blue-400" /> Aplicación del código de conducta</h2>
        <p>
          El equipo pastoral y los líderes, bajo la guía y dirección del Espíritu Santo —quien es Dios, y cuyo nombre es sobre todo nombre: JESÚS, el Todopoderoso—, se comprometen a acompañar y apoyar a cada persona en la comunidad. Si surge una situación difícil, nunca se apartará ni expulsará a nadie; siempre se buscará el acompañamiento, el diálogo, la reconciliación y el crecimiento espiritual, con intervención humana amorosa y sabia cuando sea necesario, guiados por la Palabra de Dios y el Espíritu Santo.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><FaRegSmile className="text-green-300" /> Pasos hacia un entorno seguro y de bienvenida</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Usar lenguaje inclusivo, edificante y de bienvenida <span>🤗</span></li>
          <li>Respetar los distintos puntos de vista y experiencias <span>🫂</span></li>
          <li>Aceptar las críticas constructivas con humildad <span>🛠️</span></li>
          <li>Enfocarse en lo que es mejor para la comunidad y el Reino de Dios <span>🌱</span></li>
          <li>Demostrar empatía y compasión hacia los demás <span>💞</span></li>
          <li>Orar y animar a otros en amor <span>🙏</span></li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><BsShieldExclamation className="text-yellow-400" /> Postura anti abuso</h2>
        <p className="mb-2">En la iglesia no se tolera ningún tipo de abuso. Ejemplos de comportamientos sancionables incluyen:</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li>Comentarios ofensivos sobre identidad, género, orientación, raza, religión, nacionalidad, etc.</li>
          <li>Comentarios no solicitados sobre estilo de vida, salud, crianza, relaciones, etc.</li>
          <li>Uso deliberado de pronombres incorrectos o nombres rechazados.</li>
          <li>Imágenes o comportamientos sexuales inapropiados.</li>
          <li>Contacto físico o simulado sin consentimiento.</li>
          <li>Amenazas, incitación a la violencia, intimidación, acoso, abuso digital.</li>
          <li>Interrupciones constantes, atención sexual no solicitada, patrones de contacto inapropiados.</li>
          <li>Reiteración de comunicación tras solicitud de cese.</li>
          <li>Difusión de comunicaciones privadas sin autorización.</li>
          <li>Spam o difusión de materiales personales sin consentimiento.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2"><MdReportProblem className="text-red-400" /> Reporte de violaciones</h2>
        <p>Si eres víctima de abuso o acoso, contacta a un líder, pastor o miembro del equipo a través de nuestras redes sociales, presencialmente o por correo electrónico. Si la persona involucrada es parte del equipo, no será parte del proceso de resolución.</p>
        <p className="mt-2">El equipo responderá tan pronto como sea posible. Si no recibes respuesta pronta, pon tu seguridad y bienestar primero.</p>
        <p className="mt-2">También puedes reportar incidentes ocurridos fuera de los espacios oficiales si involucran a miembros de la comunidad.</p>
      </section>
      <section className="mb-8">
        <p className="mb-2">
          Cualquier situación será tratada con seriedad, empatía, oración y acompañamiento pastoral. En Monte Sion creemos en la restauración, el perdón y el crecimiento espiritual. Nunca se apartará ni expulsará a nadie; en todo momento se buscará el diálogo, la reconciliación y el apoyo, guiados por la Palabra de Dios y el Espíritu Santo.
        </p>
        <p className="mt-2">
          En casos de conflicto, los líderes y pastores acompañarán a las personas involucradas, buscando siempre la paz, el entendimiento y el bienestar de toda la comunidad, respetando la confidencialidad y el amor cristiano.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">🔎 Mejora continua</h2>
        <p>Si consideras que alguna forma de abuso no está contemplada, por favor contacta a un líder o pastor. Este código es un documento vivo y puede ser mejorado continuamente.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">📚 Reconocimiento</h2>
        <p>Este código de conducta es una adaptación de modelos abiertos, con el objetivo de crear una comunidad cristiana segura, inclusiva y respetuosa para todas las personas. <span className="font-bold text-green-400">¡Todos son bienvenidos!</span></p>
      </section>
    </main>
  );
}