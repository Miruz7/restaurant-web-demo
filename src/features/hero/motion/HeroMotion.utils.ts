/**
 * HeroMotion.utils.ts
 *
 * Pure helpers para injection de keyframes CSS via <style> con prefijo
 * scoped por sección. Pure functions, NO hooks, NO side effects.
 */

import {
  HERO_MOTION_AMBIENT_ANIMATION_NAME,
  HERO_MOTION_DUST_DRIFT_TRANSLATE_X_PX,
  HERO_MOTION_DUST_DRIFT_TRANSLATE_Y_PX,
  HERO_MOTION_ENTRANCE_ANIMATION_NAME,
  HERO_MOTION_HALO_BREATH_OPACITY_MAX,
  HERO_MOTION_HALO_BREATH_OPACITY_MIN,
  HERO_MOTION_SCROLL_PULSE_ANIMATION_NAME,
  HERO_MOTION_SCROLL_PULSE_TRANSLATE_Y_PX,
  HERO_MOTION_TRANSFORM_TRANSLATE_Y_START_PX,
  HERO_MOTION_WARM_FLUCT_OPACITY_MAX,
  HERO_MOTION_WARM_FLUCT_OPACITY_MIN,
} from "./HeroMotion.constants";

export const buildHeroEntranceKeyframesCss = (): string => {
  const translateStart = `${HERO_MOTION_TRANSFORM_TRANSLATE_Y_START_PX}px`;

  const makeKeyframes = (name: string) =>
    `@keyframes ${name}{0%{opacity:0;transform:translate3d(0,${translateStart},0)}100%{opacity:1;transform:translate3d(0,0,0)}}`;

  return [
    makeKeyframes(HERO_MOTION_ENTRANCE_ANIMATION_NAME.badge),
    makeKeyframes(HERO_MOTION_ENTRANCE_ANIMATION_NAME.heading),
    makeKeyframes(HERO_MOTION_ENTRANCE_ANIMATION_NAME.description),
    makeKeyframes(HERO_MOTION_ENTRANCE_ANIMATION_NAME.actions),
    makeKeyframes(HERO_MOTION_ENTRANCE_ANIMATION_NAME.scroll),
  ].join("\n");
};

export const buildHeroScrollPulseKeyframesCss = (): string => {
  const bounce = `${HERO_MOTION_SCROLL_PULSE_TRANSLATE_Y_PX}px`;
  return `@keyframes ${HERO_MOTION_SCROLL_PULSE_ANIMATION_NAME}{0%{opacity:.45;transform:translate3d(0,0,0)}40%{opacity:.9;transform:translate3d(0,${bounce},0)}100%{opacity:.45;transform:translate3d(0,0,0)}}`;
};

export const buildHeroAmbientKeyframesCss = (): string => {
  const haloKeyframes = `@keyframes ${HERO_MOTION_AMBIENT_ANIMATION_NAME.halo}{0%{opacity:${HERO_MOTION_HALO_BREATH_OPACITY_MIN}}50%{opacity:${HERO_MOTION_HALO_BREATH_OPACITY_MAX}}100%{opacity:${HERO_MOTION_HALO_BREATH_OPACITY_MIN}}}`;

  const warmKeyframes = `@keyframes ${HERO_MOTION_AMBIENT_ANIMATION_NAME.warm}{0%{opacity:${HERO_MOTION_WARM_FLUCT_OPACITY_MIN}}50%{opacity:${HERO_MOTION_WARM_FLUCT_OPACITY_MAX}}100%{opacity:${HERO_MOTION_WARM_FLUCT_OPACITY_MIN}}}`;

  const dustTx = `${HERO_MOTION_DUST_DRIFT_TRANSLATE_X_PX}px`;
  const dustTy = `${HERO_MOTION_DUST_DRIFT_TRANSLATE_Y_PX}px`;
  const dustKeyframes = `@keyframes ${HERO_MOTION_AMBIENT_ANIMATION_NAME.dust}{0%{transform:translate3d(0,0,0)}100%{transform:translate3d(${dustTx},${dustTy},0)}}`;

  return [haloKeyframes, warmKeyframes, dustKeyframes].join("\n");
};

export const getHeroMotionPlayStateProperty = (
  play: boolean,
): Record<string, "running" | "paused"> => ({
  "--hero-motion-play": play ? "running" : "paused",
});
