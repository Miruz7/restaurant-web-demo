/**
 * src/features/hero/Hero.tsx
 *
 * Orquestador principal del Hero.
 *
 * Responsabilidad SINGLE:
 *   1. Renderizar el landmark <section id=...> (Hero).
 *   2. Componer los 5 sub-componentes en orden de pila correcto:
 *        <Background>  →  <Overlay>  →  <Content + Visual grid>  →  <ScrollIndicator>
 *   3. NO contiene lógica visual específica ni copy de ningún tipo.
 *   4. NO decide qué Background/Overlay/Visual se usa: todo llega por props.
 *
 * Extensibilidad futura SIN tocar este archivo:
 *   • Background: inyectar <HeroSlider>, <HeroVideo>, <HeroWebGL> como slot.
 *   • Overlay:    inyectar variantes degradé/patrón nuevas como slot.
 *   • Content:    inyectar HeroContent con otro copy (promociones, campaña).
 *   • Visual:     inyectar Ilustración, Fotografía, Canvas, Modelo 3D.
 */

import { Container } from "@/components/ui";
import { cn } from "@/lib/cn";
import {
  DEFAULT_HERO_HEIGHT,
  DEFAULT_HERO_ID,
  HERO_GRID_CLASS,
  HERO_CONTENT_COL_CLASS,
  HERO_CONTENT_COL_WIDE_CLASS,
  HERO_INNER_PADDING_CLASS,
  HERO_VISUAL_COL_CLASS,
  getHeroClasses,
  getHeroInnerWrapperClasses,
} from "./Hero.config";
import type { HeroProps } from "./Hero.types";

function Hero({
  id = DEFAULT_HERO_ID,
  height = DEFAULT_HERO_HEIGHT,
  background,
  overlay,
  content,
  visual,
  scrollIndicator,
  className,
}: HeroProps) {
  const hasVisual = Boolean(visual);
  return (
    <section
      id={id}
      className={getHeroClasses({ height, className })}
      aria-labelledby={`${id}-heading`}
    >
      {/* 1) BACKGROUND: capa inferior absoluta (z -2) */}
      {background ? (
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          {background}
        </div>
      ) : null}

      {/* 2) OVERLAY: capa intermedia absoluta (z -1) */}
      {overlay ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {overlay}
        </div>
      ) : null}

      {/* 3) CONTENIDO PRINCIPAL: grid + Container centrado (z 10) */}
      <Container fullWidth className={cn(HERO_INNER_PADDING_CLASS, getHeroInnerWrapperClasses())}>
        <div className={HERO_GRID_CLASS}>
          <div className={cn(hasVisual ? HERO_CONTENT_COL_CLASS : HERO_CONTENT_COL_WIDE_CLASS)}>
            {content ?? null}
          </div>
          {hasVisual ? <div className={HERO_VISUAL_COL_CLASS}>{visual}</div> : null}
        </div>
      </Container>

      {/* 4) SCROLL INDICATOR: posición absoluta bottom (z 20) */}
      {scrollIndicator ? (
        <div aria-hidden="false" className="absolute inset-x-0 bottom-16 z-20 flex justify-center">
          {scrollIndicator}
        </div>
      ) : null}
    </section>
  );
}

export default Hero;
