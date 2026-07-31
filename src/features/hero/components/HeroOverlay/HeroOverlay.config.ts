/**
 * HeroOverlay.config.ts
 *
 * Overlay monocapa sobre el Hero.background.
 * Este Sprint NO soporta animaciones (preparado para intensidad).
 */

import { cn } from "@/lib/cn";

/** Clase base: absolute, z=0 (encima background, debajo contenido). */
export const HERO_OVERLAY_BASE_CLASS = "absolute inset-0 h-full w-full";

/** Intensidades del overlay (debil → fuerte). Sprint 10.2 usa "medium". */
export const HERO_OVERLAY_INTENSITIES = {
  none: "",
  light: "bg-primary/10",
  medium: "bg-primary/25",
  heavy: "bg-primary/50",
} as const;

export type HeroOverlayIntensity = keyof typeof HERO_OVERLAY_INTENSITIES;
export const DEFAULT_HERO_OVERLAY_INTENSITY: HeroOverlayIntensity = "none";

/** Mapa de variantes (por ahora solo solid; futuro = gradient/noise/pattern). */
export const HERO_OVERLAY_VARIANTS = {
  solid: "",
  "gradient-to-t": "bg-gradient-to-t from-primary/30 via-primary/10 to-transparent",
  "gradient-to-b": "bg-gradient-to-b from-primary/30 via-primary/10 to-transparent",
  "gradient-fade": "bg-gradient-to-br from-primary/15 via-transparent to-primary/10",
} as const;

export type HeroOverlayVariant = keyof typeof HERO_OVERLAY_VARIANTS;
export const DEFAULT_HERO_OVERLAY_VARIANT: HeroOverlayVariant = "solid";

export function getHeroOverlayClasses({
  intensity = DEFAULT_HERO_OVERLAY_INTENSITY,
  variant = DEFAULT_HERO_OVERLAY_VARIANT,
  className,
}: {
  readonly intensity?: HeroOverlayIntensity;
  readonly variant?: HeroOverlayVariant;
  readonly className?: string;
}): string {
  return cn(
    HERO_OVERLAY_BASE_CLASS,
    HERO_OVERLAY_INTENSITIES[intensity],
    HERO_OVERLAY_VARIANTS[variant],
    className,
  );
}
