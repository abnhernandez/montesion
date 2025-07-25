# Instrucciones para Ejecutar el SQL de Configuración

## Pasos para configurar la base de datos en Supabase:

### 1. Acceder al Dashboard de Supabase
1. Ve a [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto (montesion)

### 2. Abrir el Editor SQL
1. En el menú lateral izquierdo, busca "SQL Editor"
2. Haz clic en "SQL Editor"
3. Verás una interfaz donde puedes escribir y ejecutar SQL

### 3. Ejecutar el Script de Configuración
1. Abre el archivo `scripts/setup-database.sql` en VS Code
2. Copia todo el contenido del archivo (Ctrl+A, Ctrl+C)
3. Pega el contenido en el editor SQL de Supabase (Ctrl+V)
4. Haz clic en el botón "Run" o presiona Ctrl+Enter

### 4. Verificar la Ejecución
Deberías ver mensajes de éxito indicando que:
- Las tablas se crearon correctamente
- Las políticas RLS se configuraron
- Los triggers se establecieron
- Los datos de ejemplo se insertaron

### 5. Verificar en la Interfaz
1. Ve a "Table Editor" en el menú lateral
2. Deberías ver las siguientes tablas:
   - `users`
   - `todos`
   - `prayer_requests`
   - `newsletter_subscriptions`

## Solución de Problemas

### Si encuentras errores:

**Error de permisos:**
- Asegúrate de estar ejecutando como administrador del proyecto
- Verifica que tu usuario tenga permisos de escritura

**Error "relation already exists":**
- Es normal, significa que algunas tablas ya existían
- El script está diseñado para ser seguro de ejecutar múltiples veces

**Error de políticas RLS:**
- Si ves errores sobre políticas que ya existen, puedes ignorarlos
- Las políticas se actualizarán con la nueva configuración

### Verificación Manual

Para verificar que todo funciona:

1. Ve a `https://tu-dominio/setup` en tu aplicación
2. Haz clic en "Ejecutar Diagnóstico"
3. Deberías ver todas las verificaciones en verde

### Contacto de Soporte

Si continúas teniendo problemas:
1. Captura pantalla del error específico
2. Revisa la consola del navegador para errores adicionales
3. Verifica que las variables de entorno estén correctamente configuradas

## Variables de Entorno Requeridas

Asegúrate de tener estas variables en tu archivo `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-anonima
```

## Comandos de Desarrollo

Para ejecutar diagnósticos desde la consola del navegador:
```javascript
// Abrir la consola del navegador (F12)
// Ejecutar:
await runSystemDiagnostic()
```
