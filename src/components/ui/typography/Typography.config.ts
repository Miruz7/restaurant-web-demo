export const HEADING_TAGS = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export type HeadingLevel = keyof typeof HEADING_TAGS;

export const HEADING_VARIANTS: Record<HeadingLevel, string> = {
  1: "font-heading font-bold leading-[1.05] tracking-tight text-5xl lg:text-7xl",
  2: "font-heading font-bold leading-[1.1] tracking-tight text-4xl lg:text-6xl",
  3: "font-heading font-semibold leading-[1.2] tracking-tight text-3xl lg:text-5xl",
  4: "font-heading font-semibold leading-[1.25] tracking-tight text-2xl lg:text-4xl",
  5: "font-heading font-semibold leading-[1.3] tracking-tight text-xl lg:text-3xl",
  6: "font-heading font-semibold leading-[1.3] tracking-tight text-lg lg:text-2xl",
};

export const TEXT_SIZES = {
  xs: "text-xs leading-[1.4]",
  sm: "text-sm leading-[1.5]",
  md: "text-base leading-[1.55]",
  lg: "text-lg leading-[1.6]",
  xl: "text-xl leading-[1.6]",
  "2xl": "text-2xl leading-[1.5]",
} as const;

export type TextSize = keyof typeof TEXT_SIZES;

export const DEFAULT_TEXT_SIZE: TextSize = "md";

export const TEXT_WEIGHTS = {
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
} as const;

export type TextWeight = keyof typeof TEXT_WEIGHTS;

export const DEFAULT_TEXT_WEIGHT: TextWeight = "normal";

export const CAPTION_SIZES = {
  sm: "text-[11px] leading-[1.4] uppercase tracking-wider",
  md: "text-xs leading-[1.4] uppercase tracking-wider",
  lg: "text-sm leading-[1.4] uppercase tracking-wider",
} as const;

export type CaptionSize = keyof typeof CAPTION_SIZES;

export const DEFAULT_CAPTION_SIZE: CaptionSize = "md";
