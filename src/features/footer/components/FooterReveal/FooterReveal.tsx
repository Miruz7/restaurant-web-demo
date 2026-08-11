/**
 * useFooterReveal · Sprint 12.5.4.b — Footer Reveal Engine Rewrite (Arquitectura Definitiva)
 *
 * ✅ Toda la lógica del Reveal concentrada en UN ÚNICO HOOK interno.
 * ✅ Footer observado = Footer animado. Mismo elemento. Sin wrapper. Sin búsqueda DOM.
 * ✅ Sin wrapperRef. Sin firstElementChild. Sin requestAnimationFrame. Sin lastEasedRef.
 * ✅ Sin escrituras imperativas sobre footer.style.*. 100% React state → render style.
 * ✅ El IntersectionObserver observa DIRECTAMENTE <footer> (ref callback React).
 *
 * FLUJO PURIFICAO (una cosa por paso):
 *   Usuario scroll
 *     ↓ IntersectionObserver (threshold 21 granular, rootMargin bottom -15%)
 *   intersectionRatio · raw
 *     ↓ clamp numérico 0.000 ↔ 1.000 exacto
 *   clampedProgress
 *     ↓ easing HERO (.22,1,.36,1) cubic-bezier solve
 *   easedProgress (0 → 1)
 *     ↓ setState + FooterRevealBus.publish → LocationSection overlay
 *   React render
 *     ↓ revealStyle memo: opacity = eased · transform = translate3d(0,72*(1-eased), 0)
 *   <footer> renderiza ref={callback} style={mergedStyle}. FIN.
 *
 * RESTICCIONES MANTENIDAS (igual efecto que 12.5.4 / 12.5.4.a):
 *   ✔ translateY: +72px → 0px
 *   ✔ opacity: 0 → 1
 *   ✔ easing: cubic-bezier(.22, 1, .36, 1) HERO SSOT
 *   ✔ max Location Reveal Overlay: 55% (controlado en LocationSection máx 0.55 * eased)
 *   ✔ Scroll-Driven 100%: 0 duration / 0 delay / 0 keyframes / 0 setTimeout
 *   ✘ NO translateX / scale / rotate / blur / backdrop / absolute
 *   ✘ NO cloneElement / NO wrapper extra / NO querySelector / NO selectores DOM
 */

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import { FooterRevealBus } from "../../FooterReveal.bus";
import {
  cubicBezierEase,
  STORYTELLING_BEZIER,
  useStorytellingNavigator,
} from "@/features/storytellingNavigation";

export interface UseFooterRevealReturn {
  readonly footerRef: (node: HTMLElement | null) => void;
  readonly revealStyle: CSSProperties;
}

/**
 * Hook público useFooterReveal().
 * Consumir directamente en Footer.tsx:
 *   const { footerRef, revealStyle } = useFooterReveal();
 *   <footer ref={footerRef} style={{ ...ownStyle, ...revealStyle }}>
 *
 * ⭐ Sprint 12.5.6.j — Footer Overlay Handoff Rebuild.
 *   RAW PROGRESS SOURCE = StorytellingNavigator.footerRevealProgress (Context SSOT).
 *   No usamos más:
 *     - IntersectionObserver scroll visibility
 *     - requestAnimationFrame loop leyendo scrollY/document.scrollHeight
 *     - scroll nativo como driver
 *   El reveal viene ÚNICAMENTE del wheel event en Navigator Provider:
 *     wheel ↓ → deltaY → nav.advanceFooterRevealByWheel → raw=0→1 → eased aquí → render
 *   Se mantiene:
 *     - ResizeObserver → footerHeight REAL dinámico (0 mágicos).
 *     - Hero Bezier easing SSOT (0.22, 1, 0.36, 1).
 *     - revealStyle: offset = footerHeight*(1-eased) · op = eased (no cambio visual).
 *     - FooterRevealBus.publish eased → LocationSection overlay 0.55 máximo.
 */
export default function useFooterReveal(): UseFooterRevealReturn {
  const nav = useStorytellingNavigator();

  /*
   * ⭐ Sprint 12.5.6.h — Footer Reveal Handoff Animation · MAX_OFFSET_PX dinámico.
   * footerHeight: altura REAL del footer medida por ResizeObserver (SSOT geométrico).
   * 0 números mágicos (72, 100, 178, 200). Si el Footer cambia contenido/padding/icon
   * handoff height actualiza automáticamente.
   */
  const [footerHeight, setFooterHeight] = useState<number>(0);
  const footerHeightRORef = useRef<ResizeObserver | null>(null);

  /* --- Ref para detectar cambios reales de eased antes de publicar -------------- */
  const lastEasedPublished = useRef<number>(0);

  /* ------------------------- Paso: clamp numeric 0 ↔ 1 exacto ----------------------- */
  const clampProgress01 = useCallback((raw: number): number => {
    if (!Number.isFinite(raw) || raw < 0) return 0;
    return raw > 1 ? 1 : raw;
  }, []);

  /* ------------------------- Paso: Hero Bezier easing solver ------------------------ */
  const applyHeroBezier = useCallback((clamped01: number): number => {
    return cubicBezierEase(
      clamped01,
      STORYTELLING_BEZIER[0],
      STORYTELLING_BEZIER[1],
      STORYTELLING_BEZIER[2],
      STORYTELLING_BEZIER[3],
    );
  }, []);

  /*
   * easedProgress = memoizado directamente desde Navigator raw progress.
   * ⭐ Sprint 12.5.6.j — Sin setState intermedio, sin cascading render lint.
   */
  const easedProgress = useMemo<number>(() => {
    return applyHeroBezier(clampProgress01(nav.footerRevealProgress));
  }, [applyHeroBezier, clampProgress01, nav.footerRevealProgress]);

  /* --------------------- Ref callback React: React conoce exactamente el footer. -----------------
   * NO wrapperRef. NO firstElementChild. NO querySelector. NO IntersectionObserver (legacy).
   * Únicamente ResizeObserver para altura footer dinámica.
   */
  const footerRef = useCallback(
    (nextNode: HTMLElement | null) => {
      if (footerHeightRORef.current !== null) {
        footerHeightRORef.current.disconnect();
        footerHeightRORef.current = null;
      }

      if (nextNode === null) {
        setFooterHeight(0);
        return;
      }
      if (typeof window === "undefined" || typeof ResizeObserver === "undefined") {
        setFooterHeight(nextNode.offsetHeight || 0);
      } else {
        const updateFromNode = () => {
          const rect = nextNode.getBoundingClientRect();
          setFooterHeight(
            Math.max(0, Number.isFinite(rect.height) ? rect.height : nextNode.offsetHeight || 0),
          );
        };
        updateFromNode();
        const ro = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target !== nextNode) continue;
            const h = entry.contentRect?.height ?? entry.target.getBoundingClientRect().height;
            setFooterHeight(Math.max(0, Number.isFinite(h) ? h : 0));
          }
        });
        ro.observe(nextNode);
        footerHeightRORef.current = ro;
      }
      if (typeof window === "undefined") {
        const e1 = applyHeroBezier(1);
        lastEasedPublished.current = e1;
        FooterRevealBus.setEasedProgress(e1);
      }
    },
    [applyHeroBezier],
  );

  /*
   * ⭐ Sprint 12.5.6.j — Publish eased EN BUS SOLAMENTE cuando delta >= 0.0005.
   * Sin setState dentro effect (easedProgress viene de useMemo).
   * LocationSection overlay se subscribe via FooterRevealBus (no hook direct).
   */
  useEffect(() => {
    const eased = Number(easedProgress.toFixed(6));
    if (Math.abs(eased - lastEasedPublished.current) < 0.0005) return;
    lastEasedPublished.current = eased;
    FooterRevealBus.setEasedProgress(eased);
  }, [easedProgress]);

  /* Cleanup: reset bus 0 + disconnect ResizeObserver footerHeight. */
  useEffect(() => {
    lastEasedPublished.current = 0;
    FooterRevealBus.setEasedProgress(0);
    return () => {
      if (footerHeightRORef.current !== null) {
        footerHeightRORef.current.disconnect();
        footerHeightRORef.current = null;
      }
    };
  }, []);

  /* ---------- Render: revealStyle memoizado (única fuente de verdad visual footer). ----------
   * NO imperativo footer.style.*. React renderiza desde state easedProgress.
   * ⭐ Sprint 12.5.6.h: MAX_OFFSET_PX = footerHeight REAL (0 números mágicos).
   *   eased 0 → offset = +footerHeight → Footer completamente fuera de la vista.
   *   eased 1 → offset = 0 → Footer asentado exactamente en la frontera inferior
   *                    de Location (dentro del Viewport absolute bottom:0 z-[3]).
   */
  const revealStyle = useMemo<CSSProperties>(() => {
    const eased = clampProgress01(easedProgress);
    const offsetPx = Number((footerHeight * (1 - eased)).toFixed(2));
    return {
      opacity: eased,
      transform: `translate3d(0, ${offsetPx}px, 0)`,
      willChange: "transform, opacity",
    };
  }, [clampProgress01, easedProgress, footerHeight]);

  return { footerRef, revealStyle } as const;
}

/* ---------- Keep alias: compatibilidad barrel export "FooterReveal" como hook nombre. ---------- */
export { useFooterReveal };
export type { UseFooterRevealReturn as FooterRevealHookReturn };
