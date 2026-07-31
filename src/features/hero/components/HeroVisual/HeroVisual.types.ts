/**
 * HeroVisual.types.ts
 *
 * Props del slot visual del Hero.
 * children = recurso a renderizar (img/illustration/video/3D/canvas/etc).
 *
 * =====================================================================
 * ESTRUCTURA FUTURA DE ESCENA (Sprint 10.3+)
 * =====================================================================
 * Sprint 10.2 = placeholder. Sprint 10.3+ = composición multi-productos.
 * Cuando el slot visual pase de 1 imagen única a una ESCENA COMPLETA
 * (Cuaderno + Laptop + Plumas + Mochila flotando según HERO_SPEC
 * "Combinación = escena moderna papelería"), descomponer en:
 *
 *   HeroVisual (actual — contenedor)
 *     └── HeroScene
 *           ├── HeroProducts     <- Cuaderno + Laptop + Plumas + Mochila
 *           ├── HeroLighting     <- Gradientes / luz ambiente / sombras
 *           └── HeroEffects      <- Partículas, parallax, float, grano
 *
 * No tocar Hero.tsx. Solo sustituir:
 *   visual={<HeroVisual><HeroScene /></HeroVisual>}
 *
 * La escena compleja viviría en carpeta propia
 *   features/hero/components/HeroScene/ (4-arch)
 * =====================================================================
 */

import type { ReactNode } from "react";
import type { HeroVisualAspect } from "./HeroVisual.config";

export interface HeroVisualProps {
  /** Recurso a pintar dentro del slot visual (opcional; placeholder si no hay). */
  readonly children?: ReactNode;

  /** Relación de aspecto del contenedor visual. Default = "4:3". */
  readonly aspect?: HeroVisualAspect;

  /** Si true, children <img/video/canvas> se fuerzan a ocupar 100%. Default true. */
  readonly fillsMedia?: boolean;

  /** Etiqueta alt/descripción del slot (si se usa imagen ilustrativa). */
  readonly ariaLabel?: string;

  /** Clase extendida. */
  readonly className?: string;
}
