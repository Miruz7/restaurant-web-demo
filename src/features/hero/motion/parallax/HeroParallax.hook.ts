/**
 * useHeroParallax — Hook principal · Sprint 10.8 · Editorial Mouse Parallax
 */

import * as React from "react";
import { useEffect, useMemo, useRef, type CSSProperties } from "react";
import {
  HERO_PARALLAX_LERP_ALPHA,
  HERO_PARALLAX_POINTER_MEDIA_QUERY,
  HERO_PARALLAX_REDUCED_MOTION_MEDIA_QUERY,
} from "./HeroParallax.constants";
import {
  buildDustParallaxStyle,
  buildHaloParallaxStyle,
  buildWarmParallaxStyle,
  lerp2D,
  normalizePointerToMinus1Plus1,
  type Point2D,
} from "./HeroParallax.utils";

export interface HeroParallaxStyles {
  readonly styleHalo: CSSProperties;
  readonly styleWarm: CSSProperties;
  readonly styleDust: CSSProperties;
}

const IDENTITY_POINT: Point2D = { x: 0, y: 0 };

function computeIsEnabledOnClient(isHeroVisible: boolean): boolean {
  if (typeof window === "undefined") return false;
  const finePointer = window.matchMedia(HERO_PARALLAX_POINTER_MEDIA_QUERY).matches;
  const reducedMotion = window.matchMedia(HERO_PARALLAX_REDUCED_MOTION_MEDIA_QUERY).matches;
  return finePointer && !reducedMotion && isHeroVisible;
}

export function useHeroParallax(
  sectionRef: React.RefObject<HTMLElement | null>,
  isHeroVisible: boolean,
): HeroParallaxStyles {
  /* ------------------------------------------------------------------ */
  /* Refs (estado mutable NO triggers rerender)                          */
  /* ------------------------------------------------------------------ */

  /** Target normalizado [-1,1] (último pointer publicado). */
  const targetRef = useRef<Point2D>(IDENTITY_POINT);
  /** Actual normalizado [-1,1] (sigue a target con lerp). */
  const currentRef = useRef<Point2D>(IDENTITY_POINT);
  /** ID rAF activo — 0 = sin loop. */
  const rafIdRef = useRef<number>(0);
  /** Handler pointermove bound — para removeEventListener. */
  const handleMoveRef = useRef<((ev: PointerEvent) => void) | null>(null);

  /* ------------------------------------------------------------------ */
  /* Snapshot actualizado en rAF (provoca 1 rerender/frame rAF)         */
  /* ------------------------------------------------------------------ */

  const [renderedPoint, setRenderedPoint] = React.useState<Point2D>(IDENTITY_POINT);

  /* Is parallax ENABLED? — cálculo estable durante render (sin setState) */
  const parallaxEnabled = useMemo(() => computeIsEnabledOnClient(isHeroVisible), [isHeroVisible]);

  /* ------------------------------------------------------------------ */
  /* Efecto principal — montar / desmontar parallax según enabled.       */
  /* Sin setState síncrono dentro del effect.                            */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    if (!parallaxEnabled) {
      if (rafIdRef.current !== 0) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
      if (handleMoveRef.current) {
        window.removeEventListener("pointermove", handleMoveRef.current, true);
        handleMoveRef.current = null;
      }
      targetRef.current = IDENTITY_POINT;
      currentRef.current = IDENTITY_POINT;
      return undefined;
    }

    const tick = () => {
      const curr = currentRef.current;
      const tgt = targetRef.current;

      const dxChanged = Math.abs(curr.x - tgt.x) > 1e-4;
      const dyChanged = Math.abs(curr.y - tgt.y) > 1e-4;

      if (!dxChanged && !dyChanged) {
        rafIdRef.current = 0;
        return;
      }

      const next = lerp2D(curr, tgt, HERO_PARALLAX_LERP_ALPHA);
      currentRef.current = next;
      setRenderedPoint(next);

      rafIdRef.current = requestAnimationFrame(tick);
    };

    const ensureLoopAwake = () => {
      if (rafIdRef.current === 0) {
        rafIdRef.current = requestAnimationFrame(tick);
      }
    };

    const handleMove = (ev: PointerEvent) => {
      if (sectionRef?.current) {
        const hero = sectionRef.current.getBoundingClientRect();
        const fullyAbove = hero.bottom < 0;
        const fullyBelow = hero.top > window.innerHeight;
        if (fullyAbove || fullyBelow) return;
      }
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      targetRef.current = normalizePointerToMinus1Plus1(ev.clientX, ev.clientY, vw, vh);
      ensureLoopAwake();
    };

    handleMoveRef.current = handleMove;
    window.addEventListener("pointermove", handleMove, true);

    return () => {
      if (rafIdRef.current !== 0) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = 0;
      }
      if (handleMoveRef.current) {
        window.removeEventListener("pointermove", handleMoveRef.current, true);
        handleMoveRef.current = null;
      }
    };
  }, [parallaxEnabled, sectionRef]);

  /* ------------------------------------------------------------------ */
  /* Estilos inyectables — SI parallax NO enabled → devolvemos (0,0).    */
  /* ------------------------------------------------------------------ */

  return useMemo<HeroParallaxStyles>(() => {
    const pt = parallaxEnabled ? renderedPoint : IDENTITY_POINT;
    return {
      styleHalo: buildHaloParallaxStyle(pt),
      styleWarm: buildWarmParallaxStyle(pt),
      styleDust: buildDustParallaxStyle(pt),
    };
  }, [parallaxEnabled, renderedPoint]);
}
