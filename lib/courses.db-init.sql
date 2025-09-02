CREATE TABLE IF NOT EXISTS courses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image TEXT,
  category TEXT,
  rating REAL,
  students INTEGER,
  instructor TEXT,
  is_new BOOLEAN DEFAULT 0
);

-- Ejemplo de inserción
INSERT INTO courses (title, description, image, category, rating, students, instructor, is_new) VALUES
('Primeros pasos', 'Ruta de estudio para nuevos creyentes.', '/courses/primeros-pasos.webp', 'Ruta de estudio', 4.9, 500, 'Equipo Monte Sion', 1),
('CRECE', 'Ruta de estudio para el crecimiento espiritual.', '/courses/crece.webp', 'Ruta de estudio', 4.8, 450, 'Equipo Monte Sion', 1),
('Ir y haced Disipulos', 'Ruta de estudio para la misión y discipulado.', '/courses/ir-haced-discipulos.webp', 'Ruta de estudio', 4.9, 400, 'Equipo Monte Sion', 1);
('Primeros pasos', 'Ruta de estudio para nuevos creyentes.', '/courses/primeros-pasos.webp', 'Ruta de estudio', 4.9, 500, 'Equipo Monte Sion', 1),
('CRECE', 'Ruta de estudio para el crecimiento espiritual.', '/courses/crece.webp', 'Ruta de estudio', 4.8, 450, 'Equipo Monte Sion', 1),
('Ir y haced Disipulos', 'Ruta de estudio para la misión y discipulado.', '/courses/ir-haced-discipulos.webp', 'Ruta de estudio', 4.9, 400, 'Equipo Monte Sion', 1);
