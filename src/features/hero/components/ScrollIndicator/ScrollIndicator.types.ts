/**
 * ScrollIndicator.types.ts
 *
 * Botón accesible de "bajar a siguiente sección".
 * Sprint 10.2: sin onClick ni animaciones. Estructura + semántica.
 */

import type { ButtonHTMLAttributes } from "react";

export interface ScrollIndicatorProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  /** Label leído por screen reader. Default = "Desplazarse a la siguiente sección" */
  readonly label?: string;
}
