/**
 * CTAGroup.config.ts
 *
 * Layout de agrupación de CTAs.
 * NO contiene lógica de copy ni de navegación: solo layouting.
 */

import { cn } from "@/lib/cn";

/** Base: flex + wrap. Responsive: col en <md, row a partir de md. */
export const CTA_GROUP_BASE_CLASS = [
  "flex flex-wrap items-stretch",
  "flex-col gap-16 sm:gap-24",
  "md:flex-row md:items-center md:gap-24",
].join(" ");

export const CTA_GROUP_ALIGN = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
} as const;

export type CTAGroupAlign = keyof typeof CTA_GROUP_ALIGN;
export const DEFAULT_CTA_GROUP_ALIGN: CTAGroupAlign = "left";

export function getCTAGroupClasses({
  align = DEFAULT_CTA_GROUP_ALIGN,
  className,
}: {
  readonly align?: CTAGroupAlign;
  readonly className?: string;
}): string {
  return cn(CTA_GROUP_BASE_CLASS, CTA_GROUP_ALIGN[align], className);
}
