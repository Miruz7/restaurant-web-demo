/**
 * HeroEntrance.tsx
 *
 * Component-HOC invisible · No-op DOM.
 *
 * Responsabilidad ÚNICA:
 *   - Montar una vez el <style> con @keyframes + .hero-motion-* classes
 *     scoped al Hero Motion.
 *
 * Usamos classes reales en <style> (en lugar de Tailwind arbitrary tokens)
 * para evitar conflictos con cubic-bezier() dentro de los corchetes [] de
 * Tailwind v4. Así el easing editorial y la multi-animación del Scroll
 * (entrance + pulse) funcionan en todos los browsers.
 *
 * NO render markup, NO children, NO state. Side effect minimal. 0 impacto en performance.
 */

import { useEffect, useRef } from "react";
import {
  HERO_MOTION_AMBIENT_ANIMATION_NAME,
  HERO_MOTION_CTA_HOVER_TRANSITION_MS,
  HERO_MOTION_CTA_HOVER_TRANSLATE_Y_PX,
  HERO_MOTION_CTA_PRIMARY_GLOW_BLUR_PX,
  HERO_MOTION_CTA_PRIMARY_GLOW_COLOR_RGBA,
  HERO_MOTION_CTA_PRIMARY_GLOW_OFFSET_Y_PX,
  HERO_MOTION_CTA_PRIMARY_GLOW_SPREAD_PX,
  HERO_MOTION_DUST_DRIFT_DIRECTION,
  HERO_MOTION_DUST_DRIFT_DURATION_MS,
  HERO_MOTION_DUST_DRIFT_EASING,
  HERO_MOTION_DUST_DRIFT_ITERATION,
  HERO_MOTION_EASE_OUT_CUBIC,
  HERO_MOTION_ENTRANCE_ANIMATION_NAME,
  HERO_MOTION_ENTRANCE_DELAY_MS,
  HERO_MOTION_ENTRANCE_DURATION_MS,
  HERO_MOTION_HALO_BREATH_DURATION_MS,
  HERO_MOTION_HALO_BREATH_EASING,
  HERO_MOTION_HALO_BREATH_ITERATION,
  HERO_MOTION_SCROLL_PULSE_ANIMATION_NAME,
  HERO_MOTION_SCROLL_PULSE_DURATION_MS,
  HERO_MOTION_WARM_FLUCT_DURATION_MS,
  HERO_MOTION_WARM_FLUCT_EASING,
  HERO_MOTION_WARM_FLUCT_ITERATION,
} from "./HeroMotion.constants";
import {
  buildHeroAmbientKeyframesCss,
  buildHeroEntranceKeyframesCss,
  buildHeroScrollPulseKeyframesCss,
} from "./HeroMotion.utils";

export const HERO_MOTION_STYLE_ID = "hero-motion-keyframes";

const buildHeroMotionClassesCss = (): string => {
  const entranceRule = (cls: string, name: string, durationMs: number, delayMs: number) =>
    `.${cls}{animation:${name} ${durationMs}ms ${HERO_MOTION_EASE_OUT_CUBIC} ${delayMs}ms both;will-change:opacity,transform;animation-play-state:var(--hero-motion-play,running);}`;

  const scrollDelay =
    HERO_MOTION_ENTRANCE_DELAY_MS.scroll + HERO_MOTION_ENTRANCE_DURATION_MS.scroll;

  const primaryGlow = `0 ${HERO_MOTION_CTA_PRIMARY_GLOW_OFFSET_Y_PX}px ${HERO_MOTION_CTA_PRIMARY_GLOW_BLUR_PX}px ${HERO_MOTION_CTA_PRIMARY_GLOW_SPREAD_PX}px ${HERO_MOTION_CTA_PRIMARY_GLOW_COLOR_RGBA}`;

  return [
    entranceRule(
      "hero-motion-entrance-badge",
      HERO_MOTION_ENTRANCE_ANIMATION_NAME.badge,
      HERO_MOTION_ENTRANCE_DURATION_MS.badge,
      HERO_MOTION_ENTRANCE_DELAY_MS.badge,
    ),
    entranceRule(
      "hero-motion-entrance-heading",
      HERO_MOTION_ENTRANCE_ANIMATION_NAME.heading,
      HERO_MOTION_ENTRANCE_DURATION_MS.heading,
      HERO_MOTION_ENTRANCE_DELAY_MS.heading,
    ),
    entranceRule(
      "hero-motion-entrance-description",
      HERO_MOTION_ENTRANCE_ANIMATION_NAME.description,
      HERO_MOTION_ENTRANCE_DURATION_MS.description,
      HERO_MOTION_ENTRANCE_DELAY_MS.description,
    ),
    entranceRule(
      "hero-motion-entrance-actions",
      HERO_MOTION_ENTRANCE_ANIMATION_NAME.actions,
      HERO_MOTION_ENTRANCE_DURATION_MS.actions,
      HERO_MOTION_ENTRANCE_DELAY_MS.actions,
    ),
    `.hero-motion-scroll-indicator{animation:${HERO_MOTION_ENTRANCE_ANIMATION_NAME.scroll} ${HERO_MOTION_ENTRANCE_DURATION_MS.scroll}ms ${HERO_MOTION_EASE_OUT_CUBIC} ${HERO_MOTION_ENTRANCE_DELAY_MS.scroll}ms both,${HERO_MOTION_SCROLL_PULSE_ANIMATION_NAME} ${HERO_MOTION_SCROLL_PULSE_DURATION_MS}ms ease-in-out ${scrollDelay}ms infinite alternate both;will-change:opacity,transform;animation-play-state:var(--hero-motion-play,running),var(--hero-motion-play,running);}`,
    `.hero-motion-scroll-indicator:hover{opacity:1 !important;}`,
    `.hero-motion-scroll-indicator:focus-visible{opacity:1 !important;}`,
    `.hero-motion-cta-primary,.hero-motion-cta-secondary{transition:transform ${HERO_MOTION_CTA_HOVER_TRANSITION_MS}ms ease-out,box-shadow ${HERO_MOTION_CTA_HOVER_TRANSITION_MS}ms ease-out,background-color ${HERO_MOTION_CTA_HOVER_TRANSITION_MS}ms ease-out,border-color ${HERO_MOTION_CTA_HOVER_TRANSITION_MS}ms ease-out;will-change:transform;}`,
    `.hero-motion-cta-primary:hover,.hero-motion-cta-secondary:hover{transform:translateY(${HERO_MOTION_CTA_HOVER_TRANSLATE_Y_PX}px);}`,
    `.hero-motion-cta-primary:hover{box-shadow:0 14px 40px rgba(0,0,0,0.26),${primaryGlow};}`,
    `.hero-motion-cta-secondary:hover{box-shadow:0 10px 30px rgba(0,0,0,0.20);}`,
    `.hero-motion-cta-primary:active,.hero-motion-cta-secondary:active{transform:translateY(0);}`,
    `.hero-motion-ambient-halo{animation:${HERO_MOTION_AMBIENT_ANIMATION_NAME.halo} ${HERO_MOTION_HALO_BREATH_DURATION_MS}ms ${HERO_MOTION_HALO_BREATH_EASING} 0ms ${HERO_MOTION_HALO_BREATH_ITERATION} both;will-change:opacity;animation-play-state:var(--hero-motion-play,running);}`,
    `.hero-motion-ambient-warm{animation:${HERO_MOTION_AMBIENT_ANIMATION_NAME.warm} ${HERO_MOTION_WARM_FLUCT_DURATION_MS}ms ${HERO_MOTION_WARM_FLUCT_EASING} 0ms ${HERO_MOTION_WARM_FLUCT_ITERATION} both;will-change:opacity;animation-play-state:var(--hero-motion-play,running);}`,
    `.hero-motion-ambient-dust{animation:${HERO_MOTION_AMBIENT_ANIMATION_NAME.dust} ${HERO_MOTION_DUST_DRIFT_DURATION_MS}ms ${HERO_MOTION_DUST_DRIFT_EASING} 0ms ${HERO_MOTION_DUST_DRIFT_ITERATION} ${HERO_MOTION_DUST_DRIFT_DIRECTION} both;will-change:transform;animation-play-state:var(--hero-motion-play,running);}`,
    `@media(prefers-reduced-motion:reduce){[data-hero-motion]{animation:none!important;transition:none!important;transform:none!important;opacity:1!important;}}`,
  ].join("\n");
};

function HeroEntrance() {
  const styleEl = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const existing = document.getElementById(HERO_MOTION_STYLE_ID) as HTMLStyleElement | null;

    if (existing) {
      styleEl.current = existing;
      return undefined;
    }

    const style = document.createElement("style");
    style.id = HERO_MOTION_STYLE_ID;
    style.setAttribute("data-hero-motion", "keyframes");
    style.innerHTML = [
      buildHeroEntranceKeyframesCss(),
      buildHeroScrollPulseKeyframesCss(),
      buildHeroAmbientKeyframesCss(),
      buildHeroMotionClassesCss(),
    ].join("\n");

    document.head.appendChild(style);
    styleEl.current = style;

    return () => {
      if (styleEl.current) {
        styleEl.current.remove();
        styleEl.current = null;
      }
    };
  }, []);

  return null;
}

export default HeroEntrance;
