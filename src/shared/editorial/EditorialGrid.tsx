/**
 * EditorialGrid.tsx — Sprint 12.4.3 Foundation Architecture.
 *
 * Responsable SÓLO de composición 2-columnas 560 px + gap 120 + justify-center.
 *
 *   • 2 SLOTS (left / right):
 *     - LEFT 560 px (origen X común a HERO / FEATURED / LOCATION).
 *     - RIGHT 560 px.
 *
 * Mobile: 1 columna.
 */

import { cn } from "@/lib/cn";
import {
  EDITORIAL_GRID_CLASS,
  EDITORIAL_LEFT_COL_CLASS,
  EDITORIAL_RIGHT_COL_CLASS,
} from "./Editorial.config";
import type { CSSProperties, ReactElement, ReactNode } from "react";

export interface EditorialGridProps {
  readonly left: ReactNode;
  readonly right: ReactNode;
  readonly leftClassName?: string;
  readonly rightClassName?: string;
  readonly gridClassName?: string;
  readonly style?: CSSProperties;
  readonly mobileReverse?: boolean;
}

export default function EditorialGrid({
  left,
  right,
  leftClassName,
  rightClassName,
  gridClassName,
  style,
  mobileReverse = true,
}: EditorialGridProps): ReactElement {
  return (
    <div
      style={style}
      className={cn(
        EDITORIAL_GRID_CLASS,
        mobileReverse ? "flex-col-reverse" : "flex-col",
        gridClassName,
      )}
    >
      <div className={cn(EDITORIAL_LEFT_COL_CLASS, leftClassName)}>{left}</div>
      <div className={cn(EDITORIAL_RIGHT_COL_CLASS, rightClassName)}>{right}</div>
    </div>
  );
}
