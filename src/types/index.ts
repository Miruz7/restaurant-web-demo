/**
 * src/types/index.ts
 *
 * Barrel único de tipos globales. Importar tipos agnósticos desde aquí:
 *    import type { IWithId, BreakpointKey } from "@/types";
 *
 * Cada subsistema puede definir sus propios tipos dentro de su carpeta
 * (ej: services/api/api.ts → ApiRequestOptions) y re-exportar desde aquí
 * si vale la pena exponerlos globalmente.
 */

export * from "./common";
export * from "./api";
export * from "./layout";
export * from "./navigation";
