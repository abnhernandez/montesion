# Git Workflow Profesional

## Estrategia de ramas
- main: rama estable de produccion.
- develop: integracion de funcionalidades.
- feature/<scope>-<nombre-corto>: nuevas funcionalidades.
- hotfix/<scope>-<nombre-corto>: correcciones urgentes.

## Politica de commits (Conventional Commits)
Formato:
<tipo>(<scope>): <descripcion>

Tipos permitidos:
- feat
- fix
- refactor
- docs
- test
- chore
- perf

Ejemplos:
- feat(auth): add safe redirect after sign in
- fix(middleware): protect private usuarios routes
- refactor(supabase): unify browser client usage
- docs(readme): rewrite project for portfolio presentation

## Pull Request estandar
Cada PR debe incluir:
1. Problema.
2. Solucion.
3. Evidencia visual (si aplica).
4. Riesgos y rollback.
5. Checklist de calidad.

Checklist minimo:
- [ ] npm run lint
- [ ] npm run build
- [ ] pruebas manuales en rutas afectadas
- [ ] actualizacion de docs relevante

## Versionado
Usar SemVer:
- MAJOR: cambios incompatibles.
- MINOR: nuevas funcionalidades compatibles.
- PATCH: correcciones compatibles.

## Recomendaciones para portafolio
- Evitar commits gigantes.
- Mantener PRs pequenos y enfocados.
- Referenciar issues o tickets.
- Escribir mensajes en ingles tecnico claro.
