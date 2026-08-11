/**
 * StorytellingNavigation.config.ts
 *
 * Sprint 12.0.1 — Scene Lock & Viewport Engine (REAL Scene-Based).
 * Sprint 12.5.3.a — Storytelling Exit Transition Hybrid (Hard Lock Dinámico).
 *
 * MODELO HÍBRIDO:
 *   - storytellingState = ACTIVE   → html[data-storytelling="true"]  → overflow hidden (escenas 100vh).
 *   - storytellingState = EXITING  → transición rápida, misma data-attr "true".
 *   - storytellingState = NATIVE   → html[data-storytelling="false"] → overflow auto (Footer scrollea).
 *   - storytellingState = RE_ENTER → regreso de Footer a Storytelling, preparar ACTIVE.
 */

/* ----------------------------- Duración / Lock ---------------------------- */

export const STORYTELLING_TRANSITION_MS = 500 as const;
export const STORYTELLING_TRANSITION_S = 0.5;
/** Lock +20 ms por seguridad (no overlapping de RAF). */
export const STORYTELLING_LOCK_DEBOUNCE_MS = STORYTELLING_TRANSITION_MS + 20;

/* -------------------------------- Curva ---------------------------------- */

export const STORYTELLING_BEZIER: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const STORYTELLING_BEZIER_CSS = "cubic-bezier(.22,1,.36,1)";

/* ----------------------------- Drivers ------------------------------------ */

export const STORYTELLING_WHEEL_THRESHOLD = 6;
export const STORYTELLING_TOUCH_SWIPE_THRESHOLD = 40;

/* --------------------------- Estados Híbridos ----------------------------- */
/**
 * Máquina de estados oficial · Sprint 12.5.3.a:
 *   ACTIVE     = Dentro del Storytelling · wheel lock · overflow hidden.
 *   EXITING    = User hace wheel abajo en última escena · próximo paso → NATIVE.
 *   NATIVE     = Control navegador devuelto · overflow auto · Footer accesible.
 *   RE_ENTER   = User wheel arriba estando en top de la página · próximo paso → ACTIVE.
 */
export const STORYTELLING_STATE = {
  ACTIVE: "ACTIVE",
  EXITING: "EXITING",
  NATIVE: "NATIVE",
  RE_ENTER: "RE_ENTER",
} as const;

export type StorytellingState = (typeof STORYTELLING_STATE)[keyof typeof STORYTELLING_STATE];

/* ----------------------------- Estructura -------------------------------- */

/**
 * Sprint 12.5.5 — Viewport Release Architecture MODALIDADES:
 *   - MODO ACTIVE / RE_ENTER  → Viewport es OVERLAY (fixed inset-0 · 100vh · z-1 · overflow hidden).
 *     Stack translate3d gestiona escenas. Wheel lock. Hard lock overflow en <html>.
 *   - MODO EXITING / NATIVE → Viewport es FLUJO NORMAL DOCUMENTO (relative · w-full · h-auto · overflow visible).
 *     El Stack de 3*vh (1785 px) ya no ocupa el viewport → Footer hermano pasa al lado naturalmente.
 *     Height: NO hacks de opacity, display, visibility, pointer-events.
 *     Pure architectural release = cambia className por React state. NO imperativo.
 */
export const STORYTELLING_VIEWPORT_MODE_ACTIVE_CLASS = [
  "fixed inset-0 z-[1] w-full h-[100vh] overflow-hidden overscroll-none",
].join(" ");

/**
 * Sprint 12.5.5 FIX — Modo NATIVE Viewport relative CON altura explícita 100vh × sceneCount.
 * Por qué: El Stack absolute (position absolute top-0 inset-x-0 height calc(100vh × N)) NO empuja
 * la altura del contenedor padre cuando este es `position:relative; height: auto` en CSS, porque absolute
 * no contribuye naturalmente NUNCA al flujo.
 *
 * Solución arquitectónica limpia (NO hacks):
 *   - Viewport NATIVE = relative w-full height explícita `calc(100vh × N)` via STORYTELLING_VIEWPORT_NATIVE_MIN_HEIGHT_STYLE en StorytellingRoot.
 *   - De este modo el Viewport relative ocupa espacio vertical EXACTO = 3 escenas visibles. El Footer hermano llega después.
 *   - Overflow visible y z-auto.
 *   - No hay scroll de 3*vh (1785px) + Footer 567px = documento altura real 2352.
 */
/* Sprint 12.5.6.i — NATIVE relative debe width exacto viewport igual que ACTIVE fixed:
   - min-width:100vw asegura que NATIVE viewport nunca reduzca ancho si html/body
     tienen ancho computado menor que viewport real (overflow-x:hidden global).
   - max-width:100vw + overflow-visible mantiene continuidad geométrica. */
export const STORYTELLING_VIEWPORT_MODE_NATIVE_CLASS = [
  "relative overflow-visible z-auto",
  "w-full min-w-[100vw] max-w-[100vw]",
].join(" ");

/**
 * Legacy alias (compatibilidad). Composición actual de Sprint 12.1. No usar nuevas features.
 * New code usar los modos específicos.
 */
export const STORYTELLING_VIEWPORT_CLASS = STORYTELLING_VIEWPORT_MODE_ACTIVE_CLASS;

/**
 * Stack vertical de escenas.
 *   - position absolute, width:100%, top:0 left:0, height calc(100vh * sceneCount)
 *   - will-change transform para subir a capa GPU.
 *
 * Sprint 12.5.5: SIN CAMBIOS. Stack sigue absolute dentro de viewport.
 *   Cuando viewport = fixed (ACTIVE · Stack absolute transform funciona igual que siempre.
 *   Cuando viewport = relative NATIVE · Stack absolute: su altura 3*vh se incluye en el layout
 *   height natural del viewport relative (no colapsa, el viewport encierra el Stack
 *   (con position:relative con flow correctamente. Las secciones siguen visibles).
 */
export const STORYTELLING_STACK_CLASS = [
  "absolute inset-x-0 top-0 w-full",
  "will-change-transform",
].join(" ");

/** Cada escena individual = viewport exacto. NUNCA min-height. NUNCA auto. */
export const STORYTELLING_SCENE_CLASS = ["relative w-full h-[100vh] overflow-hidden"].join(" ");

/**
 * CSS Hard Lock DINÁMICO Sprint 12.5.5 actualizado MODOS EXPLÍCITOS LOCKED + NATIVE:
 *   - MODO LOCKED = ACTIVE / RE_ENTER (engine storytelling scenes 100vh wheel lock).
 *     html[data-storytelling-overflow="locked"]  → overflow hidden + height 100vh.
 *   - ⭐ MODO NATIVE = EXITING / NATIVE (viewport relative altura natural + Scroll FOOTER).
 *     html[data-storytelling-overflow="native"]  → overflow-y: auto EXPLÍCITO + height: auto EXPLÍCITO.
 *
 * FIX ROOT CAUSE document.height no sumaba en modo Native (documentElement no adoptaba height:auto,
 * heredaba 100vh de UA defaults o specificity residual → maxScroll=52px y Footer tapado):
 *   Ahora AMBOS estados (locked y native) tienen reglas con la misma specificity,
 *   garantizando que en NATIVE el documento adopta height auto = suma real de hermanos
 *   (Viewport 3×vh 1785 px + Footer 567 px + etc).
 */
export const STORYTELLING_HARD_LOCK_SCROLL_CSS = String.raw`
/* =============== MODO LOCKED (ACTIVE / RE_ENTER): Storytelling Engine 100vh =============== */
html[data-storytelling-overflow="locked"],
html[data-storytelling-overflow="locked"] body,
html[data-storytelling-overflow="locked"] #root {
  overflow: hidden !important;
  height: 100vh !important;
  min-height: 100vh !important;
  max-height: 100vh !important;
  margin: 0 !important;
  padding: 0 !important;
  overscroll-behavior: none !important;
  -webkit-overflow-scrolling: touch !important;
}
html[data-storytelling-overflow="locked"] {
  scrollbar-gutter: auto !important;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
html[data-storytelling-overflow="locked"]::-webkit-scrollbar,
html[data-storytelling-overflow="locked"] body::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}
html[data-storytelling-overflow="locked"] * {
  -webkit-user-drag: none;
}

/* =============== MODO NATIVE (EXITING / NATIVE): Viewport relative + Scroll Footer =============== */
html[data-storytelling-overflow="native"],
html[data-storytelling-overflow="native"] body,
html[data-storytelling-overflow="native"] #root {
  overflow: visible !important;
  overflow-y: auto !important;
  overflow-x: hidden !important;
  height: auto !important;
  min-height: 0 !important;
  max-height: none !important;
  margin: 0 !important;
  padding: 0 !important;
  overscroll-behavior: auto !important;
  -webkit-overflow-scrolling: touch !important;
}
/* Sprint 12.5.6.i — MANTENER SCROLL NATIVO PERO SCROLLBAR INVISIBLE cross-browser:
      overflow-y: auto  →  conserva scroll nativo, wheel ↓ ↑ continua funcionando.
      -ms-overflow-style:none / scrollbar-width:none / ::-webkit-scrollbar display:none
        → solo elimina la representación VISUAL de la barra en IE11/LegacyEdge,
          Firefox y Chromium/Chrome/NewEdge. No afecta scrollY ni maxScrollY.
      NO se introduce 100vw, calc(), ni cambios en Location. */
html[data-storytelling-overflow="native"] {
  scrollbar-gutter: auto !important;
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
}
html[data-storytelling-overflow="native"]::-webkit-scrollbar,
html[data-storytelling-overflow="native"] body::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  background: transparent !important;
}
`;

/* ----------------------- Solver bezier exacto ---------------------------- */

export function cubicBezierEase(t: number, x1: number, y1: number, x2: number, y2: number): number {
  const cx = 3 * x1;
  const cy = 3 * y1;
  const bx = 3 * (x2 - x1) - cx;
  const by = 3 * (y2 - y1) - cy;
  const ax = 1 - cx - bx;
  const ay = 1 - cy - by;

  function sampleCurveX(tt: number) {
    return ((ax * tt + bx) * tt + cx) * tt;
  }
  function sampleCurveDerivativeX(tt: number) {
    return (3 * ax * tt + 2 * bx) * tt + cx;
  }
  function solveCurveX(tt: number) {
    let t2: number;
    let x2: number;
    let d2: number;
    t2 = tt;
    for (let i = 0; i < 8; i += 1) {
      x2 = sampleCurveX(t2) - tt;
      if (Math.abs(x2) < 1e-6) return t2;
      d2 = sampleCurveDerivativeX(t2);
      if (Math.abs(d2) < 1e-6) break;
      t2 = t2 - x2 / d2;
    }
    let t0 = tt;
    let t1 = 1;
    t2 = tt;
    while (t0 < t1) {
      x2 = sampleCurveX(t2);
      if (Math.abs(x2 - tt) < 1e-6) return t2;
      if (tt > x2) t0 = t2;
      else t1 = t2;
      t2 = (t1 - t0) * 0.5 + t0;
    }
    return t2;
  }
  const solvedX = solveCurveX(t);
  return ((ay * solvedX + by) * solvedX + cy) * solvedX;
}
