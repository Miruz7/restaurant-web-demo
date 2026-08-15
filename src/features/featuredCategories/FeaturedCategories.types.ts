/**
 * FeaturedCategories.types.ts
 */

import type { ReactNode } from "react";

export const FEATURED_CATEGORY_ICON_KEYS = ["desayunos", "comidas", "cenas", "bebidas"] as const;

export type FeaturedCategoryIconKey = (typeof FEATURED_CATEGORY_ICON_KEYS)[number];

export interface FeaturedCategoryImage {
  readonly src: string;
  readonly alt: string;
  readonly width: number;
  readonly height: number;
  readonly objectPosition?: string;
}

export interface FeaturedCategoryItem {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly iconKey: FeaturedCategoryIconKey;
  readonly image: FeaturedCategoryImage;
  readonly menuArtwork?: FeaturedCategoryImage;
  readonly href: string;
  readonly motionDelayMs: number;
  readonly ctaText: string;
}

/** @deprecated — mantenido por compatibilidad futura (no usado). */
export type _FeaturedCategoryIconCompat = ReactNode;

export interface FeaturedCategoriesCardProps {
  readonly category: FeaturedCategoryItem;
  readonly className?: string;
  readonly onOpenMenuModal?: (category: FeaturedCategoryItem) => void;
}

export interface FeaturedCategoriesGridProps {
  readonly categories: readonly FeaturedCategoryItem[];
  readonly className?: string;
  readonly onOpenMenuModal?: (category: FeaturedCategoryItem) => void;
}

export interface FeaturedCategoriesSectionProps {
  readonly id?: string;
  readonly className?: string;
  readonly headingId?: string;
}
