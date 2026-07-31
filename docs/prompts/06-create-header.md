# TASK

Crear el componente `Header` para Papelería Nova.

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

Crear la estructura base del Header.

Debe ser un componente de composición.

No debe contener todavía lógica de scroll, animaciones ni navegación móvil.

---

# Estructura

```
src/components/layout/Header/

Header.tsx
Header.types.ts
Header.config.ts
index.ts
```

---

# Props

```ts
interface HeaderProps {
  readonly className?: string;
}
```

No añadir más props hasta que exista una necesidad real.

---

# Composición

El Header deberá utilizar:

- Section
- Container

y preparar tres zonas claramente diferenciadas:

```
+--------------------------------------+

LOGO

NAVIGATION

ACTIONS

+--------------------------------------+
```

Por ahora:

- Logo → placeholder de texto ("Papelería Nova")
- Navigation → placeholder vacío
- Actions → un Button reutilizando el componente ya creado ("Contáctanos")

No crear aún un componente Navigation.

---

# Configuración

Toda la configuración deberá vivir en:

```
Header.config.ts
```

Ejemplo:

- HEADER_HEIGHT
- HEADER_CLASSES

Los tipos deberán derivarse desde la configuración cuando corresponda.

---

# Restricciones

No implementar:

- Sticky
- Fixed
- Scroll detection
- Menú hamburguesa
- Dropdowns
- GSAP
- Lenis
- Framer Motion
- Responsive complejo

El Header solo debe representar la estructura.

---

# Resultado esperado

1. Explicar la composición.
2. Explicar por qué Header no conoce la navegación.
3. Ejecutar:

- npm run build
- npm run lint

4. Esperar revisión.
