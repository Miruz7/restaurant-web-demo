# TASK

Crear el componente `Navigation` para Papelería Nova.

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

Implementar el sistema de navegación principal del sitio.

Debe ser un componente desacoplado del Header.

El Header únicamente alojará la navegación.

Navigation será responsable únicamente de renderizar los enlaces.

---

# Estructura esperada

```
src/components/layout/Navigation/
├── Navigation.tsx
├── Navigation.types.ts
├── Navigation.config.ts
└── index.ts
```

---

# Datos

Crear:

```
src/data/navigation.ts
```

Toda la información de navegación deberá vivir aquí.

Ejemplo:

```ts
export const PUBLIC_NAVIGATION = [
  {
    id: "home",
    label: "Inicio",
    href: "#home",
  },
];
```

El componente NO deberá contener enlaces hardcodeados.

---

# Configuración

Toda la configuración deberá vivir únicamente en:

```
Navigation.config.ts
```

Ejemplo:

- NAVIGATION_CLASSES
- NAVIGATION_ITEM_CLASSES
- NAVIGATION_LINK_CLASSES

Derivar los tipos cuando sea posible.

---

# Props

```ts
import type { NavigationItem } from "@/data/navigation";

export interface NavigationProps {
  readonly items: readonly NavigationItem[];
  readonly className?: string;
}
```

---

# NavigationItem

Definir un tipo reutilizable.

Ejemplo:

```ts
export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}
```

---

# Implementación

El componente deberá:

- renderizar `<nav>`
- renderizar una lista semántica `<ul><li>`
- renderizar enlaces `<a>`
- utilizar `cn()`
- aceptar `className`
- no conocer el Header
- no conocer el Hero
- no conocer rutas futuras

Solo renderizar la colección recibida.

---

# Accesibilidad

Implementar:

- aria-label="Navegación principal"
- lista semántica
- enlaces accesibles

---

# Restricciones

No implementar todavía:

- Menú móvil
- Dropdowns
- Mega menu
- Indicador activo
- Scroll Spy
- Scroll suave
- GSAP
- Framer Motion
- Lenis

Solo arquitectura.

---

# Integración

Una vez creado:

Actualizar `Header.tsx`.

Sustituir el placeholder vacío:

```tsx
<nav></nav>
```

por:

```tsx
<Navigation items={PUBLIC_NAVIGATION} />
```

El Header seguirá sin conocer los enlaces.

Solo importa:

- Navigation
- PUBLIC_NAVIGATION

---

# Resultado esperado

1. Explicar la arquitectura.
2. Explicar por qué los datos viven en `src/data`.
3. Mostrar la API pública.
4. Ejecutar:

- npm run build
- npm run lint

5. Esperar revisión.
