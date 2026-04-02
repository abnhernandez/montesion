# Plan de Ejecucion para Portafolio - Monte Sion

Este plan esta pensado para dejar el proyecto listo para mostrar a reclutadores y equipos tecnicos.

## Fase 1 - Baseline tecnico (Dia 1)
1. Ejecutar calidad base.
- npm run lint
- npm run build
2. Guardar resultados en un registro de baseline.
3. Medir Lighthouse en rutas criticas.
- /
- /templos
- /oracion

Entregable: registro de estado inicial con fecha y metricas.

## Fase 2 - Estructura y modularidad (Dias 1-2)
1. Mantener App Router y organizar por dominio.
- app/(public)
- app/(auth)
- app/(private)
2. Crear estructura de capas.
- features/<dominio>
- shared/ui
- shared/lib
- shared/types
3. Mover logica fuera de paginas grandes a servicios y hooks.

Entregable: mapa de arquitectura actualizado.

## Fase 3 - Seguridad y resiliencia (Dias 2-3)
1. Asegurar rutas privadas con middleware.
2. Validar inputs con Zod en cliente y servidor.
3. Aplicar headers de seguridad en Next.
4. Estandarizar mensajes de error para usuario.
5. Registrar errores tecnicos con contexto minimo.

Entregable: checklist de seguridad basica completado.

## Fase 4 - Documentacion profesional (Dia 4)
1. README orientado a impacto.
2. Documentar decisiones tecnicas clave.
3. Actualizar arquitectura real del proyecto.
4. Agregar guia para ejecutar local y en produccion.

Entregable: documentacion consistente con el codigo real.

## Fase 5 - Evidencias del portafolio (Dia 5)
1. Capturas de pantalla.
- Home
- Login/registro
- Templos
- Oracion
- Vista movil
2. Video demo corto (2-3 min).
3. Diagramas de arquitectura y flujos.
4. Evidencia tecnica before/after (calidad y build).

Entregable: carpeta de evidencias lista para LinkedIn, CV y entrevistas.

## Fase 6 - Git profesional y releases (Dia 6)
1. Convencion de ramas.
- main
- develop
- feature/*
- hotfix/*
2. Conventional commits.
- feat
- fix
- refactor
- docs
- chore
3. Pull Request template con checklist.
4. Release notes por version.

Entregable: historial limpio y facil de auditar.

## Criterios de salida (Definition of Done)
- Build de produccion exitoso.
- No errores de lint bloqueantes.
- README entendible en menos de 3 minutos.
- Evidencias visuales y tecnicas disponibles.
- Flujo de ramas y commits documentado.
