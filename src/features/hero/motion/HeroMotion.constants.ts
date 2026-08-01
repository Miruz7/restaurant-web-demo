/**
 * HeroMotion.constants.ts
 *
 * SSOT numérico · Sprint 10.7.1 Motion Foundation.
 *
 * TODOS los valores numéricos de motion son explícitos en este archivo.
 * NO usar NINGÚN número mágico inline en clases, hooks o componentes.
 *
 * Principios:
 *  - Solo animar: transform + opacity (compositor, 0 layout shift)
 *  - Easing editorial: ease-out / cubic-bezier(.22,1,.36,1)
 *  - Sin bounce, sin elastic, sin scale, sin rotate, sin blur (salvo
 *    el pulse del scroll 3px de la flechita ScrollIndicator).
 *  - Stagger <= 80 ms entre elementos adyacentes.
 */

export const HERO_MOTION_EASE_OUT_CUBIC = "cubic-bezier(.22,1,.36,1)";

export const HERO_MOTION_TRANSFORM_TRANSLATE_Y_START_PX = 24;

export const HERO_MOTION_ENTRANCE_DURATION_MS = {
  badge: 480,
  heading: 620,
  description: 560,
  actions: 520,
  scroll: 520,
} as const;

export const HERO_MOTION_ENTRANCE_DELAY_MS = {
  badge: 60,
  heading: 160,
  description: 240,
  actions: 320,
  scroll: 420,
} as const;

export const HERO_MOTION_CTA_HOVER_TRANSITION_MS = 200;
export const HERO_MOTION_CTA_HOVER_TRANSLATE_Y_PX = -1;

export const HERO_MOTION_SCROLL_PULSE_DURATION_MS = 3600;
export const HERO_MOTION_SCROLL_PULSE_TRANSLATE_Y_PX = 3;
export const HERO_MOTION_SCROLL_HOVER_OPACITY = "1";

export const HERO_MOTION_IO_THRESHOLD = 0.25;
export const HERO_MOTION_IO_ROOT_MARGIN = "0px";

export const HERO_MOTION_ATTRIBUTE_SCOPE = "data-hero-motion";
export const HERO_MOTION_ATTRIBUTE_PLAY_STATE = "data-hero-motion-state";

export const HERO_MOTION_ENTRANCE_ANIMATION_NAME = {
  badge: "hero-entrance-badge",
  heading: "hero-entrance-heading",
  description: "hero-entrance-description",
  actions: "hero-entrance-actions",
  scroll: "hero-entrance-scroll",
} as const;

export const HERO_MOTION_SCROLL_PULSE_ANIMATION_NAME = "hero-scroll-pulse";
