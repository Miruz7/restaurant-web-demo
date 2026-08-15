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
  /* Sprint 12.7.B.3 · PARTE 2: BLUR OUT 0px → 8px en 500ms.
   * Aplica EXCLUSIVAMENTE a ::view-transition-old(root) (snapshot OLD escena actual).
   * Opacity = 1 constante (NO crossfade); NEW opacity = 0 hasta release 516ms.
   * @keyframes = cinemático; easing STORYTELLING_BEZIER .22,1,.36,1 = coincide stack.
   *
   * Sprint 12.7.B.3 · PARTE 4: FOCUS IN 8px → 0px en 500ms.
   * Aplica EXCLUSIVAMENTE a ::view-transition-new(root) TRAS el Invisible Swap
   *   (cuando :root[data-cinematic-vt-release=true]).
   * Misma duración 500ms · mismo bezier .22,1,.36,1 · fill both.
   * Total = 500 (blur out) + 500 (focus in) ≈ 1000ms = CINEMATIC_SCENE_DURATION_MS.
   */
  @keyframes cinematic-blur-out {
    from {
      filter: blur(0px);
    }
    to {
      filter: blur(8px);
    }
  }

  @keyframes cinematic-focus-in {
    from {
      filter: blur(8px);
    }
    to {
      filter: blur(0px);
    }
  }

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
   * SPRINT B.3 PARTE 2 BLUR OUT:
   *   animation-name: cinematic-blur-out
   *   animation-duration: 500ms
   *   bezier .22,1,.36,1
   *   fill-mode: both → 0 → 8px y mantiene 8px después 500ms hasta RELEASE 516ms
   *   opacity = 1 CONSTANTE (sin crossfade)
   *   NO scale · NO translate · NO steps en filter 0 → 8px animation
   * Duración general del VT lock = 1200ms (margen safe del lock; la animation-duration del blur es 500ms).
   * La duración 1200ms aquí NO controla opacity (opacity se libera por data-attr release).
   */
  :root::view-transition-old(root) {
    position: fixed;
    inset: 0 0 0 0;
    width: 100vw;
    height: 100vh;
    opacity: 1;
    animation-name: cinematic-blur-out;
    animation-duration: 500ms;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    animation-fill-mode: both;
    animation-iteration-count: 1;
    animation-delay: 0ms;
    mix-blend-mode: normal;
    z-index: 9999;
    filter: blur(0px);
  }

  /* NEW = Render actualizado tras el cambio.
   * SPRINT B.3 PARTE 3 INVISIBLE SWAP:
   *   PARTE 3 FUNDAMENTAL: ::view-transition-new(root) NUNCA arranca nítido.
   *   - filter: blur(8px)  ← snapshot NEW de Scene B ya está en 8px TODO el rato (opacity=0 → invisible anyway).
   *   - opacity: 0          ← CONSTANTE hasta RELEASE (NO fade-in, NO blur-in aquí).
   *   - animation-duration 1200ms lock margin; steps(2,jump-start) garantiza opacity 0 no interpolada.
   *   Al hacer RELEASE T=516ms salta opacity=1 (instant step) y permanece blur(8px) ← = Invisible Swap:
   *     OLD blur8 + opacity1 → OLD blur8 + opacity0  (instant)
   *     NEW blur8 + opacity0 → NEW blur8 + opacity1  (instant)
   *     ambos visualmente equivalentes, el usuario NO detecta el instante exacto del cambio.
   *   PARTE 3 termina aquí. El blur-in (8→0px) NEW queda para PARTE 4.
   *   NO translate · NO scale · NO overscan · NO inset negativo.
   *   Geometría Snapshot Lock Parte 1.4 intacta.
   */
  :root::view-transition-new(root) {
    position: fixed;
    inset: 0 0 0 0;
    width: 100vw;
    height: 100vh;
    opacity: 0;
    filter: blur(8px);
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
   *   INVISIBLE SWAP = ambas imágenes en blur(8px), solo salta la opacidad.
   *   OLD: opacity 0 instant · blur 8px (mantenido para 0 frames intermedios).
   *   NEW: opacity 1 instant · blur 8px START · PARTE 4 FOCUS-IN empieza aquí.
   *   ❌ NO ease · NO crossfade · NO 0.5/0.5 co-visible · NO duration <500ms de focus.
   */
  :root[data-cinematic-vt-release="true"]::view-transition-old(root) {
    opacity: 0 !important;
    animation-name: none !important;
    animation-duration: 1ms !important;
    animation-fill-mode: none !important;
    filter: blur(8px) !important;
  }
  :root[data-cinematic-vt-release="true"]::view-transition-new(root) {
    /* PARTE 4 FOCUS IN: exclusivo NEW snapshot (Regla 3).
     * - Empieza TRAS el swap (data-attr true → FOCUS_START ≈516ms).
     * - from=8px · to=0px · duration=500ms · bezier .22,1,.36,1.
     * - fill both = start en 8px (garantiza no frame nítido inicial) · end en 0 y lo mantiene.
     * - opacity 1 CONSTANTE TODO el focus in (Regla 6: NO fade-in / NO crossfade).
     * - animation-delay 0ms = inicia sincrónicamente con el swap step.
     */
    opacity: 1 !important;
    animation-name: cinematic-focus-in !important;
    animation-duration: 500ms !important;
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1) !important;
    animation-fill-mode: both !important;
    animation-iteration-count: 1 !important;
    animation-delay: 0ms !important;
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
    /* PARTE 2/3/4: reduced motion = sin blur, sin animación cinematográfica.
     * OLD: no blur-out, opacity 1.
     * NEW: no focus-in (blur 0, opacity 1, duration 1ms).
     * :root[data-cinematic-vt-release=true]::view-transition-new NO activa animation-name: cinematic-focus-in.
     */
    :root::view-transition-old(root) {
      animation-name: none !important;
      animation-duration: 1ms !important;
      animation-fill-mode: none !important;
      filter: blur(0px) !important;
      opacity: 1 !important;
    }
    :root::view-transition-new(root) {
      animation-duration: 1ms !important;
      animation-fill-mode: none !important;
      opacity: 1 !important;
      filter: blur(0px) !important;
    }
    :root[data-cinematic-vt-release="true"]::view-transition-old(root) {
      animation-name: none !important;
      animation-duration: 1ms !important;
      animation-fill-mode: none !important;
      filter: blur(0px) !important;
      opacity: 0 !important;
    }
    :root[data-cinematic-vt-release="true"]::view-transition-new(root) {
      animation-name: none !important;
      animation-duration: 1ms !important;
      animation-fill-mode: none !important;
      filter: blur(0px) !important;
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
