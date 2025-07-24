# 🚀 INSTRUCCIONES PARA COMPLETAR LA ELIMINACIÓN DE CUENTAS

## Paso 1: Ejecutar el SQL en Supabase

1. **Ve a tu proyecto de Supabase**: https://app.supabase.com/
2. **Navega a**: `SQL Editor` (en el menú lateral)
3. **Crea una nueva consulta** haciendo clic en `New query`
4. **Copia y pega** todo el contenido del archivo `delete-user-function.sql`
5. **Ejecuta la consulta** haciendo clic en `Run` o presionando `Ctrl+Enter`

## Paso 2: Verificar que se crearon las funciones

En el SQL Editor, ejecuta esta consulta para verificar:

```sql
SELECT routine_name, routine_type 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('delete_user', 'request_account_deletion');
```

Deberías ver algo como:
```
routine_name                | routine_type
delete_user                | FUNCTION
request_account_deletion   | FUNCTION
```

## Paso 3: Probar la funcionalidad

1. **Crea una cuenta de prueba** en tu aplicación
2. **Inicia sesión** con esa cuenta
3. **Ve a Perfil > Seguridad**
4. **Haz clic en "Eliminar cuenta"**
5. **Confirma en el modal**
6. **Verifica que**:
   - Se muestre el mensaje: "Cuenta eliminada exitosamente"
   - Seas redirigido a la página principal
   - No puedas iniciar sesión con esa cuenta nuevamente

## Paso 4: Verificar en la base de datos

En el SQL Editor de Supabase, ejecuta:

```sql
-- Verificar que el usuario fue eliminado de auth.users
SELECT email FROM auth.users WHERE email = 'tu-email-de-prueba@example.com';

-- Verificar que no hay datos en tus tablas personalizadas
SELECT * FROM public.users WHERE email = 'tu-email-de-prueba@example.com';
```

No deberías ver ningún resultado.

## ⚠️ Notas Importantes

1. **SECURITY DEFINER**: Las funciones usan `SECURITY DEFINER` para poder eliminar de `auth.users`
2. **Permisos**: Solo usuarios autenticados pueden ejecutar las funciones
3. **Seguridad**: Cada usuario solo puede eliminar sus propios datos
4. **Respaldo**: Si las funciones RPC fallan, el sistema usa el método manual de respaldo

## 🔧 Si algo no funciona

### Error: "permission denied for schema auth"
Ejecuta este SQL adicional:
```sql
GRANT USAGE ON SCHEMA auth TO postgres;
GRANT ALL ON ALL TABLES IN SCHEMA auth TO postgres;
```

### La función no se encuentra
Verifica que ejecutaste todo el SQL correctamente y sin errores.

### El usuario aún puede iniciar sesión
Verifica en `Authentication > Users` en el dashboard de Supabase que el usuario fue eliminado.

## ✅ Resultado Final

Después de seguir estos pasos:
- ✅ Los usuarios podrán eliminar completamente sus cuentas
- ✅ No podrán volver a iniciar sesión
- ✅ Todos sus datos serán eliminados de la base de datos
- ✅ El proceso será completamente automático y seguro
