/**
 * src/data/hero.ts
 *
 * Single Source of Truth del COPY del Hero (Sprint 10.2 — versión cerrada).
 *
 * Regla: TODO el texto del Hero vive AQUÍ. Nunca hardcodear strings en
 * HeroContent.tsx ni en HomePage.tsx. Así cuando llegue:
 *
 *   1. i18n              → añadir idioma (HERO_DATA_BY_LOCALE["es"])
 *   2. CMS (Contentful/Sanity/Supabase) → fetch reemplaza este objeto
 *   3. Aprobación copy   → cambiar SOLO este archivo
 *
 * Fuente del texto: HERO_SPECIFICATION.md § Contenido (versión PROPUESTA →
 * convertida en VERSIÓN CERRADA Sprint 10.2).
 */

/** Acción del CTA (texto visible + href destino — href placeholder hasta Router). */
export interface HeroCTAData {
  readonly label: string;
  readonly href: string;
}

/** Shape completo del copy Hero. */
export interface HeroData {
  readonly badge: string;
  readonly heading: string;
  readonly description: string;
  readonly primaryCTA: HeroCTAData;
  readonly secondaryCTA: HeroCTAData;
  /** Label accesible del Scroll Indicator (screen reader). */
  readonly scrollIndicatorLabel: string;
}

/* ========================================================================
 * DATOS CERRADOS Sprint 10.2.
 * Copiar aprobado del equipo. No modificar sin PR de producto.
 * ======================================================================*/

export const HERO_DATA: HeroData = {
  badge: "Cocina mexicana • Desayunos • Comidas",
  heading: "El sabor de casa, servido en cada plato.",
  description:
    "Disfruta una experiencia llena de sabor con desayunos, comidas, cenas y bebidas preparadas para compartir buenos momentos.",
  primaryCTA: {
    label: "Ver nuestro menú",
    href: "#catalogo",
  },
  secondaryCTA: {
    label: "Conoce nuestro restaurante",
    href: "#ubicacion",
  },
  scrollIndicatorLabel: "Desplazarse a la siguiente sección",
} as const;

/** Typed keys (si se necesita index dinámico en i18n/CMS). */
export type HeroDataKey = keyof HeroData;
