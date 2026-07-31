/**
 * CTAGroup.tsx
 *
 * Responsabilidad SINGLE:
 *   Layout de CTA buttons. NO crea botones propios.
 *   Consume exclusivamente Button del Design System vía children.
 *
 * Responsive integrado:
 *   < md  → apilado vertical (col)
 *   ≥ md  → horizontal con gap
 */

import { getCTAGroupClasses } from "./CTAGroup.config";
import type { CTAGroupProps } from "./CTAGroup.types";

function CTAGroup({ children, align, className }: CTAGroupProps) {
  return (
    <div
      role="group"
      aria-label="Acciones principales"
      className={getCTAGroupClasses({ align, className })}
    >
      {children ?? null}
    </div>
  );
}

export default CTAGroup;
