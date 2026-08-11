/**
 * CinematicScene.config.ts — Sprint 12.7.B.
 * SSOT de la capa cinematográfica INDEPENDIENTE del motor Storytelling.
 *
 * ⚠️ CONGLOMERADO RIESGO — NO MODIFICAR ESTOS VALORES SIN REVISAR SINCRO.
 * STORYTELLING_TRANSITION_MS (stack vertical translate3d) = 500 ms — CONGELADO.
 * CinematicScene completa = 1000 ms.
 *
 * Solución sincronía para evitar dos animaciones independientes percibidas:
 *   Fase 1 — Ramp Up: 0 ms → 250 ms. Blur 0 → 8 px (50% pico antes del fin del Stack).
 *   Fase 2 — Plateau Peak: 250 ms → 500 ms. Blur constante 8 px (coincide con fin Stack).
 *   Fase 3 — Ramp Down: 500 ms → 1000 ms. Blur 8 px → 0 (nueva escena a nitidez completa).
 *
 * Resultado visual: transición UNIFICADA cinematográfica = 1000 ms.
 */

import { STORYTELLING_BEZIER_CSS } from "./StorytellingNavigation.config";

/* ----------------------------- Duración SSOT ----------------------------- */

export const CINEMATIC_SCENE_DURATION_MS = 1000 as const;

/* --------------------------------- Blur --------------------------------- */

export const CINEMATIC_MAX_BLUR_PX = 8 as const;
export const CINEMATIC_MIN_OPACITY = 0.92 as const;

/* -------------------------------- Fases --------------------------------- */

export const CINEMATIC_PHASE_RAMP_UP_END_MS = 250 as const;
export const CINEMATIC_PHASE_STACK_END_MS = 500 as const; // coincide fin translate3d Stack
export const CINEMATIC_PHASE_RAMP_DOWN_END_MS = CINEMATIC_SCENE_DURATION_MS; // 1000

/* ------------------------------ Easing SSOT ------------------------------ */

export const CINEMATIC_BEZIER_CSS = STORYTELLING_BEZIER_CSS;

/* -------------------------- Estados cinematográficos -------------------------- */

export const CINEMATIC_STATE = {
  IDLE: "idle",
  EXITING: "exiting",
  ENTERING: "entering",
} as const;

export type CinematicState = (typeof CINEMATIC_STATE)[keyof typeof CINEMATIC_STATE];

/* ------------------------- Exclusión de MapCard iframe ------------------------- */

export const CINEMATIC_EXCLUDE_BLUR_ATTR = "data-cinematic-exclude-blur" as const;

/* ------------------------------ CSS dinámico ------------------------------ */

/* Sprint 12.7.B.3 · PARTE 1.1 CORRECCIÓN — SNAPSHOT SCENE LOCK (View Transition API).
 * ⚠️ CORRECCIÓN DELAY 3-4s:
 *    Problema anterior = `animation-duration: 3600000s` (infinito) en ::view-transition old/new.
 *    Algunos motores Chromium calculan pre-pintura para animaciones con duración gigante,
 *    introduciendo un delay de 3-4 segundos en `vt.ready` y en el callback.
 *    Solución = duración controlada exacta = CINEMATIC_SCENE_DURATION_MS * 1.2 = 1200ms.
 *
 * PROHIBICIONES VIGENTES PARTE 1.1: NO blur · NO opacity fade · NO crossfade · NO overlay.
 *
 * ARQUITECTURA NUEVA CORREGIDA (diferencia vs anterior):
 *   ::view-transition-old(root) · opacity 1 constante · animation-duration: 1200ms steps(2)
 *      = se muestra OLD snapshot TODO el rango.
 *   ::view-transition-new(root) · opacity 0 constante · animation-duration: 1200ms steps(2)
 *      = NEW snapshot NUNCA se muestra hasta que salte el data-attribute release.
 *   html[data-cinematic-vt-release=true]:
 *      · OLD opacity 0 instant step
 *      · NEW opacity 1 instant step
 *      · animation-duration = 1ms (termina de inmediato)
 * No usar skipTransition() como mecanismo de release. Solamente usarlo en cleanup.
 */
export const CINEMATIC_HARD_LOCK_CSS = /* css */ `
/* ================================================================
 * VIEW TRANSITION API — SNAPSHOT LOCK PSEUDO-ELEMENTS (DURACIÓN FINITA!)
 * ================================================================ */
@supports (view-transition-name: __pn_detect) {
  /* Contenedor general de VT. */
  :root::view-transition {
    position: fixed;
    inset: 0 0 0 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    pointer-events: none;
    background: transparent;
  }

  /* OLD = Snapshot congelado escena actual.
   * animation-duration: 1200ms = CINEMATIC_SCENE_DURATION_MS × 1.2 (margen safe).
   * steps(2, jump-start) = sin interpolación de opacity. Se mantiene CONSTANTE = 1.
   * NO INFINITO. Delay render = 0.
   */
  :root::view-transition-old(root) {
    position: fixed;
    inset: 0 0 0 0;
    width: 100vw;
    height: 100vh;
    opacity: 1;
    animation-name: none;
    animation-duration: 1200ms;
    animation-timing-function: steps(2, jump-start);
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-delay: 0ms;
    mix-blend-mode: normal;
    z-index: 9999;
  }

  /* NEW = Render actualizado tras el cambio.
   * Misma duración 1200ms.
   * steps(2, jump-start) = opacity = 0 constante TODO el rango (sin crossfade).
   */
  :root::view-transition-new(root) {
    position: fixed;
    inset: 0 0 0 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    animation-name: none;
    animation-duration: 1200ms;
    animation-timing-function: steps(2, jump-start);
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-delay: 0ms;
    mix-blend-mode: normal;
    z-index: 9998;
  }

  /* RELEASE INSTANTÁNEO: data-cinematic-vt-release = true.
   * Salto step sin interpolación ni frame vacío.
   */
  :root[data-cinematic-vt-release="true"]::view-transition-old(root) {
    opacity: 0 !important;
    animation-name: none !important;
    animation-duration: 1ms !important;
    animation-fill-mode: none !important;
  }
  :root[data-cinematic-vt-release="true"]::view-transition-new(root) {
    opacity: 1 !important;
    animation-name: none !important;
    animation-duration: 1ms !important;
    animation-fill-mode: none !important;
  }
}

/* ======================================================================
 * CINEMATIC SCENE INNER (compatibilidad StorytellingSceneShell).
 * ====================================================================== */
.cinematic-scene-inner {
  position: relative;
  width: 100%;
  height: 100%;
  filter: blur(0px);
  opacity: 1;
  transform: none;
  will-change: auto;
  animation: none;
  visibility: visible;
  inset: auto;
  overflow: hidden;
}

.cinematic-scene-inner[data-cinematic-state="exiting"],
.cinematic-scene-inner[data-cinematic-state="entering"] {
  animation: none !important;
  filter: blur(0px) !important;
  opacity: 1 !important;
  visibility: visible !important;
  will-change: auto !important;
  position: relative !important;
  inset: auto !important;
  width: 100% !important;
  height: 100% !important;
  z-index: auto !important;
  overflow: hidden !important;
  pointer-events: none !important;
}

.cinematic-scene-inner[data-cinematic-state="idle"],
.cinematic-scene-inner:not([data-cinematic-state]) {
  animation: none !important;
  filter: blur(0) !important;
  opacity: 1 !important;
  visibility: visible !important;
  position: relative !important;
  inset: auto !important;
  width: 100% !important;
  height: 100% !important;
  z-index: auto !important;
  overflow: hidden !important;
  pointer-events: auto !important;
}

.cinematic-scene-inner:is([data-cinematic-state="exiting"], [data-cinematic-state="entering"])
  [${CINEMATIC_EXCLUDE_BLUR_ATTR}] {
  filter: none !important;
  opacity: 1 !important;
  animation: none !important;
}

@media (prefers-reduced-motion: reduce) {
  @supports (view-transition-name: __pn_detect) {
    :root::view-transition-old(root),
    :root::view-transition-new(root) {
      animation-duration: 1ms !important;
      animation-fill-mode: none !important;
      opacity: 1 !important;
    }
  }
  .cinematic-scene-inner,
  .cinematic-scene-inner[data-cinematic-state="exiting"],
  .cinematic-scene-inner[data-cinematic-state="entering"] {
    animation: none !important;
    filter: none !important;
    opacity: 1 !important;
    visibility: visible !important;
    position: relative !important;
    inset: auto !important;
    width: 100% !important;
    height: 100% !important;
    z-index: auto !important;
    pointer-events: auto !important;
  }
}
` as const;
