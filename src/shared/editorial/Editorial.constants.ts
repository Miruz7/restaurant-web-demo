/**
 * Editorial.constants.ts — Sprint 12.4.3 Foundation Architecture.
 *
 * SSOT ÚNICO para la retícula editorial común Hero · Featured · Location.
 * ⚠️ NINGUNA escena podrá usar offsets manuales (pl/ml/translateX/translateY)
 *    para alinear contenido. Todo se deriva de estas constantes.
 */

export const EDITORIAL_MAX_WIDTH = 1280 as const;

export const EDITORIAL_PADDING_MOBILE = 24 as const;
export const EDITORIAL_PADDING_TABLET = 48 as const;
export const EDITORIAL_PADDING_DESKTOP = 84 as const;

/* ==== Columnas editoriales REALES (no fr, no width%, no flex:1). ========
 * Desktop composición: [560 px] gap 120 [560 px]  justify-center.
 * Total: 560+120+560 = 1240 px.  Se centra perfectamente dentro de 1280 px.
 * ===================================================================== */

export const EDITORIAL_COLUMN_WIDTH = 560 as const;
export const EDITORIAL_COLUMN_GAP = 120 as const;

/* Breakpoints literales (coinciden con Tailwind bridge en index.css). */
export const EDITORIAL_BREAKPOINT_TABLET = 768;
export const EDITORIAL_BREAKPOINT_DESKTOP = 1024;
export const EDITORIAL_BREAKPOINT_LG = 1440;
export const EDITORIAL_BREAKPOINT_XL = 1920;
