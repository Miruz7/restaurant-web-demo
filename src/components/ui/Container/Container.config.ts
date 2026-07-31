export const CONTAINER_SIZES = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
} as const;

export type ContainerSize = keyof typeof CONTAINER_SIZES;

export const DEFAULT_CONTAINER_SIZE: ContainerSize = "2xl";

export const BASE_CONTAINER_CLASS = "w-full px-16";

export const CENTERED_CONTAINER_CLASS = "mx-auto";
