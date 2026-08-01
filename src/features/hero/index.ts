/**
 * src/features/hero/index.ts
 *
 * Barrel de la feature "hero". Exporta por defecto el componente
 * Hero (orquestador). Los subcomponentes internos viven en ./components/
 * y se re-exportan aquí si el exterior los necesita (HeroBackground,
 * HeroOverlay, etc.).
 *
 * El exterior NO importa desde rutas profundas:
 *   import Hero, { HeroBackground, HeroContent } from "@/features/hero";
 */

export { default, default as Hero } from "./Hero";
export type { HeroProps } from "./Hero.types";
export {
  HERO_BASE_CLASS,
  HERO_HEIGHTS,
  DEFAULT_HERO_HEIGHT,
  DEFAULT_HERO_ID,
  getHeroClasses,
  getHeroInnerWrapperClasses,
  HERO_LIGHT_BADGE_CLASS,
  HERO_LIGHT_HEADING_CLASS,
  HERO_LIGHT_DESCRIPTION_CLASS,
  HERO_LIGHT_TEXT_CLASS,
  HERO_LIGHT_BUTTON_PRIMARY_CLASS,
  HERO_LIGHT_BUTTON_SECONDARY_CLASS,
  HERO_LIGHT_SCROLL_INDICATOR_CLASS,
} from "./Hero.config";

export * from "./components";
