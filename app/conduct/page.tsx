import { FaRegHandshake, FaRegSmile, FaRegComments } from 'react-icons/fa';
import { MdReportProblem, MdSecurity, MdPeopleAlt } from 'react-icons/md';
import { BsShieldExclamation } from 'react-icons/bs';

export default function CodigoConducta() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12 bg-background text-foreground w-full md:w-11/12 lg:w-3/4 xl:w-2/3" role="main">
      <header>
        <h1 className="text-3xl md:text-4xl font-semibold mb-6 flex flex-wrap items-center gap-2 text-center justify-center">
          <BsShieldExclamation className="text-yellow-400" aria-label="Código de Conducta" title="Código de Conducta" /> Código de Conducta
        </h1>
      </header>
      <section className="mb-8" aria-labelledby="bienvenida">
        <p className="mb-2 flex items-center gap-2 flex-wrap">
          <FaRegHandshake className="text-green-400" aria-label="Bienvenida" title="Bienvenida" />
          <span id="bienvenida">En Monte Sion, todos son bienvenidos. Queremos que cada persona se sienta segura, valorada y respetada, sin importar su historia, identidad o situación. Buscamos vivir el amor de Jesús de forma práctica y realista, reconociendo que todos estamos en proceso y nadie es perfecto.</span>
        </p>
        <p className="mb-2 flex items-center gap-2 flex-wrap">
          <FaRegSmile className="text-green-300" aria-label="Confianza" title="Confianza" />
          Este código existe para proteger y cuidar a cada miembro de la comunidad. Si tienes dudas, inquietudes o necesitas apoyo, acércate con confianza. Aquí nadie está solo. <span className="text-green-400" aria-label="Corazón verde" title="Corazón verde">💚</span>
        </p>
        <p className="mb-2 flex items-center gap-2 flex-wrap">
          <FaRegComments className="text-blue-400" aria-label="Bendición" title="Bendición" />
          Un ambiente sano y respetuoso nos ayuda a crecer y disfrutar juntos. <span className="text-yellow-300" aria-label="Celebración" title="Celebración">🎉</span>
        </p>
      </section>
      <section className="mb-8" aria-labelledby="alcance">
        <h2 id="alcance" className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <MdPeopleAlt className="text-pink-400" aria-label="Alcance" title="Alcance" /> ¿Dónde aplica este código?
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li tabIndex={0}>En todos los espacios, actividades y plataformas bajo el cuidado de Monte Sion: reuniones, grupos, chats, redes sociales y eventos.</li>
          <li tabIndex={0}>Incluye tanto lo presencial como lo digital.</li>
        </ul>
      </section>
      <section className="mb-8" aria-labelledby="aplicacion">
        <h2 id="aplicacion" className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <MdSecurity className="text-blue-400" aria-label="Aplicación" title="Aplicación" /> ¿Cómo se aplica?
        </h2>
        <p>
          Los líderes y pastores están para acompañar, escuchar y ayudar. Si surge un problema, se buscará el diálogo, la reconciliación y el apoyo, siempre con respeto y sin juicios. Nadie será excluido por pedir ayuda o por cometer errores; todos podemos aprender y mejorar.
        </p>
      </section>
      <section className="mb-8" aria-labelledby="pasos">
        <h2 id="pasos" className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <FaRegSmile className="text-green-300" aria-label="Pasos" title="Pasos" /> ¿Qué esperamos de ti?
        </h2>
        <ul className="list-disc pl-6 space-y-1">
          <li tabIndex={0}>Habla y actúa con respeto, honestidad y empatía.</li>
          <li tabIndex={0}>Escucha y acepta las diferencias; todos tenemos historias distintas.</li>
          <li tabIndex={0}>Si te equivocas, pide perdón y busca reparar.</li>
          <li tabIndex={0}>Apoya y anima a otros, especialmente a quienes pasan por momentos difíciles.</li>
          <li tabIndex={0}>No toleres ni participes en chismes, burlas, exclusión o abuso.</li>
          <li tabIndex={0}>Ora y busca el bienestar de la comunidad.</li>
        </ul>
      </section>
      <section className="mb-8" aria-labelledby="antiabuso">
        <h2 id="antiabuso" className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <BsShieldExclamation className="text-yellow-400" aria-label="Anti abuso" title="Anti abuso" /> Postura ante el abuso
        </h2>
        <p className="mb-2">No se permite ningún tipo de abuso, acoso o discriminación. Ejemplos de conductas que no aceptamos:</p>
        <ul className="list-disc pl-6 space-y-1 text-sm">
          <li tabIndex={0}>Insultos, burlas, amenazas o exclusión.</li>
          <li tabIndex={0}>Comentarios ofensivos sobre identidad, género, orientación, raza, religión, nacionalidad, etc.</li>
          <li tabIndex={0}>Contacto físico sin consentimiento.</li>
          <li tabIndex={0}>Difusión de información privada sin permiso.</li>
          <li tabIndex={0}>Acoso digital o presencial.</li>
          <li tabIndex={0}>Cualquier otra acción que dañe la dignidad o seguridad de una persona.</li>
        </ul>
      </section>
      <section className="mb-8" aria-labelledby="reporte">
        <h2 id="reporte" className="text-2xl font-semibold mb-2 flex items-center gap-2">
          <MdReportProblem className="text-red-400" aria-label="Reporte" title="Reporte" /> ¿Qué hacer si hay un problema?
        </h2>
        <p>Si sufres o presencias abuso, acoso o cualquier situación incómoda, habla con un líder, pastor o alguien de confianza. Puedes hacerlo en persona, por redes sociales o correo electrónico. Si el problema involucra a alguien del equipo, esa persona no participará en la resolución.</p>
        <p className="mt-2">Tu seguridad y bienestar son lo más importante. Si no recibes respuesta rápida, busca ayuda y cuida de ti.</p>
        <p className="mt-2">También puedes reportar situaciones ocurridas fuera de los espacios oficiales si involucran a miembros de la comunidad.</p>
      </section>
      <section className="mb-8" aria-label="Acompañamiento y restauración">
        <p className="mb-2">
          Todas las situaciones se tratarán con seriedad, empatía y oración. Creemos en la restauración y el perdón, pero también en la responsabilidad y el aprendizaje. Nadie será apartado por pedir ayuda; buscamos el diálogo y el apoyo, guiados por la Palabra de Dios y el Espíritu Santo.
        </p>
        <p className="mt-2">
          En caso de conflicto, los líderes acompañarán a quienes lo necesiten, buscando la paz y el bienestar de todos, con confidencialidad y amor cristiano.
        </p>
      </section>
      <section className="mb-8" aria-labelledby="mejora">
        <h2 id="mejora" className="text-2xl font-semibold mb-2 flex items-center gap-2">🔎 Mejora continua</h2>
        <p>Si crees que falta algo o tienes sugerencias, habla con un líder o pastor. Este código puede cambiar y mejorar con tu ayuda.</p>
      </section>
      <section className="mb-8" aria-labelledby="reconocimiento">
        <h2 id="reconocimiento" className="text-2xl font-semibold mb-2 flex items-center gap-2">📚 Reconocimiento</h2>
        <p>Este código de conducta se inspira en modelos abiertos y busca crear una comunidad cristiana segura, realista e inclusiva para todas las personas. <span className="font-bold text-green-400" aria-label="Bienvenida" title="Bienvenida">¡Todos son bienvenidos!</span></p>
      </section>
    </main>
  );
}