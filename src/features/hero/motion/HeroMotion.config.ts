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

/* =====================================================================
 * AMBIENT MOTION · Sprint 10.7.2
 *
 * Clases inyectables additive a los 3 slots depth (Halo · Warm · Dust).
 * NO tocan colores, NO tocan opacidad base, NO tocan blending mode.
 * Solo animan opacity / translate3d() sobre los valores ya existentes.
 * ===================================================================== */

export const HERO_MOTION_HALO_BREATH_CLASS = [
  "hero-motion-ambient-halo",
  '[data-hero-motion="ambient-halo"]',
].join(" ");

export const HERO_MOTION_WARM_FLUCT_CLASS = [
  "hero-motion-ambient-warm",
  '[data-hero-motion="ambient-warm"]',
].join(" ");

export const HERO_MOTION_DUST_DRIFT_CLASS = [
  "hero-motion-ambient-dust",
  '[data-hero-motion="ambient-dust"]',
].join(" ");

export const HERO_MOTION_REDUCED_MOTION_DISABLE_CLASS = "";
