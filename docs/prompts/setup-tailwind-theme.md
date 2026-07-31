# TASK

Integrar el Design Token System de Papelería Nova con Tailwind CSS v4.

## Antes de comenzar

Leer obligatoriamente:

- docs/foundation/PROJECT_RULES.md
- docs/foundation/AI_CONTEXT.md
- docs/design/DESIGN_SYSTEM.md
- docs/engineering/ARCHITECTURE.md
- docs/engineering/CODING_STANDARDS.md
- docs/engineering/AGENT_WORKFLOW.md

## Objetivo

Configurar Tailwind CSS v4 para que los componentes puedan reutilizar los Design Tokens ya existentes.

## Requisitos

- Revisar la documentación oficial de Tailwind CSS v4 antes de implementar cualquier cambio.
- Mantener `src/styles/tokens/` como la fuente de verdad del Design System.
- Evitar duplicar valores entre Tailwind y los archivos de tokens.
- No modificar componentes React.
- No crear componentes nuevos.
- No añadir librerías adicionales.
- Mantener la configuración preparada para escalar.

## Resultado esperado

1. Explicar qué archivos fueron modificados.
2. Explicar cómo Tailwind reutiliza los Design Tokens.
3. Confirmar que no existen valores duplicados.
4. Ejecutar:
   - npm run build
   - npm run lint
5. Esperar revisión antes de continuar.
