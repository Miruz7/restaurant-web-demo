/**
 * EditorialContainer.tsx — Sprint 12.4.3 Foundation Architecture.
 *
 * ÚNICO responsable de la safe area editorial:
 *   • max-width : 1280 px
 *   • margin-inline : auto
 *   • paddings responsive : 24 / 48 / 84 px
 *
 * Sustituye TODOS los wrappers custom de Hero / Featured / Location.
 */

import { cn } from "@/lib/cn";
import { EDITORIAL_CONTAINER_BASE_CLASS } from "./Editorial.config";
import type { CSSProperties, ReactElement, ReactNode } from "react";

export interface EditorialContainerProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly id?: string;
}

export default function EditorialContainer({
  children,
  className,
  style,
  id,
}: EditorialContainerProps): ReactElement {
  return (
    <div id={id} style={style} className={cn(EDITORIAL_CONTAINER_BASE_CLASS, className)}>
      {children}
    </div>
  );
}
