/**
 * FeaturedCategoriesSection.tsx
 *
 * Landmark editorial que viene después del Hero.
 *   • Respiración 64 px del Hero.
 *   • Fondo continuo gradiente #151311 → #1C1917.
 *   • Heading + Subtítulo.
 *   • Grid 2×2 responsive.
 *   • Motion: stagger 0 / 80 / 160 / 240 ms reutilizando Hero Motion Entrance.
 */

import { cn } from "@/lib/cn";
import FeaturedCategoriesGrid from "./FeaturedCategoriesGrid";
import {
  DEFAULT_FEATURED_CATEGORIES_ID,
  FEATURED_CATEGORIES,
  FEATURED_CATEGORIES_HEADING,
  FEATURED_CATEGORIES_SUBHEADING,
} from "./FeaturedCategories.constants";
import {
  FEATURED_CATEGORIES_HEAD_CLASS,
  FEATURED_CATEGORIES_HEADING_CLASS,
  FEATURED_CATEGORIES_INNER_CLASS,
  FEATURED_CATEGORIES_SUBHEADING_CLASS,
  getFeaturedCategoriesSectionClasses,
} from "./FeaturedCategories.config";
import type { FeaturedCategoriesSectionProps } from "./FeaturedCategories.types";

function FeaturedCategoriesSection({
  id = DEFAULT_FEATURED_CATEGORIES_ID,
  headingId,
  className,
}: FeaturedCategoriesSectionProps) {
  return (
    <section
      id={id}
      className={cn(getFeaturedCategoriesSectionClasses(), className)}
      aria-labelledby={headingId ?? `${id}-heading`}
      tabIndex={-1}
    >
      <div className={FEATURED_CATEGORIES_INNER_CLASS}>
        <header className={FEATURED_CATEGORIES_HEAD_CLASS}>
          <h2 id={headingId ?? `${id}-heading`} className={FEATURED_CATEGORIES_HEADING_CLASS}>
            {FEATURED_CATEGORIES_HEADING}
          </h2>
          <p className={FEATURED_CATEGORIES_SUBHEADING_CLASS}>{FEATURED_CATEGORIES_SUBHEADING}</p>
        </header>

        <FeaturedCategoriesGrid categories={FEATURED_CATEGORIES} />
      </div>
    </section>
  );
}

export default FeaturedCategoriesSection;
