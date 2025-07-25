-- Arreglar configuración de autenticación y usuarios

-- 1. Verificar que la tabla users tenga RLS habilitado pero con políticas correctas
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- 2. Eliminar políticas conflictivas de users
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;

-- 3. Crear políticas más simples para users
CREATE POLICY "allow_user_crud" 
    ON public.users 
    FOR ALL 
    USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id);

-- 4. Permitir que los usuarios se registren (insertar perfil)
CREATE POLICY "allow_user_signup" 
    ON public.users 
    FOR INSERT 
    WITH CHECK (true);

-- 5. Verificar las políticas de users
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'users';

-- 6. Verificar configuración de ambas tablas
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename IN ('users', 'prayer_requests');
