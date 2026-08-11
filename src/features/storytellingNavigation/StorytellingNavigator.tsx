/**
 * StorytellingNavigator.tsx
 *
 * Sprint 12.1 — Storytelling Engine Refactor · Single Source of Truth.
 * Sprint 12.5.3.a — Hybrid Exit Transition (Storytelling ↔ Native Scroll).
 *
 * PRINCIPIOS IRROMIBLES (mismos + híbrido):
 *   1. UN SOLO ESTADO escena: `currentScene` + (NUEVO) `storytellingState` = machine states.
 *   2. SIN pub/sub ni listeners. React sync via Context.
 *   3. SIN useEffect sincronizador setState → setState (salvo state data-attribute).
 *   4. goTo() / goNext() / goPrev(): solo setCurrentScene(clamped).
 *   5. NUEVA Wheel HANDLER CONDICIONAL:
 *        - ACTIVE     → wheel lock (preventDefault).
 *        - EXITING    → (transitorio) NO preventDefault.
 *        - NATIVE     → Wheel libre.
 *        - RE_ENTER   → (transitorio) Wheel normal.
 *   6. Hard Lock DINÁMICO: html[data-storytelling-overflow] = locked | native.
 *        - ACTIVE / RE_ENTER → locked.
 *        - EXITING / NATIVE  → native (overflow auto).
 *   7. 0 setTimeout  ·  0 window.scrollTo  ·  0 scrollIntoView.
 */
/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import {
  STORYTELLING_BEZIER_CSS,
  STORYTELLING_LOCK_DEBOUNCE_MS,
  STORYTELLING_STATE,
  STORYTELLING_TOUCH_SWIPE_THRESHOLD,
  STORYTELLING_TRANSITION_MS,
  STORYTELLING_WHEEL_THRESHOLD,
  type StorytellingState,
} from "./StorytellingNavigation.config";
import type { StorytellingNavigatorAPI } from "./StorytellingNavigation.types";

interface ViewTransitionLike {
  readonly ready: Promise<void>;
  readonly updateCallbackDone: Promise<void>;
  readonly finished: Promise<void>;
  skipTransition: () => void;
}

const STORYTELLING_EMPTY: StorytellingNavigatorAPI = {
  currentIndex: 0,
  sceneCount: 0,
  isAnimating: false,
  reducedMotion: false,
  storytellingState: STORYTELLING_STATE.ACTIVE,
  footerRevealProgress: 0,
  isFooterRevealAnimating: false,
  advanceFooterRevealByWheel(deltaWheelY, footerHeightPx) {
    void deltaWheelY;
    void footerHeightPx;
    return 0;
  },
  setFooterRevealProgress(_raw01) {
    void _raw01;
  },
  startFooterReveal() {
    /* noop */
  },
  startFooterHide() {
    /* noop */
  },
  goNext() {
    /* noop */
  },
  goPrev() {
    /* noop */
  },
  goTo() {
    /* noop */
  },
  registerSceneCount() {
    /* noop */
  },
  _subscribe() {
    return () => undefined;
  },
};

const StorytellingNavigatorContext = createContext<StorytellingNavigatorAPI>(STORYTELLING_EMPTY);

export function useStorytellingNavigator(): StorytellingNavigatorAPI {
  return useContext(StorytellingNavigatorContext);
}

/* ========================================================================== */
/*                                   Provider                                 */
/* ========================================================================== */

export interface StorytellingNavigatorProviderProps {
  readonly children: ReactNode;
  readonly initialSceneCount: number;
}

declare global {
  interface Window {
    __storytelling_navigator_mounted__?: boolean;
  }
}

export function StorytellingNavigatorProvider({
  children,
  initialSceneCount,
}: StorytellingNavigatorProviderProps): ReactElement {
  if (typeof window !== "undefined" && window.__storytelling_navigator_mounted__) {
    console.warn(
      "[storytelling] ⚠️  DOUBLE PROVIDER: Solo puede haber 1 StorytellingNavigatorProvider.",
    );
  }
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.__storytelling_navigator_mounted__ = true;
    }
    return () => {
      if (typeof window !== "undefined") {
        window.__storytelling_navigator_mounted__ = false;
      }
    };
  }, []);

  /* ============== SINGLE SOURCE OF TRUTH — ÚNICOS STATES ================ */
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [sceneCountState, setSceneCountState] = useState<number>(Math.max(1, initialSceneCount));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [storytellingState, setStorytellingState] = useState<StorytellingState>(
    STORYTELLING_STATE.ACTIVE,
  );
  /*
   * ⭐ Sprint 12.5.6.j — Footer Overlay Reveal (base).
   * footerRevealRaw: SSOT del reveal (0 = completamente fuera · 1 = asentado).
   * Estado puramente numérico, independiente de scrollY.
   * Valor RAW LINEAL (sin easing). El easing lo aplica FooterReveal hook mediante
   * useMemo(eased = Bezier(raw)) antes de publicar en el Bus hacia LocationSection
   * overlay, y también antes de calcular translate/opacity visual footer.
   *
   * ⭐ Sprint 12.5.6.k — Auto Transition 1 wheel trigger (1000 ms).
   *    - footerRevealTarget: estado reactivo (0 | 1). 1 wheel down Location → target=1;
   *      1 wheel up Footer completo → target=0.
   *    - useEffect([target, raw, reducedMotion]) anima raw linealmente 0↔1 en 1000 ms
   *      (declarativo, sin refs de tween / closures).
   */
  const [footerRevealRaw, setFooterRevealRaw] = useState<number>(0);
  const [footerRevealTarget, setFooterRevealTarget] = useState<0 | 1>(0);
  /* Sprint 12.5.6.k — isFooterRevealAnimating DERIVADO (no state): evita setState
   * síncrono dentro useEffect (lint rule react-hooks/set-state-in-effect).
   * Mientras raw !== target la animación está en curso. Al finalizar tween,
   * setFooterRevealRaw(toRaw) hace raw === target → animating=false automáticamente.
   */
  const isFooterRevealAnimating = useMemo(
    () => footerRevealRaw !== footerRevealTarget,
    [footerRevealRaw, footerRevealTarget],
  );
  /* ⭐ Sprint k — refs para evitar dependencia footerRevealRaw en useEffect animator
   * (sin esto, react-hooks/exhaustive-deps obliga a incluir raw en deps, lo cual
   * reiniciaría el tween en cada frame). Ref siempre apunta al valor actual raw.
   */
  const footerRevealRawRef = useRef<number>(0);
  useEffect(() => {
    footerRevealRawRef.current = footerRevealRaw;
  }, [footerRevealRaw]);
  /*
   * FOOTER_REVEAL_DURATION_MS: duración exacta transición reveal en milisegundos.
   * Sprint 12.5.6.k = 1000 ms (1.0 segundo completo) para transición 0↔1.
   */
  const FOOTER_REVEAL_DURATION_MS = 1000 as const;

  const lockUntilRef = useRef<number>(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const animTimeoutRef = useRef<number | null>(null);
  /* ⭐ Sprint k — Interval ref 60 fps para tween footer declarativo. */
  const footerAnimIntervalRef = useRef<number | null>(null);

  const initialReduced =
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
  const [reducedMotion, setReducedMotion] = useState<boolean>(initialReduced);

  /* ----------------------------- Reduced motion --------------------------- */
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return undefined;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handler);
      return () => mql.removeEventListener("change", handler);
    }
    if (typeof mql.addListener === "function") {
      mql.addListener(handler);
      return () => mql.removeListener(handler);
    }
    return undefined;
  }, []);

  /* ----------- Hard Lock DINÁMICO (data-attribute overflow) ------------- */
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const { documentElement } = document;
    if (
      storytellingState === STORYTELLING_STATE.ACTIVE ||
      storytellingState === STORYTELLING_STATE.RE_ENTER
    ) {
      documentElement.setAttribute("data-storytelling-overflow", "locked");
    } else {
      documentElement.setAttribute("data-storytelling-overflow", "native");
    }
    return undefined;
  }, [storytellingState]);

  const registerSceneCount = useCallback((count: number) => {
    setSceneCountState((prev) => {
      const next = Math.max(1, count);
      return prev === next ? prev : next;
    });
  }, []);

  /* ============== FOOTER REVEAL: SPRINT K DECLARATIVO 1s ================ */

  const clamp01 = useCallback((v: number): number => {
    if (!Number.isFinite(v) || v < 0) return 0;
    return v > 1 ? 1 : v;
  }, []);

  const setFooterRevealProgress = useCallback(
    (raw01: number) => {
      const next = clamp01(raw01);
      setFooterRevealRaw((prev) => (prev === next ? prev : next));
    },
    [clamp01],
  );

  /*
   * advanceFooterRevealByWheel: DEPRECATED Sprint 12.5.6.k.
   * El wheel ya no controla el delta progress directamente. Ahora Wheel es TRIGGER
   * de una transición automática 0→1 o 1→0 en 1000 ms.
   * Se mantiene API por compatibilidad interface (no hace nada).
   */
  const advanceFooterRevealByWheel = useCallback(
    (_deltaWheelY: number, _footerHeightPx?: number): number => footerRevealRaw,
    [footerRevealRaw],
  );

  /* ---------- Cancelar interval footer reveal (goTo, unmount, target change) */
  const cancelFooterInterval = useCallback(() => {
    if (footerAnimIntervalRef.current !== null) {
      if (typeof window !== "undefined") {
        window.clearInterval(footerAnimIntervalRef.current);
      }
      footerAnimIntervalRef.current = null;
    }
  }, []);

  /* ⭐ Sprint k — ANIMADOR DECLARATIVO: target → raw en 1000 ms.
   * React declara la meta, useEffect ejecuta el loop.
   * Sin setState sync en body (lint ok). Sin dep raw en array (usa ref).
   */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const currentRaw = footerRevealRawRef.current;
    if (currentRaw === footerRevealTarget) {
      cancelFooterInterval();
      return undefined;
    }
    const durationMs = reducedMotion ? 0 : Math.max(0, FOOTER_REVEAL_DURATION_MS);
    if (durationMs <= 0) {
      cancelFooterInterval();
      if (typeof window !== "undefined") {
        const toRawLocal = footerRevealTarget;
        const setIt = () => setFooterRevealRaw(toRawLocal);
        if (
          typeof (window as unknown as { queueMicrotask?: (fn: () => void) => void })
            .queueMicrotask === "function"
        ) {
          (window as unknown as { queueMicrotask: (fn: () => void) => void }).queueMicrotask(setIt);
        } else {
          window.setTimeout(setIt, 0);
        }
      }
      return undefined;
    }
    const fromRaw = currentRaw;
    const toRaw = footerRevealTarget;
    const startedAt = Date.now();
    const total = durationMs;
    cancelFooterInterval();
    const step = () => {
      const elapsed = Math.max(0, Date.now() - startedAt);
      const t = Math.min(1, elapsed / total);
      const next = clamp01(fromRaw + (toRaw - fromRaw) * t);
      setFooterRevealRaw((prev) => {
        if (Math.abs(prev - next) < 0.00001) return prev;
        return next;
      });
      if (t >= 1) {
        cancelFooterInterval();
        setFooterRevealRaw(toRaw);
      }
    };
    step();
    footerAnimIntervalRef.current = window.setInterval(step, 16);
    return () => {
      cancelFooterInterval();
    };
  }, [footerRevealTarget, reducedMotion, clamp01, cancelFooterInterval]);

  /* Cleanup animación footer interval si provider se desmonta. */
  useEffect(() => {
    return () => {
      cancelFooterInterval();
    };
  }, [cancelFooterInterval]);

  /* ⭐ Sprint 12.5.6.k — startFooterReveal (target 1 · 1000 ms). */
  const startFooterReveal = useCallback(() => {
    if (footerRevealRaw >= 0.9999 && !isFooterRevealAnimating && footerRevealTarget === 1) {
      return;
    }
    if (footerRevealRaw >= 0.9999 && !isFooterRevealAnimating) {
      setFooterRevealRaw(1);
      setFooterRevealTarget(1);
      return;
    }
    setFooterRevealTarget(1);
  }, [footerRevealRaw, isFooterRevealAnimating, footerRevealTarget]);

  /* ⭐ Sprint 12.5.6.k — startFooterHide (target 0 · 1000 ms). */
  const startFooterHide = useCallback(() => {
    if (footerRevealRaw <= 0.0001 && !isFooterRevealAnimating && footerRevealTarget === 0) {
      return;
    }
    if (footerRevealRaw <= 0.0001 && !isFooterRevealAnimating) {
      setFooterRevealRaw(0);
      setFooterRevealTarget(0);
      return;
    }
    setFooterRevealTarget(0);
  }, [footerRevealRaw, isFooterRevealAnimating, footerRevealTarget]);

  /* Reset Footer Reveal a 0 cada vez que cambiemos de escena (salir de Location).
   * ⭐ Sprint 12.5.6.j — Reset dentro goTo (no useEffect) para evitar regla
   *   react-hooks/set-state-in-effect. Reset = 0 si nueva escena no es la última.
   */
  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(sceneCountState - 1, index));
      const now = Date.now();
      const INPUT_RECEIVED_TS = typeof performance !== "undefined" ? performance.now() : 0;

      if (now < lockUntilRef.current) {
        console.debug(
          `[storytelling] 🔒 goTo(${index} → Scene ${clamped}) · BLOCKED (lock until ${new Date(lockUntilRef.current).toISOString().slice(14, 23)} · missing ${lockUntilRef.current - now} ms)`,
        );
        return;
      }
      if (clamped === currentScene && !isAnimating) return;
      const effectiveDuration = reducedMotion ? 0 : STORYTELLING_TRANSITION_MS;

      console.debug(
        `%c[storytelling] Scene ${currentScene} ──▶︎ Event · Destino = Scene ${clamped}`,
        "color:#7c3aed;font-weight:700",
      );
      console.debug(
        `[storytelling] ▶︎ START · Scene ${currentScene} → Scene ${clamped} · duration = ${effectiveDuration}ms · bezier = ${STORYTELLING_BEZIER_CSS}`,
      );
      console.debug(
        `[p11c][INPUT_RECEIVED] ${INPUT_RECEIVED_TS.toFixed(2)}  (Scene ${currentScene}→${clamped})`,
      );

      // --- Helper que ejecuta la actualización REAL de estados (igual SSOT que antes) ---
      const runSceneUpdateSync = (markSceneUpdate: () => void) => {
        cancelFooterInterval();
        lockUntilRef.current = now + STORYTELLING_LOCK_DEBOUNCE_MS;
        setIsAnimating(true);
        if (clamped !== sceneCountState - 1) {
          if (footerRevealRaw > 0) setFooterRevealRaw(0);
          if (footerRevealTarget !== 0) setFooterRevealTarget(0);
        }
        setCurrentScene(clamped);
        markSceneUpdate();
        if (animTimeoutRef.current !== null) {
          window.clearTimeout(animTimeoutRef.current);
          animTimeoutRef.current = null;
        }
        const lockTotal = STORYTELLING_LOCK_DEBOUNCE_MS;
        animTimeoutRef.current = window.setTimeout(
          () => {
            animTimeoutRef.current = null;
            setIsAnimating(false);
            console.debug(`[storytelling] ▶︎ END Animation · Scene ${clamped}`);
            console.debug(`[storytelling] 🔓 Lock Released`);
          },
          Math.max(1, lockTotal),
        );
      };

      /* ======================================================================
       * SPRINT 12.7.B.3 · PARTE 1.1 CORRECCIÓN DELAY.
       * CORRECIONES APLICADAS vs versión anterior errónea:
       *  ✅ NO usar callback ASYNC dentro startViewTransition (NO async/await dentro).
       *     El callback de VT debe actualizar el DOM DE INMEDIATO, no contener esperas.
       *  ✅ NO hacer await requestAnimationFrame DENTRO del callback VT. Eso
       *     introducía delays inesperados en el ciclo de captura.
       *  ✅ NO depender de `vt.ready.then()` para continuar la lógica.
       *     vt.ready demoraba 3-4 segundos en algunos Chromium.
       *     Ahora el release se programa con un setTimeout independiente
       *     sincronizado a INPUT_RECEIVED_TS + effectiveDuration (500ms).
       *  ✅ NO usar skipTransition como trigger de release.
       *     Release se produce por data-cinematic-vt-release attribute (CSS step).
       *  ✅ Duración CSS ::view-transition-old/new = 1200ms (NO 3.6M s infinito).
       *     Esto evita el render freeze en Chromium.
       * ====================================================================== */
      const hasVT =
        typeof document !== "undefined" &&
        typeof (document as unknown as { startViewTransition?: unknown }).startViewTransition ===
          "function" &&
        !reducedMotion &&
        sceneCountState > 1;

      if (hasVT) {
        const SNAPSHOT_START_TS = typeof performance !== "undefined" ? performance.now() : 0;
        console.debug(
          `[p11c][SNAPSHOT_START] ${SNAPSHOT_START_TS.toFixed(2)}  +${(SNAPSHOT_START_TS - INPUT_RECEIVED_TS).toFixed(2)}ms`,
        );

        // 🔴 IMPORTANTE: Callback SYNCHRONOUS (NO ASYNC) en startViewTransition.
        // NO contiene await NI promesas NI requestAnimationFrame.
        // Se ejecuta inmediatamente, actualiza React State = Scene Index (causa render stack translate).
        const vt = (
          document as unknown as { startViewTransition: (cb: () => void) => ViewTransitionLike }
        ).startViewTransition(() => {
          const VT_CREATED_TS = typeof performance !== "undefined" ? performance.now() : 0;
          console.debug(
            `[p11c][VT_CREATED] ${VT_CREATED_TS.toFixed(2)}  +${(VT_CREATED_TS - INPUT_RECEIVED_TS).toFixed(2)}ms`,
          );

          runSceneUpdateSync(() => {
            const SCENE_UPDATE_TS = typeof performance !== "undefined" ? performance.now() : 0;
            console.debug(
              `[p11c][SCENE_UPDATE] ${SCENE_UPDATE_TS.toFixed(2)}  +${(SCENE_UPDATE_TS - INPUT_RECEIVED_TS).toFixed(2)}ms  (setCurrentScene(${clamped}) called)`,
            );
          });
        }) as ViewTransitionLike;

        const REACT_COMMIT_RAF_TS_START =
          typeof performance !== "undefined" ? performance.now() : 0;
        if (
          typeof (window as unknown as { requestAnimationFrame?: (cb: () => void) => number })
            .requestAnimationFrame === "function"
        ) {
          (
            window as unknown as { requestAnimationFrame: (cb: () => void) => number }
          ).requestAnimationFrame(() => {
            const REACT_COMMIT_RAF_TS = typeof performance !== "undefined" ? performance.now() : 0;
            console.debug(
              `[p11c][REACT_COMMIT_RAF] ${REACT_COMMIT_RAF_TS.toFixed(2)}  +${(REACT_COMMIT_RAF_TS - INPUT_RECEIVED_TS).toFixed(2)}ms  (rAF=delta ${(REACT_COMMIT_RAF_TS - REACT_COMMIT_RAF_TS_START).toFixed(2)}ms)`,
            );
          });
        }

        // STACK_TRANSITION_START = React commit + inicio CSS transition transform bezier.
        // Estimamos que empieza justo después del primer rAF.
        const STACK_TRANSITION_START_TS =
          (typeof performance !== "undefined" ? performance.now() : 0) + 16;
        console.debug(
          `[p11c][STACK_TRANSITION_START] ${STACK_TRANSITION_START_TS.toFixed(2)}  +${(STACK_TRANSITION_START_TS - INPUT_RECEIVED_TS).toFixed(2)}ms`,
        );

        // =====================================================================
        // RELEASE INDEPENDIENTE (NO dependemos de vt.ready para nada).
        // Se programa un solo timeout en INPUT + effectiveDuration + 16ms = ~516ms.
        // Cuando llegue → STACK_STABLE determinado + SNAPSHOT_RELEASE CSS step instantáneo.
        // =====================================================================
        const releaseAtMs = Math.max(1, effectiveDuration) + 16;
        window.setTimeout(() => {
          const STACK_STABLE_TS = typeof performance !== "undefined" ? performance.now() : 0;
          console.debug(
            `[p11c][STACK_STABLE] ${STACK_STABLE_TS.toFixed(2)}  +${(STACK_STABLE_TS - INPUT_RECEIVED_TS).toFixed(2)}ms  (end translate3d bezier)`,
          );

          try {
            if (typeof document !== "undefined") {
              document.documentElement.setAttribute("data-cinematic-vt-release", "true");
            }
            const SNAPSHOT_RELEASE_TS = typeof performance !== "undefined" ? performance.now() : 0;
            console.debug(
              `[p11c][SNAPSHOT_RELEASE] ${SNAPSHOT_RELEASE_TS.toFixed(2)}  +${(SNAPSHOT_RELEASE_TS - INPUT_RECEIVED_TS).toFixed(2)}ms  (attribute set + CSS step)`,
            );

            try {
              // skipTransition = cleanup posterior. YA SE REALIZÓ el cambio visual via CSS attribute.
              // Esto solo limpia los pseudo-elements sin ejecutar animación default.
              vt.skipTransition();
              const VT_FINISHED_TS = typeof performance !== "undefined" ? performance.now() : 0;
              console.debug(
                `[p11c][VT_FINISHED] ${VT_FINISHED_TS.toFixed(2)}  +${(VT_FINISHED_TS - INPUT_RECEIVED_TS).toFixed(2)}ms  (skipTransition done)`,
              );
            } catch {
              /* no-op. Ya se aplicó el release visual y el stack está stable. */
            }

            // Limpiar atributo después de 1 frame paint del skip.
            window.setTimeout(() => {
              if (typeof document !== "undefined") {
                document.documentElement.removeAttribute("data-cinematic-vt-release");
              }
            }, 64);
          } catch {
            if (typeof document !== "undefined") {
              document.documentElement.removeAttribute("data-cinematic-vt-release");
            }
          }
        }, releaseAtMs);

        // Guardar latest transition para debug.
        if (typeof window !== "undefined") {
          (window as unknown as { __p11c_last_vt?: ViewTransitionLike }).__p11c_last_vt = vt;
          (window as unknown as { __p11c_input_ts?: number }).__p11c_input_ts = INPUT_RECEIVED_TS;
        }

        void Promise.resolve(vt.ready)
          .then(() => {
            const t = typeof performance !== "undefined" ? performance.now() : 0;
            console.debug(
              `[p11c][VT_READY] ${t.toFixed(2)}  +${(t - INPUT_RECEIVED_TS).toFixed(2)}ms  (SOLO DIAGNÓSTICO · no bloquea release)`,
            );
          })
          .catch(() => {
            /* ignore */
          });
        void Promise.resolve(vt.finished)
          .then(() => {
            const t = typeof performance !== "undefined" ? performance.now() : 0;
            console.debug(
              `[p11c][VT_FINISHED_PROMISE] ${t.toFixed(2)}  +${(t - INPUT_RECEIVED_TS).toFixed(2)}ms`,
            );
          })
          .catch(() => {
            /* ignore */
          });
        return;
      }

      // ===== FALLBACK (sin VT API / reducedMotion / 1 escena) — comportamiento normal. =====
      runSceneUpdateSync(() => {
        const t = typeof performance !== "undefined" ? performance.now() : 0;
        console.debug(
          `[p11c][SCENE_UPDATE_FALLBACK] ${t.toFixed(2)}  +${(t - INPUT_RECEIVED_TS).toFixed(2)}ms`,
        );
      });
    },
    [
      sceneCountState,
      currentScene,
      isAnimating,
      reducedMotion,
      footerRevealRaw,
      footerRevealTarget,
      cancelFooterInterval,
    ],
  );

  const goNext = useCallback(() => {
    goTo(currentScene + 1);
  }, [goTo, currentScene]);

  const goPrev = useCallback(() => {
    goTo(currentScene - 1);
  }, [goTo, currentScene]);

  /* -------------------------------- Wheel --------------------------------- */
  /*
   * Sprint 12.5.3.a — Wheel handler CONDICIONAL por state:
   *   ACTIVE     → Old behavior: preventDefault + goNext/goPrev.
   *                + Si last scene + down → state = EXITING → (siguiente render = NATIVE).
   *   EXITING    → No preventDefault (libera wheel) y pasamos a NATIVE state.
   *   NATIVE     → Wheel libre (nunca preventDefault).
   *                Si: wheel up + window.scrollY <= 1 (ya arriba) → RE_ENTER → ACTIVE + clamp scene last (Location).
   *   RE_ENTER   → (transitorio) Volvemos ACTIVE en el mismo frame.
   */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onWheel = (ev: WheelEvent) => {
      const now = Date.now();

      /* ============ STATE: NATIVE (Footer, scroll libre) [COMPAT LEGACY] ============== */
      if (
        storytellingState === STORYTELLING_STATE.NATIVE ||
        storytellingState === STORYTELLING_STATE.EXITING ||
        storytellingState === STORYTELLING_STATE.RE_ENTER
      ) {
        if (
          storytellingState === STORYTELLING_STATE.NATIVE &&
          ev.deltaY < 0 &&
          Math.abs(ev.deltaY) >= STORYTELLING_WHEEL_THRESHOLD &&
          typeof window !== "undefined" &&
          window.scrollY <= 1
        ) {
          console.debug("[storytelling] 🎬 RE_ENTER desde NATIVE (wheel up en top) → ACTIVE");
          setStorytellingState(STORYTELLING_STATE.RE_ENTER);
          setStorytellingState(STORYTELLING_STATE.ACTIVE);
          if (currentScene !== sceneCountState - 1) {
            setCurrentScene(sceneCountState - 1);
          }
          setFooterRevealRaw(0);
          setFooterRevealTarget(0);
        }
        if (storytellingState === STORYTELLING_STATE.EXITING) {
          setStorytellingState(STORYTELLING_STATE.NATIVE);
        }
        return;
      }

      /* ============ STATE: ACTIVE (Storytelling) ========================= */
      const lockActive = now < lockUntilRef.current;
      if (lockActive) {
        ev.preventDefault();
        return;
      }
      const overThreshold = Math.abs(ev.deltaY) >= STORYTELLING_WHEEL_THRESHOLD;
      const lastScene = currentScene === sceneCountState - 1;

      /* ⭐ Sprint 12.5.6.j — LAST SCENE Location: HANDOFF OVERLAY REVEAL (base).
       * NO pasamos a EXITING / NATIVE. Scroll se mantiene = 0 (locked).
       *
       * ⭐ Sprint 12.5.6.k — Wheel ahora es TRIGGER, no progress controller.
       *   - 1 Wheel down  → startFooterReveal() · 0 → 1 · 1000 ms.
       *   - 1 Wheel up (reveal>0) → startFooterHide() · 1 → 0 · 1000 ms.
       *   - Wheel up + reveal=0 → goPrev() scene anterior Featured.
       * GUARD: si ya está animando (mid tween) → ignorar wheel.
       */
      if (lastScene) {
        ev.preventDefault();
        if (!overThreshold) return;
        if (isFooterRevealAnimating) return;
        if (ev.deltaY > 0 && footerRevealRaw < 0.9999) {
          console.debug(
            `[storytelling] 🎞 LAST_SCENE · 1× wheel down → START FOOTER REVEAL (${FOOTER_REVEAL_DURATION_MS} ms)`,
          );
          startFooterReveal();
          return;
        }
        if (ev.deltaY < 0 && footerRevealRaw > 0.0001) {
          console.debug(
            `[storytelling] 🎞 LAST_SCENE · 1× wheel up → START FOOTER HIDE (${FOOTER_REVEAL_DURATION_MS} ms)`,
          );
          startFooterHide();
          return;
        }
        if (ev.deltaY < 0 && footerRevealRaw <= 0.0001) {
          const dir = "up ↑";
          console.debug(
            `[storytelling] 🎞 Footer reveal=0 · wheel ${dir} · deltaY = ${ev.deltaY.toFixed(0)} px → goPrev()`,
          );
          goPrev();
          return;
        }
        return;
      }

      /* Dentro del Storytelling (cualquier otra escena Hero / Featured). */
      if (!overThreshold) return;
      ev.preventDefault();
      const dir = ev.deltaY > 0 ? "down ↓" : "up ↑";
      console.debug(`[storytelling] ⚙ WHEEL ${dir} · deltaY = ${ev.deltaY.toFixed(0)} px`);
      if (ev.deltaY > 0) goNext();
      else goPrev();
    };
    const opts: AddEventListenerOptions & { passive?: boolean } = { passive: false };
    window.addEventListener("wheel", onWheel, opts);
    return () => window.removeEventListener("wheel", onWheel, opts);
  }, [
    storytellingState,
    goNext,
    goPrev,
    currentScene,
    sceneCountState,
    footerRevealRaw,
    isFooterRevealAnimating,
    startFooterReveal,
    startFooterHide,
  ]);

  /* ------------------------------- Keyboard ------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onKey = (ev: KeyboardEvent) => {
      const tgt = ev.target;
      if (
        tgt &&
        tgt instanceof HTMLElement &&
        (tgt.tagName === "INPUT" ||
          tgt.tagName === "TEXTAREA" ||
          tgt.tagName === "SELECT" ||
          tgt.isContentEditable)
      ) {
        return;
      }
      /* Keyboard NATIVE: no controlamos nada (igual que wheel). */
      if (
        storytellingState !== STORYTELLING_STATE.ACTIVE &&
        storytellingState !== STORYTELLING_STATE.RE_ENTER
      ) {
        return;
      }
      const now = Date.now();
      if (now < lockUntilRef.current) return;
      switch (ev.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
        case "Spacebar":
          ev.preventDefault();
          console.debug(`[storytelling] ⌨ KEY ${ev.key} → Next`);
          goNext();
          break;
        case "ArrowUp":
        case "PageUp":
          ev.preventDefault();
          console.debug(`[storytelling] ⌨ KEY ${ev.key} → Prev`);
          goPrev();
          break;
        case "Home":
          ev.preventDefault();
          console.debug(`[storytelling] ⌨ KEY Home → goTo(Scene 0)`);
          goTo(0);
          break;
        case "End":
          ev.preventDefault();
          console.debug(`[storytelling] ⌨ KEY End → goTo(last scene).`);
          goTo(sceneCountState - 1);
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey, { passive: false });
    return () => window.removeEventListener("keydown", onKey);
  }, [storytellingState, goNext, goPrev, goTo, sceneCountState]);

  /* --------------------------------- Touch -------------------------------- */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onStart = (ev: TouchEvent) => {
      const t = ev.touches[0];
      if (!t) return;
      touchStartRef.current = { x: t.clientX, y: t.clientY };
    };
    const onEnd = (ev: TouchEvent) => {
      const start = touchStartRef.current;
      touchStartRef.current = null;
      if (!start) return;
      const t = ev.changedTouches[0];
      if (!t) return;
      const dy = t.clientY - start.y;
      const dx = t.clientX - start.x;
      if (Math.abs(dx) > Math.abs(dy)) return;
      if (Math.abs(dy) < STORYTELLING_TOUCH_SWIPE_THRESHOLD) return;
      if (
        storytellingState !== STORYTELLING_STATE.ACTIVE &&
        storytellingState !== STORYTELLING_STATE.RE_ENTER
      ) {
        return;
      }
      const now = Date.now();
      if (now < lockUntilRef.current) return;
      const dir = dy < 0 ? "up ↓ (Next Scene)" : "down ↑ (Prev Scene)";
      console.debug(`[storytelling] 👆 SWIPE ${dir} · dy = ${dy.toFixed(0)} px`);
      if (dy < 0) goNext();
      else goPrev();
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [storytellingState, goNext, goPrev]);

  /* Value Context */
  const value = useMemo<StorytellingNavigatorAPI>(
    () => ({
      currentIndex: currentScene,
      sceneCount: sceneCountState,
      isAnimating,
      reducedMotion,
      storytellingState,
      footerRevealProgress: footerRevealRaw,
      isFooterRevealAnimating,
      advanceFooterRevealByWheel,
      setFooterRevealProgress,
      startFooterReveal,
      startFooterHide,
      goNext,
      goPrev,
      goTo,
      registerSceneCount,
      _subscribe() {
        return () => undefined;
      },
    }),
    [
      currentScene,
      sceneCountState,
      isAnimating,
      reducedMotion,
      storytellingState,
      footerRevealRaw,
      isFooterRevealAnimating,
      advanceFooterRevealByWheel,
      setFooterRevealProgress,
      startFooterReveal,
      startFooterHide,
      goNext,
      goPrev,
      goTo,
      registerSceneCount,
    ],
  );

  return (
    <StorytellingNavigatorContext.Provider value={value}>
      {children}
    </StorytellingNavigatorContext.Provider>
  );
}
