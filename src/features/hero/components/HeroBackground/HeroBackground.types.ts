/**
 * HeroBackground.types.ts
 *
 * Props públicas del sub-componente HeroBackground.
 * Acepta children inyectado = recurso de fondo.
 */

import type { ReactNode } from "react";
import type { HeroBackgroundTone } from "./HeroBackground.config";

export interface HeroBackgroundProps {
  /** Recurso a renderizar como fondo: <img />, <video />, <canvas>, componente Slider, etc. */
  readonly children?: ReactNode;

  /** Post-procesado del fondo (brightness). Default = "default". */
  readonly tone?: HeroBackgroundTone;

  /** Si true fuerza a children a ocupar 100% con object-cover. Default = true. */
  readonly fillsMedia?: boolean;

  /** Clase extendida. */
  readonly className?: string;
}
