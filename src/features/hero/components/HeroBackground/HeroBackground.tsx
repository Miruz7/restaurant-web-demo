/**
 * HeroBackground.tsx
 *
 * Responsabilidad SINGLE:
 *   Contenedor absoluto del fondo del Hero.
 *
 * NO contiene contenido propio.
 * NO conoce el recurso exacto que renderiza (imagen / video / slider / canvas / WebGL).
 *
 * Extensibilidad:
 *   Cambiar de imagen a video = inyectar <video> como children,
 *   sin tocar este archivo ni Hero.tsx.
 */

import { getHeroBackgroundClasses } from "./HeroBackground.config";
import type { HeroBackgroundProps } from "./HeroBackground.types";

function HeroBackground({ children, tone, fillsMedia, className }: HeroBackgroundProps) {
  return (
    <div aria-hidden="true" className={getHeroBackgroundClasses({ tone, fillsMedia, className })}>
      {children ?? null}
    </div>
  );
}

export default HeroBackground;
