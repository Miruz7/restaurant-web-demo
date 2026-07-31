/**
 * src/data/index.ts
 *
 * Barrel de datos estáticos (de dominio, copy hardcodeado, valores aprobados).
 * Cumple convención de arquitectura: igual que components/ui, layouts, constants,
 * services → TODO módulo de datos se re-exporta por aquí.
 *
 * Importar desde el exterior:
 *   import { HERO_DATA, PUBLIC_NAVIGATION } from "@/data";
 *
 * NUNCA importar desde rutas profundas si existe equivalente en el barrel.
 */

export * from "./hero";
export * from "./navigation";
