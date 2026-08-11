/**
 * Editorial.config.ts — Sprint 12.4.3 Foundation Architecture.
 *
 * Clases Tailwind SÓLO layout (safe area / container / cols / grid).
 *   NO estilos visuales (no shadows, no glass, no overlay, no tipografía).
 */

import {
  EDITORIAL_COLUMN_GAP,
  EDITORIAL_COLUMN_WIDTH,
  EDITORIAL_MAX_WIDTH,
  EDITORIAL_PADDING_DESKTOP,
  EDITORIAL_PADDING_MOBILE,
  EDITORIAL_PADDING_TABLET,
} from "./Editorial.constants";

/* ============== EditorialContainer ========================================
 *   max-width 1280 px · margin-inline auto · paddings responsive.
 *   Elimina TODOS los wrappers custom de Hero / Featured / Location.
 * ======================================================================== */

export const EDITORIAL_CONTAINER_BASE_CLASS = [
  "relative w-full mx-auto h-full min-h-0",
  `max-w-[${EDITORIAL_MAX_WIDTH}px]`,
  `px-[${EDITORIAL_PADDING_MOBILE}px]`,
  `md:px-[${EDITORIAL_PADDING_TABLET}px]`,
  `lg:px-[${EDITORIAL_PADDING_DESKTOP}px]`,
].join(" ");

/* Aire vertical común para escenas 100vh. */
export const EDITORIAL_SCENE_INNER_CLASS = [
  "relative z-20 w-full h-full mx-auto",
  "flex flex-col items-stretch justify-start",
  "pt-[56px] md:pt-[72px] lg:pt-[88px]",
  "pb-[48px] md:pb-[56px] lg:pb-[64px]",
  "min-h-0",
].join(" ");

/* ============== EditorialGrid (2 cols 560 gap 120 justify-center) ========
 *
 * Layout desktop:
 *   ┌──────────────────────┐   gap 120   ┌──────────────────────┐
 *   │  COL LEFT  560 px    │─────────────│  COL RIGHT 560 px   │
 *   └──────────────────────┘             └──────────────────────┘
 *         justify-center (todo centrado dentro de 1280).
 *
 * Mobile/tablet < md (1 columna).
 * ======================================================================== */

export const EDITORIAL_GRID_CLASS = [
  "w-full h-full flex-1 min-h-0 flex flex-col items-stretch justify-start gap-[32px]",
  "md:flex-row md:justify-center md:items-stretch",
  `md:gap-[${EDITORIAL_COLUMN_GAP}px]`,
].join(" ");

export const EDITORIAL_COLUMN_BASE_CLASS = [
  "w-full min-w-0 flex flex-col items-stretch justify-start",
  `md:max-w-[${EDITORIAL_COLUMN_WIDTH}px] md:w-[${EDITORIAL_COLUMN_WIDTH}px] md:flex-none`,
].join(" ");

/** Columna IZQUIERDA (origen X exacto texto común a todas las escenas). */
export const EDITORIAL_LEFT_COL_CLASS = [
  EDITORIAL_COLUMN_BASE_CLASS,
  "pt-[0px] md:pt-[8px] lg:pt-[12px]",
].join(" ");

/** Columna DERECHA. */
export const EDITORIAL_RIGHT_COL_CLASS = [
  EDITORIAL_COLUMN_BASE_CLASS,
  /* Centra vertical cualquier hijo (mapa · imagen hero · ilustración featured).
     display:flex items-center justify-center. 0 translate. 0 relative. */
  "md:justify-center md:items-center",
  "md:h-full md:min-h-0",
].join(" ");

/* Convenience gap overrides por escena si necesita aire extra. */
export const EDITORIAL_GRID_GAP_LG_CLASS = [
  "md:gap-[120px]",
  "lg:gap-[140px]",
  "xl:gap-[160px]",
].join(" ");
