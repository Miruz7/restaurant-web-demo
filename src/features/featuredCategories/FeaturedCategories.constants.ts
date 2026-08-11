/**
 * FeaturedCategories.constants.ts — Sprint 12.3.3 — Master Artwork Integration.
 *
 * ✅ Imports ES Modules Vite de artwork definitivo.
 * ✅ 0 placeholders. 0 rutas hardcodeadas. 0 /assets/ 0 public/.
 * ✅ El resto (id, slug, title, description, iconKey, href, ctaText, motionDelayMs)
 *   INTACTO Sprint 12.3.2.
 */

import escolaresArtwork from "./assets/Escolares.webp";
import tecnologiaArtwork from "./assets/Tecnologia.webp";
import impresionArtwork from "./assets/Impresion.webp";
import oficinaArtwork from "./assets/Oficina.webp";
import type { FeaturedCategoryIconKey, FeaturedCategoryItem } from "./FeaturedCategories.types";

export const DEFAULT_FEATURED_CATEGORIES_ID = "featured-categories";

export const FEATURED_CATEGORIES_HEADING = "Explora nuestras categorías";

export const FEATURED_CATEGORIES_SUBHEADING =
  "Todo lo que necesitas para estudiar, trabajar y crear, organizado para que encuentres cada producto rápidamente.";

export const FEATURED_CATEGORY_ICON_KEYS = [
  "escolares",
  "tecnologia",
  "impresion",
  "oficina",
] as const satisfies ReadonlyArray<FeaturedCategoryIconKey>;

/* =============================================================================
 * FEATURED_CATEGORIES — 4 categorías · artwork definitivo · imagenes 1920×1080.
 *   Sólo cambia image.src → imports Vite artwork (objetivos 1,2,3 Sprint 12.3.3).
 *   Todo lo demás permanece INTACTO Sprint 12.3.2.
 * =========================================================================== */
export const FEATURED_CATEGORIES: ReadonlyArray<FeaturedCategoryItem> = [
  {
    id: "escolares",
    slug: "escolares",
    title: "Escolares",
    description:
      "Cuadernos, lápices, mochilas y todo lo necesario para empezar el ciclo escolar con energía.",
    iconKey: "escolares",
    image: {
      src: escolaresArtwork,
      alt: "Papelería escolar: cuadernos, lápices y mochila dispuestos editorialmente.",
      width: 1920,
      height: 1080,
      objectPosition: "center center",
    },
    href: "/categorias/escolares",
    motionDelayMs: 0,
    ctaText: "Ver productos escolares",
  },
  {
    id: "tecnologia",
    slug: "tecnologia",
    title: "Tecnología",
    description:
      "Laptops, tabletas, accesorios y periféricos para estudiar y trabajar sin límites.",
    iconKey: "tecnologia",
    image: {
      src: tecnologiaArtwork,
      alt: "Set de tecnología: laptop, tableta y accesorios en composición editorial premium.",
      width: 1920,
      height: 1080,
      objectPosition: "center right",
    },
    href: "/categorias/tecnologia",
    motionDelayMs: 80,
    ctaText: "Explorar tecnología",
  },
  {
    id: "impresion",
    slug: "impresion",
    title: "Impresión",
    description: "Cartuchos, tóner, hojas premium y servicios de impresión con calidad editorial.",
    iconKey: "impresion",
    image: {
      src: impresionArtwork,
      alt: "Impresora con hojas recién impresas, tinta y papelería sobre superficie oscura.",
      width: 1920,
      height: 1080,
      objectPosition: "62% center",
    },
    href: "/categorias/impresion",
    motionDelayMs: 160,
    ctaText: "Ver soluciones de impresión",
  },
  {
    id: "oficina",
    slug: "oficina",
    title: "Oficina",
    description: "Organizadores, carpetas, papelería y mobiliario para un espacio productivo.",
    iconKey: "oficina",
    image: {
      src: oficinaArtwork,
      alt: "Escritorio de oficina organizado con carpetas, planner y papelería premium.",
      width: 1920,
      height: 1080,
      objectPosition: "70% center",
    },
    href: "/categorias/oficina",
    motionDelayMs: 240,
    ctaText: "Ver productos de oficina",
  },
] as const;
