/**
 * HeroBackground.config.ts
 *
 * Constantes y mapa de variantes del background.
 *
 * El Background NO decide QUE recurso se usa.
 * Solo define el CONTAINER (clases contenedoras).
 * El recurso (img / video / canvas / slider) se inyecta via children.
 *
 * Así cambiar de HeroImageBackground → HeroVideoBackground → HeroSlider
 * NO requiere modificar HeroBackground ni Hero.tsx.
 */

import { cn } from "@/lib/cn";

/** Clase base contenedor: ocupa todo el espacio del padre (hero section). */
export const HERO_BG_BASE_CLASS = "absolute inset-0 h-full w-full overflow-hidden";

/**
 * Object-position RESPONSIVE (aplicado al children <img>/<video> via [&>*])
 * Sprint 10.6.1 REFACTOR — Menos zoom agresivo.
 *   Objetivo: RECUPERAR pared iluminada izquierda + más escritorio alrededor de la escena.
 *   Antiguo: demasiado desplazamiento HACIA LA DERECHA (55/58/60%) → perdía pared izquierda y sensación "encajonado".
 *   Nuevo: centrado sutil hacia la izquierda (reduciendo el crop lateral derecho mínimo).
 *
 * · Mobile < md  : 50% horizontal · 36% vertical → cuaderno visible, escritorio abajo, pared arriba visible.
 * · Tablet md    : 52% horizontal · 52% vertical → más pared izq, más aire alrededor escena.
 * · Desktop lg   : 54% horizontal · 50% vertical → 5% menos desplazamiento que antiguo 60%.
 * · XL+          : 48% horizontal · center vertical → máximo aire pared iluminada izq.
 *
 * El punto focal (esquina superior izquierda cuaderno abierto) sigue dentro del frame en
 * todos los breakpoints (ningún corte a mitad del cuaderno).
 */
export const HERO_BG_OBJECT_POSITION_CLASS = [
  "[&>*]:object-[50%_36%]",
  "md:[&>*]:object-[52%_52%]",
  "lg:[&>*]:object-[54%_50%]",
  "xl:[&>*]:object-[48%_center]",
].join(" ");

/** fillsMedia = true: fuerza children (img/video) a ocupar 100% con cover. */
export const HERO_BG_CHILDREN_FILL_CLASS = `[&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover ${HERO_BG_OBJECT_POSITION_CLASS}`;

/** Mapa de tonos (post-procesado brightness/contrast). */
export const HERO_BG_TONES = {
  default: "",
  muted: "brightness-95",
  dark: "brightness-75",
  editorial: "brightness-100 saturate-[0.95] contrast-[1.02]",
} as const;

export type HeroBackgroundTone = keyof typeof HERO_BG_TONES;
export const DEFAULT_HERO_BG_TONE: HeroBackgroundTone = "editorial";

/* =====================================================================
 * CAPAS DE PROFUNDIDAD (Mejora Sprint 10.6 #1 — CSS puro SIN imágenes)
 *
 * Para transmitir ESCENA y no solo fotografía, añadimos 3 capas por encima
 * de la imagen base, por debajo del Overlay:
 *
 *   <img z=0> → HALO CUADERNO z=1 → LUZ CÁLIDA SUP-DER z=2 → DUST z=3
 *   z-index relativo al stacking context interno de HeroBackground.
 *
 * Todas son opacas <8% para NO competir con la fotografía.
 * ===================================================================== */

/**
 * Layer 1 — Halo suave alrededor del punto focal (cuaderno):
 *   Radial-gradient en 48% horizontal · 48% vertical.
 *   "Ilumina" ligeramente el cuaderno sin aumentar contraste global.
 *
 * Sprint 10.6.2 — CORRECCIÓN stacking context. NUEVOS nombres:
 *   Clases pasan a ser usadas DIRECTAMENTE desde HOME PAGE como hermanos de
 *   HeroOverlay (dentro del slot overlay, z relative [-10], POR ENCIMA del
 *   sólido negro 34%) — así el blend SCREEN / SOFT-LIGHT sí suma luz real.
 *
 * Modo de mezcla = screen (suma luz, NUNCA resta).
 */
export const HERO_DEPTH_HALO_FOCAL_CLASS = [
  "pointer-events-none absolute inset-0",
  "[background:radial-gradient(ellipse_62%_60%_at_50%_46%,rgba(255,242,214,0.075)_0%,rgba(255,242,214,0.030)_30%,rgba(255,242,214,0)_62%)]",
  "mix-blend-screen",
].join(" ");

/**
 * Layer 2 — Luz cálida de la escena (sup-derecha, lámpara Art Direction §6):
 *   Radial-gradient con centro fuera del frame (sup-der).
 *   Temperatura color cálida. Mejora separación temperatura.
 *
 * Modo de mezcla = soft-light (suma luz sutil, NUNCA resta).
 */
export const HERO_DEPTH_WARM_LIGHT_CLASS = [
  "pointer-events-none absolute inset-0",
  "[background:radial-gradient(ellipse_58%_52%_at_84%_8%,rgba(255,205,130,0.060)_0%,rgba(255,205,130,0.018)_34%,rgba(255,205,130,0)_68%)]",
  "mix-blend-soft-light",
].join(" ");

/**
 * Layer 3 — Partículas Dust ambiente (polvo flotante en luz) 8 spots 1–3 px.
 * Opacidad 0.82 normal.
 * Modo de mezcla normal (son pixeles, no corrección luz).
 */
export const HERO_DEPTH_DUST_CLASS = [
  "pointer-events-none absolute inset-0",
  "[background-image:radial-gradient(circle_at_12%_26%,rgba(255,248,230,0.32)_0_1px,transparent_2px),radial-gradient(circle_at_30%_72%,rgba(255,248,230,0.24)_0_1px,transparent_2px),radial-gradient(circle_at_48%_18%,rgba(255,248,230,0.26)_0_1.5px,transparent_3px),radial-gradient(circle_at_62%_62%,rgba(255,248,230,0.20)_0_1px,transparent_2px),radial-gradient(circle_at_72%_36%,rgba(255,248,230,0.28)_0_2px,transparent_3.5px),radial-gradient(circle_at_82%_82%,rgba(255,248,230,0.18)_0_1px,transparent_2px),radial-gradient(circle_at_22%_58%,rgba(255,248,230,0.22)_0_1px,transparent_2px),radial-gradient(circle_at_88%_48%,rgba(255,248,230,0.24)_0_1.5px,transparent_3px)]",
  "[background-size:100%_100%]",
  "opacity-[0.82]",
].join(" ");

export function getHeroBackgroundClasses({
  tone = DEFAULT_HERO_BG_TONE,
  fillsMedia = true,
  className,
}: {
  readonly tone?: HeroBackgroundTone;
  readonly fillsMedia?: boolean;
  readonly className?: string;
}): string {
  return cn(
    HERO_BG_BASE_CLASS,
    fillsMedia ? HERO_BG_CHILDREN_FILL_CLASS : "",
    HERO_BG_TONES[tone],
    className,
  );
}
