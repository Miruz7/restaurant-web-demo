# TASK

Crear el componente `Section` para Papelería Nova.

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

## Objetivo

Implementar el componente estructural `Section`.

Debe representar una sección semántica del documento y encargarse únicamente de:

- Espaciado vertical
- Fondo
- Altura
- ID
- Clase adicional

NO debe controlar el ancho del contenido.

El ancho será responsabilidad exclusiva del componente `Container`.

---

## Estructura esperada

```
src/components/ui/Section/
├── Section.tsx
├── Section.types.ts
├── Section.config.ts
└── index.ts
```

---

## Props

Implementar una interfaz similar a:

```ts
import type { ReactNode } from "react";

export interface SectionProps {
  readonly children: ReactNode;

  readonly id?: string;

  readonly spacing?: SectionSpacing;

  readonly background?: SectionBackground;

  readonly fullHeight?: boolean;

  readonly className?: string;
}
```

Los tipos `SectionSpacing` y `SectionBackground` deberán derivarse desde `Section.config.ts` utilizando:

```ts
keyof typeof ...
```

No escribir unions manuales.

---

## Configuración

Toda la configuración deberá vivir en:

```
Section.config.ts
```

Ejemplo:

```ts
export const SECTION_SPACING = {
  none: "...",
  sm: "...",
  md: "...",
  lg: "...",
  xl: "...",
} as const;

export const SECTION_BACKGROUNDS = {
  transparent: "...",
  primary: "...",
  secondary: "...",
  accent: "...",
} as const;
```

Los nombres son orientativos.

La implementación deberá reutilizar los Design Tokens existentes.

---

## Implementación

El componente deberá:

- renderizar un `<section>`
- utilizar `cn()` desde `@/lib`
- aceptar `className`
- aceptar `id`
- aceptar `spacing`
- aceptar `background`
- aceptar `fullHeight`
- no incluir `Container`
- no conocer el contenido interno
- mantener una implementación limpia y preparada para crecer

---

## Restricciones

No utilizar:

- switch
- múltiples if para variantes
- valores hardcodeados repetidos

Consumir siempre la configuración desde `Section.config.ts`.

No modificar otros componentes.

---

## Resultado esperado

Al finalizar:

1. Explicar los archivos creados.
2. Mostrar la API pública del componente.
3. Explicar cómo se reutiliza la configuración.
4. Ejecutar:

- npm run build
- npm run lint

5. Esperar revisión antes de continuar.
