# TASK

Crear el componente `Button` para Papelería Nova.

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

Implementar el primer componente interactivo del Design System.

Debe ser reutilizable, tipado, accesible y preparado para evolucionar.

---

# Estructura esperada

```
src/components/ui/Button/
├── Button.tsx
├── Button.types.ts
├── Button.config.ts
└── index.ts
```

---

# Configuración

Toda la configuración deberá vivir únicamente en:

```
Button.config.ts
```

La configuración deberá incluir al menos:

- BUTTON_VARIANTS
- BUTTON_SIZES

Los tipos deberán derivarse mediante:

```ts
keyof typeof ...
```

---

# Props

El componente deberá implementar una interfaz similar a:

```ts
import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly fullWidth?: boolean;
  readonly loading?: boolean;
  readonly leftIcon?: ReactNode;
  readonly rightIcon?: ReactNode;
}
```

Los tipos `ButtonVariant` y `ButtonSize` deberán derivarse desde la configuración.

---

# Variantes iniciales

Implementar únicamente las variantes necesarias para el proyecto.

Por ejemplo:

- primary
- secondary
- ghost

No crear variantes que todavía no tengan un caso de uso.

---

# Tamaños

Implementar únicamente:

- sm
- md
- lg

---

# Implementación

El componente deberá:

- renderizar `<button>`
- utilizar `cn()` desde `@/lib`
- aceptar `className`
- aceptar `disabled`
- aceptar `loading`
- aceptar `leftIcon`
- aceptar `rightIcon`
- aceptar `fullWidth`
- mantener accesibilidad nativa
- reutilizar la configuración

---

# Loading

Cuando `loading=true`:

- el botón deberá permanecer deshabilitado
- mantener el ancho del botón
- seguir renderizando el contenido para evitar saltos de layout

No implementar todavía un spinner complejo.

---

# Restricciones

No utilizar:

- switch
- múltiples if para variantes
- estilos inline
- clases duplicadas

No modificar otros componentes.

No implementar animaciones todavía.

---

# Resultado esperado

1. Explicar la arquitectura.
2. Explicar las decisiones tomadas.
3. Mostrar la API pública.
4. Ejecutar:

- npm run build
- npm run lint

5. Esperar revisión.
