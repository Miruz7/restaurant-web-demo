/**
 * src/layouts/MainLayout/MainLayout.config.ts
 *
 * Configuración / constantes reutilizables del Layout principal.
 * La lógica de clases condicionales futuras (compound variants, getXxxClasses)
 * vivirá aquí para mantener el cuerpo del componente declarativo.
 */

/** Clases del Skip Link (solo visible cuando recibe foco de teclado). */
export const MAIN_LAYOUT_SKIP_LINK_CLASS = [
  "sr-only focus:not-sr-only",
  "focus:fixed focus:top-8 focus:left-8 focus:z-[999]",
  "focus:px-16 focus:py-8 focus:bg-primary focus:text-secondary",
  "focus:rounded-12 focus:shadow-32",
].join(" ");

/** Clases base del shell exterior del Layout principal. */
export const MAIN_LAYOUT_SHELL_CLASS = "flex min-h-screen flex-col bg-secondary text-primary";

/** Clases base del contenedor <main> (landmark principal). */
export const MAIN_LAYOUT_MAIN_CLASS = [
  "flex w-full flex-1 flex-col items-stretch",
  "mt-[var(--nova-header-height,0px)]",
].join(" ");

/** Id del elemento principal (para Skip Link anchor + foco programático). */
export const MAIN_LAYOUT_MAIN_ID = "main-content" as const;
