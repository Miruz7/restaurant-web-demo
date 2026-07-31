/**
 * src/pages/Home/HomePage.tsx
 *
 * Página "Home" / Landing.
 *
 * Sprint 10.2 = Primera sección visual: HERO.
 * Seguimos estrictamente HERO_SPECIFICATION.md § Contenido y § Layout.
 *
 *   • Desktop: Texto izq · Visual der (2 cols).
 *   • Tablet + Mobile: Stack vertical (texto arriba, visual abajo).
 *
 * COPY: TODO viene de src/data/hero.ts (HERO_DATA cerrado Sprint 10.2).
 * NUNCA inventamos ni hardcodeamos strings aquí. El día que llegue i18n
 * o un CMS, solo cambia la fuente de HERO_DATA, 0 cambios en esta página.
 */

import { Button, Text } from "@/components/ui";
import { HERO_DATA } from "@/data";
import { cn } from "@/lib/cn";
import { DEFAULT_HERO_ID } from "@/features/hero/Hero.config";
import {
  Hero,
  HeroBackground,
  HeroContent,
  HeroOverlay,
  HeroVisual,
  CTAGroup,
  ScrollIndicator,
} from "@/features/hero";

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
        background={<HeroBackground />}
        overlay={<HeroOverlay intensity="none" />}
        scrollIndicator={<ScrollIndicator label={HERO_DATA.scrollIndicatorLabel} />}
        content={
          <HeroContent
            headingId={HERO_HEADING_ID}
            badge={
              <Text size="xs" weight="semibold">
                {HERO_DATA.badge}
              </Text>
            }
            heading={HERO_DATA.heading}
            description={HERO_DATA.description}
            actions={
              <CTAGroup>
                <Button variant="primary" size="lg">
                  {HERO_DATA.primaryCTA.label}
                </Button>
                <Button variant="secondary" size="lg">
                  {HERO_DATA.secondaryCTA.label}
                </Button>
              </CTAGroup>
            }
          />
        }
        visual={<HeroVisual aspect="4:3" />}
      />
    </div>
  );
}

export default HomePage;
