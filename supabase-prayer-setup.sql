-- ====================================
-- SCRIPT RÁPIDO PARA PETICIONES DE ORACIÓN
-- ====================================
-- Ejecutar este script completo en Supabase SQL Editor

-- 1. Crear la tabla prayer_requests
CREATE TABLE IF NOT EXISTS prayer_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket INTEGER UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    correo_electronico VARCHAR(255) NOT NULL,
    asunto VARCHAR(200) NOT NULL,
    peticion TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    processed_at TIMESTAMP WITH TIME ZONE
);

-- 2. Habilitar Row Level Security
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;

-- 3. Política para permitir que cualquiera cree peticiones (formulario público)
DROP POLICY IF EXISTS "Anyone can create prayer requests" ON prayer_requests;
CREATE POLICY "Anyone can create prayer requests" 
    ON prayer_requests 
    FOR INSERT 
    WITH CHECK (true);

-- 4. Política para que usuarios autenticados puedan ver las peticiones
DROP POLICY IF EXISTS "Authenticated users can view prayer requests" ON prayer_requests;
CREATE POLICY "Authenticated users can view prayer requests" 
    ON prayer_requests 
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- 5. Política para que usuarios autenticados puedan actualizar peticiones
DROP POLICY IF EXISTS "Authenticated users can update prayer requests" ON prayer_requests;
CREATE POLICY "Authenticated users can update prayer requests" 
    ON prayer_requests 
    FOR UPDATE 
    USING (auth.role() = 'authenticated');

-- 6. Insertar una petición de prueba para verificar que funciona
INSERT INTO prayer_requests (
    ticket, 
    nombre, 
    correo_electronico, 
    asunto, 
    peticion
) VALUES (
    999999,
    'Prueba Sistema',
    'test@montesion.me',
    'Verificación de funcionamiento',
    'Esta es una petición de prueba para verificar que el sistema funciona correctamente.'
) ON CONFLICT (ticket) DO NOTHING;

-- 7. Verificar que la tabla se creó correctamente
SELECT 
    'Tabla creada exitosamente' as status,
    COUNT(*) as total_peticiones
FROM prayer_requests;

-- 8. Mostrar la estructura de la tabla
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'prayer_requests' 
ORDER BY ordinal_position;
