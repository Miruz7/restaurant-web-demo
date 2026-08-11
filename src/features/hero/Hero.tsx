/**
 * src/features/hero/Hero.tsx
 *
 * Orquestador principal del Hero.
 *
 *   • EditorialContainer = shared safe area (max 1280 · px 24/48/84).
 *   • HeroLayout ESPECIALIZADO (no EditorialGrid) — composición original.
 *   • Background / Overlay / Content / Visual / ScrollIndicator como slots.
 */

import { EditorialContainer, EDITORIAL_SCENE_INNER_CLASS } from "@/shared/editorial";
import { cn } from "@/lib/cn";
import type { ElementRef, HTMLAttributes } from "react";
import { forwardRef } from "react";
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

type HeroElement = ElementRef<"section">;

const Hero = forwardRef<HeroElement, HeroProps>(function Hero(
  {
    id = DEFAULT_HERO_ID,
    height = DEFAULT_HERO_HEIGHT,
    background,
    overlay,
    content,
    visual,
    scrollIndicator,
    className,
    style,
    ...restSectionProps
  },
  ref,
) {
  const hasVisual = Boolean(visual);
  return (
    <section
      ref={ref}
      id={id}
      className={getHeroClasses({ height, className })}
      style={style}
      aria-labelledby={`${id}-heading`}
      {...(restSectionProps as HTMLAttributes<HTMLElement>)}
    >
      {background ? (
        <div aria-hidden="true" className="absolute inset-0 -z-20">
          {background}
        </div>
      ) : null}

      {overlay ? (
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          {overlay}
        </div>
      ) : null}

      <EditorialContainer className="h-full w-full">
        <div
          className={cn(
            EDITORIAL_SCENE_INNER_CLASS,
            HERO_INNER_PADDING_CLASS,
            getHeroInnerWrapperClasses(),
          )}
        >
          <div className={HERO_GRID_CLASS}>
            <div className={cn(hasVisual ? HERO_CONTENT_COL_CLASS : HERO_CONTENT_COL_WIDE_CLASS)}>
              {content ?? null}
            </div>
            {hasVisual ? <div className={HERO_VISUAL_COL_CLASS}>{visual}</div> : null}
          </div>
        </div>
      </EditorialContainer>

      {scrollIndicator ? (
        <div aria-hidden="false" className="absolute inset-x-0 bottom-16 z-20 flex justify-center">
          {scrollIndicator}
        </div>
      ) : null}
    </section>
  );
});

export default Hero;
