/**
 * StorytellingNavigation.types.ts
 *
 * Sprint 12.0.1 — Viewport Engine · Scene Lock.
 * Sprint 12.5.3.a — Hybrid Exit Transition / StorytellingState enum.
 */

import type { CSSProperties, ReactNode } from "react";
import type { StorytellingState } from "./StorytellingNavigation.config";

export interface StorytellingNavigatorAPI {
  readonly currentIndex: number;
  readonly sceneCount: number;
  readonly isAnimating: boolean;
  readonly reducedMotion: boolean;
  /** Sprint 12.5.3.a — Hybrido: ACTIVE / EXITING / NATIVE / RE_ENTER. */
  readonly storytellingState: StorytellingState;
  /**
   * ⭐ Sprint 12.5.6.j — Footer Overlay Reveal.
   * Progreso RAW 0 ↔ 1 del Footer Reveal cuando lastScene = Location.
   * SSOT del reveal (se actualiza desde wheel event en Navigator Provider).
   * FooterReveal hook subscribe via poll Context cada render (no bus).
   */
  readonly footerRevealProgress: number;
  /** Sprint 12.5.6.k — 1 wheel trigger → auto transition. Flag animación reveal en curso. */
  readonly isFooterRevealAnimating: boolean;
  /** Ajustar progreso reveal por delta wheel Y (signo conservado). Devuelve nuevo progress 0..1. */
  advanceFooterRevealByWheel: (deltaWheelY: number, footerHeightPx?: number) => number;
  /** Setter manual (reset, goTo last scene → progress = 0, etc). */
  setFooterRevealProgress: (raw01: number) => void;
  /**
   * ⭐ Sprint 12.5.6.k — Location → Footer Auto Transition (1000 ms bezier).
   * Un solo wheel down inicia transición 0 → 1 automática.
   * Guard: ignora si ya está animando o progress >= 1.
   */
  startFooterReveal: () => void;
  /**
   * ⭐ Sprint 12.5.6.k — Footer → Location Auto Reverse (1000 ms bezier).
   * Un solo wheel up desde 100% inicia transición 1 → 0 automática.
   * Guard: ignora si ya está animando o progress <= 0.
   */
  startFooterHide: () => void;
  goNext: () => void;
  goPrev: () => void;
  goTo: (index: number) => void;
  registerSceneCount: (count: number) => void;
  /** Interno: usado por StorytellingRoot para subscribirse al stack transform. */
  _subscribe: (cb: (style: CSSProperties, index: number) => void) => () => void;
}

export interface StorytellingSceneShellProps {
  readonly index: number;
  readonly id?: string;
  readonly className?: string;
  readonly children: ReactNode;
}

export interface StorytellingRootProps {
  readonly children: ReactNode;
  readonly sceneCount: number;
  readonly className?: string;
  /**
   * ⭐ Sprint 12.5.6 — Footer Docking Architecture.
   * El Footer deja de ser un hermano EXTERNO de StorytellingRoot para ser
   * el ÚLTIMO HIJO DIRECTO del Root (hermano directo del StorytellingViewport,
   * dentro del mismo Provider). Garantiza 0px separación + continuidad visual
   * Location → Footer. NO participa del Scene Stack, Wheel Lock, Navigator,
   * Bezier, Transitions. Solo vive aquí para continuid arquitectónica.
   */
  readonly dockingFooter?: ReactNode;
}
