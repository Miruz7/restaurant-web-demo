export const BUTTON_BASE =
  "inline-flex items-center justify-center gap-8 font-sans font-medium select-none outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary disabled:pointer-events-none disabled:opacity-50 transition-colors";

export const BUTTON_VARIANTS = {
  primary:
    "bg-primary text-secondary hover:bg-primary/90 active:bg-primary/80 rounded-12",
  secondary:
    "bg-secondary text-primary border border-primary hover:bg-primary/5 active:bg-primary/10 rounded-12",
  ghost:
    "bg-transparent text-primary hover:bg-primary/5 active:bg-primary/10 rounded-12",
} as const;

export type ButtonVariant = keyof typeof BUTTON_VARIANTS;
export const DEFAULT_BUTTON_VARIANT: ButtonVariant = "primary";

export const BUTTON_SIZES = {
  sm: "h-32 px-16 text-sm",
  md: "h-40 px-24 text-base",
  lg: "h-48 px-32 text-lg",
} as const;

export type ButtonSize = keyof typeof BUTTON_SIZES;
export const DEFAULT_BUTTON_SIZE: ButtonSize = "md";
