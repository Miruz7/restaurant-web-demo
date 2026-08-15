/**
 * src/pages/Home/HomePage.tsx
 *
 * Página "Home" / Landing · Sprint 12.5.2.a — Landing Flow Consolidation.
 *
 *   • 3 escenas Storytelling, 100vh cada una: Hero / Featured Categories / Location.
 *   • Cierre natural: HomeFooter fuera de Storytelling (última escena visual).
 *   • Wheel / Keyboard / Swipe → NextScene | PrevScene · 500ms · bezier .22,1,.36,1.
 *   • ScrollIndicator flecha: YA NO scrollIntoView → goNextSection().
 *   • Hero + Featured + Location VISUALMENTE INTACTOS (congelados 10.x / 11.x / 12.4.x).
 *
 * ================================================================
 * Sprint 12.5.2.a — RETIRADA DE PLACEHOLDERS DEL FLUJO PRINCIPAL
 * ================================================================
 * Se retiran del renderizado las escenas placeholder:
 *   • ServicesSection (index 3)
 *   • BrandsSection   (index 4)
 *   • ContactSection  (index 5)
 * Contenido cubierto actualmente:
 *   • Hero = propuesta de valor + CTAs
 *   • Featured Categories = catálogo principal
 *   • Location Showcase = ubicación + contacto + horarios
 *   • Footer Premium = navegación + contacto + horarios (cierre definitivo)
 *
 * Los placeholders no se eliminan físicamente, solo dejan de renderizarse.
 * Sprint limpieza posterior evaluará eliminación definitiva si aplica.
 * ================================================================
 */

import { Button, Text } from "@/components/ui";
import { HERO_DATA } from "@/data";
import { cn } from "@/lib/cn";
import { useCallback, useState, type ReactElement } from "react";
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

import HERO_BACKGROUND_V2 from "@/assets/images/hero/hero-background-main-v2.webp";
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
import FeaturedCategories, { DEFAULT_FEATURED_CATEGORIES_ID } from "@/features/featuredCategories";
import LocationSection, { DEFAULT_LOCATION_SECTION_ID } from "@/features/location";
import { HomeFooter } from "@/features/footer";
import StorytellingRoot, {
  StorytellingSceneShell,
  useStorytellingNavigator,
} from "@/features/storytellingNavigation";

export interface HomePageProps {
  readonly className?: string;
}

const HERO_HEADING_ID = `${DEFAULT_HERO_ID}-heading`;

/* ------------------- Contenido real con hook navigator -------------------- */

function HomeStorytellingScenes(): ReactElement {
  const nav = useStorytellingNavigator();

  const [heroImageLoaded, setHeroImageLoaded] = useState<boolean>(false);
  const handleHeroImageLoad = useCallback<React.ReactEventHandler<HTMLImageElement>>(() => {
    setHeroImageLoaded(true);
  }, []);

  const handleScrollToFeatured = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      e.preventDefault();
      nav.goNext();
    },
    [nav],
  );

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
    <>
      {/* ============ ESCENA 1 / 3 — HERO =================================== */}
      <StorytellingSceneShell id={`${DEFAULT_HERO_ID}-scene`} index={0}>
        <Hero
          id={DEFAULT_HERO_ID}
          height="screen"
          className={cn(
            "!text-white !bg-[color:var(--color-hero-warm-base,#151311)]",
            "h-[100vh] !min-h-[100vh]",
            heroMotionHoldClass,
          )}
          ref={heroMotionRef as React.RefObject<HTMLElement>}
          style={heroMotionStyle}
          background={
            <HeroBackground tone="editorial">
              <img
                src={HERO_BACKGROUND_V2}
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
              onClick={handleScrollToFeatured}
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
      </StorytellingSceneShell>

      {/* ============ ESCENA 2 / 3 — FEATURED CATEGORIES ==================== */}
      <StorytellingSceneShell
        id={`${DEFAULT_FEATURED_CATEGORIES_ID}-scene`}
        index={1}
        className="bg-gradient-to-b from-[#151311] via-[#171413] to-[#1C1917]"
      >
        <FeaturedCategories />
      </StorytellingSceneShell>

      {/* ============ ESCENA 3 / 3 — LOCATION SHOWCASE ==================== */}
      <StorytellingSceneShell
        id={`${DEFAULT_LOCATION_SECTION_ID}-scene`}
        index={2}
        className="bg-gradient-to-b from-[#1C1917] via-[#181614] to-[#171413]"
      >
        <LocationSection />
      </StorytellingSceneShell>
    </>
  );
}

/* ---------------------------- Public Page --------------------------------- */

function HomePage({ className }: HomePageProps): ReactElement {
  return (
    <div className="flex w-full flex-col items-stretch justify-start">
      {/*
       * ⭐ Sprint 12.5.6 — Storytelling Docking Architecture.
       * Footer YA NO es un hermano EXTERNO de StorytellingRoot → pasa a ser
       * dockingFooter = HIJO ÚLTIMO DIRECTO del Root, hermano interno de
       * StorytellingViewport (dentro del Provider, dentro del DockingWrapper
       * flex-col gap-0). Con esto garantizamos continuidad estructural 100%
       * Location ↔ Footer (0.0 px separación, sin documento fantasma, sin
       * wrappers intermedios). Wheel lock + Bezier + Scene Stack + Reveal
       * Engine INTACTOS.
       */}
      <StorytellingRoot sceneCount={3} className={cn("", className)} dockingFooter={<HomeFooter />}>
        <HeroEntrance />
        <HomeStorytellingScenes />
      </StorytellingRoot>
    </div>
  );
}

export default HomePage;
