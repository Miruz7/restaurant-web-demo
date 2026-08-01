/**
 * HeroMotion.config.ts
 *
 * SSOT de clases Motion inyectables via className/props al Hero existente.
 *
 * Diseño DE ACOPLAMIENTO CERO con el Hero:
 *  - Hero.tsx, HeroBackground, HeroOverlay, HeroContent y ScrollIndicator
 *    NO se modifican (Freeze Sprint 10.6).
 *  - Motion se inyecta exclusivamente via:
 *      · Hero.config props ya existentes: badgeClassName, headingClassName,
 *        descriptionClassName, actionsClassName.
 *      · className del botón ScrollIndicator, Primary Button, Secondary Button.
 *
 * Las clases de animación reales (keyframes + duraciones) se inyectan en
 * HeroEntrance.tsx como <style> para evitar conflictos con cubic-bezier()
 * dentro de los brackets arbitrários `[animation:...]` de Tailwind v4.
 * Aquí solo declaramos los NOMBRES de esas clases y los data-attributes
 * que las acompañan.
 *
 * Prohibido en este archivo (Freeze):
 *  · Cambiar opacidades, colores, paddings, margins, sizes.
 *  · Cambiar stacking, layout, alineaciones.
 */

export const HERO_MOTION_BADGE_ENTRANCE_CLASS = [
  "hero-motion-entrance-badge",
  '[data-hero-motion="entrance-badge"]',
].join(" ");

export const HERO_MOTION_HEADING_ENTRANCE_CLASS = [
  "hero-motion-entrance-heading",
  '[data-hero-motion="entrance-heading"]',
].join(" ");

export const HERO_MOTION_DESCRIPTION_ENTRANCE_CLASS = [
  "hero-motion-entrance-description",
  '[data-hero-motion="entrance-description"]',
].join(" ");

export const HERO_MOTION_ACTIONS_ENTRANCE_CLASS = [
  "hero-motion-entrance-actions",
  '[data-hero-motion="entrance-actions"]',
].join(" ");

export const HERO_MOTION_SCROLL_INDICATOR_ENTRANCE_CLASS = [
  "hero-motion-scroll-indicator",
  '[data-hero-motion="scroll-indicator"]',
].join(" ");

export const HERO_MOTION_PRIMARY_CTA_HOVER_CLASS = [
  "hero-motion-cta-primary",
  '[data-hero-motion="cta-primary"]',
].join(" ");

export const HERO_MOTION_SECONDARY_CTA_HOVER_CLASS = [
  "hero-motion-cta-secondary",
  '[data-hero-motion="cta-secondary"]',
].join(" ");

export const HERO_MOTION_CTA_HOVER_SHARED_CLASS = ["hero-motion-cta-primary"].join(" ");

export const HERO_MOTION_REDUCED_MOTION_DISABLE_CLASS = "";
