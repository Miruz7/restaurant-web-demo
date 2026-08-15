/**
 * FeaturedCategoriesCard.tsx
 *
 * Tarjeta editorial clickeable.
 */

import * as React from "react";
import { cn } from "@/lib/cn";
import {
  FEATURED_CATEGORIES_CARD_BODY_CLASS,
  FEATURED_CATEGORIES_CARD_DESCRIPTION_CLASS,
  FEATURED_CATEGORIES_CARD_ICON_WRAP_CLASS,
  FEATURED_CATEGORIES_CARD_IMG_CLASS,
  FEATURED_CATEGORIES_CARD_MEDIA_CLASS,
  FEATURED_CATEGORIES_CARD_MOTION_ENTRANCE_CLASS,
  FEATURED_CATEGORIES_CARD_OVERLAY_CLASS,
  FEATURED_CATEGORIES_CARD_TITLE_CLASS,
  buildFeaturedCardDelay,
  getFeaturedCategoriesCardClasses,
} from "./FeaturedCategories.config";
import type {
  FeaturedCategoriesCardProps,
  FeaturedCategoryIconKey,
} from "./FeaturedCategories.types";
import {
  CategoryIconBebidas,
  CategoryIconCenas,
  CategoryIconComidas,
  CategoryIconDesayunos,
} from "./FeaturedCategories.icons";
import type { ReactElement } from "react";

const ICON_BY_KEY: Record<FeaturedCategoryIconKey, () => ReactElement> = {
  desayunos: CategoryIconDesayunos,
  comidas: CategoryIconComidas,
  cenas: CategoryIconCenas,
  bebidas: CategoryIconBebidas,
};

function FeaturedCategoriesCard({
  category,
  className,
  onOpenMenuModal,
}: FeaturedCategoriesCardProps): React.ReactElement {
  const { image, title, description, iconKey, motionDelayMs } = category;
  const Icon = ICON_BY_KEY[iconKey];
  const delayStyle = buildFeaturedCardDelay(motionDelayMs);

  const content = (
    <>
      <div className={FEATURED_CATEGORIES_CARD_MEDIA_CLASS} aria-hidden="false">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          draggable={false}
          width={960}
          height={480}
          className={FEATURED_CATEGORIES_CARD_IMG_CLASS}
        />
        <div aria-hidden="true" className={FEATURED_CATEGORIES_CARD_OVERLAY_CLASS} />
        <div aria-hidden="true" className={FEATURED_CATEGORIES_CARD_ICON_WRAP_CLASS}>
          <Icon />
        </div>
      </div>

      <div className={FEATURED_CATEGORIES_CARD_BODY_CLASS}>
        <h3 className={FEATURED_CATEGORIES_CARD_TITLE_CLASS}>{title}</h3>
        <p className={FEATURED_CATEGORIES_CARD_DESCRIPTION_CLASS}>{description}</p>
      </div>
    </>
  );

  return (
    <button
      type="button"
      onClick={() => onOpenMenuModal?.(category)}
      aria-label={`Ver categoría ${title}`}
      className={cn(
        getFeaturedCategoriesCardClasses(),
        FEATURED_CATEGORIES_CARD_MOTION_ENTRANCE_CLASS,
        className,
      )}
      style={delayStyle}
      data-hero-motion="featured-category"
    >
      {content}
    </button>
  );
}

export default FeaturedCategoriesCard;
