-- SOLUCIÓN TEMPORAL: Deshabilitar RLS para prayer_requests
-- Esto permitirá que funcione mientras debuggeamos

-- Deshabilitar Row Level Security temporalmente
ALTER TABLE public.prayer_requests DISABLE ROW LEVEL SECURITY;

-- Verificar que RLS está deshabilitado
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'prayer_requests';

-- Probar inserción directa para verificar que funciona
INSERT INTO public.prayer_requests (nombre, correo_electronico, asunto, peticion, ticket, status)
VALUES ('Test User', 'test@example.com', 'Test Subject', 'Test prayer request', 999999, 'pending');

-- Eliminar el registro de prueba
DELETE FROM public.prayer_requests WHERE ticket = 999999;

-- Ver todas las peticiones existentes
SELECT id, nombre, correo_electronico, asunto, ticket, status, created_at 
FROM public.prayer_requests 
ORDER BY created_at DESC 
LIMIT 5;
