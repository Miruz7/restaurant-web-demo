/**
 * CinematicScene.context.tsx — Sprint 12.7.B.
 *
 * Responsabilidad ÚNICA: detectar cambio SceneIndex del StorytellingNavigator
 * y aplicar blur cinematográfico paralelo (EXITING · ENTERING) mediante
 * keyframes CSS de 1000 ms. Solo al terminar (t=1000) vuelve todo a idle.
 *
 * La capa NO toca: SceneIndex / wheel / stackTranslateY / StorytellingStack.
 */

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
import { useStorytellingNavigator } from "./StorytellingNavigator";
import {
  CINEMATIC_HARD_LOCK_CSS,
  CINEMATIC_SCENE_DURATION_MS,
  CINEMATIC_STATE,
  type CinematicState,
} from "./CinematicScene.config";

type CinematicStatesRecord = Partial<Record<number, CinematicState>>;

interface CinematicSceneContextValue {
  readonly getSceneState: (sceneIndex: number) => CinematicState;
}

const CinematicSceneContext = createContext<CinematicSceneContextValue>({
  getSceneState: () => CINEMATIC_STATE.IDLE,
});

interface CinematicSceneProviderProps {
  readonly children: ReactNode;
  readonly sceneCount: number;
}

export function CinematicSceneProvider({
  children,
  sceneCount,
}: CinematicSceneProviderProps): ReactElement {
  const nav = useStorytellingNavigator();
  const currentScene = nav.currentIndex;
  const reducedMotion = nav.reducedMotion;

  const previousSceneRef = useRef<number>(currentScene);
  const transitionGenRef = useRef<number>(0);
  const endTimerRef = useRef<number | null>(null);
  const traceRef = useRef<Array<{ t: number; msg: string; data?: unknown }>>([]);

  const [states, setStates] = useState<CinematicStatesRecord>({});

  /* ======= DETECCIÓN DE CAMBIO DE ESCENA + EXITING / ENTERING paralelos ======= */
  useEffect(() => {
    const prev = previousSceneRef.current;
    if (prev === currentScene) return undefined;
    previousSceneRef.current = currentScene;
    if (reducedMotion || sceneCount <= 1) return undefined;

    const myGen = ++transitionGenRef.current;
    const traceArr = traceRef.current;
    traceArr.push({
      t: Date.now(),
      msg: "EFFECT_DETECT",
      data: { prev, cur: currentScene, myGen },
    });
    if (endTimerRef.current !== null) {
      window.clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }

    setStates({
      [prev]: CINEMATIC_STATE.EXITING,
      [currentScene]: CINEMATIC_STATE.ENTERING,
    } as CinematicStatesRecord);

    endTimerRef.current = window.setTimeout(() => {
      traceArr.push({
        t: Date.now(),
        msg: "TIMER_FIRE",
        data: { myGen, activeGen: transitionGenRef.current },
      });
      if (transitionGenRef.current !== myGen) return;
      setStates({});
      endTimerRef.current = null;
    }, CINEMATIC_SCENE_DURATION_MS); // 1000 ms

    return () => {
      traceArr.push({
        t: Date.now(),
        msg: "EFFECT_CLEANUP",
        data: { prev, curWas: currentScene, myGen },
      });
      transitionGenRef.current += 1;
      if (endTimerRef.current !== null) {
        window.clearTimeout(endTimerRef.current);
        endTimerRef.current = null;
      }
    };
  }, [currentScene, reducedMotion, sceneCount]);

  /* ======= Inyectar CSS cinematográfico en <head> (única copia). ======= */
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-cinematic-style", "true");
    styleEl.setAttribute("type", "text/css");
    styleEl.textContent = CINEMATIC_HARD_LOCK_CSS;
    document.head.appendChild(styleEl);
    return () => {
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  /* ======= Diagnóstico público (útil solo mientras corre Sprint 12.7.B). ======= */
  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as unknown as { __cinematicDebug?: unknown }).__cinematicDebug = {
        currentScene,
        previousScene: previousSceneRef.current,
        reducedMotion,
        sceneCount,
        states,
        isTimer: endTimerRef.current,
        gen: transitionGenRef.current,
        trace: traceRef.current.slice(-20),
      };
    }
  }, [currentScene, reducedMotion, sceneCount, states]);

  const getSceneState = useCallback(
    (sceneIndex: number): CinematicState => states[sceneIndex] ?? CINEMATIC_STATE.IDLE,
    [states],
  );

  const ctxValue = useMemo<CinematicSceneContextValue>(() => ({ getSceneState }), [getSceneState]);

  return (
    <CinematicSceneContext.Provider value={ctxValue}>{children}</CinematicSceneContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCinematicScene(): CinematicSceneContextValue {
  return useContext(CinematicSceneContext);
}
