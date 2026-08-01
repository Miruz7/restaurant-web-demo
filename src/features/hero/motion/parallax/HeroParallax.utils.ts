/**
 * HeroParallax.utils.ts
 *
 * Pure functions para el hook de parallax.
 * Ninguna función toca el DOM, ningúna side-effect.
 * 100% testables y deterministas.
 */

import type { CSSProperties } from "react";
import {
  HERO_PARALLAX_DUST_MAX_X_PX,
  HERO_PARALLAX_DUST_MAX_Y_PX,
  HERO_PARALLAX_HALO_MAX_X_PX,
  HERO_PARALLAX_HALO_MAX_Y_PX,
  HERO_PARALLAX_WARM_MAX_X_PX,
  HERO_PARALLAX_WARM_MAX_Y_PX,
} from "./HeroParallax.constants";

/**
 * clamp cierra el valor al rango [min, max].
 * Se usa para garantizar que el normalized nunca se escape
 * del espacio [-1, +1] ante edges raros.
 */
export const clampRange = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value));

/** Linear interpolation standard. a → b, alpha ∈ [0, 1]. */
export const lerp = (a: number, b: number, alpha: number): number => a + (b - a) * alpha;

/** 2D lerp (composición vectorial trivial). */
export interface Point2D {
  readonly x: number;
  readonly y: number;
}

export const lerp2D = (current: Point2D, target: Point2D, alpha: number): Point2D => ({
  x: lerp(current.x, target.x, alpha),
  y: lerp(current.y, target.y, alpha),
});

/**
 * Coordenadas del pointer (clientX, clientY en viewport) → espacio [-1,1].
 * Origen (0,0) = CENTRO del viewport. (-1,-1) sup-izq · (+1,+1) inf-der.
 *
 * Si W=0 o H=0 retorna (0,0) para evitar NaN/Infinity.
 */
export const normalizePointerToMinus1Plus1 = (
  clientX: number,
  clientY: number,
  viewportW: number,
  viewportH: number,
): Point2D => {
  if (viewportW <= 0 || viewportH <= 0) {
    return { x: 0, y: 0 };
  }
  const nx = (2 * clientX) / viewportW - 1;
  const ny = (2 * clientY) / viewportH - 1;
  return {
    x: clampRange(nx, -1, 1),
    y: clampRange(ny, -1, 1),
  };
};

/**
 * Escalar espacio [-1,1] a píxeles máximo específico por capa.
 * Retorna valores en píxel.
 */
export const scaleToMaxPixels = (normalized: Point2D, maxX: number, maxY: number): Point2D => ({
  x: normalized.x * maxX,
  y: normalized.y * maxY,
});

/**
 * Build transform: translate3d() con 2 floats en px.
 * Usamos `translate3d` en Halo y Warm (compositor GPU garantizado).
 */
export const buildTranslate3dPx = (x: number, y: number): string =>
  `translate3d(${x.toFixed(3)}px, ${y.toFixed(3)}px, 0)`;

/**
 * Build translate property moderna (independiente de transform), en px.
 * Para el Dust — nos permite COMPONER el parallax CON la animación
 * ambient `hero-ambient-dust` que usa transform:translate3d(), sin
 * que una pise a la otra. Ambas propiedades van al compositor GPU.
 */
export const buildTranslatePropertyPx = (x: number, y: number): string =>
  `${x.toFixed(3)}px ${y.toFixed(3)}px`;

/**
 * Estilo React inyectable al div Halo.
 * Solo contiene will-change + transform. Nada más.
 */
export const buildHaloParallaxStyle = (px: Point2D): CSSProperties => ({
  willChange: "transform",
  transform: buildTranslate3dPx(
    px.x * HERO_PARALLAX_HALO_MAX_X_PX,
    px.y * HERO_PARALLAX_HALO_MAX_Y_PX,
  ),
});

/** Estilo React para Warm Light — igual que Halo pero amplitudes menores. */
export const buildWarmParallaxStyle = (px: Point2D): CSSProperties => ({
  willChange: "transform",
  transform: buildTranslate3dPx(
    px.x * HERO_PARALLAX_WARM_MAX_X_PX,
    px.y * HERO_PARALLAX_WARM_MAX_Y_PX,
  ),
});

/**
 * Estilo React para Dust.
 * Usamos `translate` property para NO competir con la animación
 * ambient Dust Drift que ocupa `transform: translate3d`.
 * Ambas se componen y se van al compositor. 0 conflictos.
 */
export const buildDustParallaxStyle = (px: Point2D): CSSProperties => ({
  willChange: "translate",
  translate: buildTranslatePropertyPx(
    px.x * HERO_PARALLAX_DUST_MAX_X_PX,
    px.y * HERO_PARALLAX_DUST_MAX_Y_PX,
  ),
});
