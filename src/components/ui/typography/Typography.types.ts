import type { ReactNode } from "react";
import type {
  CaptionSize,
  HeadingLevel,
  TextSize,
  TextWeight,
} from "./Typography.config";

export interface BaseTypographyProps {
  readonly children: ReactNode;
  readonly className?: string;
}

export interface HeadingProps extends BaseTypographyProps {
  readonly level?: HeadingLevel;
}

export interface TextProps extends BaseTypographyProps {
  readonly size?: TextSize;
  readonly weight?: TextWeight;
}

export interface CaptionProps extends BaseTypographyProps {
  readonly size?: CaptionSize;
}
