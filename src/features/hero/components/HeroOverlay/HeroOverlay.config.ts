/**
 * HeroOverlay.config.ts
 *
 * Overlay monocapa sobre el Hero.background.
 * Este Sprint NO soporta animaciones (preparado para intensidad).
 */

import { cn } from "@/lib/cn";

/** Clase base: absolute, z=0 (encima background, debajo contenido). */
export const HERO_OVERLAY_BASE_CLASS = "absolute inset-0 h-full w-full pointer-events-none";

/**
 * Intensidades del overlay (gradientes sólidos base).
 *
 * Nomenclatura iNN = opacidad base sólida %.
 * Se mantienen alias legacy (light/medium/heavy) por compatibilidad con
 * código existente, aunque Sprint 10.6+ recomienda usar las versiones
 * numéricas explícitas que son directas (35 / 40 / 45 / 50).
 */
export const HERO_OVERLAY_INTENSITIES = {
  none: "",
  light: "bg-primary/10",
  medium: "bg-primary/25",
  heavy: "bg-primary/50",
  i05: "bg-black/05",
  i08: "bg-black/08",
  i10: "bg-black/10",
  i15: "bg-black/15",
  i20: "bg-black/20",
  i25: "bg-black/25",
  i30: "bg-black/30",
  i32: "bg-black/32",
  i34: "bg-black/34",
  i35: "bg-black/35",
  i38: "bg-black/38",
  i39: "bg-black/39",
  i40: "bg-black/40",
  i45: "bg-black/45",
  i50: "bg-black/50",
} as const;

export type HeroOverlayIntensity = keyof typeof HERO_OVERLAY_INTENSITIES;
export const DEFAULT_HERO_OVERLAY_INTENSITY: HeroOverlayIntensity = "i08";

/**
 * Variantes de gradiente.
 *
 * Sprint 10.6.4 — extremadamente suave. FILOSOFÍA:
 *   95% de la escena ve la fotografía ORIGINAL del Master Artwork.
 *   El overlay solo se limita a la zona del copy (gradient izq 0–58% horizontal).
 *   El gradiente superior solo ayuda a que el Navbar no tape el Badge.
 */
export const HERO_OVERLAY_VARIANTS = {
  solid: "",
  "gradient-to-t": "bg-gradient-to-t from-black/40 via-black/10 to-transparent",
  "gradient-to-b": "bg-gradient-to-b from-black/30 via-transparent to-black/15",
  "gradient-fade": "bg-gradient-to-br from-black/20 via-transparent to-black/15",
  "gradient-left-reading": [
    "bg-gradient-to-r",
    "from-black/50 via-black/30 to-transparent",
    "[background-size:100%_100%]",
  ].join(" "),
  "gradient-multiply-left": [
    "bg-gradient-to-r from-black/40 via-black/20 to-transparent",
    "[mix-blend-mode:multiply]",
  ].join(" "),
  "editorial-scene": [
    "[background-image:linear-gradient(to_bottom,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.03)_14%,rgba(0,0,0,0)_24%,rgba(0,0,0,0)_100%),linear-gradient(to_right,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.36)_34%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.03)_56%,rgba(0,0,0,0)_58%,rgba(0,0,0,0)_100%)]",
    "[background-size:100%_100%,100%_100%]",
    "[background-repeat:no-repeat,no-repeat]",
  ].join(" "),
} as const;

export type HeroOverlayVariant = keyof typeof HERO_OVERLAY_VARIANTS;
export const DEFAULT_HERO_OVERLAY_VARIANT: HeroOverlayVariant = "editorial-scene";

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
