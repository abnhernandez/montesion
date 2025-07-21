-- ====================================
-- REACTIVAR RLS CON CONFIGURACIÓN CORRECTA
-- ====================================
-- EJECUTAR SOLO SI QUIERES REACTIVAR SEGURIDAD

-- 1. Reactivar RLS
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- 2. Política simple para inserción pública
CREATE POLICY "public_insert_only" 
ON prayer_requests 
FOR INSERT 
WITH CHECK (true);

-- 3. Política para que solo admins autenticados vean las peticiones
CREATE POLICY "admin_select_only" 
ON prayer_requests 
FOR SELECT 
USING (auth.role() = 'authenticated');

-- 4. Política para que solo admins actualicen
CREATE POLICY "admin_update_only" 
ON prayer_requests 
FOR UPDATE 
USING (auth.role() = 'authenticated');

-- 5. Verificar políticas
SELECT policyname, cmd FROM pg_policies WHERE tablename = 'prayer_requests';
