/**
 * FeaturedCategories.constants.ts
 *
 * SSOT: 4 categorías editoriales principales.
 * NO agregar más hasta tener roadmap.
 *
 * Los iconos NO se incluyen aquí: JSX pertenece a TSX.
 * Aquí almacenamos solo el key identificador; FeaturedCategoriesCard
 * lo resuelve a componente al renderizar.
 */

import type { FeaturedCategoryItem, FeaturedCategoryIconKey } from "./FeaturedCategories.types";

export const FEATURED_CATEGORIES: ReadonlyArray<FeaturedCategoryItem> = [
  {
    id: "escolares",
    slug: "escolares",
    title: "Escolares",
    description:
      "Cuadernos, lápices, mochilas y todo lo necesario para empezar el ciclo con energía.",
    iconKey: "escolares",
    image: {
      src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Editorial%20close-up%20of%20neat%20school%20desk%20with%20notebooks%20pencils%20backpack%20warm%20natural%20light%20dark%20wood%20background%20quiet%20composition%20cinematic%20photography&image_size=landscape_4_3",
      alt: "Artículos escolares sobre escritorio de madera.",
      width: 960,
      height: 720,
    },
    href: "/categorias/escolares",
    motionDelayMs: 0,
  },
  {
    id: "tecnologia",
    slug: "tecnologia",
    title: "Tecnología",
    description:
      "Laptops, tabletas, accesorios y periféricos para estudiar y trabajar sin límites.",
    iconKey: "tecnologia",
    image: {
      src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Editorial%20photograph%20minimal%20laptop%20wireless%20mouse%20tablet%20stylus%20on%20dark%20desk%20warm%20soft%20studio%20light%20high-end%20Apple-like%20composition&image_size=landscape_4_3",
      alt: "Set de tecnología: laptop, tableta y accesorios.",
      width: 960,
      height: 720,
    },
    href: "/categorias/tecnologia",
    motionDelayMs: 80,
  },
  {
    id: "impresion",
    slug: "impresion",
    title: "Impresión",
    description: "Cartuchos, toner, hojas premium y servicios de impresión con calidad editorial.",
    iconKey: "impresion",
    image: {
      src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Editorial%20still%20life%20printer%20freshly%20printed%20paper%20warm%20side%20light%20dark%20moody%20background%20minimal%20commercial%20photography&image_size=landscape_4_3",
      alt: "Impresora con hojas recién impresas.",
      width: 960,
      height: 720,
    },
    href: "/categorias/impresion",
    motionDelayMs: 160,
  },
  {
    id: "oficina",
    slug: "oficina",
    title: "Oficina",
    description: "Organizadores, carpetas, papelería y mobiliario para un espacio productivo.",
    iconKey: "oficina",
    image: {
      src: "https://coresg-normal.trae.ai/api/ide/v1/text_to_image?prompt=Editorial%20shot%20of%20organized%20office%20desk%20with%20folders%20planner%20pen%20cup%20warm%20soft%20light%20dark%20oak%20wood%20premium%20look&image_size=landscape_4_3",
      alt: "Escritorio de oficina organizado con papelería.",
      width: 960,
      height: 720,
    },
    href: "/categorias/oficina",
    motionDelayMs: 240,
  },
];

export const FEATURED_CATEGORIES_HEADING = "Explora nuestras categorías";

export const FEATURED_CATEGORIES_SUBHEADING =
  "Todo lo que necesitas para estudiar, trabajar y crear, organizado para que encuentres cada producto rápidamente.";

export const DEFAULT_FEATURED_CATEGORIES_ID = "categorias" as const;

export type { FeaturedCategoryIconKey };
