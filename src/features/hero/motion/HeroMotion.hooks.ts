/**
 * HeroMotion.hooks.ts
 *
 * Sprint 10.7.1 Tareas 4 + 5 (Performance):
 *   1) useHeroMotionPlayState → IntersectionObserver + prefers-reduced-motion.
 *      - Pausa TODAS las animaciones del Hero cuando la sección abandona el
 *        viewport (< 25% visible).
 *      - Si el usuario tiene `prefers-reduced-motion: reduce`, el hook
 *        devuelve `{play:false, reduced:true}` y el CSS helper
 *        `HERO_MOTION_REDUCED_MOTION_DISABLE_CLASS` neutraliza todo el
 *        resto (transiciones incluidas, EXCEPTO focus visible).
 *
 * Este hook se usa en HomePage para inyectar un CSS variable --hero-motion-play
 * en el section Hero (style={{ '--hero-motion-play': 'running' | 'paused' }}).
 */

import { useEffect, useRef, useState } from "react";
import { HERO_MOTION_IO_ROOT_MARGIN, HERO_MOTION_IO_THRESHOLD } from "./HeroMotion.constants";

export interface UseHeroMotionPlayStateResult {
  ref: React.RefObject<HTMLElement | null>;
  play: boolean;
  reduced: boolean;
}

export const useHeroMotionPlayState = (): UseHeroMotionPlayStateResult => {
  const ref = useRef<HTMLElement | null>(null);
  const reducedRef = useRef<boolean>(false);
  const reducedInit =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [reduced, setReduced] = useState<boolean>(reducedInit);
  const initialPlayState = (): boolean => !reducedInit;
  const [play, setPlay] = useState<boolean>(initialPlayState);

  useEffect(() => {
    const mq =
      typeof window === "undefined" || !window.matchMedia
        ? null
        : window.matchMedia("(prefers-reduced-motion: reduce)");

    if (!mq) {
      reducedRef.current = false;
      return undefined;
    }

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const next = Boolean("matches" in e ? e.matches : false);
      reducedRef.current = next;
      setReduced(next);
      if (next) {
        setPlay(false);
      } else {
        setPlay(true);
      }
    };

    handleChange(mq);

    if (mq.addEventListener) {
      mq.addEventListener("change", handleChange as (e: MediaQueryListEvent) => void);
    } else {
      (mq as MediaQueryList).addListener?.(handleChange as (e: MediaQueryListEvent) => void);
    }

    return () => {
      if (mq.removeEventListener) {
        mq.removeEventListener("change", handleChange as (e: MediaQueryListEvent) => void);
      } else {
        (mq as MediaQueryList).removeListener?.(handleChange as (e: MediaQueryListEvent) => void);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return undefined;
    const el = ref.current;

    if (typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (reducedRef.current) {
          setPlay(false);
          return;
        }
        const entry = entries[0];
        if (!entry) return;
        const visible = entry.intersectionRatio >= HERO_MOTION_IO_THRESHOLD;
        setPlay(visible);
      },
      {
        root: null,
        rootMargin: HERO_MOTION_IO_ROOT_MARGIN,
        threshold: [0, HERO_MOTION_IO_THRESHOLD, 0.5, 1],
      },
    );

    io.observe(el);

    return () => {
      io.disconnect();
    };
  }, []);

  return { ref, play: reduced ? false : play, reduced };
};
