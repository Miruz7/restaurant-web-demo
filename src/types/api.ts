/**
 * src/types/api.ts
 *
 * Tipos globales relativos a la capa de servicios,
 * variables de entorno y clientes externos (REST, Supabase...).
 */

import type { ApiError, ApiRequestOptions } from "@/services/api";

// =====================================================================
// Environment (variables de entorno tipadas)
// =====================================================================

export interface AppEnvironment {
  readonly APP_NAME: string;
  readonly APP_URL: string;
  readonly APP_ENV: "development" | "staging" | "production" | "test";
  readonly API_BASE_URL: string;
  readonly API_TIMEOUT_MS: number;
  readonly CONTACT_EMAIL: string;
  readonly CONTACT_PHONE?: string;
  readonly PUBLIC_SUPABASE_URL?: string;
  readonly PUBLIC_SUPABASE_ANON_KEY?: string;
  readonly STRIPE_PUBLISHABLE_KEY?: string;
}

// =====================================================================
// Re-export de tipos del servicio HTTP base (SSOT en servicios, types re-expone)
// =====================================================================

export type { ApiRequestOptions, ApiError };

// =====================================================================
// Declaraciones globales de módulos
// =====================================================================

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface ImportMetaEnv extends Partial<Record<keyof AppEnvironment, string>> {}
}

export {};
