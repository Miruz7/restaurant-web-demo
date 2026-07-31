# TASK

Crear el componente `Container` para Papelería Nova.

## Antes de comenzar

Leer obligatoriamente:

- docs/foundation/PROJECT_RULES.md
- docs/foundation/AI_CONTEXT.md
- docs/design/DESIGN_SYSTEM.md
- docs/engineering/ARCHITECTURE.md
- docs/engineering/COMPONENT_ARCHITECTURE.md
- docs/engineering/CODING_STANDARDS.md
- docs/engineering/AGENT_WORKFLOW.md

---

## Objetivo

Implementar el componente `Container`, que será la base estructural de todas las secciones del proyecto.

Debe ser un componente reutilizable, tipado, escalable y preparado para futuras variantes.

---

## Estructura esperada

```
src/components/ui/Container/
├── Container.tsx
├── Container.types.ts
├── Container.config.ts
└── index.ts
```

---

## Props

El componente debe implementar exactamente esta interfaz:

```ts
import type { ReactNode } from "react";

export interface ContainerProps {
  readonly children: ReactNode;
  readonly size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  readonly centered?: boolean;
  readonly fullWidth?: boolean;
  readonly className?: string;
}
```

---

## Configuración

Toda la configuración deberá vivir en:

```
Container.config.ts
```

Ejemplo:

```ts
export const CONTAINER_SIZES = {
  sm: "...",
  md: "...",
  lg: "...",
  xl: "...",
  "2xl": "...",
  "3xl": "...",
};
```

El componente NO deberá utilizar:

- switch
- if por tamaño
- valores hardcodeados repetidos

Debe consumir la configuración.

---

## Implementación

El componente deberá:

- utilizar `cn()` desde `@/lib`
- aceptar `className`
- aceptar `size`
- aceptar `centered`
- aceptar `fullWidth`
- utilizar los Design Tokens del proyecto cuando exista un token equivalente
- mantener una implementación limpia y fácil de extender

---

## Restricciones

No crear lógica innecesaria.

No crear estilos inline.

No duplicar valores.

No crear variantes que todavía no se utilicen.

No modificar otros componentes.

---

## Resultado esperado

Al finalizar:

1. Explicar los archivos creados.
2. Explicar las decisiones de implementación.
3. Mostrar la API final del componente.
4. Ejecutar:
   - npm run build
   - npm run lint
5. Esperar revisión antes de continuar.
