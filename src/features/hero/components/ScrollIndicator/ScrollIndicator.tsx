/**
 * ScrollIndicator.tsx
 *
 * Responsabilidad SINGLE:
 *   Botón accesible + semántico + estructura del indicador de scroll.
 *
 * Sprint 10.2:
 *   - SIN animaciones (añadir en Sprint Motion siguiente).
 *   - SIN comportamiento onClick (scroll smooth vendrá con router/hook).
 *   - Botón focusable → navegación por teclado válida.
 */

import {
  SCROLL_INDICATOR_ICON_CLASS,
  SCROLL_INDICATOR_LABEL_CLASS,
  getScrollIndicatorClasses,
} from "./ScrollIndicator.config";
import type { ScrollIndicatorProps } from "./ScrollIndicator.types";

function ScrollIndicator({
  label = "Desplazarse a la siguiente sección",
  className,
  ...rest
}: ScrollIndicatorProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={getScrollIndicatorClasses(className)}
      {...rest}
    >
      <span className={SCROLL_INDICATOR_ICON_CLASS} aria-hidden="true" data-scroll-icon />
      <span className={SCROLL_INDICATOR_LABEL_CLASS}>{label}</span>
    </button>
  );
}

export default ScrollIndicator;
