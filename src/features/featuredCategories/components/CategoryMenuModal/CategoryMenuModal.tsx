/**
 * CategoryMenuModal.tsx — Modal CINEMATOGRÁFICO (Sprint 5B).
 *
 * Incluye desde Mini-Sprint 4:
 *   ✅ React Portal → document.body (evita stacking context)
 *
 * Incluye desde Mini-Sprint 5A:
 *   ✅ 3 formas de cierre: Botón X · Click backdrop · Tecla ESC
 *   ✅ Scroll lock con scrollbar compensation (sin layout shift, restore exacto al cerrar)
 *   ✅ Focus inicial en close-button (accesible) + restore focus al trigger al cerrar
 *
 * Incluye desde Mini-Sprint 5A.1 (fix):
 *   ✅ FIX X: NO hay stopPropagation capture que bloquee onClick del botón X.
 *     Estrategia: backdrop handler usa closeButtonRef.contains() + menuSurfaceRef.contains()
 *     para decidir si cerrar o no.
 *   ✅ ELIMINADO panel blanco gigante alrededor de la imagen. Solo existe una
 *     única "superficie menú" (menuSurfaceRef) que envuelve exclusivamente la
 *     imagen (o empty state). X se coloca FUERA de esa superficie.
 *   ✅ Título "Menú — Xxx" ahora es sr-only (preserva aria-labelledby sin crear caja).
 *
 * Incluye desde Mini-Sprint 5B (cinematográfico):
 *   ✅ Estrategia mounted + isClosing: mount al recibir open=true, NO unmount inmediato cuando open=false
 *   ✅ Overlay fade: opacity 0 → 0.7 (bg-black/70) duración ~300ms ease-out
 *   ✅ Backdrop blur: 0px → 8px duración ~300ms ease-out (solo sobre el fondo; NUNCA sobre el menú)
 *   ✅ Menú fade + scale-in: opacity 0→1 + scale(0.96)→scale(1) duración ~350ms ease-out
 *   ✅ Cierre animado inverso (scale-out + fade-out) antes de llamar onClose padre
 *   ✅ Prefers-reduced-motion: reduce duraciones, elimina scale, elimina blur animado intenso
 *   ✅ Close guard isClosing: múltiples triggers (X / ESC / backdrop) NO re-entrantes
 *   ✅ Scroll lock / focus restore al FINAL de la animación de cierre (no durante)
 *   ✅ Cleanup seguro timers/animation listeners en useEffect return
 */

import * as React from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib";
import type { CategoryMenuModalProps } from "./CategoryMenuModal.types";

interface BodyScrollSnapshot {
  readonly overflow: string;
  readonly overflowX: string;
  readonly overflowY: string;
  readonly paddingRight: string;
  readonly position: string;
  readonly top: string;
  readonly scrollY: number;
}

function readBodyScroll(): BodyScrollSnapshot {
  void window.getComputedStyle(document.body);
  return {
    overflow: document.body.style.overflow,
    overflowX: document.body.style.overflowX,
    overflowY: document.body.style.overflowY,
    paddingRight: document.body.style.paddingRight,
    position: document.body.style.position,
    top: document.body.style.top,
    scrollY: window.scrollY,
  };
}

function applyScrollLock(prev: BodyScrollSnapshot): void {
  const viewportWidthBefore = window.innerWidth;
  const docWidthBefore = document.documentElement.clientWidth;
  const scrollbarWidth = viewportWidthBefore - docWidthBefore;
  const existingPaddingPx = parseFloat(window.getComputedStyle(document.body).paddingRight || "0");
  const totalCompensation =
    Math.max(0, scrollbarWidth) + (Number.isFinite(existingPaddingPx) ? existingPaddingPx : 0);
  document.body.style.position = "fixed";
  document.body.style.top = `-${prev.scrollY}px`;
  document.body.style.left = "0";
  document.body.style.right = "0";
  document.body.style.overflow = "hidden";
  document.body.style.overflowX = "hidden";
  document.body.style.overflowY = "scroll";
  if (scrollbarWidth > 0) {
    document.body.style.paddingRight = `${totalCompensation}px`;
  }
}

function restoreBodyScroll(prev: BodyScrollSnapshot): void {
  document.body.style.overflow = prev.overflow;
  document.body.style.overflowX = prev.overflowX;
  document.body.style.overflowY = prev.overflowY;
  document.body.style.paddingRight = prev.paddingRight;
  document.body.style.position = prev.position;
  document.body.style.top = prev.top;
  document.body.style.left = "";
  document.body.style.right = "";
  if (window.scrollY !== prev.scrollY) {
    window.scrollTo(0, prev.scrollY);
  }
}

function isFocusableHTMLElement(node: Element | null | undefined): node is HTMLElement {
  if (!node || !(node instanceof HTMLElement)) return false;
  return true;
}

function nodeIsInsideOrSame(
  ref: React.RefObject<HTMLElement | null>,
  node: Node | null | undefined,
): boolean {
  if (!node || !(node instanceof Node)) return false;
  if (!ref.current) return false;
  return ref.current === node || ref.current.contains(node);
}

function getReducedMotionPreferred(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  return !!mql.matches;
}

function CategoryMenuModal({
  category,
  open,
  onClose,
  className,
}: CategoryMenuModalProps): React.ReactElement | null {
  const closeButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const menuSurfaceRef = React.useRef<HTMLDivElement | null>(null);
  const backdropRef = React.useRef<HTMLDivElement | null>(null);
  const bodyScrollRef = React.useRef<BodyScrollSnapshot | null>(null);
  const restoreFocusRef = React.useRef<HTMLElement | null>(null);
  const closingTimerRef = React.useRef<number | null>(null);
  const enterRaf1Ref = React.useRef<number | null>(null);
  const enterRaf2Ref = React.useRef<number | null>(null);
  const onCloseRef = React.useRef<CategoryMenuModalProps["onClose"]>(onClose);

  React.useLayoutEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  const [mounted, setMounted] = React.useState<boolean>(open);
  const [isClosing, setIsClosing] = React.useState<boolean>(false);
  const [entered, setEntered] = React.useState<boolean>(false);
  const [reducedMotion, setReducedMotion] = React.useState<boolean>(() =>
    getReducedMotionPreferred(),
  );

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setReducedMotion(!!e.matches);
    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    }
    return;
  }, []);

  const clearEnterRafs = React.useCallback((): void => {
    if (enterRaf1Ref.current != null) {
      window.cancelAnimationFrame(enterRaf1Ref.current);
      enterRaf1Ref.current = null;
    }
    if (enterRaf2Ref.current != null) {
      window.cancelAnimationFrame(enterRaf2Ref.current);
      enterRaf2Ref.current = null;
    }
  }, []);

  const clearClosingTimer = React.useCallback((): void => {
    if (closingTimerRef.current != null) {
      window.clearTimeout(closingTimerRef.current);
      closingTimerRef.current = null;
    }
  }, []);

  const requestClose = React.useCallback((): void => {
    if (isClosing) return;
    clearEnterRafs();
    setIsClosing(true);
    clearClosingTimer();
    const lastActive = restoreFocusRef.current;
    restoreFocusRef.current = null;
    if (bodyScrollRef.current) {
      restoreBodyScroll(bodyScrollRef.current);
      bodyScrollRef.current = null;
    }
    if (isFocusableHTMLElement(lastActive) && lastActive.isConnected) {
      lastActive.focus({ preventScroll: true });
    }
    setIsClosing(false);
    setMounted(false);
    setEntered(false);
    onCloseRef.current?.();
  }, [isClosing, clearEnterRafs, clearClosingTimer]);

  React.useEffect(() => {
    if (open) {
      clearEnterRafs();
      enterRaf1Ref.current = window.requestAnimationFrame(() => {
        setMounted(true);
        setIsClosing(false);
        setEntered(false);
        enterRaf2Ref.current = window.requestAnimationFrame(() => {
          enterRaf1Ref.current = null;
          enterRaf2Ref.current = null;
          setEntered(true);
        });
      });
      return () => clearEnterRafs();
    }
    if (!mounted) return;
    queueMicrotask(() => {
      clearEnterRafs();
      setIsClosing(true);
      clearClosingTimer();
      const lastActive = restoreFocusRef.current;
      restoreFocusRef.current = null;
      if (bodyScrollRef.current) {
        restoreBodyScroll(bodyScrollRef.current);
        bodyScrollRef.current = null;
      }
      if (isFocusableHTMLElement(lastActive) && lastActive.isConnected) {
        lastActive.focus({ preventScroll: true });
      }
      setIsClosing(false);
      setMounted(false);
      setEntered(false);
      onCloseRef.current?.();
    });
    return;
  }, [open, mounted, clearEnterRafs, clearClosingTimer, requestClose]);

  React.useEffect(() => {
    if (!mounted) return;
    clearClosingTimer();
    const focusedBefore = document.activeElement;
    restoreFocusRef.current = isFocusableHTMLElement(focusedBefore) ? focusedBefore : null;
    bodyScrollRef.current = readBodyScroll();
    applyScrollLock(bodyScrollRef.current);

    const handleEsc = (event: KeyboardEvent): void => {
      if (event.key !== "Escape" && event.key !== "Esc") return;
      event.preventDefault();
      event.stopPropagation();
      requestClose();
    };

    window.addEventListener("keydown", handleEsc, { capture: true });

    const focusTarget = closeButtonRef.current;
    if (isFocusableHTMLElement(focusTarget)) {
      focusTarget.focus({ preventScroll: true });
    }

    return () => {
      window.removeEventListener("keydown", handleEsc, { capture: true });
      clearClosingTimer();
    };
  }, [mounted, category.id, open, requestClose, clearClosingTimer]);

  const isTargetOnProtectedSurface = (event: React.MouseEvent): boolean => {
    const target = event.target as Node | null;
    if (nodeIsInsideOrSame(closeButtonRef, target)) return true;
    if (nodeIsInsideOrSame(menuSurfaceRef, target)) return true;
    return false;
  };

  const handleBackdropMouseDown = (event: React.MouseEvent<HTMLDivElement>): void => {
    const button = event.button ?? 0;
    if (button !== 0) return;
    if (isTargetOnProtectedSurface(event)) return;
    requestClose();
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const button = event.button ?? 0;
    if (button !== 0) return;
    if (isTargetOnProtectedSurface(event)) return;
    requestClose();
  };

  const handleCloseButtonClick = (): void => {
    requestClose();
  };

  const artwork = category.menuArtwork;
  const dialogTitleId = `category-menu-modal-title-${category.id}`;
  const dialogImgId = `category-menu-modal-img-${category.id}`;
  const ARTWORK_AR = artwork ? artwork.width / artwork.height : 3 / 4;
  const X_RESERVE_H_REM = 3;
  const X_RESERVE_V_REM = 3.5;

  const maxWPxByBreakpoint = React.useMemo(() => {
    if (typeof window === "undefined") return { w: 1100, h: 800 };
    const W = window.innerWidth;
    const H = window.innerHeight;
    const padW = W >= 1024 ? 5 * 16 : W >= 768 ? 3.5 * 16 : W >= 640 ? 2.5 * 16 : 2 * 16;
    const padH = H >= 1024 ? 5 * 16 : H >= 768 ? 3.5 * 16 : H >= 640 ? 2.5 * 16 : 2 * 16;
    const reserveH = X_RESERVE_H_REM * 16;
    const reserveV = X_RESERVE_V_REM * 16;
    const availW = Math.max(0, W - padW - reserveH);
    const availH = Math.max(0, H - padH - reserveV);
    const maxWByAR = Math.floor(availH * ARTWORK_AR);
    const maxHByAR = Math.floor(availW / ARTWORK_AR);
    let finalW: number;
    let finalH: number;
    if (maxWByAR <= availW) {
      finalW = maxWByAR;
      finalH = availH;
    } else {
      finalW = availW;
      finalH = maxHByAR;
    }
    finalW = Math.min(finalW, 1100);
    finalH = Math.min(finalH, 1600);
    return { w: finalW, h: finalH };
  }, [ARTWORK_AR]);

  if (!mounted) return null;

  const OPEN_OVERLAY_MS = 720;
  const OPEN_MENU_MS = 750;
  const OPEN_MENU_DELAY_MS = 45;
  const CLOSE_TOTAL_MS = 0;
  const REDUCED_MS = 80;

  const overlayDurationMs = reducedMotion ? REDUCED_MS : OPEN_OVERLAY_MS;
  const menuDurationMs = reducedMotion ? REDUCED_MS : OPEN_MENU_MS;
  const menuDelayMs = reducedMotion ? 0 : OPEN_MENU_DELAY_MS;
  const closeDurationMs = CLOSE_TOTAL_MS;
  const easing = "cubic-bezier(0.22, 0.61, 0.36, 1)";

  const backdropOpen = entered && !isClosing;
  const menuOpen = entered && !isClosing;
  const activeOverlayDurationMs = isClosing ? closeDurationMs : overlayDurationMs;
  const activeMenuDurationMs = isClosing ? closeDurationMs : menuDurationMs;
  const activeMenuDelayMs = isClosing ? 0 : menuDelayMs;
  const backdropLayerOpacity = backdropOpen ? 1 : 0;
  const backdropOverlayAlpha = 0.7;
  const backdropBlurPx = reducedMotion ? (backdropOpen ? 2 : 0) : backdropOpen ? 8 : 0;
  const menuOpacity = menuOpen ? 1 : 0;
  const menuScale = reducedMotion ? 1 : menuOpen ? 1 : 0.96;

  const rootLayerClassName = cn("fixed inset-0 z-50 isolate", "pointer-events-none", className);
  const backdropLayerClassName = cn("absolute inset-0", "pointer-events-auto");
  const backdropLayerStyle: React.CSSProperties = {
    backgroundColor: `rgba(0, 0, 0, ${backdropOverlayAlpha})`,
    background: `linear-gradient(to bottom, rgba(0,0,0,0.68), rgba(0,0,0,0.72))`,
    opacity: backdropLayerOpacity,
    backdropFilter: `blur(${backdropBlurPx}px) saturate(1.05)`,
    WebkitBackdropFilter: `blur(${backdropBlurPx}px) saturate(1.05)`,
    transition: reducedMotion
      ? `opacity ${activeOverlayDurationMs}ms linear`
      : `opacity ${activeOverlayDurationMs}ms ${easing}, backdrop-filter ${activeOverlayDurationMs}ms ${easing}, -webkit-backdrop-filter ${activeOverlayDurationMs}ms ${easing}`,
    willChange: "opacity, backdrop-filter",
  };

  return createPortal(
    <div
      ref={backdropRef}
      data-feature="category-menu-modal"
      className={rootLayerClassName}
      aria-hidden={false}
      onMouseDown={handleBackdropMouseDown}
      onClick={handleBackdropClick}
    >
      <div className={backdropLayerClassName} style={backdropLayerStyle} />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        aria-describedby={artwork ? dialogImgId : undefined}
        aria-label={`Menú de ${category.title}`}
        className={cn(
          "absolute inset-0 isolate pointer-events-none",
          "flex items-center justify-center",
          "p-[1rem] sm:p-[1.25rem] md:p-[1.75rem] lg:p-[2.5rem]",
          "w-full h-full max-w-full max-h-full",
          "bg-transparent border-none shadow-none overflow-visible",
        )}
      >
        <h2 id={dialogTitleId} className={cn("sr-only")}>
          Menú — {category.title}
        </h2>

        <div
          className={cn(
            "relative z-20 pointer-events-auto",
            "w-auto h-auto",
            "flex flex-col items-end justify-start gap-2 sm:gap-2.5",
            "origin-center",
          )}
          style={{
            opacity: menuOpacity,
            transform: `translate3d(0,0,0) scale(${menuScale})`,
            transition: reducedMotion
              ? `opacity ${activeMenuDurationMs}ms linear`
              : `opacity ${activeMenuDurationMs}ms ${easing} ${activeMenuDelayMs}ms, transform ${activeMenuDurationMs}ms ${easing} ${activeMenuDelayMs}ms`,
            willChange: "opacity, transform",
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleCloseButtonClick}
            aria-label="Cerrar menú"
            title="Cerrar menú"
            className={cn(
              "relative z-30 shrink-0 self-end",
              "inline-flex items-center justify-center",
              "h-11 w-11 sm:h-12 sm:w-12",
              "rounded-full",
              "bg-black hover:bg-black/92 active:bg-black/88",
              "border border-black",
              "text-white hover:text-white",
              "shadow-[0_10px_24px_-8px_rgba(0,0,0,0.7)]",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black/70",
            )}
          >
            <X
              aria-hidden="true"
              className="h-[1.4rem] w-[1.4rem] sm:h-[1.5rem] sm:w-[1.5rem]"
              strokeWidth={2.3}
            />
          </button>

          <div
            ref={menuSurfaceRef}
            className={cn(
              "relative z-10",
              "w-auto h-auto",
              "max-w-none max-h-none",
              "flex items-center justify-center",
              "overflow-hidden",
              "rounded-2xl",
              "bg-white",
              "shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)]",
            )}
            style={{ width: `${maxWPxByBreakpoint.w}px`, height: `${maxWPxByBreakpoint.h}px` }}
          >
            {artwork ? (
              <img
                id={dialogImgId}
                src={artwork.src}
                alt={artwork.alt}
                width={artwork.width}
                height={artwork.height}
                loading="eager"
                decoding="async"
                draggable={false}
                className={cn(
                  "block",
                  "w-full h-full",
                  "max-w-full max-h-full",
                  "object-contain",
                  "bg-white",
                )}
                style={{
                  opacity: 1,
                  filter: "none",
                  aspectRatio: `${artwork.width} / ${artwork.height}`,
                }}
              />
            ) : (
              <div
                role="note"
                aria-live="polite"
                className={cn(
                  "w-full h-full",
                  "min-w-[min(100%,520px)] min-h-[220px]",
                  "flex flex-col items-center justify-center gap-2",
                  "text-center text-black/70",
                  "p-6 sm:p-8",
                )}
              >
                <p className="m-0 text-sm sm:text-base font-medium">
                  Menú de {category.title} no disponible en este momento.
                </p>
                <p className="m-0 text-xs sm:text-sm text-black/60">
                  Inténtalo de nuevo más tarde.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default CategoryMenuModal;
