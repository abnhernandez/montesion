-- Función RPC para eliminar cuenta de usuario (SIN tabla public.users)
-- Ejecuta este SQL en tu base de datos de Supabase

-- Verificar qué tablas existen primero
-- Puedes ejecutar esto para ver qué tablas tienes:
-- SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';

-- 1. Crear una función para eliminar usuario (SOLO de auth.users)
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_id uuid;
BEGIN
    -- Obtener el ID del usuario actual
    user_id := auth.uid();
    
    -- Verificar que hay un usuario autenticado
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'Usuario no autenticado';
    END IF;
    
    -- SOLO eliminar el usuario de la tabla de autenticación
    -- (ya que public.users no existe)
    DELETE FROM auth.users WHERE id = user_id;
    
END;
$$;

-- Otorgar permisos de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION delete_user() TO authenticated;

-- 2. Función alternativa que retorna confirmación
CREATE OR REPLACE FUNCTION request_account_deletion()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_id uuid;
    user_email text;
    result json;
BEGIN
    -- Obtener el ID del usuario actual
    user_id := auth.uid();
    
    -- Verificar que hay un usuario autenticado
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'Usuario no autenticado';
    END IF;
    
    -- Obtener email del usuario antes de eliminarlo
    SELECT email INTO user_email FROM auth.users WHERE id = user_id;
    
    -- ELIMINAR EL USUARIO DE LA TABLA DE AUTENTICACIÓN
    DELETE FROM auth.users WHERE id = user_id;
    
    result := json_build_object(
        'message', 'Cuenta eliminada exitosamente',
        'user_id', user_id,
        'email', user_email,
        'success', true
    );
    
    RETURN result;
END;
$$;

-- Otorgar permisos de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION request_account_deletion() TO authenticated;

-- 3. Si en el futuro creas tablas personalizadas, puedes agregar esto:
-- (Descomenta y ajusta según las tablas que realmente tengas)

/*
-- Ejemplo para futuras tablas:
CREATE OR REPLACE FUNCTION delete_user_complete()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_id uuid;
BEGIN
    user_id := auth.uid();
    
    IF user_id IS NULL THEN
        RAISE EXCEPTION 'Usuario no autenticado';
    END IF;
    
    -- Eliminar de tablas personalizadas SI EXISTEN
    -- DELETE FROM public.users WHERE id = user_id;
    -- DELETE FROM public.user_courses WHERE user_id = user_id;
    -- DELETE FROM public.user_progress WHERE user_id = user_id;
    
    -- Eliminar de auth.users
    DELETE FROM auth.users WHERE id = user_id;
    
END;
$$;

GRANT EXECUTE ON FUNCTION delete_user_complete() TO authenticated;
*/
