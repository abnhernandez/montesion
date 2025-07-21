-- ================================
-- SETUP MÍNIMO DE SUPABASE PARA TESTING
-- ================================

-- Tabla de usuarios básica (compatible con auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de testing (todos)
CREATE TABLE IF NOT EXISTS public.todos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================
-- POLÍTICAS DE SEGURIDAD BÁSICAS
-- ================================

-- Habilitar RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.todos ENABLE ROW LEVEL SECURITY;

-- Política para usuarios: pueden ver y editar su propio perfil
DROP POLICY IF EXISTS "Users can manage own profile" ON public.users;
CREATE POLICY "Users can manage own profile" 
    ON public.users 
    FOR ALL 
    USING (auth.uid() = id);

-- Política para insertar usuarios (necesario para registro)
DROP POLICY IF EXISTS "Anyone can insert users" ON public.users;
CREATE POLICY "Anyone can insert users" 
    ON public.users 
    FOR INSERT 
    WITH CHECK (auth.uid() = id);

-- Políticas para todos
DROP POLICY IF EXISTS "Users can manage own todos" ON public.todos;
CREATE POLICY "Users can manage own todos" 
    ON public.todos 
    FOR ALL 
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can view todos" ON public.todos;
CREATE POLICY "Anyone can view todos" 
    ON public.todos 
    FOR SELECT 
    USING (true);

-- ================================
-- DATOS DE EJEMPLO
-- ================================

-- Insertar algunos todos de ejemplo (sin user_id para que sean públicos)
INSERT INTO public.todos (task, completed) VALUES 
    ('Configurar Supabase Auth ✅', true),
    ('Crear formularios de login', false),
    ('Implementar RLS policies', false)
ON CONFLICT DO NOTHING;

-- ================================
-- FUNCIONES ÚTILES
-- ================================

-- Función para manejar nuevos usuarios
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, nombre, apellido)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'nombre', ''),
    COALESCE(NEW.raw_user_meta_data->>'apellido', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger para crear perfil automáticamente cuando se registra un usuario
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

/*
INSTRUCCIONES:
1. Copia este SQL completo
2. Ve a tu dashboard de Supabase: https://supabase.com/dashboard
3. Selecciona tu proyecto
4. Ve a "SQL Editor"
5. Pega y ejecuta este script
6. Verifica que las tablas se crearon en "Table Editor"
*/
