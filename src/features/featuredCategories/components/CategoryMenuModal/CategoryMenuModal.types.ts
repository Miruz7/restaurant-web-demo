/**
 * CategoryMenuModal.types.ts
 *
 * Props tipadas para el componente base del modal de menú por categoría.
 *
 * ✅ Stateful parent-controlado: open + onClose son externalizados.
 * ✅ NO duplicamos tipos: reutilizamos FeaturedCategoryItem existente.
 * ✅ Funcionalidad mínima BASE; futuras minisprinths ampliarán aquí sin romper API.
 */

import type { FeaturedCategoryItem } from "../../FeaturedCategories.types";

export interface CategoryMenuModalProps {
  readonly category: FeaturedCategoryItem;
  readonly open: boolean;
  readonly onClose: () => void;
  readonly className?: string;
}
