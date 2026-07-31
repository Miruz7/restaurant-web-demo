/**
 * src/constants/navigation.ts
 *
 * Constantes compartidas por sistemas de navegación:
 * max-depth, breakpoint de menú hamburguesa, copy prefijado para aria-labels,
 * orden de secciones por defecto...
 *
 * Los ENLACES concretos (textos, href) NO viven aquí:
 *   - El catálogo concreto de items vive en src/data/navigation.ts (separación datos/componente).
 *   - Aquí solo las reglas que gobiernan cómo se renderiza la navegación.
 */

/** Breakpoint a partir del cual mostramos menú inline desktop (no hamburguesa). */
export const NAV_DESKTOP_MIN_WIDTH_PX = 1024 as const;

/** Máxima profundidad de submenús soportada en header/sidebar. */
export const NAV_MAX_DEPTH = 2 as const;

/** Aria labels prefabricados para navegación principal / footer / sidebar. */
export const NAV_ARIA_LABELS = {
  HEADER: "Navegación principal",
  FOOTER: "Navegación del pie de página",
  SIDEBAR: "Navegación de la barra lateral",
  BREADCRUMBS: "Migas de pan",
} as const;
