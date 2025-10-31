import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-client";
import { displayNameFrom } from "@/lib/utils";
import BienvenidaUsuarios from "./bienvenida_usuarios";

export default function BienvenidaUsuariosSupabase() {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Prioridad:
        // 1) user.user_metadata?.username
        // 2) user.user_metadata?.nombre + " " + user.user_metadata?.apellido
        // 3) tabla `users` (username, nombre, apellido)
        // 4) email prefix / id

        // Helper to generate suffix like _Ab3 (underscore + 2 letters + digit)
        const genSuffix = () => {
          const letters = () => {
            const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            return chars.charAt(Math.floor(Math.random() * chars.length));
          };
          const a = letters();
          const b = letters();
          const d = Math.floor(Math.random() * 10);
          return `_${a}${b}${d}`;
        };

        // Try to take username from auth metadata first
        let finalUsername = user.user_metadata?.username;

        // If not present, try to build from metadata nombre/apellido
        if (!finalUsername) {
          const metaNombre = user.user_metadata?.nombre?.toString().trim();
          const metaApellido = user.user_metadata?.apellido?.toString().trim();
          if (metaNombre && metaApellido) {
            finalUsername = `${metaNombre} ${metaApellido}`;
          }
        }

        // If still not present, check users table for profile fields
        if (!finalUsername) {
          const { data, error } = await supabase
            .from("users")
            .select("username, nombre, apellido")
            .eq("id", user.id)
            .single();
          if (!error && data) {
            if (data.username) finalUsername = data.username;
            else if (data.nombre && data.apellido) finalUsername = `${data.nombre} ${data.apellido}`;
            else if (data.nombre) finalUsername = data.nombre;
          }
        }

        // Fallback to email local-part or id
        if (!finalUsername) {
          finalUsername = user.email ? displayNameFrom(user.email) : user.id;
        }

        finalUsername = String(finalUsername).trim();

        // Ensure uniqueness in `users.username` column. If duplicate exists, append suffix _Aa1 etc.
        const isUsernameTaken = async (candidate: string) => {
          try {
            const { data: found, error: qErr } = await supabase
              .from("users")
              .select("id")
              .eq("username", candidate)
              .neq("id", user.id)
              .limit(1);
            if (qErr) {
              console.warn('isUsernameTaken query error', qErr);
              return false; // on error, assume not taken to avoid blocking
            }
            return Array.isArray(found) && found.length > 0;
          } catch (err) {
            console.warn('isUsernameTaken exception', err);
            return false;
          }
        };

        // If taken, try up to N attempts to create a unique username
        if (await isUsernameTaken(finalUsername)) {
          let attempts = 0;
          const maxAttempts = 20;
          let candidate = finalUsername;
          while (attempts < maxAttempts) {
            const suffix = genSuffix();
            candidate = `${finalUsername}${suffix}`;
            if (!(await isUsernameTaken(candidate))) {
              finalUsername = candidate;
              break;
            }
            attempts++;
          }
        }

        // Try to persist username into auth metadata and users table (best-effort)
        try {
          // Update auth user metadata username (may fail depending on RLS or client permissions)
          const metaRes = await supabase.auth.updateUser({ data: { username: finalUsername } });
          if (metaRes.error) {
            console.warn('Could not update auth user metadata username:', metaRes.error.message || metaRes.error);
          }
        } catch (err) {
          console.warn('updateUser exception', err);
        }

        try {
          const { error: updErr } = await supabase
            .from('users')
            .update({ username: finalUsername })
            .eq('id', user.id);
          if (updErr) {
            console.warn('Could not update users.username:', updErr.message || updErr);
          }
        } catch (err) {
          console.warn('update users exception', err);
        }

        setUsername(finalUsername);
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
