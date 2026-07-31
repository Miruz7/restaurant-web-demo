/**
 * src/data/navigation.ts
 *
 * Catálogo de enlaces de la navegación principal (menú público header).
 *
 * =====================================================================
 * ESTRATEGIA DE CRECIMIENTO FUTURA (Sprint 10.1)
 * =====================================================================
 * Hoy solo existe 1 dataset (navigation). Si aparecen más datos
 * estáticos por dominio (ej: categorías.ts, testimonials.ts,
 * faqs.ts, countries.ts, socialLinks.ts), agruparlos en
 * subcarpetas por dominio en vez de dejar archivos sueltos:
 *
 *   data/
 *     navigation/   → publicNavigation.ts, footerNavigation.ts, sidebar.ts
 *     catalog/      → categories.ts, collections.ts, productsSample.ts
 *     content/      → testimonials.ts, faqs.ts, postsSample.ts
 *     brand/        → socialLinks.ts, contactInfo.ts, openingHours.ts
 *     index.ts      → barrel único de datos estáticos.
 *
 * Por ahora NO se toca: 1 solo dataset no justifica subcarpetas.
 * =====================================================================
 */

export interface NavigationItem {
  readonly id: string;
  readonly label: string;
  readonly href: string;
}

export const PUBLIC_NAVIGATION: readonly NavigationItem[] = [
  {
    id: "home",
    label: "Inicio",
    href: "#home",
  },
  {
    id: "catalog",
    label: "Catálogo",
    href: "#catalogo",
  },
  {
    id: "about",
    label: "Nosotros",
    href: "#nosotros",
  },
  {
    id: "blog",
    label: "Blog",
    href: "#blog",
  },
  {
    id: "contact",
    label: "Contacto",
    href: "#contacto",
  },
] as const;
