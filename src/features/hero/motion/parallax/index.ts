/**
 * Barrel público del submódulo parallax.
 */

export { default, default as HeroParallax, HeroParallaxBind } from "./HeroParallax";
export { useHeroParallax, type HeroParallaxStyles } from "./HeroParallax.hook";
export {
  HERO_PARALLAX_HALO_MAX_X_PX,
  HERO_PARALLAX_HALO_MAX_Y_PX,
  HERO_PARALLAX_WARM_MAX_X_PX,
  HERO_PARALLAX_WARM_MAX_Y_PX,
  HERO_PARALLAX_DUST_MAX_X_PX,
  HERO_PARALLAX_DUST_MAX_Y_PX,
  HERO_PARALLAX_LERP_ALPHA,
  HERO_PARALLAX_POINTER_MEDIA_QUERY,
  HERO_PARALLAX_REDUCED_MOTION_MEDIA_QUERY,
} from "./HeroParallax.constants";
export {
  clampRange,
  lerp,
  lerp2D,
  normalizePointerToMinus1Plus1,
  scaleToMaxPixels,
  buildTranslate3dPx,
  buildTranslatePropertyPx,
  buildHaloParallaxStyle,
  buildWarmParallaxStyle,
  buildDustParallaxStyle,
  type Point2D,
} from "./HeroParallax.utils";
