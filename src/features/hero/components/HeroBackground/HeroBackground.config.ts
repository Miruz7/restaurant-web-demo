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

/** Si fillsParent = false (por defecto true), el children NO escala a 100%. */
export const HERO_BG_CHILDREN_FILL_CLASS =
  "[&>*]:h-full [&>*]:w-full [&>*]:object-cover [&>*]:object-center";

/** Mapa (por ahora 1 variante base) preparado para futuro Hero.bg.blank / gradient. */
export const HERO_BG_TONES = {
  default: "",
  muted: "brightness-95",
  dark: "brightness-75",
} as const;

export type HeroBackgroundTone = keyof typeof HERO_BG_TONES;
export const DEFAULT_HERO_BG_TONE: HeroBackgroundTone = "default";

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
