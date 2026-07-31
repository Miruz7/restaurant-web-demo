import type { ReactNode } from "react";
import type { SectionBackground, SectionSpacing } from "./Section.config";

export interface SectionProps {
  readonly children: ReactNode;
  readonly id?: string;
  readonly spacing?: SectionSpacing;
  readonly background?: SectionBackground;
  readonly fullHeight?: boolean;
  readonly className?: string;
}
