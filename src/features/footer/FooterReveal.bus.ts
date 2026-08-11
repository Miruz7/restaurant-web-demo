/**
 * FooterReveal.bus.ts
 *
 * Sprint 12.5.4 — Cinematic Footer Reveal (Azur Promilia scroll-driven)
 *
 * Singleton Event Bus ligero. Comunicación UNIDIRECCIONAL:
 *   [FooterReveal IO Component]  ───── eased (0-1) progress ────▶  [LocationSection Reveal Overlay]
 *
 * - SIN React Context (no requiere provider externo en HomePage).
 * - No requiere Provider wrappers. Suscripción directa on mount + cleanup unmount.
 * - El valor easedProgress se calcula ÚNICAMENTE en FooterReveal (source of truth).
 */

export type FooterRevealListener = (easedProgress: number) => void;

let _progress = 0;
const _listeners = new Set<FooterRevealListener>();

export const FooterRevealBus = {
  getCurrentProgress(): number {
    return _progress;
  },
  setEasedProgress(nextRaw: number): void {
    const next = Number.isFinite(nextRaw) && nextRaw >= 0 ? (nextRaw > 1 ? 1 : nextRaw) : 0;
    if (next === _progress) return;
    _progress = next;
    for (const listener of _listeners) {
      try {
        listener(_progress);
      } catch {
        /* noop */
      }
    }
  },
  subscribe(listener: FooterRevealListener): () => void {
    _listeners.add(listener);
    try {
      listener(_progress);
    } catch {
      /* noop */
    }
    return () => {
      _listeners.delete(listener);
    };
  },
} as const;
