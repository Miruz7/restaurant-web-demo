/**
 * FeaturedCategoriesGrid.tsx
 *
 * Grid responsive 2×2 desktop/tablet, 1×4 mobile.
 */

import { cn } from "@/lib/cn";
import FeaturedCategoriesCard from "./FeaturedCategoriesCard";
import { getFeaturedCategoriesGridClasses } from "./FeaturedCategories.config";
import type { FeaturedCategoriesGridProps } from "./FeaturedCategories.types";

function FeaturedCategoriesGrid({ categories, className }: FeaturedCategoriesGridProps) {
  return (
    <div
      className={cn(getFeaturedCategoriesGridClasses(), className)}
      role="list"
      aria-label="Categorías destacadas"
    >
      {categories.map((c) => (
        <div role="listitem" key={c.id} className="w-full">
          <FeaturedCategoriesCard category={c} />
        </div>
      ))}
    </div>
  );
}

export default FeaturedCategoriesGrid;
