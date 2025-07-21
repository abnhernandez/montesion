-- ====================================
-- CORRECCIÓN DE POLÍTICAS RLS PARA PETICIONES
-- ====================================

-- 1. Eliminar políticas existentes (por si acaso hay conflictos)
DROP POLICY IF EXISTS "Anyone can create prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Authenticated users can view prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Authenticated users can update prayer requests" ON prayer_requests;

-- 2. Crear política correcta para INSERCIÓN PÚBLICA
-- Esta política permite que cualquier persona (autenticada o no) pueda insertar peticiones
CREATE POLICY "Enable insert for all users" 
    ON prayer_requests 
    FOR INSERT 
    WITH CHECK (true);

-- 3. Política para que usuarios autenticados puedan VER peticiones (para admin)
CREATE POLICY "Enable select for authenticated users only" 
    ON prayer_requests 
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- 4. Política para que usuarios autenticados puedan ACTUALIZAR peticiones (para admin)
CREATE POLICY "Enable update for authenticated users only" 
    ON prayer_requests 
    FOR UPDATE 
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

-- 5. Verificar que RLS está habilitado
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- 6. Probar la inserción con una petición de prueba
INSERT INTO prayer_requests (
    ticket, 
    nombre, 
    correo_electronico, 
    asunto, 
    peticion,
    status
) VALUES (
    888888,
    'Prueba Política',
    'prueba@test.com',
    'Test de Política RLS',
    'Esta es una prueba para verificar que las políticas funcionan correctamente.',
    'pending'
) ON CONFLICT (ticket) DO NOTHING;

-- 7. Verificar que la inserción funcionó
SELECT 
    'Políticas configuradas correctamente' as status,
    COUNT(*) as total_peticiones,
    MAX(created_at) as ultima_peticion
FROM prayer_requests;

-- 8. Mostrar las políticas activas
SELECT 
    policyname,
    cmd,
    permissive,
    roles,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'prayer_requests';
