/**
 * HeroOverlay.types.ts
 *
 * Props de HeroOverlay. NO acepta children (principio: Overlay no contiene contenido).
 * Intensidad + variant controlan la capa.
 */

import type { HeroOverlayIntensity, HeroOverlayVariant } from "./HeroOverlay.config";

export interface HeroOverlayProps {
  /** Intensidad del overlay: none | light | medium | heavy. Sprint 10.2 = "none" por defecto. */
  readonly intensity?: HeroOverlayIntensity;

  /** Variante de gradiente (opcional). Por defecto solid. */
  readonly variant?: HeroOverlayVariant;

  /** Clase extendida. */
  readonly className?: string;
}
