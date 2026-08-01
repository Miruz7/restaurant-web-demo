/**
 * features/hero/motion/index.ts
 *
 * Barrel file · Export público de la capa Motion desacoplada.
 *
 * Importar desde HomePage.tsx con:
 *   `import HeroEntrance, { ... } from "@/features/hero/motion"`
 */

export { default as HeroEntrance, HERO_MOTION_STYLE_ID } from "./HeroEntrance";
export { default } from "./HeroEntrance";
export {
  HERO_MOTION_BADGE_ENTRANCE_CLASS,
  HERO_MOTION_HEADING_ENTRANCE_CLASS,
  HERO_MOTION_DESCRIPTION_ENTRANCE_CLASS,
  HERO_MOTION_ACTIONS_ENTRANCE_CLASS,
  HERO_MOTION_SCROLL_INDICATOR_ENTRANCE_CLASS,
  HERO_MOTION_PRIMARY_CTA_HOVER_CLASS,
  HERO_MOTION_SECONDARY_CTA_HOVER_CLASS,
  HERO_MOTION_CTA_HOVER_SHARED_CLASS,
  HERO_MOTION_REDUCED_MOTION_DISABLE_CLASS,
  HERO_MOTION_HALO_BREATH_CLASS,
  HERO_MOTION_WARM_FLUCT_CLASS,
  HERO_MOTION_DUST_DRIFT_CLASS,
} from "./HeroMotion.config";
export { useHeroMotionPlayState, type UseHeroMotionPlayStateResult } from "./HeroMotion.hooks";
export { getHeroMotionPlayStateProperty } from "./HeroMotion.utils";

/* =====================================================================
 * Parallax editorial · Sprint 10.8.0 (sub-módulo independiente)
 * ===================================================================== */
export {
  default as HeroParallax,
  HeroParallaxBind,
  useHeroParallax,
  type HeroParallaxStyles,
  HERO_PARALLAX_HALO_MAX_X_PX,
  HERO_PARALLAX_HALO_MAX_Y_PX,
  HERO_PARALLAX_WARM_MAX_X_PX,
  HERO_PARALLAX_WARM_MAX_Y_PX,
  HERO_PARALLAX_DUST_MAX_X_PX,
  HERO_PARALLAX_DUST_MAX_Y_PX,
  HERO_PARALLAX_LERP_ALPHA,
} from "./parallax";
