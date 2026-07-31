/**
 * HeroContent.config.ts
 *
 * Layouting y clases del slot de contenido textual del Hero.
 * El copy NO vive aquí; el copy se pasa via props (o se define en
 * HomePage al momento de instanciar HeroContent).
 */

import { cn } from "@/lib/cn";

/** Clases del bloque Badge (tag category). */
export const HERO_CONTENT_BADGE_CLASS = [
  "inline-flex items-center gap-8 rounded-full",
  "border border-primary/10 bg-primary/5 px-16 py-6",
  "text-xs font-medium tracking-wide uppercase text-primary/80",
].join(" ");

/** Espaciado interno entre elementos textuales (badge → heading → descrip → CTA). */
export const HERO_CONTENT_STACK_CLASS =
  "flex w-full max-w-3xl flex-col items-start gap-24 md:gap-32";

/** Heading H1 estilo display-Hero. Clases extendidas sobre las defaults de HEADING_VARIANTS. */
export const HERO_CONTENT_HEADING_CLASS = [
  "text-balance",
  "leading-[1.05] tracking-tight",
  "font-heading",
].join(" ");

/** Descripción: ancho máximo + leading cómodo + opacidad para contraste. */
export const HERO_CONTENT_DESCRIPTION_CLASS = [
  "max-w-2xl text-pretty",
  "leading-relaxed text-primary/80",
].join(" ");

/**
 * Helper para resolver el className final del stack HeroContent.
 */
export function getHeroContentStackClasses(className?: string): string {
  return cn(HERO_CONTENT_STACK_CLASS, className);
}
