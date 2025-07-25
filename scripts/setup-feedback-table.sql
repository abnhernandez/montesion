-- Crear tabla de feedback
CREATE TABLE IF NOT EXISTS feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('bug', 'feature', 'general')),
  title TEXT,
  subject TEXT,
  description TEXT NOT NULL,
  priority TEXT CHECK (priority IN ('low', 'medium', 'high')),
  importance TEXT CHECK (importance IN ('low', 'medium', 'high')),
  browser TEXT,
  email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at);

-- Habilitar RLS (Row Level Security)
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Política para permitir insertar feedback (público puede enviar)
CREATE POLICY "Anyone can insert feedback" ON feedback 
  FOR INSERT 
  WITH CHECK (true);

-- Política para permitir que los administradores lean todo el feedback
CREATE POLICY "Admins can view all feedback" ON feedback 
  FOR SELECT 
  USING (auth.role() = 'authenticated');

-- Política para permitir que los administradores actualicen el feedback
CREATE POLICY "Admins can update feedback" ON feedback 
  FOR UPDATE 
  USING (auth.role() = 'authenticated');

-- Comentarios para documentar la tabla
COMMENT ON TABLE feedback IS 'Tabla para almacenar feedback de usuarios (bugs, solicitudes de características, comentarios generales)';
COMMENT ON COLUMN feedback.type IS 'Tipo de feedback: bug, feature, o general';
COMMENT ON COLUMN feedback.title IS 'Título para bugs y features';
COMMENT ON COLUMN feedback.subject IS 'Asunto para feedback general';
COMMENT ON COLUMN feedback.description IS 'Descripción detallada del feedback';
COMMENT ON COLUMN feedback.priority IS 'Prioridad para bugs (low, medium, high)';
COMMENT ON COLUMN feedback.importance IS 'Importancia para features (low, medium, high)';
COMMENT ON COLUMN feedback.browser IS 'Navegador usado cuando se reportó el bug';
COMMENT ON COLUMN feedback.email IS 'Email del usuario (opcional)';
COMMENT ON COLUMN feedback.status IS 'Estado del feedback (pending, in_progress, completed)';
