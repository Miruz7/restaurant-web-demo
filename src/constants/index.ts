/**
 * src/constants/index.ts
 *
 * Barrel de constantes globales del proyecto.
 * Cada módulo (layout, routes, app, seo, navigation, api...) tiene su propio
 * archivo dedicado. Index re-exporta para importar desde un único "@/constants".
 *
 *    import { HEADER_HEIGHT_PX, ROUTES, NAV_ARIA_LABELS } from "@/constants";
 */

export * from "./layout";
export * from "./routes";
export * from "./app";
export * from "./seo";
export * from "./navigation";
