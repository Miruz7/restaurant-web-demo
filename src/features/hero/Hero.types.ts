/**
 * src/features/hero/Hero.types.ts
 *
 * Props públicas del componente Hero (orquestador principal).
 * El componente NO acepta contenido arbitrario en el área de texto/visual:
 * usa slots explícitos para mantener la arquitectura preparada.
 */

import type { ReactNode } from "react";
import type { HeroHeight } from "./Hero.config";

export interface HeroProps {
  /** HTML id del landmark (para scroll-anchors). Default = "inicio". */
  readonly id?: string;

  /** Altura predefinida del Hero (responsive-aware). Default = "lg". */
  readonly height?: HeroHeight;

  /** Slot BACKGROUND: contenedor absoluto (injetar img/video/slider/canvas). */
  readonly background?: ReactNode;

  /** Slot OVERLAY: capa overlay sobre el background (antes del contenido). */
  readonly overlay?: ReactNode;

  /** Slot CONTENT: bloque izquierdo (Heading + Description + CTAs). */
  readonly content?: ReactNode;

  /** Slot VISUAL: bloque derecho (ilustración, imagen, video, 3D, canvas). */
  readonly visual?: ReactNode;

  /** Slot SCROLL_INDICATOR: indicador inferior (opcional). */
  readonly scrollIndicator?: ReactNode;

  /** Clase extendida sobre el landmark <section>. */
  readonly className?: string;
}
