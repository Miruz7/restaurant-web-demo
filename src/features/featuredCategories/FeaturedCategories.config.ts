/**
 * FeaturedCategories.config.ts
 *
 * Single Source of Truth — clases y layout de la sección editorial Featured Categories.
 *
 * REGLAS IMPORTANTES (Sprint 11.0):
 *   • NO crear nuevos estilos de radius ni shadows.
 *   • Reutilizar tokens del Design System (--radius-16 · --shadow-32) ya usados en Hero.
 *   • Overlay muy ligero: 12% base → 18% hover.
 *   • Card hover: translateY(-3px) · 220 ms ease-out.
 *   • Img hover: scale(1) → scale(1.02)  · 220 ms ease-out.
 *   • Responsive: desktop 2x2 · tablet 2x2 · mobile 1x4.
 *   • Background: gradiente #151311 → #1C1917 (continuación editorial del Hero).
 */

import { cn } from "@/lib/cn";
import { HERO_MOTION_BADGE_ENTRANCE_CLASS } from "@/features/hero/motion";

/* ========================================================================= *
 * SECTION CONTENEDOR — landmark principal                                   *
 * ========================================================================= */

/** Margen de 64 px de "respiración" entre Hero y Featured Categories. */
export const FEATURED_CATEGORIES_SECTION_MARGIN_TOP_CLASS = "mt-[64px]";

/**
 * Gradiente editorial muy sutil #151311 (hero warm base) → #1C1917 (warm base alt).
 * No corte brusco con el Hero. Aire por dentro.
 * Sprint 11.0.1: Heading TIENE que aparecer inmediatamente después de los 64px de
 * respiración. ELIMINAMOS pt-72 / md:pt-88 (padding-top interior) para que el
 * heading quede en el borde superior de la sección. Los 64px de mt-[64px] exterior
 * (FEATURED_CATEGORIES_SECTION_MARGIN_TOP_CLASS) SON la respiración exacta.
 */
export const FEATURED_CATEGORIES_SECTION_BG_CLASS = [
  "relative w-full isolate overflow-hidden",
  "bg-gradient-to-b from-[#151311] via-[#171413] to-[#1C1917]",
  "text-white",
  "pb-[96px]",
  "md:pb-[120px]",
].join(" ");

/** Inner wrapper · Container + spacing. */
export const FEATURED_CATEGORIES_INNER_CLASS =
  "relative z-10 mx-auto w-full max-w-[min(1200px,92vw)]";

/* ========================================================================= *
 * HEADING / SUBTÍTULO                                                        *
 * ========================================================================= */

export const FEATURED_CATEGORIES_HEAD_CLASS = [
  "flex flex-col items-start gap-16",
  "md:gap-20 md:items-center md:text-center",
  "mb-[48px]",
  "md:mb-[64px]",
].join(" ");

export const FEATURED_CATEGORIES_HEADING_CLASS = [
  "font-heading font-bold tracking-tight text-white",
  "text-[28px] leading-[1.1]",
  "sm:text-[32px]",
  "md:text-[40px]",
  "lg:text-[44px]",
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.40),0_6px_18px_rgba(0,0,0,0.20)]",
].join(" ");

export const FEATURED_CATEGORIES_SUBHEADING_CLASS = [
  "max-w-[720px]",
  "text-[15px] leading-[1.65]",
  "md:text-[17px] md:leading-[1.65]",
  "text-white/72",
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.35)]",
].join(" ");

/* ========================================================================= *
 * GRID RESPONSIVE                                                            *
 *   Desktop / Tablet: 2 columnas · 2 filas.                                  *
 *   Mobile: 1 columna · 4 filas.                                             *
 * ========================================================================= */

export const FEATURED_CATEGORIES_GRID_CLASS = [
  "grid w-full",
  "grid-cols-1",
  "sm:grid-cols-2",
  "md:grid-cols-2",
  "gap-[24px]",
  "md:gap-[28px]",
  "lg:gap-[32px]",
].join(" ");

/* ========================================================================= *
 * CARD EDITORIAL                                                             *
 * ========================================================================= */

/**
 * Radius / Shadow — reutilizamos tokens Design System usados en el ecosistema Hero.
 * radius-16 = 16px editorial, shadow-32 = sombra consistente con botones.
 */
export const FEATURED_CATEGORIES_CARD_BASE_CLASS = [
  "group relative block w-full overflow-hidden",
  "cursor-pointer select-none",
  "rounded-16",
  "bg-white/4 border border-white/10",
  "shadow-[0_14px_40px_rgba(0,0,0,0.18)]",
  "text-left",
  "transform translate-y-0",
  "transition-[transform,box-shadow,border-color,background-color] duration-[220ms]",
  "ease-[var(--motion-ease-out,ease-out)]",
  "will-change-transform",
  /* Hover — muy sutil. Solo translate -3px. */
  "hover:-translate-y-[3px] hover:shadow-[0_22px_56px_rgba(0,0,0,0.24)] hover:border-white/18",
  /* Focus — anillo accesible. */
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-[#151311]",
].join(" ");

/** Imagen editorial con object-position center / cover — aspect ratio 4:3 fijo (0 CLS). */
export const FEATURED_CATEGORIES_CARD_MEDIA_CLASS = [
  "relative block w-full overflow-hidden",
  "aspect-[4/3]",
  "bg-[#1C1917]",
].join(" ");

export const FEATURED_CATEGORIES_CARD_IMG_CLASS = [
  "block h-full w-full object-cover",
  "transform scale-100",
  "transition-transform duration-[220ms] ease-[var(--motion-ease-out,ease-out)]",
  "will-change-transform",
  /* Group hover — solo 2% scale. NUNCA más. */
  "group-hover:scale-[1.02]",
].join(" ");

/**
 * Overlay muy ligero — base 12%.
 * Hover: 18% (solo +6pp, imperceptible como efecto).
 */
export const FEATURED_CATEGORIES_CARD_OVERLAY_CLASS = [
  "pointer-events-none absolute inset-0 z-[1]",
  "bg-black/[0.12]",
  "transition-background-color duration-[220ms] ease-[var(--motion-ease-out,ease-out)]",
  "group-hover:bg-black/[0.18]",
].join(" ");

/** Badge de icono · esquina sup-izq · glass sutil editorial. */
export const FEATURED_CATEGORIES_CARD_ICON_WRAP_CLASS = [
  "absolute left-[16px] top-[16px] z-[2]",
  "flex h-11 w-11 items-center justify-center",
  "rounded-12",
  "bg-black/28 border border-white/12 backdrop-blur-md",
  "text-white/92",
  "shadow-[0_6px_18px_rgba(0,0,0,0.20)]",
].join(" ");

/** Text stack · abajo, z 3. */
export const FEATURED_CATEGORIES_CARD_BODY_CLASS = [
  "absolute inset-x-0 bottom-0 z-[3] flex flex-col items-start gap-8",
  "px-[20px] py-[20px]",
  "md:px-[22px] md:py-[22px]",
  "pointer-events-none",
].join(" ");

export const FEATURED_CATEGORIES_CARD_TITLE_CLASS = [
  "font-heading font-bold tracking-tight text-white",
  "text-[19px] leading-[1.22]",
  "md:text-[20px]",
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.45),0_6px_18px_rgba(0,0,0,0.22)]",
].join(" ");

export const FEATURED_CATEGORIES_CARD_DESCRIPTION_CLASS = [
  "text-[13.5px] leading-[1.55] text-white/74",
  "md:text-[14.5px]",
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.35)]",
  "line-clamp-2",
].join(" ");

/* ========================================================================= *
 * MOTION — reutilizamos sistema Hero Motion (NO crear keyframes nuevos).    *
 * ========================================================================= *
 *
 * Usamos la misma clase de entrada hero-motion-entrance-badge (fade + translateY
 * corto) porque su easing y su duración son exactamente el lenguaje editorial
 * que queremos. Su único diferencia es el stagger animation-delay.
 *
 * Build CSS para inyectar los animation-delay via style inline.
 */
export const FEATURED_CATEGORIES_CARD_MOTION_ENTRANCE_CLASS = HERO_MOTION_BADGE_ENTRANCE_CLASS;

export function buildFeaturedCardDelay(delayMs: number): React.CSSProperties {
  return { animationDelay: `${delayMs}ms` };
}

/* ========================================================================= *
 * Helpers pure — classnames composables.                                     *
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
