/**
 * src/types/layout.ts
 *
 * Tipos relativos al layout global: breakpoints, modo tema,
 * áreas de sidebar/header/footer, unidades de grid...
 */

/** Keys de breakpoints (alineados con Design System tokens breakpoints.css). */
export type BreakpointKey = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "4xl";

/** Modo visual de la UI. */
export type ThemeMode = "light" | "dark" | "system";
