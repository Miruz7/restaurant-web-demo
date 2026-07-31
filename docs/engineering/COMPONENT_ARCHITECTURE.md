# Arquitectura de Componentes

## Reglas generales

- No utilizar `PropsWithChildren`. Declarar `children: ReactNode` explícitamente cuando un componente acepte hijos.

- Todos los componentes reutilizables deberán aceptar className cuando tenga sentido extender sus estilos sin modificar el componente.
  Por ejemplo:
  <Container className="pt-32">
  sin romper el diseño base.

- Las variantes deberán modelarse con props tipadas (variant, size, color, etc.), nunca con múltiples booleanos.
  Por ejemplo:
  Evitar:
  <Button
    primary
    large
    rounded
  />

Preferir:
<Button
  variant="primary"
  size="lg"
  radius="full"
/>
Esto hace que la API del componente sea mucho más clara y escalable.

- Los componentes estructurales deberán ser polimórficos cuando tenga sentido.

- Cuando un componente tenga configuraciones reutilizables (mapas de tamaños, variantes, constantes o comportamientos), estas deberán vivir en un archivo Component.config.ts separado del componente.

- Los tipos de variantes (size, variant, radius, align, width...) deberán derivarse desde la configuración y no repetirse manualmente en los archivos de tipos.
  Ejemplo:

  ```ts
  // Component.config.ts
  export const BUTTON_SIZES = { sm: "...", md: "...", lg: "..." } as const;
  export type ButtonSize = keyof typeof BUTTON_SIZES;

  // Component.types.ts
  export interface ButtonProps {
    readonly size?: ButtonSize;
  }
  ```

  Así añadir una nueva variante es una única modificación en Component.config.ts.

- Cuando un componente empiece a tener más de 3-4 props booleanas ortogonales, considerar migrarlas a unions semánticas para que la API no explote en booleanos.
  Ejemplo Container (dirección futura):

  ```
  centered?: boolean        +        fullWidth?: boolean
  → align?: "left" | "center"       → width?: "content" | "full"
  ```

- Cuando la composición de className de un componente supere las 3-4 concatenaciones condicionales, extraer la lógica a una función pura dentro de Component.config.ts (por ejemplo `getXxxClasses(props)`) para que el cuerpo del componente sea declarativo y la lógica de clases sea testeable de forma aislada.

- Las props tipadas deberán derivarse de la configuración cuando sea posible (por ejemplo, usando keyof typeof CONFIG).

- Cuando un componente requiera combinar múltiples aspectos visuales (fondo + texto + borde + overlay + degradado + imagen de fondo + vídeo, etc.), evitar mapas independientes tipo `BACKGROUNDS + BORDERS + OVERLAYS` y preferir un único mapa `VARIANTS` que defina la variante como un todo.
  Ejemplo (dirección futura para Section):

  ```ts
  export const SECTION_VARIANTS = {
    default: {
      background: "",
      color: "",
      border: "",
      overlay: "",
    },
    primary: {
      background: "bg-primary",
      color: "text-secondary",
      border: "",
      overlay: "",
    },
    heroImage: {
      background: "bg-cover bg-center",
      color: "text-secondary",
      border: "",
      overlay:
        "after:bg-primary after:opacity-75 after:absolute after:inset-0 after:content-['']",
    },
  } as const;
  ```

  De esta forma ampliar a degradados, vídeos o imágenes hero complejas es una entrada nueva en VARIANTS, no un nuevo mapa que mantener sincronizado.

- Los componentes tipográficos de texto plano (Text, Caption) deberán ser polimórficos cuando se implemente la arquitectura polimórfica del proyecto, para no quedar ligados a un tag HTML concreto.
  Ejemplo (dirección futura para Text):

  ```tsx
  <Text as="span">...</Text>
  <Text as="label" htmlFor="email">Correo</Text>
  <Text as="li">Elemento de lista sin <p> dentro</Text>
  ```

  Permite anidar Text en contextos donde `<p>` es inválido (botones, labels, list-items). Hasta entonces `<Text>` usará `<p>` como tag por defecto.

- Los componentes tipográficos de Heading deberán permitir desacoplar el nivel semántico HTML (`level={1..6}` que decide el tag `<h1>..<h6>`) de la apariencia visual (`variant="display" | "section" | "sub-section" | "default"`).
  Ejemplo (dirección futura para Heading):

  ```tsx
  // Semánticamente es un H2 (SEO) pero visualmente es enorme (display)
  <Heading level={2} variant="display">
    Título gigante del Hero
  </Heading>
  // Semánticamente es un H1 (único por página) pero visualmente "pequeñito"
  <Heading level={1} variant="section">
    Título de sección dentro de una categoría
  </Heading>
  ```

  El nivel (1..6) = SEO / accesibilidad ; la variant = aspecto visual. Hoy en día ambos van acoplados vía `HEADING_VARIANTS[level]`, la separación prepara el terreno para Design Systems más grandes.

- Los componentes tipográficos podrán evolucionar a componentes polimórficos (`as`) cuando exista una necesidad real.
  No implementar esta capacidad de forma preventiva.

- La semántica HTML y la apariencia visual son conceptos distintos.
  Si un componente necesita desacoplar ambos aspectos, utilizar variantes visuales (`variant`) además del nivel semántico (`level`), evitando que uno condicione necesariamente al otro.
  No implementar esta separación hasta que exista un caso de uso real.

- Cuando una combinación concreta de variantes (ej: `variant="primary"` + `size="lg"`) requiera estilos que no se derivan de la unión de sus variantes independientes, implementar **Compound Variants** como una tabla de lookup adicional en el `.config.ts` del componente, NO como condicionales `if (variant==='primary' && size==='lg')` dentro del cuerpo del componente.
  Ejemplo (dirección futura para Button):

  ```ts
  // Button.config.ts
  export const BUTTON_COMPOUND_VARIANTS = [
    {
      variant: "primary",
      size: "lg",
      class: "tracking-wide uppercase font-semibold",
    },
    {
      variant: "ghost",
      size: "sm",
      class: "hover:bg-transparent",
    },
  ] as const;
  ```

  Luego el componente itera esta lista aplicando aquellas entradas cuyas props coinciden. De este modo añadir un caso combinado especial = 1 entrada nueva en config, sin tocar el cuerpo del componente.

- El estado `loading` de los componentes interactivos (Button, Card acciones, Submit, etc.) debe:
  1. Siempre **conservar las dimensiones y layout** del componente (sin saltos, sin reflow).
  2. Dejar **deshabilitada la interacción** (pointer-events + aria-disabled).
  3. Cuando evolucionemos a indicador visual, insertar un elemento de loading en la capa de presentación **sin sustituir el children original**, por ejemplo:
     - wrapper `relative`
     - children renderizado con `opacity-0` (mantiene layout)
     - spinner/indicador renderizado en `absolute inset-0 flex items-center justify-center`
       De este modo el indicador visual reemplaza al contenido en la capa visual sin modificar las cajas del layout.
       No implementar un spinner complejo hasta que el Design System tenga un componente Loader propio.

- Cuando varias variantes necesiten comportamientos específicos en combinación (por ejemplo, `variant + size`), utilizar un sistema de compound variants dentro de `Component.config.ts`.
  No implementar esta capacidad hasta que exista una combinación que lo justifique.

- Los estados visuales (loading, hover, focus, active, disabled, etc.) forman parte del Design System.
  Cuando un estado necesite una representación visual específica, deberá definirse desde la configuración del componente y no mediante lógica dispersa.

- **Evitar constantes huérfanas dentro de la configuración de un solo componente** si el valor afecta o será consumido por **más de un componente o sistema del layout global**.
  Casos típicos: altura del Header, anchos mínimos/máximos de sidebar, gutters globales, top-offset de scroll spy, breakpoints críticos.
  Para esos valores crear un módulo dedicado en `src/constants/layout.ts` (o dentro de `src/lib/constants.ts` si afecta también a lógica agnóstica) y que cada componente consuma la constante importándola.
  Ejemplo (dirección futura):
  ```ts
  // src/constants/layout.ts
  export const HEADER_HEIGHT = 80; // consumido por Header.config.ts, Hero, ScrollSpy, Sticky, Drawer
  export const DRAWER_WIDTH_MD = 320; // consumido por Drawer y layout principal
  export const CONTENT_MAX_WIDTH = 1440;
  ```
  De esta forma `HEADER_HEIGHT` ya no es propiedad del componente Header, sino del layout global. Cambiarlo una vez = actualiza Hero padding-top, sticky offsets y scrollspy anchors de un solo golpe.
- ### Los componentes no contienen contenido
  Los componentes deben describir cómo renderizar la información, no definir la información.
  Todo contenido reutilizable deberá vivir en `src/data`.
  Ejemplos:
- Navigation
- Footer Links
- Redes sociales
- FAQs
- Testimonios
- Catálogos

- Los estados activos de los componentes de navegación (link activo, sección visible, menú seleccionado) deberán **resolverse por configuración o estado externo** y pasarse al componente vía props (ej: `activeId="catalogo"` o `isActive: (item) => boolean`).
  **Nunca** deberá el propio componente Navigation deducir el estado activo inspeccionando `window.location`, `useLocation()`, `scrollY`, ni implementando Scroll Spy dentro de su cuerpo.
  Esto mantiene el componente Navigation en su capa de responsabilidad (renderizar links) y evita mezclar renderizado con lógica de routing/navegación/scroll.
  Ejemplo (dirección futura):

  ```tsx
  // ❌ NO - Navigation deduce la URL internamente
  <Navigation items={PUBLIC_NAVIGATION} />

  // ✅ SI - Estado activo es una entrada explícita (externalizada)
  <Navigation
    items={PUBLIC_NAVIGATION}
    activeId={router.pathname}
  />
  // O con una función de matching (para casos complejos)
  <Navigation
    items={PUBLIC_NAVIGATION}
    isActive={(item) => scrollSpySectionId === item.id}
  />
  ```
