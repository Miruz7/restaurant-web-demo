/**
 * HeroContent.tsx
 *
 * Responsabilidad SINGLE:
 *   Renderizar el área de contenido textual del Hero.
 *
 * Usa exclusivamente componentes del Design System (Text, Button via actions).
 * Excepción justificada: el TÍTULO H1 se renderiza como <h1> directo en vez de
 * usar <Heading level={1}> porque el componente Heading del Sprint 6.x no
 * acepta la prop `id`, y el Hero REQUIERE ligar el section al h1 vía
 * aria-labelledby (Accesibilidad + SEO). Las clases visuales se mantienen
 * idénticas al DS importando HEADING_VARIANTS[1] desde Typography.config.
 * Cuando se amplíe la API de Heading, se reemplaza el <h1> directo.
 *
 * El layout responsive (izquierda en desktop, arriba en mobile) lo decide
 * Hero.tsx via grid. Este componente NO decide posición en la página.
 */

import { Text } from "@/components/ui";
import { HEADING_VARIANTS } from "@/components/ui/typography/Typography.config";
import { cn } from "@/lib/cn";
import {
  HERO_CONTENT_BADGE_CLASS,
  HERO_CONTENT_DESCRIPTION_CLASS,
  HERO_CONTENT_HEADING_CLASS,
  getHeroContentStackClasses,
} from "./HeroContent.config";
import type { HeroContentProps } from "./HeroContent.types";

function HeroContent({
  headingId,
  badge,
  heading,
  description,
  actions,
  metrics,
  className,
}: HeroContentProps) {
  return (
    <div className={getHeroContentStackClasses(className)}>
      {badge ? (
        <div className={HERO_CONTENT_BADGE_CLASS} role="status" aria-label="Categoría">
          {badge}
        </div>
      ) : null}

      {/* H1 del Hero. Clases DS: HEADING_VARIANTS[1] + Hero override. */}
      <h1 id={headingId} className={cn(HEADING_VARIANTS[1], HERO_CONTENT_HEADING_CLASS)}>
        {heading}
      </h1>

      {description ? (
        <Text size="lg" className={HERO_CONTENT_DESCRIPTION_CLASS}>
          {description}
        </Text>
      ) : null}

      {actions ? <div className="pt-8 md:pt-16 w-full">{actions}</div> : null}

      {metrics ? (
        <div aria-label="Indicadores y métricas" className="w-full pt-8 md:pt-16">
          {metrics}
        </div>
      ) : null}
    </div>
  );
}

export default HeroContent;
