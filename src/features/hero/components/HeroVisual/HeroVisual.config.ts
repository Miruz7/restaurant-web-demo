/**
 * HeroVisual.config.ts
 *
 * Placeholder contenedor del recurso visual del Hero (lado derecho desktop,
 * arriba/abajo en mobile).
 *
 * El recurso exacto (imagen, ilustración, vídeo, modelo 3D, canvas, slider)
 * se inyecta via children. Este componente solo define el contenedor y su
 * relación de aspecto base.
 */

import { cn } from "@/lib/cn";

/** Base: relative, fondo placeholder, centrado. */
export const HERO_VISUAL_BASE_CLASS = "relative w-full flex items-center justify-center";

/** Mapa de relaciones de aspecto. Sprint 10.2: default landscape_4_3. */
export const HERO_VISUAL_ASPECTS = {
  "1:1": "aspect-square",
  "4:3": "aspect-4/3",
  "16:9": "aspect-video",
  "3:4": "aspect-3/4",
} as const;

export type HeroVisualAspect = keyof typeof HERO_VISUAL_ASPECTS;
export const DEFAULT_HERO_VISUAL_ASPECT: HeroVisualAspect = "4:3";

/** Estilo placeholder (cuando no hay children inyectados). */
export const HERO_VISUAL_PLACEHOLDER_CLASS =
  "h-full w-full rounded-12 border border-dashed border-primary/20 bg-primary/[0.03]";

/** Media fill: children ocupan todo el container. */
export const HERO_VISUAL_MEDIA_FILL_CLASS =
  "[&>*]:h-full [&>*]:w-full [&>*]:rounded-12 [&>*]:object-cover";

export function getHeroVisualClasses({
  aspect = DEFAULT_HERO_VISUAL_ASPECT,
  className,
}: {
  readonly aspect?: HeroVisualAspect;
  readonly className?: string;
}): string {
  return cn(HERO_VISUAL_BASE_CLASS, HERO_VISUAL_ASPECTS[aspect], className);
}
