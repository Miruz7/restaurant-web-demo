/**
 * shared/editorial barrel.
 *   • constants: EDITORIAL_MAX_WIDTH / PADDINGS / COL WIDTH / GAP.
 *   • config: Tailwind clases reutilizables base.
 *   • components: EditorialContainer (safe area) · EditorialGrid (2 cols 560 gap120).
 */

export {
  EDITORIAL_BREAKPOINT_DESKTOP,
  EDITORIAL_BREAKPOINT_LG,
  EDITORIAL_BREAKPOINT_TABLET,
  EDITORIAL_BREAKPOINT_XL,
  EDITORIAL_COLUMN_GAP,
  EDITORIAL_COLUMN_WIDTH,
  EDITORIAL_MAX_WIDTH,
  EDITORIAL_PADDING_DESKTOP,
  EDITORIAL_PADDING_MOBILE,
  EDITORIAL_PADDING_TABLET,
} from "./Editorial.constants";

export {
  EDITORIAL_COLUMN_BASE_CLASS,
  EDITORIAL_CONTAINER_BASE_CLASS,
  EDITORIAL_GRID_CLASS,
  EDITORIAL_GRID_GAP_LG_CLASS,
  EDITORIAL_LEFT_COL_CLASS,
  EDITORIAL_RIGHT_COL_CLASS,
  EDITORIAL_SCENE_INNER_CLASS,
} from "./Editorial.config";

export { default as EditorialContainer } from "./EditorialContainer";
export { default as EditorialGrid } from "./EditorialGrid";
export type { EditorialContainerProps } from "./EditorialContainer";
export type { EditorialGridProps } from "./EditorialGrid";
