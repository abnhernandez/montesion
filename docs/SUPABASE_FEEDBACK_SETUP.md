# Configuración de Tabla de Feedback en Supabase

## 📋 Instrucciones para crear la tabla de feedback

### 1. Acceder al SQL Editor de Supabase

1. Ve a tu proyecto en [https://supabase.com](https://supabase.com)
2. Navega a **SQL Editor** en el menú lateral
3. Crea una nueva consulta

### 2. Ejecutar el script SQL

Copia y pega el contenido del archivo `scripts/setup-feedback-table.sql` en el editor SQL y ejecuta la consulta.

### 3. Verificar la tabla

Una vez ejecutado, ve a **Table Editor** para verificar que la tabla `feedback` se haya creado correctamente con:

- ✅ **Campos correctos**: id, type, title, subject, description, priority, importance, browser, email, status, created_at, processed_at
- ✅ **Restricciones CHECK**: Para type, priority, importance, status
- ✅ **RLS habilitado**: Row Level Security activado
- ✅ **Políticas correctas**: Insert público, Select/Update para autenticados

### 4. Estructura de la tabla

```sql
feedback (
  id UUID PRIMARY KEY,
  type TEXT (bug|feature|general),
  title TEXT (para bugs y features),
  subject TEXT (para general),
  description TEXT NOT NULL,
  priority TEXT (low|medium|high) - para bugs,
  importance TEXT (low|medium|high) - para features,
  browser TEXT (navegador del usuario),
  email TEXT (opcional),
  status TEXT (pending|in_progress|completed),
  created_at TIMESTAMPTZ,
  processed_at TIMESTAMPTZ
)
```

### 5. Políticas de seguridad

- **Insert**: Cualquiera puede enviar feedback
- **Select**: Solo usuarios autenticados (admins) pueden leer
- **Update**: Solo usuarios autenticados (admins) pueden actualizar

## 🔧 Verificación

Para verificar que todo funciona:

1. Ve a `/feedback` en tu aplicación
2. Completa y envía un formulario
3. Verifica en Supabase > Table Editor > feedback que el registro se haya creado

## 🚨 Importante

- La tabla se crea con RLS habilitado por seguridad
- Los usuarios no autenticados solo pueden insertar, no leer ni modificar
- El reCAPTCHA se verifica antes de insertar en la base de datos
- Los tokens de reCAPTCHA NO se almacenan en la base de datos
