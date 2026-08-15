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
export const HERO_INNER_PADDING_CLASS = "pb-[80px] md:pb-[96px] lg:pb-[120px] xl:pb-[144px]";

/**
 * Espacio negativo izquierdo (padding-left) para columnas CONTENT.
 * — Apple · Stripe · Linear usan muchísimo aire visual para no pegar texto al borde.
 * — Mobile/tablet respeta Container del layout.
 * — Desktop lg ≈ 120 px, xl ≈ 140 px, 2xl ≈ 160 px. (+24/28/32 px respecto a iteración anterior).
 *   (8 px grid: 120=15 · 140=17.5 ajustado 17·8=136 · 160=20 → usamos pl-30 / pl-34 / pl-40
 *   Tailwind soporta números arbitrarios si usamos theme extend pero tenemos tokens:
 *   24px = pl-6 · 28px = pl-7 · 32px = pl-8. Sumados al anterior pl-24/28/32:
 *   lg → 96+24=120 (pl-30 NO existe, usamos arbitrario pl-[120px])
 *   xl → 112+28 = 140 → usamos pl-[140px]
 *   2xl→ 128+32 = 160 → usamos pl-[160px]
 * Mobile/Tablet se queda en pl-0 para respetar Container.
 */
export const HERO_CONTENT_NEGATIVE_SPACE_CLASS = [
  "pl-0",
  "md:pl-0",
  "lg:pl-[120px]",
  "xl:pl-[140px]",
  "2xl:pl-[160px]",
].join(" ");

/** Clase del wrapper Grid interno que reparte Content (izq) + Visual (der). */
export const HERO_GRID_CLASS = [
  "grid w-full gap-32",
  "md:gap-48",
  "lg:gap-64 lg:grid-cols-12",
].join(" ");

/** Clases para el slot CONTENT (columnas izquierda en desktop). */
export const HERO_CONTENT_COL_CLASS = [
  "order-2 flex flex-col items-start gap-20",
  "md:gap-28",
  "lg:gap-32",
  "lg:order-1 lg:col-span-6 xl:col-span-7",
  HERO_CONTENT_NEGATIVE_SPACE_CLASS,
  "translate-x-3 translate-y-4",
].join(" ");

/**
 * Variante WIDE del slot CONTENT (cuando visual === undefined y la escena
 * visual vive en HeroBackground). Ocupa columnas adicionales en desktop
 * para aprovechar el ancho completo sin el col vacío de la derecha.
 * Sprint 10.6 — Master Artwork en background.
 * Sprint 10.6 ULTIMO REFINAMIENTO COMPOSICIÓN: bloque content entero
 * +12 px der · +16 px abajo = aire sup-izq editorial Apple/Linear.
 */
export const HERO_CONTENT_COL_WIDE_CLASS = [
  "order-2 flex flex-col items-start gap-20",
  "md:gap-28",
  "lg:gap-32",
  "lg:order-1 lg:col-span-10 xl:col-span-9 2xl:col-span-8",
  HERO_CONTENT_NEGATIVE_SPACE_CLASS,
  "translate-x-3 translate-y-4",
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

/* =====================================================================
 * HERO THEME — LIGHT (para usar sobre background fotográfico)
 * =====================================================================
 * Overrides de color SIN tocar Design System global.
 * Estos classes se inyectan via `className` en los componentes internos
 * del Hero (Badge, Heading, Description, Botones, Scroll Indicator).
 * Sprint 10.6 — Master Artwork integration.
 * ===================================================================== */

/**
 * Badge light estilo Apple premium.
 * Sprint 10.6.4 BADGE DOWNGRADE: la etiqueta NO debe competir con el H1.
 *   Menos altura, menos blur, sombra sutil, compacto, desplazado para dar aire
 *   a la composición (↓16px abajo, →12px der) respecto al contenedor.
 *   Orden atención objetivo: H1 → CTA → FOTO → Badge ✔
 */
export const HERO_LIGHT_BADGE_CLASS = [
  "!h-22 !px-16 !py-0",
  "!border-white/10 !bg-black/20",
  "!backdrop-blur-lg",
  "!text-white/92",
  "shadow-[0_6px_18px_rgba(0,0,0,0.12)]",
  "[text-shadow:0_1px_1px_rgba(0,0,0,0.26)]",
  "translate-x-[112px] -translate-y-[48px]",
].join(" ");

/**
 * Heading H1 light: blanco + text-shadow multi-layer NATURAL + BORDE SÚTIL 1px 4 offsets.
 * Sprint 10.6.4: LEGIBILIDAD POR TRATAMIENTO TEXTO. NO por oscurecer fotografía.
 *   - Capa 1-4 (borde sutil 1px): 1px / -1px / 0+1 / 0-1 → opacidad 0.35 → usuario NO lo nota.
 *   - Capa 5 (cerca, volumen natural): 0_2_4_0.55.
 *   - Capa 6 (lejos, relieve premium suave): 0_6_18_0.30.
 */
export const HERO_LIGHT_HEADING_CLASS = [
  "!text-white !leading-[1.01]",
  "[text-shadow:1px_0_0_rgba(0,0,0,0.35),-1px_0_0_rgba(0,0,0,0.35),0_1px_0_rgba(0,0,0,0.35),0_-1px_0_rgba(0,0,0,0.35),0_2px_4px_rgba(0,0,0,0.55),0_6px_18px_rgba(0,0,0,0.30)]",
].join(" ");

/**
 * Description light: blanco 94% + doble shadow (relieve natural). NO se baja la foto.
 * Sprint 10.6.4 PRUEBA A/B: max-width 660 px (rango 620–680: punto medio 660).
 *   Landing premium = lectura cómoda, no texto que llega hasta el producto.
 *   Desktop lg/xl: Description ocupa ~660 px (aire a la derecha).
 *   Mobile/tablet: max-width 100% natural sin restricción (no romper stack).
 */
export const HERO_LIGHT_DESCRIPTION_CLASS = [
  "!text-white/94",
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.42),0_4px_14px_rgba(0,0,0,0.22)]",
  "!max-w-[660px]",
  "md:!max-w-[660px]",
  "lg:!max-w-[660px]",
  "xl:!max-w-[660px]",
  "2xl:!max-w-[660px]",
].join(" ");

/** Text component light (usado en Badge inline). Tracking editorial. */
export const HERO_LIGHT_TEXT_CLASS =
  "!text-white/94 !tracking-[0.14em] [text-shadow:0_1px_2px_rgba(0,0,0,0.30)]";

/**
 * Button variant PRIMARY → AZUL NOVA MARCA (brand-navy).
 * Sprint 10.6.1: sombra aumentada 2 puntos para compensar overlay más claro.
 * Legibilidad del CTA por jerarquía, no por oscurecer foto.
 * Sprint 12.6.C Microinteractions:
 *   - Hover: translateY(-1px) — levantamiento sutil.
 *   - Active: scale(0.98) — press táctil.
 *   - Transition: 180 ms cubic-bezier(.22,1,.36,1) (igual Storytelling easing).
 */
export const HERO_LIGHT_BUTTON_PRIMARY_CLASS = [
  "!bg-brand-navy !text-white",
  "!hover:bg-brand-navy-hover !active:bg-brand-navy-active",
  "hover:!-translate-y-[1px] active:!scale-[0.98]",
  "!shadow-[0_10px_34px_rgba(30,58,138,0.44)]",
  "hover:!shadow-[0_14px_40px_rgba(30,58,138,0.50)]",
  "!transition-[transform,background-color,box-shadow,color,opacity] !duration-[180ms] !ease-[cubic-bezier(0.22,1,0.36,1)]",
  "focus-visible:!ring-white focus-visible:!ring-offset-black/40",
].join(" ");

/**
 * Button variant SECONDARY → glass morphism estilo Nova Hero FINA.
 * Estado normal: transparencia EXTREMADAMENTE sutil. Hover: sube a ~15%.
 * Borde muy fino (12%) para no competir con la foto.
 * Sprint 12.6.C Microinteractions:
 *   - Hover: translateY(-1px) levantamiento sutil.
 *   - Active: scale(0.98) press feedback.
 *   - Transition 180 ms cubic-bezier consistente.
 */
export const HERO_LIGHT_BUTTON_SECONDARY_CLASS = [
  "!bg-white/6 !text-white !border-white/12",
  "!backdrop-blur-[14px]",
  "!hover:bg-white/15 !active:bg-white/25",
  "hover:!-translate-y-[1px] active:!scale-[0.98]",
  "!shadow-[0_6px_22px_rgba(0,0,0,0.14)]",
  "hover:!shadow-[0_10px_28px_rgba(0,0,0,0.20)]",
  "!transition-[transform,background-color,box-shadow,color,border-color,opacity] !duration-[180ms] !ease-[cubic-bezier(0.22,1,0.36,1)]",
  "focus-visible:!ring-white focus-visible:!ring-offset-black/40",
].join(" ");

/**
 * ScrollIndicator light (finísimo, casi invisible, no tapa foto).
 * — FINAL Sprint 10.6: MENOS protagonismo. Sólo existe para indicar scroll.
 * — Opacidad extrema: base 0.45 · hover 0.90 (no llega a 1.00, no llama la atención).
 * — Padding mínimo: px-8 · py-6 (antes px-10/py-8 → delgado).
 * — ICONO MÁS FINO: h-24 · w-12 (antes 28/16 → 4/4pts menos).
 * — TRANSLATE POSITIVO Y = +24px (ABAJO del Hero, NO por encima → NO tapa cuaderno).
 * — Label texto opacidad 0.65 hover 0.95: muy sutil.
 */
export const HERO_LIGHT_SCROLL_INDICATOR_CLASS = [
  "!px-8 !py-6",
  "!text-white/45 !hover:text-white/90",
  "hover:!-translate-y-[1px]",
  "!transition-[transform,color,opacity] !duration-[180ms] !ease-[cubic-bezier(0.22,1,0.36,1)]",
  "[&_[data-scroll-label]]:opacity-[0.65] [&_[data-scroll-label]]:hover:opacity-[0.95]",
  "[&_[data-scroll-icon]]:!h-24 [&_[data-scroll-icon]]:!w-12",
  "[&_[data-scroll-icon]::before]:!top-3",
  "![transform:translateY(24px)]",
  "focus-visible:!ring-white/40 focus-visible:!ring-offset-black/20",
].join(" ");
