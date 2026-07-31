/**
 * src/constants/routes.ts
 *
 * Definición canónica de rutas de la aplicación (tanto anchors de landing
 * como rutas futuras del router).
 *
 * Regla: NUNCA escribir un href="/#catalogo" hardcodeado en un componente.
 * Importar desde aquí. Así cambiar una ruta = 1 único archivo actualizado.
 */

/** Anchors de la Landing Page (coinciden con id="" de las secciones). */
export const ANCHORS = {
  INICIO: "inicio",
  CATALOGO: "catalogo",
  NOSOTROS: "nosotros",
  BLOG: "blog",
  CONTACTO: "contacto",
} as const;

export type AnchorKey = (typeof ANCHORS)[keyof typeof ANCHORS];

/** Rutas internas (para cuando añadamos React Router). */
export const ROUTES = {
  HOME: "/",
  PRODUCTS: "/productos",
  SERVICES: "/servicios",
  CONTACT: "/contacto",
  ABOUT: "/nosotros",
  BLOG: "/blog",
  DASHBOARD: "/dashboard",
  AUTH_LOGIN: "/login",
  NOT_FOUND: "/404",
} as const;

export type RouteKey = (typeof ROUTES)[keyof typeof ROUTES];

/** Helper: construye href anchor a partir de la key. */
export function anchor(key: AnchorKey): string {
  return `#${key}`;
}
