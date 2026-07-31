/**
 * HeroOverlay.tsx
 *
 * Responsabilidad SINGLE:
 *   Renderizar la capa overlay (semi-transparente/gradiente) entre background y contenido.
 *
 * NO contiene contenido.
 * NO contiene animaciones (se añadirán en Sprint Motion).
 */

import { getHeroOverlayClasses } from "./HeroOverlay.config";
import type { HeroOverlayProps } from "./HeroOverlay.types";

function HeroOverlay({ intensity, variant, className }: HeroOverlayProps) {
  return (
    <div aria-hidden="true" className={getHeroOverlayClasses({ intensity, variant, className })} />
  );
}

export default HeroOverlay;
