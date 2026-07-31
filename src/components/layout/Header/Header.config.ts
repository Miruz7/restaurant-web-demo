import { HEADER_HEIGHT_PX as HEADER_HEIGHT_CONST } from "@/constants/layout";

// Re-export como "fuente de verdad" para los componentes que todavía la importan
// desde Header.config (mantiene compatibilidad con sprint 6.x).
// El valor canónico vive en @/constants/layout.
export { HEADER_HEIGHT_CONST as HEADER_HEIGHT_PX };

export const HEADER_SECTION_CLASSES = "bg-secondary text-primary border-b border-primary/5";

export const HEADER_CONTAINER_CLASSES = "flex items-center justify-between h-full";

export const HEADER_LOGO_CLASSES = "font-heading font-bold tracking-tight text-xl text-primary";

export const HEADER_NAV_CLASSES = "flex items-center gap-24 flex-1 justify-center";

export const HEADER_ACTIONS_CLASSES = "flex items-center gap-16 justify-end";
