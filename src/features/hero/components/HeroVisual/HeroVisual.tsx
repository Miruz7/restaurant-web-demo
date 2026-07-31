/**
 * HeroVisual.tsx
 *
 * Responsabilidad SINGLE:
 *   Contenedor del recurso visual derecho del Hero.
 *
 * PREPARADO para recibir en el futuro:
 *   • <img src="...">
 *   • <svg> (ilustración ART_DIRECTION)
 *   • <video> / <HeroSlider>
 *   • <Canvas> / <Three> (WebGL / 3D)
 *   • Composición multi-productos flotantes
 *
 * Sin tocar este archivo ni Hero.tsx.
 */

import { cn } from "@/lib/cn";
import {
  HERO_VISUAL_MEDIA_FILL_CLASS,
  HERO_VISUAL_PLACEHOLDER_CLASS,
  getHeroVisualClasses,
} from "./HeroVisual.config";
import type { HeroVisualProps } from "./HeroVisual.types";

function HeroVisual({
  children,
  aspect,
  fillsMedia = true,
  ariaLabel,
  className,
}: HeroVisualProps) {
  return (
    <div
      aria-hidden={children ? undefined : true}
      aria-label={ariaLabel}
      className={cn(
        getHeroVisualClasses({ aspect, className }),
        fillsMedia ? HERO_VISUAL_MEDIA_FILL_CLASS : "",
      )}
    >
      {children ? (
        children
      ) : (
        <div
          className={HERO_VISUAL_PLACEHOLDER_CLASS}
          aria-hidden="true"
          title="Placeholder — aquí irá el recurso visual del Hero (Sprint posterior)"
        />
      )}
    </div>
  );
}

export default HeroVisual;
