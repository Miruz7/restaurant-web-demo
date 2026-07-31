export const SECTION_SPACING = {
  none: "",
  sm: "py-48",
  md: "py-64",
  lg: "py-96",
  xl: "py-128",
  "2xl": "py-160",
} as const;

export type SectionSpacing = keyof typeof SECTION_SPACING;

export const SECTION_BACKGROUNDS = {
  transparent: "",
  primary: "bg-primary text-secondary",
  secondary: "bg-secondary text-primary",
  accent: "bg-accent text-secondary",
  success: "bg-success text-secondary",
  warning: "bg-warning text-primary",
  info: "bg-info text-secondary",
} as const;

export type SectionBackground = keyof typeof SECTION_BACKGROUNDS;

export const DEFAULT_SECTION_SPACING: SectionSpacing = "lg";

export const DEFAULT_SECTION_BACKGROUND: SectionBackground = "transparent";
