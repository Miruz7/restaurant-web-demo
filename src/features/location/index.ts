/**
 * features/location · barrel exports Sprint 12.4.
 *
 *   • Archivo orquestador: LocationSection.tsx
 *   • Tipos: Location.types.ts
 *   • SSOT datos: Location.constants.ts
 *   • SSOT clases: Location.config.ts
 *   • Componentes atómicos: MapCard / LocationInfo / LocationActions (re-export).
 */

export { default as LocationSection } from "./LocationSection";
export { default } from "./LocationSection";
export { DEFAULT_LOCATION_SECTION_ID, LOCATION_DATA } from "./Location.constants";
export * from "./Location.constants";
export * from "./Location.types";
export {
  LOCATION_ENTRY_CLASS,
  LOCATION_ENTRY_PLAY_CLASS,
  LOCATION_COMPOSITION_ROW_CLASS,
  LOCATION_CTA_PRIMARY_CLASS,
  LOCATION_CTA_SECONDARY_CLASS,
  LOCATION_DESCRIPTION_CLASS,
  LOCATION_EYEBROW_CLASS,
  LOCATION_HEAD_CLASS,
  LOCATION_HEADING_CLASS,
  LOCATION_INFO_COL_CLASS,
  LOCATION_INFO_ICON_CLASS,
  LOCATION_INFO_ICON_WRAP_CLASS,
  LOCATION_INFO_ITEM_CLASS,
  LOCATION_INFO_LABEL_CLASS,
  LOCATION_INFO_LIST_CLASS,
  LOCATION_INFO_VALUE_CLASS,
  LOCATION_INNER_CLASS,
  LOCATION_MAP_CARD_CLASS,
  LOCATION_MAP_COL_CLASS,
  LOCATION_MAP_IFRAME_CLASS,
  LOCATION_OVERLAY_CLASS,
  LOCATION_SCHEDULE_DAY_CLASS,
  LOCATION_SCHEDULE_HOURS_CLASS,
  LOCATION_SCHEDULE_LABEL_CLASS,
  LOCATION_SECTION_BG_CLASS,
  LOCATION_STORYTELLING_BEZIER,
  LOCATION_ACTIONS_CLASS,
  LOCATION_MAP_CARD_HEADER_CLASS,
  LOCATION_MAP_CARD_SUBTITLE_CLASS,
  LOCATION_MAP_CARD_TITLE_CLASS,
  LOCATION_MAP_FRAME_CLASS,
} from "./Location.config";
export { default as MapCard } from "./components/MapCard";
export { default as LocationInfo } from "./components/LocationInfo";
export { default as LocationActions } from "./components/LocationActions";
