/**
 * src/services/api/api.ts
 *
 * Cliente HTTP base para el proyecto.
 *
 * Sprint 10.1 = infraestructura: solo exponemos un fetch wrapper
 * tipado y las bases. La capa real de endpoints (products, auth,
 * orders...) vivirá en archivos independientes del mismo subfolder.
 *
 * Otros servicios futuros candidatos en este mismo nivel:
 *   - services/supabase/supabase.ts
 *   - services/analytics/analytics.ts
 *   - services/mail/mail.ts
 *   - services/payments/payments.ts
 */

import type { AppEnvironment } from "@/types";

export interface ApiRequestOptions extends RequestInit {
  /** Timeout en ms. Sobrescribe el default de env. */
  readonly timeoutMs?: number;
  /** Query params tipados (serializados de forma segura). */
  readonly params?: Record<string, string | number | boolean | undefined>;
  /** Si "json", parsea respuesta JSON; si "text", como texto; si null, no parsea. */
  readonly parse?: "json" | "text" | null;
}

export interface ApiError extends Error {
  status?: number;
  url?: string;
}

// ============================================================
// Helpers internos
// ============================================================

function buildUrl(base: string, endpoint: string, params: ApiRequestOptions["params"]): string {
  const safeBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = `${safeBase}${safeEndpoint}`;
  if (!params) return url;
  const usp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    usp.append(k, String(v));
  }
  const qs = usp.toString();
  return qs ? `${url}?${qs}` : url;
}

function createTimeoutSignal(timeoutMs: number): AbortSignal {
  if (typeof AbortSignal !== "undefined" && "timeout" in AbortSignal) {
    return AbortSignal.timeout(timeoutMs);
  }
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), timeoutMs);
  return ctrl.signal;
}

// ============================================================
// Cliente público (por ahora minimal)
// ============================================================

export async function fetchJson<T = unknown>(
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const baseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";
  const defaultTimeout = Number(
    (import.meta.env.VITE_API_TIMEOUT_MS as string | undefined) ?? 10_000,
  );
  const timeoutMs = options.timeoutMs ?? defaultTimeout;
  const url = buildUrl(baseUrl, endpoint, options.params);
  const parse = options.parse ?? "json";
  const init: RequestInit = {
    method: "GET",
    credentials: "same-origin",
    headers: { Accept: "application/json" },
    ...options,
    signal: options.signal ?? createTimeoutSignal(timeoutMs),
  };

  const response = await fetch(url, init);
  if (!response.ok) {
    const err = new Error(
      `[fetchJson] ${response.status} ${response.statusText} for ${url}`,
    ) as ApiError;
    err.status = response.status;
    err.url = url;
    throw err;
  }
  if (parse === null) return undefined as unknown as T;
  if (parse === "text") return (await response.text()) as unknown as T;
  return (await response.json()) as T;
}

/** Helper útil para debugging / tests por consola. No usar en producción. */
export function getApiBaseUrl(): AppEnvironment["API_BASE_URL"] {
  return (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? "/api";
}
