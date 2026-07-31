/**
 * ScrollIndicator.config.ts
 *
 * Indicador inferior de scroll (Sprint 10.2 = estructura/semántica,
 * SIN animaciones todavía).
 */

import { cn } from "@/lib/cn";

export const SCROLL_INDICATOR_BASE_CLASS = [
  "group inline-flex flex-col items-center justify-center gap-8",
  "rounded-full px-16 py-12",
  "text-primary/60 hover:text-primary",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary",
  "transition-colors",
].join(" ");

/** Icono placeholder (chevron). Sprint Motion: animación bounce/translate. */
export const SCROLL_INDICATOR_ICON_CLASS = [
  "relative block h-32 w-20",
  "rounded-full border border-current",
  "before:absolute before:left-1/2 before:top-6 before:-translate-x-1/2",
  "before:block before:h-6 before:w-2 before:rounded-full before:bg-current",
].join(" ");

/** Label visualmente oculto pero leído por screen reader. */
export const SCROLL_INDICATOR_LABEL_CLASS = "sr-only";

export function getScrollIndicatorClasses(className?: string): string {
  return cn(SCROLL_INDICATOR_BASE_CLASS, className);
}
