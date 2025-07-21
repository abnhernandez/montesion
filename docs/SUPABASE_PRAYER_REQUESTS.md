# Configuración de Supabase para Peticiones de Oración

Este documento explica cómo configurar Supabase para el sistema de peticiones de oración de Monte Sion.

## Requisitos Previos

1. Cuenta en [Supabase](https://supabase.com)
2. Proyecto de Supabase creado
3. Variables de entorno configuradas

## Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con las siguientes variables:

```env
NEXT_PUBLIC_SUPABASE_URL=tu-proyecto-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-clave-publica-anonima
```

## Configuración de la Base de Datos

### 1. Ejecutar el Script SQL

Ve a tu proyecto de Supabase > SQL Editor y ejecuta el contenido del archivo `supabase-setup.sql`. Esto creará:

- Tabla `prayer_requests` para almacenar las peticiones
- Políticas de seguridad (RLS) apropiadas
- Triggers para timestamps automáticos

### 2. Verificar las Políticas de Seguridad

Las siguientes políticas están configuradas:

- **Inserción pública**: Cualquiera puede crear peticiones de oración
- **Lectura autenticada**: Solo usuarios autenticados pueden ver las peticiones
- **Actualización autenticada**: Solo usuarios autenticados pueden actualizar el estado

### 3. Estructura de la Tabla `prayer_requests`

```sql
CREATE TABLE prayer_requests (
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
```

## Uso de los Componentes

### Componente Principal: `PeticionDeOracion`

- Ubicación: `components/ui/peticiondeoracion.tsx`
- Función: Formulario público para enviar peticiones
- Características:
  - Validación en tiempo real
  - Integración directa con Supabase
  - Manejo de errores robusto
  - Tipos TypeScript seguros

### Componente Administrativo: `PrayerRequestsAdmin`

- Ubicación: `components/admin/PrayerRequestsAdmin.tsx`
- Función: Panel para administrar peticiones
- Características:
  - Lista todas las peticiones
  - Actualización de estados
  - Filtrado por estado
  - Interfaz responsiva

### Funciones Auxiliares: `prayer-requests.ts`

- Ubicación: `lib/prayer-requests.ts`
- Funciones disponibles:
  - `createPrayerRequest()`: Crear nueva petición
  - `getPrayerRequests()`: Obtener todas las peticiones
  - `updatePrayerRequestStatus()`: Actualizar estado

## Estados de las Peticiones

- **pending**: Recién recibida, esperando revisión
- **in_progress**: En proceso de oración/seguimiento
- **completed**: Petición completada/respondida

## Seguridad

### Row Level Security (RLS)

- Habilitado en todas las tablas
- Las peticiones solo pueden ser creadas públicamente
- La lectura y actualización requiere autenticación

### Validación de Datos

- Validación en frontend con TypeScript
- Validación en base de datos con constraints
- Sanitización automática de datos

## Mantenimiento

### Respaldos

Supabase maneja respaldos automáticos, pero se recomienda:

1. Exportar datos periódicamente
2. Mantener copias de los scripts SQL
3. Documentar cambios en el esquema

### Monitoreo

Usar el dashboard de Supabase para:

- Monitorear performance de queries
- Revisar logs de errores
- Analizar uso de la API

## Solución de Problemas

### Error: "Missing Supabase environment variables"

- Verificar que `.env.local` existe y tiene las variables correctas
- Reiniciar el servidor de desarrollo

### Error: "relation 'prayer_requests' does not exist"

- Ejecutar el script `supabase-setup.sql` en SQL Editor
- Verificar que la tabla fue creada correctamente

### Error: "Row Level Security policy violation"

- Verificar que las políticas RLS están configuradas
- Para operaciones administrativas, asegurar autenticación

## Migración desde API Externa

Si vienes de usar una API externa, los cambios principales son:

1. ❌ **Antes**: `fetch()` a endpoint externo
2. ✅ **Ahora**: Cliente Supabase directo

3. ❌ **Antes**: Manejo manual de errores HTTP
4. ✅ **Ahora**: Manejo de errores de Supabase

5. ❌ **Antes**: Sin tipos TypeScript
6. ✅ **Ahora**: Tipos completos y seguros

## Próximos Pasos

1. **Notificaciones**: Configurar webhooks para notificar nuevas peticiones
2. **Analytics**: Agregar métricas de peticiones recibidas/procesadas
3. **Export**: Función para exportar peticiones a PDF/Excel
4. **Categorías**: Agregar categorización de peticiones