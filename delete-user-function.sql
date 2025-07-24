-- Función RPC para eliminar cuenta de usuario COMPLETA
-- Ejecuta este SQL en tu base de datos de Supabase

-- 1. Crear una función para eliminar usuario (requiere permisos de servicio)
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
    
    -- Eliminar datos del usuario de tablas personalizadas (ajusta según tu esquema)
    DELETE FROM public.users WHERE id = user_id;
    
    -- Eliminar de otras tablas relacionadas si existen
    DELETE FROM public.user_courses WHERE user_id = user_id;
    DELETE FROM public.user_progress WHERE user_id = user_id;
    DELETE FROM public.user_achievements WHERE user_id = user_id;
    DELETE FROM public.user_preferences WHERE user_id = user_id;
    
    -- ELIMINAR EL USUARIO DE LA TABLA DE AUTENTICACIÓN
    -- Esto requiere permisos especiales, pero funciona con SECURITY DEFINER
    DELETE FROM auth.users WHERE id = user_id;
    
END;
$$;

-- Otorgar permisos de ejecución a usuarios autenticados
GRANT EXECUTE ON FUNCTION delete_user() TO authenticated;

-- 2. Función alternativa más segura que requiere confirmación
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
    
    -- Obtener email del usuario
    SELECT email INTO user_email FROM auth.users WHERE id = user_id;
    
    -- Eliminar datos del usuario de tablas personalizadas
    DELETE FROM public.users WHERE id = user_id;
    DELETE FROM public.user_courses WHERE user_id = user_id;
    DELETE FROM public.user_progress WHERE user_id = user_id;
    DELETE FROM public.user_achievements WHERE user_id = user_id;
    DELETE FROM public.user_preferences WHERE user_id = user_id;
    
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

-- 3. Crear políticas RLS para asegurar que los usuarios solo puedan eliminar sus propios datos

-- Para la tabla users (si existe)
ALTER TABLE IF EXISTS public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can delete their own data" ON public.users;
CREATE POLICY "Users can delete their own data" ON public.users
    FOR DELETE USING (auth.uid() = id);

-- Para otras tablas relacionadas (ajusta según tu esquema)
ALTER TABLE IF EXISTS public.user_courses ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can delete their own courses" ON public.user_courses;
CREATE POLICY "Users can delete their own courses" ON public.user_courses
    FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE IF EXISTS public.user_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can delete their own progress" ON public.user_progress;
CREATE POLICY "Users can delete their own progress" ON public.user_progress
    FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE IF EXISTS public.user_achievements ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can delete their own achievements" ON public.user_achievements;
CREATE POLICY "Users can delete their own achievements" ON public.user_achievements
    FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE IF EXISTS public.user_preferences ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can delete their own preferences" ON public.user_preferences;
CREATE POLICY "Users can delete their own preferences" ON public.user_preferences
    FOR DELETE USING (auth.uid() = user_id);
