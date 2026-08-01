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

/* =====================================================================
 * AMBIENT MOTION · Sprint 10.7.2
 *
 * Principio: el usuario debe sentir la escena viva, pero nunca notar
 * las animaciones conscientemente.
 *
 * Solamente opacity y transform: translate3d() → compositor GPU.
 * ===================================================================== */

export const HERO_MOTION_AMBIENT_ANIMATION_NAME = {
  halo: "hero-ambient-halo",
  warm: "hero-ambient-warm",
  dust: "hero-ambient-dust",
} as const;

/** 1. Halo Breathing — solo opacity · 0.95 ↔ 1.05 · 10s ease-in-out loop */
export const HERO_MOTION_HALO_BREATH_DURATION_MS = 10_000;
export const HERO_MOTION_HALO_BREATH_OPACITY_MIN = 0.95;
export const HERO_MOTION_HALO_BREATH_OPACITY_MAX = 1.05;
export const HERO_MOTION_HALO_BREATH_EASING = "ease-in-out";
export const HERO_MOTION_HALO_BREATH_ITERATION = "infinite";

/** 2. Warm Light Fluctuation — solo opacity · 0.92 ↔ 1 · 12s ease-in-out loop */
export const HERO_MOTION_WARM_FLUCT_DURATION_MS = 12_000;
export const HERO_MOTION_WARM_FLUCT_OPACITY_MIN = 0.92;
export const HERO_MOTION_WARM_FLUCT_OPACITY_MAX = 1;
export const HERO_MOTION_WARM_FLUCT_EASING = "ease-in-out";
export const HERO_MOTION_WARM_FLUCT_ITERATION = "infinite";

/**
 * 3. Dust Drift — diagonal ↖ (arriba-izquierda).
 *    Máximo 12 px · 38s · linear · alternate → nunca reinicio evidente.
 *    ↖ = translate3d(-12px, -8.5px, 0)  (ratio áureo visual 12 / 8.5 ≈ 1.41)
 */
export const HERO_MOTION_DUST_DRIFT_DURATION_MS = 38_000;
export const HERO_MOTION_DUST_DRIFT_TRANSLATE_X_PX = -12;
export const HERO_MOTION_DUST_DRIFT_TRANSLATE_Y_PX = -8.5;
export const HERO_MOTION_DUST_DRIFT_EASING = "linear";
export const HERO_MOTION_DUST_DRIFT_DIRECTION = "alternate";
export const HERO_MOTION_DUST_DRIFT_ITERATION = "infinite";

/** 4. CTA Primary — Glow suave adicional (solo botón azul) */
export const HERO_MOTION_CTA_PRIMARY_GLOW_COLOR_RGBA = "rgba(30,58,138,0.22)";
export const HERO_MOTION_CTA_PRIMARY_GLOW_SPREAD_PX = 0;
export const HERO_MOTION_CTA_PRIMARY_GLOW_BLUR_PX = 28;
export const HERO_MOTION_CTA_PRIMARY_GLOW_OFFSET_Y_PX = 10;
