# Arquitectura Actual - Monte Sion

Este documento describe la arquitectura real del proyecto al dia de hoy.

## Resumen
- Framework: Next.js 15 con App Router.
- Lenguaje: TypeScript.
- UI: Tailwind CSS + componentes reutilizables.
- Backend principal: Supabase (Auth, Postgres, Storage).
- Hosting: Vercel.

## Capas del sistema
1. Presentacion
- app/* (rutas y layouts)
- components/* (UI y componentes de dominio)

2. Dominio y estado
- auth-context para sesion y flujo auth
- hooks personalizados por feature

3. Datos e infraestructura
- utils/supabase/client.ts para cliente browser
- utils/supabase/server.ts para cliente server
- middleware.ts para proteccion de rutas y redirects

## Flujo de autenticacion
1. Usuario inicia sesion en /users/sign_in.
2. AuthProvider invoca Supabase Auth.
3. Se actualiza estado global de usuario/sesion.
4. Middleware protege rutas privadas /usuarios.
5. Post-login usa redirect seguro (solo rutas internas).

## Seguridad aplicada
- Headers globales en next.config.ts.
- Guard de rutas privadas en middleware.
- Validacion de redirect para mitigar open redirect.
- Manejo de errores en operaciones async criticas.

## Deuda tecnica identificada
- Warnings de hooks exhaustivos en modulos de comunidad.
- Conviene extraer servicios por dominio para reducir logica en componentes.
- Faltan pruebas automatizadas en flujos criticos.

## Evolucion recomendada de estructura
- app/(public)
- app/(auth)
- app/(private)
- features/<dominio>
- shared/ui
- shared/lib
- shared/types

## Comandos de validacion
- npm run lint
- npm run build

Estado actual verificado:
- Build de produccion exitoso.
- Lint sin errores bloqueantes.
