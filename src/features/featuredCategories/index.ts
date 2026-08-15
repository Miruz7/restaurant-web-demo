/**
 * Barrel público de la feature FeaturedCategories.
 */

export { default, default as FeaturedCategories } from "./FeaturedCategories";
export { default as FeaturedCategoriesSection } from "./FeaturedCategoriesSection";
export { default as FeaturedCategoriesGrid } from "./FeaturedCategoriesGrid";
export { default as FeaturedCategoriesCard } from "./FeaturedCategoriesCard";
export type {
  FeaturedCategoryItem,
  FeaturedCategoriesCardProps,
  FeaturedCategoriesGridProps,
  FeaturedCategoriesSectionProps,
  FeaturedCategoryIconKey,
} from "./FeaturedCategories.types";
export { CategoryMenuModal, type CategoryMenuModalProps } from "./components/CategoryMenuModal";
export {
  DEFAULT_FEATURED_CATEGORIES_ID,
  FEATURED_CATEGORIES,
  FEATURED_CATEGORIES_HEADING,
  FEATURED_CATEGORIES_SUBHEADING,
} from "./FeaturedCategories.constants";
export {
  CategoryIconBebidas,
  CategoryIconCenas,
  CategoryIconComidas,
  CategoryIconDesayunos,
} from "./FeaturedCategories.icons";
export {
  buildFeaturedCardDelay,
  FEATURED_CATEGORIES_CARD_BODY_CLASS,
  FEATURED_CATEGORIES_CARD_BASE_CLASS,
  FEATURED_CATEGORIES_CARD_DESCRIPTION_CLASS,
  FEATURED_CATEGORIES_CARD_ICON_WRAP_CLASS,
  FEATURED_CATEGORIES_CARD_IMG_CLASS,
  FEATURED_CATEGORIES_CARD_MEDIA_CLASS,
  FEATURED_CATEGORIES_CARD_MOTION_ENTRANCE_CLASS,
  FEATURED_CATEGORIES_CARD_OVERLAY_CLASS,
  FEATURED_CATEGORIES_CARD_TITLE_CLASS,
  FEATURED_CATEGORIES_GRID_CLASS,
  FEATURED_CATEGORIES_HEAD_CLASS,
  FEATURED_CATEGORIES_HEADING_CLASS,
  FEATURED_CATEGORIES_INNER_CLASS,
  FEATURED_CATEGORIES_SECTION_BG_CLASS,
  FEATURED_CATEGORIES_SECTION_MARGIN_TOP_CLASS,
  FEATURED_CATEGORIES_SUBHEADING_CLASS,
  getFeaturedCategoriesCardClasses,
  getFeaturedCategoriesGridClasses,
  getFeaturedCategoriesSectionClasses,
} from "./FeaturedCategories.config";
