/**
 * FeaturedCategories.config.ts — Sprint 12.3.2 — Editorial Composition Refinement.
 *
 * MANTENIDOS SIN CAMBIOS (freeze Sprint 12.3.1):
 *   ✅ Barra vertical.
 *   ✅ Lista de categorías.
 *   ✅ Posición actual selector.
 *   ✅ Indicador translateY bezier.
 *   ✅ Storytelling Engine 12.1.
 *   ✅ Transición cinematográfica 460 ms bezier.
 *   ✅ Fondo dinámico (doble buffer FROM/TO).
 *
 * ÚNICA MODIFICACIÓN:
 *   ──────────────────────────────────────────────────────────────────
 *   Composición 2 COLUMNAS (izq = menú / der = bloque informativo).
 *     → Título principal, Subtítulo, Título categoría activa,
 *       Descripción y CTA: MISMO eje vertical DERECHO.
 *   ──────────────────────────────────────────────────────────────────
 *
 * FREEZE: NO TOCAR — Hero / Motion / Parallax / Storytelling.
 */

import { cn } from "@/lib/cn";
import { STORYTELLING_BEZIER_CSS } from "@/features/storytellingNavigation";

/* ========================================================================= *
 * SECTION CONTENEDOR 100vh exacto                                           *
 * ========================================================================= */

export const FEATURED_CATEGORIES_SECTION_MARGIN_TOP_CLASS = "";

export const FEATURED_CATEGORIES_SECTION_BG_CLASS = [
  "relative w-full isolate overflow-hidden",
  "bg-[#151311]",
  "text-white",
  "h-[100vh] !min-h-[100vh] !max-h-[100vh]",
].join(" ");

/* ========================================================================= *
 * CONTENT WRAPPER GLOBAL (OBJ 1 + 2 align Hero 12.3.1 — sin cambio ancho)
 *   max-w-[1280px] · px 24/48/84 · ALIGN Hero.
 * ========================================================================= */

export const FEATURED_CATEGORIES_INNER_CLASS = [
  "relative z-20 mx-auto w-full h-full",
  "max-w-[1280px]",
  "px-[24px] md:px-[48px] lg:px-[84px]",
  "flex flex-col items-stretch justify-center",
  "py-[24px] md:py-[32px] lg:py-[40px]",
  "min-h-0",
].join(" ");

/* =============================================================== *
 * COMPOSICIÓN 2 COLUMNAS (Sprint 12.3.2 — ÚNICO cambio).         *
 *                                                                 *
 *   ┌─────────────────────────────────────────────────────┐       *
 *   │  INNER flex-col items-center justify-center         │       *
 *   │  ┌─ ROW flex-row items-center justify-start ─────┐ │       *
 *   │  │  COL IZQ         │   COL DER                  │ │       *
 *   │  │  █ Escolares     │   Explora nuestras cat...  │ │       *
 *   │  │  │ Tecnología    │   Todo lo que necesitas... │ │       *
 *   │  │  │ Impresión     │                            │ │       *
 *   │  │  │ Oficina       │   Escolares                │ │       *
 *   │  │                  │   Cuadernos...             │ │       *
 *   │  │                  │   Explorar categoría →     │ │       *
 *   │  └───────────────────────────────────────────────┘ │       *
 *   └─────────────────────────────────────────────────────┘       *
 * =============================================================== */

/** Wrapper fila única · 2 columnas · gap 48 / 80 / 96 px */
export const SHOWCASE_COMPOSITION_ROW_CLASS = [
  "flex flex-col items-stretch justify-center gap-[32px]",
  "md:flex-row md:items-stretch md:justify-start",
  "md:gap-[80px]",
  "lg:gap-[96px]",
  "xl:gap-[112px]",
  "min-h-0 w-full h-full md:h-full",
].join(" ");

/** COLUMNA IZQUIERDA · Bar + Lista (menú editorial).
 *   flex-none → no crece; ancho estable.
 */
export const SHOWCASE_LEFT_COL_CLASS = [
  "flex flex-row items-stretch justify-start",
  "w-full md:w-auto md:flex-none md:shrink-0",
  "md:max-w-[340px]",
  "lg:max-w-[380px]",
  "md:items-center md:justify-center",
  "min-h-0 h-full md:h-full",
].join(" ");

/** COLUMNA DERECHA · Header + Info dinámica + CTA (mismo eje vertical).
 *   flex-1 min-w-0 → ocupa espacio restante.
 *   display:flex flex-col items-start justify-center h-full.
 *   0 margin-top · 0 translateY · 0 position relative.
 */
export const SHOWCASE_RIGHT_COL_CLASS = [
  "flex flex-col items-start justify-center gap-[32px] md:gap-[40px] lg:gap-[48px]",
  "w-full md:flex-1 md:min-w-0",
  "h-full md:h-full min-h-0",
].join(" ");

/* ========================================================================= *
 * SHOWCASE BG — Doble buffer imagen (FREEZE Sprint 12.3.1)                  *
 * ========================================================================= */

export const SHOWCASE_BG_LAYER_COMMON = [
  "absolute inset-0 z-0 block w-full h-full",
  "select-none pointer-events-none",
  "object-cover object-center",
  "will-change-opacity will-change-filter",
].join(" ");

export const SHOWCASE_BG_TRANSITION_CLASS = [
  `transition-[filter,opacity] duration-[460ms] ${STORYTELLING_BEZIER_CSS}`,
]
  .join(" ")
  .trim();

/* ========================================================================= *
 * OVERLAY EDITORIAL (FREEZE Sprint 12.3.1)
 *   3 stops: rgba(8,8,8,.58) → .35 → .65
 * ========================================================================= */

/* ========================================================================= *
 * OVERLAY EDITORIAL — Sprint 12.3.4 ↓25% intensidad (muy transparente).
 *   Lenguaje visual HERO: fondo brillante + texto blanco.
 *   NO eliminar overlay. Solo hacerlo más transparente.
 *   3 stops: 0.22 (top) → 0.09 (mid 46%) → 0.32 (bottom)
 *   ~25% reducción sobre los valores Sprint 12.3.3 (0.58→0.22 · 0.35→0.09 · 0.65→0.32).
 * ========================================================================= */

export const SHOWCASE_OVERLAY_CLASS = [
  "absolute inset-0 z-[1] pointer-events-none select-none",
  "bg-[linear-gradient(180deg,rgba(0,0,0,0.22)_0%,rgba(0,0,0,0.09)_46%,rgba(0,0,0,0.32)_100%)]",
].join(" ");

/* ========================================================================= *
 * HEADER — Título + Sub (columna derecha, mismo eje vertical que info).
 *   Sprint 12.3.4: TODO TEXTO BLANCO PURO.
 *   Text-shadow IGUAL HERO (multi-layer borde + volumen natural).
 * ========================================================================= */

export const FEATURED_CATEGORIES_HEAD_CLASS = [
  "flex flex-col items-start gap-5",
  "w-full max-w-[720px]",
].join(" ");

export const FEATURED_CATEGORIES_HEADING_CLASS = [
  "font-heading font-bold tracking-tight text-white",
  "text-[22px] leading-[1.12]",
  "md:text-[26px]",
  "lg:text-[32px]",
  "[text-shadow:1px_0_0_rgba(0,0,0,0.35),-1px_0_0_rgba(0,0,0,0.35),0_1px_0_rgba(0,0,0,0.35),0_-1px_0_rgba(0,0,0,0.35),0_3px_12px_rgba(0,0,0,0.35),0_6px_22px_rgba(0,0,0,0.22)]",
].join(" ");

export const FEATURED_CATEGORIES_SUBHEADING_CLASS = [
  "max-w-[620px]",
  "text-[14px] leading-[1.6] md:text-[15px] lg:text-[16px]",
  "text-white",
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.42),0_4px_16px_rgba(0,0,0,0.22)]",
].join(" ");

/* ========================================================================= *
 * NAV — FREEZE Sprint 12.3.1.
 *   Barra vertical IZQ + lista VERTICAL de categorías al lado.
 * ========================================================================= */

export const SHOWCASE_NAV_WRAP_CLASS = [
  "flex flex-row items-stretch gap-[20px] md:gap-[24px] lg:gap-[32px]",
  "w-full max-w-[380px]",
  "min-h-0",
].join(" ");

export const SHOWCASE_BAR_TRACK_CLASS = [
  "relative flex-none overflow-hidden",
  "w-[3px] md:w-[4px]",
  "h-[calc(4*(1.25rem*1.35)+3*1rem)]",
  "rounded-full bg-white/18",
].join(" ");

/** Indicador: 460 ms cubic-bezier(.22,1,.36,1) EXACTO · solo translateY. */
export const SHOWCASE_BAR_INDICATOR_CLASS = [
  "absolute left-0 top-0 block rounded-full bg-white/98",
  "shadow-[0_0_14px_rgba(255,255,255,0.26)]",
  "w-full h-[25%]",
  `transition-transform duration-[460ms] ${STORYTELLING_BEZIER_CSS}`,
  "will-change-transform",
].join(" ");

export const SHOWCASE_CATEGORY_LIST_CLASS = [
  "flex flex-col items-start justify-center gap-[1rem]",
  "min-h-0 flex-1",
].join(" ");

export const SHOWCASE_CATEGORY_ITEM_BASE = [
  "group relative inline-flex items-center justify-center",
  "px-0 py-0 border-0 bg-transparent cursor-pointer select-none",
  "text-left focus-visible:outline-none",
  "hover:-translate-y-[1px] active:translate-y-[0px]",
  "transition-[transform,opacity] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
  "focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent focus-visible:rounded-6",
].join(" ");

export const SHOWCASE_CATEGORY_ITEM_TEXT_BASE = [
  "font-sans",
  "transition-[opacity,font-weight,letter-spacing,color,transform] duration-[220ms] ease-[cubic-bezier(.22,1,.36,1)]",
  "text-[18px] leading-[1.35] md:text-[20px] lg:text-[22px]",
  "text-white",
  "[text-shadow:0_2px_5px_rgba(0,0,0,0.40),0_4px_12px_rgba(0,0,0,0.20)]",
].join(" ");

/* ========================================================================= *
 * INFO DINÁMICA (TITLE / DESC / CTA) AHORA EN COLUMNA DERECHA MISMO EJE.
 *   Sprint 12.3.4:
 *     • TODO BLANCO PURO (0 opacity reductions)
 *     • Text-shadow lenguaje visual HERO.
 *     • CTA blanco, contraste suave mejorado.
 * ========================================================================= */

export const SHOWCASE_INFO_WRAP_CLASS = [
  "w-full flex flex-col items-start gap-[16px] md:gap-[24px] lg:gap-[32px]",
  `transition-[opacity,transform] duration-[460ms] ${STORYTELLING_BEZIER_CSS}`,
  "will-change-opacity will-change-transform",
].join(" ");

export const SHOWCASE_INFO_TITLE_CLASS = [
  "font-heading font-bold tracking-tight text-white",
  "text-[32px] leading-[1.08]",
  "md:text-[40px] lg:text-[52px]",
  "[text-shadow:1px_0_0_rgba(0,0,0,0.35),-1px_0_0_rgba(0,0,0,0.35),0_1px_0_rgba(0,0,0,0.35),0_-1px_0_rgba(0,0,0,0.35),0_3px_12px_rgba(0,0,0,0.35),0_6px_22px_rgba(0,0,0,0.22)]",
].join(" ");

export const SHOWCASE_INFO_DESC_CLASS = [
  "max-w-[560px]",
  "text-[15px] leading-[1.7] md:text-[16px] lg:text-[17px]",
  "text-white",
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.42),0_4px_16px_rgba(0,0,0,0.22)]",
].join(" ");

/** Sprint 12.3.4 CTA: blanco puro, contraste suave mejorado.
 *  Base: glass más presente para que no se pierda; hover: aún más sólido.
 */
export const SHOWCASE_INFO_CTA_CLASS = [
  "inline-flex items-center gap-[10px]",
  "px-[22px] py-[13px] md:px-[26px] md:py-[15px]",
  "rounded-12",
  "bg-white/14 border border-white/22 backdrop-blur-[10px]",
  "text-white font-sans font-semibold tracking-[0.01em]",
  "text-[14.5px] md:text-[15.5px]",
  "shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
  `transition-[background-color,border-color,transform,color,box-shadow,opacity] duration-[180ms] ${STORYTELLING_BEZIER_CSS}`,
  "hover:bg-white/20 hover:border-white/34 hover:-translate-y-[1px] hover:text-white",
  "hover:shadow-[0_14px_32px_rgba(0,0,0,0.24)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "active:scale-[0.98] active:translate-y-[0px]",
].join(" ");

export const SHOWCASE_INFO_CTA_ARROW = [
  "w-4 h-4 md:w-5 md:h-5 transition-transform duration-200 ease-out group-hover:translate-x-[3px]",
].join(" ");

/* ========================================================================= *
 * GRID & CARD — Sprint 12.3+ OBSOLETOS (compat).                            *
 * ========================================================================= */

export const FEATURED_CATEGORIES_GRID_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_BASE_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_MEDIA_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_IMG_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_OVERLAY_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_ICON_WRAP_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_BODY_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_TITLE_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_DESCRIPTION_CLASS = "hidden";
export const FEATURED_CATEGORIES_CARD_MOTION_ENTRANCE_CLASS = "hidden";

export function buildFeaturedCardDelay(_delayMs: number): React.CSSProperties {
  return {};
}

/* ========================================================================= *
 * Helpers pure                                                              *
 * ========================================================================= */

export function getFeaturedCategoriesSectionClasses(className?: string): string {
  return cn(
    FEATURED_CATEGORIES_SECTION_MARGIN_TOP_CLASS,
    FEATURED_CATEGORIES_SECTION_BG_CLASS,
    className,
  );
}

export function getFeaturedCategoriesCardClasses(className?: string): string {
  return cn(FEATURED_CATEGORIES_CARD_BASE_CLASS, className);
}

export function getFeaturedCategoriesGridClasses(className?: string): string {
  return cn(FEATURED_CATEGORIES_GRID_CLASS, className);
}
