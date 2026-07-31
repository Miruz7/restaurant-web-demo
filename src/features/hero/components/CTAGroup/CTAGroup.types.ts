/**
 * CTAGroup.types.ts
 *
 * Responsable de agrupar 2+ acciones.
 * Acepta children (normalmente 2x <Button> del Design System).
 */

import type { ReactNode } from "react";
import type { CTAGroupAlign } from "./CTAGroup.config";

export interface CTAGroupProps {
  /** Lista de acciones: normalmente <Button variant="primary" /> + <Button variant="secondary" /> */
  readonly children?: ReactNode;

  /** Alineación del grupo (left/center/right). Default = left (Hero). */
  readonly align?: CTAGroupAlign;

  /** Clase extendida. */
  readonly className?: string;
}
