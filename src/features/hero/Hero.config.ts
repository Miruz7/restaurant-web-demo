/**
 * src/features/hero/Hero.config.ts
 *
 * Single Source of Truth para constantes, variantes y helpers de clases
 * del componente Hero (orquestador principal).
 *
 * El componente Hero.tsx contiene ZERO lógica condicional inline:
 * toda la composición de clases derivadas de props viene calculada
 * aquí mediante funciones puras getHeroClasses().
 *
 * =====================================================================
 * NOTA DE CRECIMIENTO FUTURO (Sprint 10.3+)
 * =====================================================================
 * Cuando este archivo crezca (nuevas constantes de GRID, PADDING,
 * OVERLAY, BREAKPOINTS específicos del Hero, etc.), AGRUPAR por
 * dominio en vez de dejar 30 exports planos:
 *
 *   export const HERO_LAYOUT   = { GRID: {...}, PADDING: {...}, BREAKPOINTS: {...} }
 *   export const HERO_HEIGHTS  = { sm: "...", md: "...", lg: "...", screen: "..." }
 *   export const HERO_CLASSES  = { BASE: "...", GRID: "...", INNER: "..." }
 *   export const HERO_OVERLAY  = { INTENSITIES: {...}, VARIANTS: {...} }
 *
 *   export type HeroLayoutKey   = keyof typeof HERO_LAYOUT;
 *   export type HeroHeight      = keyof typeof HERO_HEIGHTS;
 *
 * De esta forma Hero.config.ts escala a 500 líneas sin volverse ilegible.
 * Por ahora (Sprint 10.2) se mantiene exports planos porque es pequeño.
 * =====================================================================
 */

import { cn } from "@/lib/cn";

/** Clase base del landmark <section> contenedor del Hero. */
export const HERO_BASE_CLASS = "relative isolate w-full overflow-hidden bg-secondary text-primary";

/** Mapa de alturas predefinidas (viewport-aware) del área del Hero. */
export const HERO_HEIGHTS = {
  sm: "min-h-[70vh]",
  md: "min-h-[80vh]",
  lg: "min-h-[90vh]",
  screen: "min-h-screen",
} as const;

export type HeroHeight = keyof typeof HERO_HEIGHTS;
export const DEFAULT_HERO_HEIGHT: HeroHeight = "lg";

/** Padding vertical interior para compensar el Header fixed. */
export const HERO_HEADER_COMPENSATION_CLASS = "pt-[calc(var(--nova-header-height,0px)+32px)]";

/** Padding base horizontal + vertical bottom de la sección. */
export const HERO_INNER_PADDING_CLASS = "pb-64 md:pb-80 lg:pb-96";

/** Clase del wrapper Grid interno que reparte Content (izq) + Visual (der). */
export const HERO_GRID_CLASS = [
  "grid w-full gap-40",
  "md:gap-48",
  "lg:gap-64 lg:grid-cols-12",
].join(" ");

/** Clases para el slot CONTENT (columnas izquierda en desktop). */
export const HERO_CONTENT_COL_CLASS = [
  "order-2 flex flex-col items-start gap-24",
  "md:gap-32",
  "lg:order-1 lg:col-span-6 xl:col-span-7",
].join(" ");

/** Clases para el slot VISUAL (columnas derecha en desktop). */
export const HERO_VISUAL_COL_CLASS = [
  "order-1 flex items-center justify-center",
  "lg:order-2 lg:col-span-6 xl:col-span-5",
].join(" ");

/**
 * Calcula el className final del componente Hero.
 * @param props  Props del componente Hero (ya resueltos defaults).
 */
export function getHeroClasses(props: {
  readonly height: HeroHeight;
  readonly className?: string;
}): string {
  return cn(
    HERO_BASE_CLASS,
    HERO_HEIGHTS[props.height],
    HERO_HEADER_COMPENSATION_CLASS,
    props.className,
  );
}

/**
 * Helper: classes del contenedor interior (Container + grid wrapper)
 * para mantener layout estable sin tocar el markup.
 */
export function getHeroInnerWrapperClasses(className?: string): string {
  return cn("relative z-10 h-full flex flex-col justify-center", className);
}

/** Id por defecto de la sección (para anchors y navegación). */
export const DEFAULT_HERO_ID = "inicio" as const;
