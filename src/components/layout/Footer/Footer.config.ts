/**
 * src/components/layout/Footer/Footer.config.ts
 *
 * Configuración canónica del Footer (variantes, constantes, maps).
 * El valor real de las constantes y links vendrá en sprints posteriores.
 */

export const FOOTER_HEIGHT_MIN_PX = 80 as const;

/**
 * FOOTER_SECTION_CLASSES: base del contenedor externo del footer.
 * Los estilos concretos de paleta (colores) vendrán del Design System
 * definitivo; por ahora mantiene semántica (primary invertido).
 */
export const FOOTER_SECTION_CLASSES = "bg-primary text-secondary border-t border-secondary/10";

export const FOOTER_CONTAINER_CLASSES =
  "flex flex-col items-center justify-between gap-16 py-24 md:flex-row md:py-32";

export const FOOTER_LOGO_CLASSES = "font-heading font-bold tracking-tight text-lg text-secondary";

export const FOOTER_COPY_CLASSES = "text-sm opacity-75 text-secondary";
