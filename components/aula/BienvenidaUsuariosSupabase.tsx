import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import BienvenidaUsuarios from "./bienvenida_usuarios";

export default function BienvenidaUsuariosSupabase() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Buscar el nombre, username, símbolo, emoji, etc. en la tabla users
        const { data, error } = await supabase
          .from("users")
          .select("username, nombre")
          .eq("id", user.id)
          .single();
        if (!error && data) {
          // Prioridad: username > nombre > email > id
          setUsername(data.username || data.nombre || user.email || user.id);
        } else {
          setUsername(user.email || user.id);
        }
      }
      setLoading(false);
    }
    fetchUser();
  }, []);

  if (loading) {
    return (
      <section className="py-20 flex flex-col items-center justify-center">
        <span className="text-2xl animate-pulse">Cargando usuario...</span>
      </section>
    );
  }

  return <BienvenidaUsuarios username={username} />;
}
