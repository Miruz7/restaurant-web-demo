/**
 * src/constants/layout.ts
 *
 * Constantes globales del layout que afectan a MÁS DE UN COMPONENTE.
 * Regla: si afecta a Header y también a Hero sticky offsets o scroll spy,
 * su lugar es aquí, NO dentro del Header.
 *
 * Referencia: docs/engineering/COMPONENT_ARCHITECTURE.md § "constantes huérfanas".
 */

// Altura base del header en px. Future-proof: si cambia a 72 o 96,
// actualiza esta constante y ajustes automáticos se propagan:
//  - padding-top inicial del Hero
//  - offset de scroll-spy / anchor scroll
//  - sticky top-offset
//  - drawer backdrop z-index thresholds
export const HEADER_HEIGHT_PX = 80 as const;

// Anchos máximos / mínimos compartidos
export const CONTENT_MAX_WIDTH_PX = 1440 as const;
export const MOBILE_BREAKPOINT_PX = 768 as const;
export const TABLET_BREAKPOINT_PX = 1024 as const;

// Espaciados mínimos de gutter (si algún día cambian, 1 sitio)
export const GRID_GUTTER_PX = 24 as const;
export const MOBILE_GUTTER_PX = 16 as const;
