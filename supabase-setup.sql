-- ================================
-- SETUP INICIAL DE SUPABASE PARA MONTE SION
-- ================================

-- Tabla de usuarios (migración desde tu sistema actual)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de peticiones de oración
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

-- Tabla de suscripciones al newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true,
    unsubscribe_token VARCHAR(255) UNIQUE
);

-- Tabla de ejemplo (todos) para testing
CREATE TABLE IF NOT EXISTS todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- ================================

-- Habilitar RLS en todas las tablas
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Políticas para usuarios
CREATE POLICY "Users can view own profile" 
    ON users FOR SELECT 
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
    ON users FOR UPDATE 
    USING (auth.uid() = id);

-- Políticas para peticiones de oración (públicas para crear, privadas para ver)
CREATE POLICY "Anyone can create prayer requests" 
    ON prayer_requests FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Only authenticated users can view prayer requests" 
    ON prayer_requests FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Políticas para newsletter (públicas para suscribirse)
CREATE POLICY "Anyone can subscribe to newsletter" 
    ON newsletter_subscriptions FOR INSERT 
    WITH CHECK (true);

-- Políticas para todos (solo el propietario)
CREATE POLICY "Users can manage own todos" 
    ON todos FOR ALL 
    USING (auth.uid() = user_id);

-- ================================
-- FUNCIONES ÚTILES
-- ================================

-- Función para actualizar timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para auto-actualizar updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ================================
-- DATOS DE EJEMPLO
-- ================================

-- Insertar algunos todos de ejemplo
INSERT INTO todos (task, completed) VALUES 
    ('Configurar autenticación con Supabase', false),
    ('Migrar datos de usuarios', false),
    ('Configurar políticas de seguridad', true);

-- ================================
-- INSTRUCCIONES
-- ================================

/*
Para aplicar este script en Supabase:

1. Ve a tu proyecto en https://supabase.com/dashboard
2. Navega a SQL Editor
3. Copia y pega este script completo
4. Ejecuta el script

Esto creará todas las tablas necesarias con las políticas de seguridad apropiadas.
*/
