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

export interface HomePageProps {
  readonly className?: string;
}

const HERO_HEADING_ID = `${DEFAULT_HERO_ID}-heading`;

function HomePage({ className }: HomePageProps) {
  return (
    <div className={cn("", className)}>
      <Hero
        id={DEFAULT_HERO_ID}
        height="lg"
        className="!text-white"
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
            />
          </HeroBackground>
        }
        overlay={
          <>
            <HeroOverlay intensity="i08" variant="editorial-scene" />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 z-[1]", HERO_DEPTH_HALO_FOCAL_CLASS)}
            />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 z-[2]", HERO_DEPTH_WARM_LIGHT_CLASS)}
            />
            <div
              aria-hidden="true"
              className={cn("absolute inset-0 z-[3]", HERO_DEPTH_DUST_CLASS)}
            />
          </>
        }
        scrollIndicator={
          <ScrollIndicator
            label={HERO_DATA.scrollIndicatorLabel}
            className={HERO_LIGHT_SCROLL_INDICATOR_CLASS}
          />
        }
        content={
          <HeroContent
            headingId={HERO_HEADING_ID}
            badgeClassName={HERO_LIGHT_BADGE_CLASS}
            headingClassName={HERO_LIGHT_HEADING_CLASS}
            descriptionClassName={HERO_LIGHT_DESCRIPTION_CLASS}
            badge={
              <Text size="xs" weight="semibold" className={HERO_LIGHT_TEXT_CLASS}>
                {HERO_DATA.badge}
              </Text>
            }
            heading={HERO_DATA.heading}
            description={HERO_DATA.description}
            actions={
              <CTAGroup>
                <Button variant="primary" size="lg" className={HERO_LIGHT_BUTTON_PRIMARY_CLASS}>
                  {HERO_DATA.primaryCTA.label}
                </Button>
                <Button variant="secondary" size="lg" className={HERO_LIGHT_BUTTON_SECONDARY_CLASS}>
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
