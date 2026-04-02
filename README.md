# Monte Sion - Plataforma Web Comunitaria

Aplicacion web fullstack para una comunidad cristiana, orientada a experiencia de usuario, contenido, autenticacion y participacion digital.

## Demo y repositorio
- Produccion: https://montesion.me
- Staging: https://montesion.vercel.app
- Repositorio: actualiza esta URL con tu repositorio publico final

## Propuesta de valor
Monte Sion centraliza contenido, interaccion y servicios comunitarios en una sola plataforma moderna: informacion institucional, localizador de templos, autenticacion de usuarios y formularios de contacto/oracion.

## Mi rol en el proyecto
Rol principal: Fullstack Engineer (Next.js + Supabase)

Responsabilidades tecnicas principales:
- Arquitectura de frontend con Next.js App Router.
- Integracion de autenticacion y datos con Supabase.
- Implementacion de middleware y reglas de acceso.
- Estandarizacion de manejo de errores y validaciones.
- Hardening inicial de seguridad web (headers + redirect seguro).
- Documentacion tecnica y preparacion para portafolio.

## Stack tecnico
- Next.js 15 (App Router)
- React 19
- TypeScript 5
- Tailwind CSS 4
- Supabase (Auth + Postgres + Storage)
- Radix UI + componentes reutilizables
- Zod para validacion

## Funcionalidades principales
- Autenticacion y gestion de sesion.
- Localizador de templos y contenido informativo.
- Formulario de peticiones de oracion.
- Modulos de comunidad, cursos y perfil.
- Paginas institucionales (terminos, privacidad, FAQ, etc.).

## Mejoras recientes para estandar profesional
- Consolidacion de cliente Supabase para reducir deuda tecnica.
- Proteccion activa de rutas privadas en middleware.
- Redirect seguro post-login (evita open redirects).
- Headers base de seguridad en configuracion de Next.
- Limpieza de errores de lint bloqueantes en modulos comunitarios.
- Build de produccion validado correctamente.

## Seguridad y buenas practicas implementadas
- Validacion de ruta redirect interna en login.
- Protección de rutas privadas /usuarios en middleware.
- Security headers globales (CSP, HSTS, X-Frame-Options, etc.).
- Manejo de errores controlado en operaciones async criticas.

## Estructura sugerida (actual + evolucion)
Estado actual: App Router + componentes por dominio.
Evolucion recomendada:
- app/(public)
- app/(auth)
- app/(private)
- features/<dominio>
- shared/ui
- shared/lib
- shared/types

## Ejecutar localmente
### Prerrequisitos
- Node.js 20+
- npm

### 1. Instalar dependencias
npm install

### 2. Configurar variables de entorno
Crear archivo .env.local con al menos:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- NEXT_PUBLIC_SITE_URL
- NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

### 3. Ejecutar desarrollo
npm run dev

### 4. Validar calidad
npm run lint
npm run build

## Resultados tecnicos verificables
Ultima validacion local (WSL):
- Build: exitoso
- Lint: sin errores bloqueantes
- Warnings pendientes: reglas de hooks exhaustivos en modulos de comunidad

## Evidencias para portafolio
Revisa:
- docs/PORTFOLIO_EXECUTION_PLAN.md
- docs/PORTFOLIO_EVIDENCE_CHECKLIST.md
- docs/GIT_WORKFLOW.md

## Roadmap corto
- Reducir warnings de hooks con useCallback/useMemo segun caso.
- Agregar pruebas de integracion para auth y formularios.
- Publicar changelog alineado con SemVer por release.
- Añadir CI para lint + build en pull requests.

## Licencia
Definir licencia antes de publicar el repositorio (MIT recomendada para portafolio).
