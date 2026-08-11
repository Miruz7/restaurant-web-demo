/**
 * LocationActions.tsx — Sprint 12.4 Location Showcase (re-export de LocationInfo).
 *
 * Los 2 botones (Cómo llegar · Llamar) viven dentro de LocationInfo por simplicidad
 * editorial (misma columna). Este barrel es export point para que el feature
 * cumpla el "Archivos esperados" del sprint.
 */

export { default } from "./LocationInfo";
export type { LocationInfoProps as LocationActionsProps } from "./LocationInfo";
