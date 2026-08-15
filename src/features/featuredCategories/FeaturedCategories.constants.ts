/**
 * FeaturedCategories.constants.ts — Sprint 12.3.3 — Master Artwork Integration.
 *
 * ✅ Imports ES Modules Vite de artwork definitivo.
 * ✅ 0 placeholders. 0 rutas hardcodeadas. 0 /assets/ 0 public/.
 * ✅ El resto (id, slug, title, description, iconKey, href, ctaText, motionDelayMs)
 *   INTACTO Sprint 12.3.2.
 */

import desayunosArtwork from "./assets/Desayunos.webp";
import comidasArtwork from "./assets/Comidas.webp";
import cenasArtwork from "./assets/Cenas.webp";
import bebidasArtwork from "./assets/Bebidas.webp";
import desayunosMenuArtwork from "./assets/Desayunos-menu.webp";
import comidasMenuArtwork from "./assets/Comidas-menu.webp";
import cenasMenuArtwork from "./assets/Cenas-menu.webp";
import bebidasMenuArtwork from "./assets/Bebidas-menu.webp";
import type { FeaturedCategoryIconKey, FeaturedCategoryItem } from "./FeaturedCategories.types";

export const DEFAULT_FEATURED_CATEGORIES_ID = "featured-categories";

export const FEATURED_CATEGORIES_HEADING = "Descubre nuestro menú";

export const FEATURED_CATEGORIES_SUBHEADING =
  "Disfruta una selección de desayunos, comidas, cenas y bebidas preparadas para compartir buenos momentos.";
/**
 * Temporalmente conservamos los iconKey originales.
 *
 * Más adelante actualizaremos el sistema de iconos para utilizar:
 * desayunos, comidas, cenas y bebidas.
 */
export const FEATURED_CATEGORY_ICON_KEYS = [
  "desayunos",
  "comidas",
  "cenas",
  "bebidas",
] as const satisfies ReadonlyArray<FeaturedCategoryIconKey>;

/* =============================================================================
 * FEATURED_CATEGORIES — 4 categorías · artwork definitivo · imagenes 1920×1080.
 *   Sólo cambia image.src → imports Vite artwork (objetivos 1,2,3 Sprint 12.3.3).
 *   Todo lo demás permanece INTACTO Sprint 12.3.2.
 * =========================================================================== */
export const FEATURED_CATEGORIES: ReadonlyArray<FeaturedCategoryItem> = [
  {
    id: "desayunos",
    slug: "desayunos",
    title: "Desayunos",
    description:
      "Comienza el día con desayunos preparados al momento, llenos de sabor y tradición.",
    iconKey: "desayunos",
    image: {
      src: desayunosArtwork,
      alt: "Desayuno mexicano servido en una mesa de restaurante.",
      width: 1920,
      height: 1080,
      objectPosition: "center center",
    },
    menuArtwork: {
      src: desayunosMenuArtwork,
      alt: "Menú de desayunos con platillos, precios y opciones de la casa.",
      width: 1122,
      height: 1402,
    },
    href: "/categorias/desayunos",
    motionDelayMs: 0,
    ctaText: "Ver desayunos",
  },
  {
    id: "comidas",
    slug: "comidas",
    title: "Comidas",
    description:
      "Platillos mexicanos preparados con ingredientes seleccionados y el auténtico sabor de casa.",
    iconKey: "comidas",
    image: {
      src: comidasArtwork,
      alt: "Comida mexicana presentada en un restaurante.",
      width: 1920,
      height: 1080,
      objectPosition: "center right",
    },
    menuArtwork: {
      src: comidasMenuArtwork,
      alt: "Menú de comidas con entradas, fuertes, guarniciones y combinaciones.",
      width: 1023,
      height: 1537,
    },
    href: "/categorias/comidas",
    motionDelayMs: 80,
    ctaText: "Ver comidas",
  },
  {
    id: "cenas",
    slug: "cenas",
    title: "Cenas",
    description:
      "Opciones ideales para disfrutar una cena tranquila, deliciosa y preparada al momento.",
    iconKey: "cenas",
    image: {
      src: cenasArtwork,
      alt: "Cena mexicana servida en un restaurante durante la noche.",
      width: 1920,
      height: 1080,
      objectPosition: "62% center",
    },
    menuArtwork: {
      src: cenasMenuArtwork,
      alt: "Menú de cenas con especialidades nocturnas, sopas y parrilladas.",
      width: 1023,
      height: 1537,
    },
    href: "/categorias/cenas",
    motionDelayMs: 160,
    ctaText: "Ver cenas",
  },
  {
    id: "bebidas",
    slug: "bebidas",
    title: "Bebidas",
    description:
      "Aguas frescas, bebidas frías y opciones refrescantes para acompañar tus platillos.",
    iconKey: "bebidas",
    image: {
      src: bebidasArtwork,
      alt: "Bebidas frescas y refrescantes servidas en un restaurante.",
      width: 1920,
      height: 1080,
      objectPosition: "70% center",
    },
    menuArtwork: {
      src: bebidasMenuArtwork,
      alt: "Carta de bebidas con aguas frescas, jugos, refrescos y cafés.",
      width: 1024,
      height: 1535,
    },
    href: "/categorias/bebidas",
    motionDelayMs: 240,
    ctaText: "Ver bebidas",
  },
] as const;
