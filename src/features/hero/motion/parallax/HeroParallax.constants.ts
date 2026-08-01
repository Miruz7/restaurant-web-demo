/**
 * HeroParallax.constants.ts
 *
 * SSOT numérico · Sprint 10.8 · Editorial Mouse Parallax.
 *
 * Toda la profundidad de campo (max amplitudes / lerp / query media / FPS)
 * vive AQUÍ. 0 números mágicos inline en hook / componentes.
 *
 * Restricciones inherentes al Spec 10.8.0:
 *  · Solo se mueven HALO · WARM · DUST. Nunca imagen / texto / botones.
 *  · Movimientos máximos en píxeles EXACTOS.
 *  · Solo Desktop pointer: fine.
 *  · Solo requestAnimationFrame + lerp 0.08 (inercia).
 *  · Sin setInterval / setTimeout.
 *  · Solo translate3d() / translate (compositor GPU).
 */

/** 1. Halo — movimiento mínimo (profundidad lejana) */
export const HERO_PARALLAX_HALO_MAX_X_PX = 4;
export const HERO_PARALLAX_HALO_MAX_Y_PX = 2;

/** 2. Warm Light — aún menos que halo (foco medio) */
export const HERO_PARALLAX_WARM_MAX_X_PX = 3;
export const HERO_PARALLAX_WARM_MAX_Y_PX = 2;

/** 3. Dust — capa más cercana al usuario → mayor amplitud */
export const HERO_PARALLAX_DUST_MAX_X_PX = 8;
export const HERO_PARALLAX_DUST_MAX_Y_PX = 5;

/** Física — lerp muy bajo para sensación de inercia cinematográfica */
export const HERO_PARALLAX_LERP_ALPHA = 0.08;

/** Soporte — solo ratón / trackpad precisos; excluye touch / stylus grueso */
export const HERO_PARALLAX_POINTER_MEDIA_QUERY = "(pointer: fine)";

/** prefers-reduced-motion — SIEMPRE respetado, incluso si el usuario
 *  tiene pointer: fine y está en desktop. */
export const HERO_PARALLAX_REDUCED_MOTION_MEDIA_QUERY =
  "(prefers-reduced-motion: reduce)";
