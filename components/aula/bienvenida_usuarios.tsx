type BienvenidaUsuariosProps = {
  username: string;
};

import { displayNameFrom } from "@/lib/utils";

const BienvenidaUsuarios: React.FC<BienvenidaUsuariosProps> = ({ username }) => {
  const displayName = displayNameFrom(username);

  return (
    <section className="py-20">
      <h1 className="text-3xl font-extrabold mb-2">¡Hola, {displayName}!</h1>
      <p className="text-lg">¡Bienvenid@! ¿Qué vas a aprender hoy?</p>
    </section>
  );
};

export default BienvenidaUsuarios;