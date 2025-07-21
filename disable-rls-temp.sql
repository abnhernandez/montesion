-- ====================================
-- SOLUCIÓN ALTERNATIVA: DESHABILITAR RLS
-- ====================================
-- SOLO SI LA SOLUCIÓN ANTERIOR NO FUNCIONA

-- Deshabilitar RLS completamente
ALTER TABLE prayer_requests DISABLE ROW LEVEL SECURITY;

-- Otorgar permisos completos
GRANT ALL ON prayer_requests TO anon;
GRANT ALL ON prayer_requests TO authenticated;

-- Verificar que funcionó
SELECT 
    'RLS deshabilitado - acceso público' as status,
    COUNT(*) as total_peticiones
FROM prayer_requests;
