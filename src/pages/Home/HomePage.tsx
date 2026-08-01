/**
 * src/pages/Home/HomePage.tsx
 *
 * Página "Home" / Landing.
 *
 * Sprint 10.6 = Integración oficial Master Artwork hero-background-main-v1.
 * Seguimos estrictamente HERO_SPECIFICATION.md § Contenido y § Layout.
 *
 *   • Desktop: Texto izq · Escena visual en Background (2 cols).
 *   • Tablet + Mobile: Stack vertical (texto arriba, focal point responsive).
 *
 * COPY: TODO viene de src/data/hero.ts (HERO_DATA cerrado Sprint 10.2).
 * NUNCA inventamos ni hardcodeamos strings aquí. El día que llegue i18n
 * o un CMS, solo cambia la fuente de HERO_DATA, 0 cambios en esta página.
 *
 * BACKGROUND/COLOR THEME: Como ahora el Hero vive sobre foto, aplicamos
 * overrides LIGHT (blanco/negro invertido) SIN tocar el Design System global,
 * inyectando className por sub-componente. Overlay gradient-left-reading
 * + intensidad i40 = punto de partida de las pruebas visuales.
 */

import { Button, Text } from "@/components/ui";
import { HERO_DATA } from "@/data";
import { cn } from "@/lib/cn";
import { useCallback, useState } from "react";
import {
  DEFAULT_HERO_ID,
  HERO_LIGHT_BADGE_CLASS,
  HERO_LIGHT_BUTTON_PRIMARY_CLASS,
  HERO_LIGHT_BUTTON_SECONDARY_CLASS,
  HERO_LIGHT_DESCRIPTION_CLASS,
  HERO_LIGHT_HEADING_CLASS,
  HERO_LIGHT_SCROLL_INDICATOR_CLASS,
  HERO_LIGHT_TEXT_CLASS,
} from "@/features/hero/Hero.config";
import {
  HERO_DEPTH_DUST_CLASS,
  HERO_DEPTH_HALO_FOCAL_CLASS,
  HERO_DEPTH_WARM_LIGHT_CLASS,
} from "@/features/hero/components/HeroBackground/HeroBackground.config";
import {
  Hero,
  HeroBackground,
  HeroContent,
  HeroOverlay,
  CTAGroup,
  ScrollIndicator,
} from "@/features/hero";

import HERO_BACKGROUND_V1 from "@/assets/images/hero/hero-background-main-v1.webp.png";
import HeroEntrance, {
  HERO_MOTION_ACTIONS_ENTRANCE_CLASS,
  HERO_MOTION_BADGE_ENTRANCE_CLASS,
  HERO_MOTION_DESCRIPTION_ENTRANCE_CLASS,
  HERO_MOTION_DUST_DRIFT_CLASS,
  HERO_MOTION_HALO_BREATH_CLASS,
  HERO_MOTION_HEADING_ENTRANCE_CLASS,
  HERO_MOTION_PRIMARY_CTA_HOVER_CLASS,
  HERO_MOTION_SCROLL_INDICATOR_ENTRANCE_CLASS,
  HERO_MOTION_SECONDARY_CTA_HOVER_CLASS,
  HERO_MOTION_WARM_FLUCT_CLASS,
  getHeroMotionPlayStateProperty,
  useHeroMotionPlayState,
  useHeroParallax,
} from "@/features/hero/motion";

export interface HomePageProps {
  readonly className?: string;
}

const HERO_HEADING_ID = `${DEFAULT_HERO_ID}-heading`;

function HomePage({ className }: HomePageProps) {
  const [heroImageLoaded, setHeroImageLoaded] = useState<boolean>(false);
  const handleHeroImageLoad = useCallback<React.ReactEventHandler<HTMLImageElement>>(() => {
    setHeroImageLoaded(true);
  }, []);

  const {
    ref: heroMotionRef,
    play: heroMotionVisiblePlay,
    reduced: heroMotionReduced,
  } = useHeroMotionPlayState();
  const heroMotionPlay = heroImageLoaded && heroMotionVisiblePlay;
  const heroMotionStyle = getHeroMotionPlayStateProperty(heroMotionPlay);

  const { styleHalo, styleWarm, styleDust } = useHeroParallax(
    heroMotionRef as React.RefObject<HTMLElement | null>,
    heroMotionVisiblePlay,
  );

  const heroMotionHoldClass = !heroImageLoaded
    ? "[&_[data-hero-motion]]:!opacity-0 [&_[data-hero-motion]]:!translate-y-6 [&_[data-hero-motion]]:!animate-paused"
    : "";

  return (
    <div className={cn("", className)}>
      <HeroEntrance />
      <Hero
        id={DEFAULT_HERO_ID}
        height="lg"
        className={cn(
          "!text-white !bg-[color:var(--color-hero-warm-base,#151311)]",
          heroMotionHoldClass,
        )}
        ref={heroMotionRef as React.RefObject<HTMLElement>}
        style={heroMotionStyle}
        background={
          <HeroBackground tone="editorial">
            <img
              src={HERO_BACKGROUND_V1}
              alt=""
              aria-hidden="true"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={1080}
              draggable={false}
              onLoad={handleHeroImageLoad}
              className={cn(
                "opacity-0",
                "transition-opacity duration-[1000ms] ease-out",
                heroImageLoaded && "!opacity-100",
              )}
            />
          </HeroBackground>
        }
        overlay={
          <>
            <HeroOverlay intensity="i08" variant="editorial-scene" />
            <div
              aria-hidden="true"
              style={styleHalo}
              className={cn(
                "absolute inset-0 z-[1]",
                HERO_DEPTH_HALO_FOCAL_CLASS,
                HERO_MOTION_HALO_BREATH_CLASS,
                heroMotionReduced ? "!animation-none !transition-none" : "",
              )}
            />
            <div
              aria-hidden="true"
              style={styleWarm}
              className={cn(
                "absolute inset-0 z-[2]",
                HERO_DEPTH_WARM_LIGHT_CLASS,
                HERO_MOTION_WARM_FLUCT_CLASS,
                heroMotionReduced ? "!animation-none !transition-none" : "",
              )}
            />
            <div
              aria-hidden="true"
              style={styleDust}
              className={cn(
                "absolute inset-0 z-[3]",
                HERO_DEPTH_DUST_CLASS,
                HERO_MOTION_DUST_DRIFT_CLASS,
                heroMotionReduced
                  ? "!animation-none !transform-none !translate-x-0 !translate-y-0 !transition-none"
                  : "",
              )}
            />
          </>
        }
        scrollIndicator={
          <ScrollIndicator
            label={HERO_DATA.scrollIndicatorLabel}
            className={cn(
              HERO_LIGHT_SCROLL_INDICATOR_CLASS,
              HERO_MOTION_SCROLL_INDICATOR_ENTRANCE_CLASS,
              heroMotionReduced ? "!animation-none !transition-none" : "",
            )}
          />
        }
        content={
          <HeroContent
            headingId={HERO_HEADING_ID}
            badgeClassName={cn(
              HERO_LIGHT_BADGE_CLASS,
              HERO_MOTION_BADGE_ENTRANCE_CLASS,
              heroMotionReduced ? "!animation-none !transition-none" : "",
            )}
            headingClassName={cn(
              HERO_LIGHT_HEADING_CLASS,
              HERO_MOTION_HEADING_ENTRANCE_CLASS,
              heroMotionReduced ? "!animation-none !transition-none" : "",
            )}
            descriptionClassName={cn(
              HERO_LIGHT_DESCRIPTION_CLASS,
              HERO_MOTION_DESCRIPTION_ENTRANCE_CLASS,
              heroMotionReduced ? "!animation-none !transition-none" : "",
            )}
            actionsClassName={cn(
              HERO_MOTION_ACTIONS_ENTRANCE_CLASS,
              heroMotionReduced ? "!animation-none !transition-none" : "",
            )}
            badge={
              <Text size="xs" weight="semibold" className={HERO_LIGHT_TEXT_CLASS}>
                {HERO_DATA.badge}
              </Text>
            }
            heading={HERO_DATA.heading}
            description={HERO_DATA.description}
            actions={
              <CTAGroup>
                <Button
                  variant="primary"
                  size="lg"
                  className={cn(
                    HERO_LIGHT_BUTTON_PRIMARY_CLASS,
                    HERO_MOTION_PRIMARY_CTA_HOVER_CLASS,
                  )}
                >
                  {HERO_DATA.primaryCTA.label}
                </Button>
                <Button
                  variant="secondary"
                  size="lg"
                  className={cn(
                    HERO_LIGHT_BUTTON_SECONDARY_CLASS,
                    HERO_MOTION_SECONDARY_CTA_HOVER_CLASS,
                  )}
                >
                  {HERO_DATA.secondaryCTA.label}
                </Button>
              </CTAGroup>
            }
          />
        }
      />
    </div>
  );
}

export default HomePage;
