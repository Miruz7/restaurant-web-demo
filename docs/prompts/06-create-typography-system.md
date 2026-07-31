# TASK

Crear el sistema tipográfico base para Papelería Nova.

## Antes de comenzar

Leer obligatoriamente:

- docs/foundation/PROJECT_RULES.md
- docs/foundation/AI_CONTEXT.md
- docs/design/DESIGN_SYSTEM.md
- docs/engineering/ARCHITECTURE.md
- docs/engineering/COMPONENT_ARCHITECTURE.md
- docs/engineering/UI_PHILOSOPHY.md
- docs/engineering/CODING_STANDARDS.md
- docs/engineering/AGENT_WORKFLOW.md

---

# Objetivo

Crear el sistema tipográfico reutilizable del proyecto.

Los componentes deben compartir una configuración común y reutilizar los Design Tokens existentes.

---

# Estructura esperada

```
src/components/ui/

typography/
├── Typography.config.ts
├── Typography.types.ts
└── index.ts

Heading/
├── Heading.tsx
└── index.ts

Text/
├── Text.tsx
└── index.ts

Caption/
├── Caption.tsx
└── index.ts
```

---

# Configuración

Toda la configuración deberá vivir únicamente en:

```
Typography.config.ts
```

Ejemplo:

- HEADING_TAGS
- HEADING_VARIANTS
- TEXT_VARIANTS
- CAPTION_VARIANTS

Los nombres pueden variar si se mantiene una arquitectura consistente.

---

# Tipos

Los tipos deberán derivarse utilizando:

```
keyof typeof ...
```

Nunca escribir unions manuales cuando puedan derivarse desde la configuración.

---

# Heading

Debe soportar:

```tsx
<Heading level={1}>
```

hasta

```tsx
<Heading level={6}>
```

No utilizar switch.

No utilizar múltiples if.

Utilizar un mapa de configuración.

El componente debe renderizar el elemento HTML correcto (`h1`–`h6`) según el nivel.

---

# Text

Debe soportar tamaños derivados desde la configuración.

Ejemplo:

```tsx
<Text size="lg">
```

---

# Caption

Debe ser un componente ligero pensado para texto auxiliar.

Debe reutilizar la configuración común.

---

# Implementación

Todos los componentes deberán:

- utilizar `cn()` desde `@/lib`
- aceptar `className`
- reutilizar la configuración compartida
- utilizar los Design Tokens
- mantener una implementación limpia
- no duplicar clases

---

# Restricciones

No crear lógica innecesaria.

No crear componentes gigantes.

No hardcodear variantes repetidas.

Toda la configuración debe centralizarse.

---

# Resultado esperado

1. Explicar los archivos creados.

2. Explicar la arquitectura elegida.

3. Mostrar la API pública.

4. Ejecutar:

- npm run build
- npm run lint

5. Esperar revisión.
