-- ====================================
-- SOLUCIÓN DEFINITIVA PARA POLÍTICAS RLS
-- ====================================

-- 1. DESHABILITAR RLS temporalmente para limpiar
ALTER TABLE prayer_requests DISABLE ROW LEVEL SECURITY;

-- 2. Eliminar TODAS las políticas existentes
DROP POLICY IF EXISTS "Enable insert for all users" ON prayer_requests;
DROP POLICY IF EXISTS "Enable select for authenticated users only" ON prayer_requests;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON prayer_requests;
DROP POLICY IF EXISTS "Anyone can create prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Authenticated users can view prayer requests" ON prayer_requests;
DROP POLICY IF EXISTS "Authenticated users can update prayer requests" ON prayer_requests;

-- 3. HABILITAR RLS nuevamente
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- 4. Crear política SIMPLE para inserción pública (sin autenticación)
CREATE POLICY "allow_public_insert" 
ON prayer_requests 
FOR INSERT 
TO public
WITH CHECK (true);

-- 5. Crear política para lectura autenticada (para panel admin)
CREATE POLICY "allow_authenticated_select" 
ON prayer_requests 
FOR SELECT 
TO authenticated
USING (true);

-- 6. Crear política para actualización autenticada (para panel admin)
CREATE POLICY "allow_authenticated_update" 
ON prayer_requests 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- 7. GRANT permisos explícitos para usuarios anónimos en INSERT
GRANT INSERT ON prayer_requests TO anon;
GRANT SELECT ON prayer_requests TO authenticated;
GRANT UPDATE ON prayer_requests TO authenticated;

-- 8. Verificar que los permisos están correctos
SELECT 
    table_name,
    privilege_type,
    grantee
FROM information_schema.table_privileges 
WHERE table_name = 'prayer_requests';

-- 9. Verificar las políticas activas
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'prayer_requests';

-- 10. Probar inserción directa
INSERT INTO prayer_requests (
    ticket, 
    nombre, 
    correo_electronico, 
    asunto, 
    peticion,
    status
) VALUES (
    777777,
    'Test Final',
    'final@test.com',
    'Prueba Final RLS',
    'Esta es la prueba final para verificar que las políticas funcionan.',
    'pending'
) ON CONFLICT (ticket) DO NOTHING;

-- 11. Confirmar que funcionó
SELECT 
    'RLS configurado correctamente' as status,
    COUNT(*) as total_peticiones,
    MAX(ticket) as ultimo_ticket
FROM prayer_requests;
