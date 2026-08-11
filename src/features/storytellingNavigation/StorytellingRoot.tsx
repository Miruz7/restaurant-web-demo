/**
 * StorytellingRoot.tsx
 *
 * Sprint 12.1 — Storytelling Engine Refactor · Single Source of Truth.
 * Sprint 12.5.3.a — Hybrid Exit Transition · HARD LOCK DINÁMICO.
 *
 * ARQUITECTURA HÍBRIDA (Sprint 12.5.3.a):
 *
 *   StorytellingRoot
 *    ├── (StorytellingNavigatorProvider)   ← Maneja STATES: ACTIVE / EXITING / NATIVE / RE_ENTER
 *    │    └── html[data-storytelling-overflow="locked|native"]   ← Dinámico (no permanente).
 *    └── StorytellingViewport (overflow:hidden · 100vh)
 *         └── StorytellingStack (transform:translate3d)
 *              ├─ Scene 0 · HERO
 *              ├─ Scene 1 · FEATURED CATEGORIES
 *              └─ Scene 2 · LOCATION SHOWCASE
 *
 * FUERA DEL ROOT (HERMANO, después del StorytellingRoot): HomeFooter.
 * - Cuando state = NATIVE → overflow auto → usuario puede scrollear al Footer.
 * - Cuando vuelva wheel up top + state ACTIVE → overflow hidden → Storytelling vuelve.
 *
 * PRINCIPIOS IRROMIBLES (actualizados):
 *   1. Viewport recibe currentScene POR CONTEXTO.
 *   2. TRANSFORM DERIVADO: translateY = -1 * currentScene * viewportHeight.
 *   3. TRANSICIÓN CSS NATIVA (500ms bezier). 0 rAF manual.
 *   4. RESIZE DETERMINISTA: Solo actualiza viewportHeight.
 *   5. SIN subscribe/notify/listeners.
 *   6. SIN useEffect sincronizador scene → scene.
 *   7. Hard Lock HÍBRIDO via data-attribute dinámico (no overflow:hidden para siempre!).
 *   8. ÚNICA lectura DOM scrollY en modo NATIVE para detectar regreso (re-entry).
 *   9. 0 setTimeout · 0 scrollIntoView · 0 window.scrollTo como "solución permanente" (solo mount reset 1 vez).
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from "react";
import { StorytellingNavigatorProvider, useStorytellingNavigator } from "./StorytellingNavigator";
import {
  STORYTELLING_BEZIER_CSS,
  STORYTELLING_HARD_LOCK_SCROLL_CSS,
  STORYTELLING_SCENE_CLASS,
  STORYTELLING_STACK_CLASS,
  STORYTELLING_TRANSITION_MS,
  STORYTELLING_VIEWPORT_MODE_ACTIVE_CLASS,
  STORYTELLING_VIEWPORT_MODE_NATIVE_CLASS,
  STORYTELLING_STATE,
  type StorytellingState,
} from "./StorytellingNavigation.config";
import { CinematicSceneProvider } from "./CinematicScene.context";
import type { StorytellingRootProps } from "./StorytellingNavigation.types";
import { cn } from "@/lib/cn";

/* ----------------------------- Sub componente ----------------------------- */

function StorytellingViewport({
  children,
  sceneCount,
  className,
  dockingFooter,
}: {
  readonly children: ReactNode;
  readonly sceneCount: number;
  readonly className?: string;
  readonly dockingFooter?: ReactNode;
}): ReactElement {
  /* viewportHeight: ÚNICO estado de layout en Root. No es scene index. */
  const [viewportHeight, setViewportHeight] = useState<number>(() =>
    typeof window !== "undefined" ? window.innerHeight : 1080,
  );
  /*
   * ⭐ Sprint 12.5.6.j — Rebuild Overlay.
   * footerHeight STATE + ResizeObserver Dock Wrapper ELIMINADOS.
   * Antes: altura dock wrapper → altura Native viewport += footerHeight para scroll handoff.
   * Ahora: Footer overlay absolute bottom-0 z3 dentro del Viewport.
   * El hook useFooterReveal() usa SU PROPIO ResizeObserver sobre el footer REAL.
   * Mantiene dockWrapperRef para la arquitectura 12.5.6.f (wrapper absolute bottom),
   * pero no lo observamos.
   */
  const dockWrapperRef = useRef<HTMLDivElement | null>(null);

  /* ============================================================
   * ÚNICO source para currentScene. 1 solo Context read.
   * ============================================================ */
  const nav = useStorytellingNavigator();
  const currentScene = nav.currentIndex; // API currentIndex = currentScene SSOT
  const reducedMotion = nav.reducedMotion;
  const storytellingState: StorytellingState = nav.storytellingState;

  /**
   * Sprint 12.5.5 — Viewport Release Architecture.
   * Composición className viewport por storytellingState:
   *   ACTIVE / RE_ENTER = modo OVERLAY (fixed · 100vh · z-1 · overflow hidden).
   *   EXITING / NATIVE = modo FLUJO NATURAL (relative · w-full · overflow visible · z-auto).
   *
   * Altura NATIVE explícita (inline style React state-driven, NO imperativo):
   *   - Stack absolute NO empuja naturalmente el height del padre relative.
   *   - Solución: Viewport NATIVE = height calc(viewportHeight × sceneCount)px
   *     = exactamente suma vertical de las escenas (3×vh) en el flujo natural.
   *     Después Footer fluye NORMALMENTE (hermano) sin overlays.
   *
   * 0 imperativo. 0 document.querySelector / classList.add / classList.remove / style.*.
   * React = SSOT renderizado condicional (className + inline style memo).
   */
  /*
   * ⭐ Sprint 12.5.6.j — Footer Overlay Handoff Rebuild.
   * ÚLTIMA ESCENA Location: isActiveViewport = SIEMPRE true (overflow locked,
   * scrollY = 0 fijo durante todo reveal). El Footer no crece el documento,
   * es una overlay absolute dentro del Viewport.
   * Solo EXITING / NATIVE (states legacy compat) usan NATIVE class.
   */
  const isActiveViewport: boolean =
    storytellingState === STORYTELLING_STATE.ACTIVE ||
    storytellingState === STORYTELLING_STATE.RE_ENTER ||
    currentScene === sceneCount - 1;
  const viewportModeClass: string = isActiveViewport
    ? STORYTELLING_VIEWPORT_MODE_ACTIVE_CLASS
    : STORYTELLING_VIEWPORT_MODE_NATIVE_CLASS;

  const viewportStyle = useMemo<CSSProperties | undefined>(() => {
    if (isActiveViewport) return undefined;
    const sceneMultiplier = Math.max(1, sceneCount - currentScene);
    const nativeHeight = viewportHeight * sceneMultiplier;
    return {
      height: `${nativeHeight}px`,
      minHeight: `${nativeHeight}px`,
      maxHeight: `${nativeHeight}px`,
    };
  }, [isActiveViewport, viewportHeight, sceneCount, currentScene]);

  useEffect(() => {
    nav.registerSceneCount(sceneCount);
  }, [nav, sceneCount]);

  /* Resize DETERMINISTA: solo viewportHeight. Sin reindex. */
  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const handler = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener("resize", handler, { passive: true });
    return () => window.removeEventListener("resize", handler);
  }, []);

  /* ============================================================
   * TRANSFORM DERIVADO (calculado aquí, NUNCA almacenado).
   * ============================================================ */
  const stackStyle = useMemo<CSSProperties>(() => {
    const translateY = -1 * currentScene * viewportHeight;
    const duration = reducedMotion ? 0 : STORYTELLING_TRANSITION_MS;
    return {
      height: `${viewportHeight * sceneCount}px`,
      transform: `translate3d(0, ${translateY}px, 0)`,
      transition: duration > 0 ? `transform ${duration}ms ${STORYTELLING_BEZIER_CSS}` : "none",
      willChange: "transform",
    };
  }, [currentScene, reducedMotion, sceneCount, viewportHeight]);

  const injectIndexIntoScenes = useCallback((): ReactNode[] => {
    const flat = Children.toArray(children);
    let idx = 0;
    return flat.map((child) => {
      if (!isValidElement(child)) return child;
      const ownProps = child.props as { index?: unknown; className?: string };
      const myIndex = typeof ownProps.index === "number" ? ownProps.index : idx;
      idx += 1;
      return cloneElement(child as React.ReactElement<{ index: number; className?: string }>, {
        index: myIndex,
        className: cn(STORYTELLING_SCENE_CLASS, ownProps.className),
      });
    });
  }, [children]);

  /*
   * ⭐ Sprint 12.5.6.j — Dock Wrapper Visibility Overlay.
   *   - ÚLTIMA ESCENA Location → dock wrapper VISIBLE (absolute · bottom-0 · z-[3] · w-full).
   *     Permite Footer reveal overlay superpuesto a Location (no document flow).
   *   - Resto escenas Hero / Featured → invisibilidad visual (igual Sprint 12.5.6.g),
   *     pero NUNCA remove de DOM para mantener ResizeObserver footerHeight.
   */
  const dockWrapperVisibilityClass =
    isActiveViewport && currentScene < sceneCount - 1 ? "invisible pointer-events-none" : "";

  return (
    <CinematicSceneProvider sceneCount={sceneCount}>
      <div
        data-storytelling-viewport="true"
        className={cn(viewportModeClass, className)}
        style={viewportStyle}
      >
        <div
          data-storytelling-stack="true"
          style={stackStyle}
          className={cn(STORYTELLING_STACK_CLASS)}
        >
          {injectIndexIntoScenes()}
        </div>
        {dockingFooter ? (
          <div
            ref={dockWrapperRef}
            className={cn("absolute inset-x-0 bottom-0 z-[3] w-full", dockWrapperVisibilityClass)}
          >
            {dockingFooter}
          </div>
        ) : null}
      </div>
    </CinematicSceneProvider>
  );
}

/* --------------------------------- Root ---------------------------------- */

function StorytellingRoot({
  children,
  sceneCount,
  className,
  dockingFooter,
}: StorytellingRootProps): ReactElement {
  /* ============================================================
   * MOUNT:
   *   a) style tag con Hard Lock CSS DINÁMICO.
   *   b) data-storytelling = "true" general (engine montado).
   *   c) Scroll reset SOLAMENTE mount time (1 vez).
   *
   * IMPORTANTE: El overflow:hidden lo controla el Provider mediante
   *             html[data-storytelling-overflow="locked"] / "native".
   *             Nosotros ya NO seteamos esto estáticamente desde Root.
   * ============================================================ */
  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const { documentElement, body, head } = document;
    documentElement.setAttribute("data-storytelling", "true");
    body.setAttribute("data-storytelling", "true");

    const styleEl = document.createElement("style");
    styleEl.setAttribute("data-storytelling-style", "true");
    styleEl.setAttribute("type", "text/css");
    styleEl.textContent = STORYTELLING_HARD_LOCK_SCROLL_CSS;
    head.appendChild(styleEl);

    /* Scroll reset SOLAMENTE a mount time. 0 interval. 0 uso en runtime posterior. */
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      documentElement.scrollTop = 0;
      body.scrollTop = 0;
    }

    return () => {
      documentElement.removeAttribute("data-storytelling");
      body.removeAttribute("data-storytelling");
      documentElement.removeAttribute("data-storytelling-overflow");
      if (styleEl.parentNode) styleEl.parentNode.removeChild(styleEl);
    };
  }, []);

  return (
    <StorytellingNavigatorProvider initialSceneCount={sceneCount}>
      {/*
       * ⭐ Sprint 12.5.6 — Docking Wrapper.
       * Wrapper interno (dentro del NavigatorProvider) garantiza que
       * StorytellingViewport + Footer = HIJOS DIRECTOS, HERMANOS,
       * con 0px separación (flex-col + gap-0 + items-stretch + justify-start).
       * StorytellingViewport sigue intacto (wheel lock / bezier / stack / navigator).
       * dockingFooter es hijo 2, sin participar del Scene Stack.
       *
       * ⭐ Sprint 12.5.6.f — Footer Docking Architecture Only.
       * dockingFooter se inyecta dentro de StorytellingViewport como hijo
       * absoluto z-[3] después de StorytellingStack, permitiendo superposición
       * geométrica sobre la escena Location durante el handoff.
       */}
      <div className="flex w-full flex-col items-stretch justify-start gap-0">
        <StorytellingViewport
          sceneCount={sceneCount}
          className={className}
          dockingFooter={dockingFooter}
        >
          {children}
        </StorytellingViewport>
      </div>
    </StorytellingNavigatorProvider>
  );
}

export default StorytellingRoot;
