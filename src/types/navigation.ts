/**
 * src/types/navigation.ts
 *
 * Tipos relativos a navegación y rutas.
 * Hoy solo define placeholders para escalar con enlaces internos,
 * menús, mega-dropdowns y tabs.
 */

import type { IWithId } from "./common";

/** Nivel de profundidad en menús. */
export type NavDepth = 1 | 2 | 3;

/** Target de un link de navegación. */
export type NavTarget = "_self" | "_blank" | "_parent" | "_top";

/** Item base de navegación (versión genérica, extendible por data/navigation.ts). */
export interface INavigationItem extends IWithId {
  readonly label: string;
  readonly href: string;
  readonly target?: NavTarget;
  readonly description?: string;
  readonly children?: readonly INavigationItem[];
}
