/* -------------------------------------------------------------------------- */
/*                        01 · MINIMAL EDITORIAL FOOTER · SPRINT 12.5.5.a     */
/* -------------------------------------------------------------------------- */
/*
 * ⭐ Rediseño arquitectura Footer · Estilo editorial cinematográfico Azur Promilia.
 *
 *   RETIRADOS (Sprint 12.5.5.a · Objetivo 7 · Reducir Footer):
 *     - Navegación repetida / Categorías.
 *     - Horarios / Contacto / Teléfono / WhatsApp / Correo.
 *     - Grid 4 columnas empresarial.
 *
 *   NUEVO CONTENIDO MINIMALISTA (solo 5 bloques · mucho espacio negativo):
 *     ① LOGO SVG (Mark "N" minimalista).
 *     ② Nombre: Papelería Nova (protagonista · fw 800 · tracking-tight).
 *     ③ Tagline: Papelería • Tecnología • Impresión (discreto · white/72).
 *     ④ Autor: Creado por Miguel Ángel De La Cruz (editorial · 2 niveles).
 *     ⑤ Copyright: © 2026 Papelería Nova (discreto).
 *
 *   Altura final ≈ 30% – 35% viewport (NUNCA > 40%).
 *   Padding vertical reducido ≈ 50% para cumplir objetivo 7 (footer pequeño).
 *   Mucho aire. Mucho espacio negativo.
 */

export const FOOTER_SECTION_BASE_CLASS = [
  "relative w-full isolate overflow-hidden",
  /* ⭐ Sprint 12.5.6.M — Layout flex para centrado vertical real del contenido. */
  "flex items-center justify-center",
  "text-white bg-black",
  /* ⭐ Sprint 12.5.6.M — ALTURA RESPONSIVE clamp() (REGLA 1 · 2 · 3):
   *
   *   OBJETIVO: Borde superior Footer ≈ MITAD del bloque WhatsApp (icono + texto)
   *             de LocationSection, EN CUALQUIER VIEWPORT.
   *
   *   Fórmula calibrada para múltiples resoluciones (1080p / editor / 768p / 1440p):
   *     · mínimo 120px → móviles pequeños (< 620 px) mantienen contenido sin overflow.
   *     · dinámico 18svh → relación constante ≈ centro WhatsApp / borde superior.
   *           950 px vp (1080p real)  → H ≈ 171 px · top ≈ 779  · centro WhatsApp ≈ 802
   *           680 px vp (768p)        → H ≈ 122 px · top ≈ 558  · centro WhatsApp ≈ 571
   *           1300 px vp (2K/QHD)     → H ≈ 234 px · top ≈ 1066 · centro WhatsApp ≈ 1092
   *     · máximo 260px → evita Footer excesivamente grande en viewports ≥ 1440p.
   *
   *   NO usamos alturas fijas px ni vh sin clamp (prohibido Sprint .M regla 2).
   *   La relación visual Location → WhatsApp → borde superior se mantiene.
   */
  "min-h-[clamp(120px,18svh,260px)]",
  "h-[clamp(120px,18svh,260px)]",
  /* ⭐ Sprint 12.5.6.L — Borde superior NEGRO (eliminar halo / línea blanca). */
  "border-t border-black",
  /* ⭐ Sprint 12.5.6.L — Eliminar gradientes con halo claro. */
  "before:hidden",
  "after:hidden",
  "shadow-none",
  "outline-none",
  "ring-0",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                        02 · CONTENEDOR PRINCIPAL · LAYOUT EDITORIAL 2 COL */
/* -------------------------------------------------------------------------- */
/* ⭐ Sprint 12.5.6.L — Reestructuración Azur Promilia style.
 * DESKTOP md+:
 *   grid grid-cols-2 · 1fr | 1fr · items-center · gap respirable.
 *   Bloque IZQ (col 1): Logo "N" → Papelería Nova → Tagline editorial.
 *   Bloque DER (col 2): Creado por → Nombre autor → Copyright.
 *   Ambos bloques: items-center · vertical-center equilibrado.
 * MOBILE (sm y menor):
 *   grid-cols-1 → apilados IZQ arriba, DER abajo, ambos center.
 * Padding horizontal amplio, nunca pegado a los bordes.
 */
export const FOOTER_MINIMAL_WRAP_CLASS = [
  /* ⭐ Sprint 12.5.6.M · CONTAINER RESPONSIVE ÚNICO (REGLA 11):
   *   width = min( 100% - 2rem , 1120px )  → sin anchos rígidos por breakpoint.
   *   margin-inline: auto → siempre centrado.
   * Resultado: misma regla para 1920×1080, 1600×900, 1366×768, editor VS Code integrado, ultrawide.
   * NO usamos: width:1120px rígido, ni offsets específicos por viewport.
   */
  "relative z-10 mx-auto",
  "w-[min(calc(100%-2rem),1120px)]",
  "h-full min-h-0",
  /* Grid editorial 1fr/1fr (desktop) · 1 col (mobile) · items-center (vert ambos cols) */
  "grid grid-cols-1 md:grid-cols-2",
  "gap-[32px] md:gap-[48px] lg:gap-[72px]",
  "items-center justify-items-center",
  /* ⭐ Sprint 12.5.6.M · padding py para asegurar que en viewport muy estrecho (mobile)
   * el contenido no toque el borde superior/inferior del Footer.
   */
  "py-[16px] md:py-[16px]",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                 02.b · BLOQUE IZQUIERDO · IDENTIDAD MARCA                  */
/* -------------------------------------------------------------------------- */
/* ⭐ Sprint 12.5.6.L — Conserva: Logo N → Papelería Nova → Tagline.
 * Bajado LIGERAMENTE respecto a versión antigua (gap y padding superior interno
 * del bloque +12 px desktop) para respetar la referencia visual.
 * Centrado vertical interno (items-center) porque el layout padre hace
 * align-items:center en toda grid.
 */
export const FOOTER_MINIMAL_LEFT_COL_CLASS = [
  "relative w-full h-full",
  "flex flex-col items-center justify-center",
  "text-center",
  /* ⭐ Sprint 12.5.6.M — SIN padding arbitrario vertical fijo.
   * El centrado vertical real lo hace:
   *   1) Footer padre (flex items-center justify-center) sobre el clamp de altura.
   *   2) Wrap grid (items-center) sobre cada columna.
   *   3) Este flex-col (justify-center / items-center) → centro respecto a propia mitad.
   * Solo mantenemos padding-top NULO para evitar sesgo hacia abajo.
   * Gap interno moderado para separación editorial logo→nombre→tagline.
   */
  "pt-0 pb-0",
  "gap-[8px] md:gap-[12px] lg:gap-[16px]",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                 02.c · BLOQUE DERECHO · INFO AUTOR + LEGAL                 */
/* -------------------------------------------------------------------------- */
/* ⭐ Sprint 12.5.6.L — Mueve aquí: Divider → Creado por → Autor → Copyright.
 * Centrado vertical · items-center · mucha separación interna.
 * Alineación: center (regla 7 · no dejarlo pegado al borde derecho).
 */
export const FOOTER_MINIMAL_RIGHT_COL_CLASS = [
  "relative w-full h-full",
  "flex flex-col items-center justify-center",
  "text-center",
  /* ⭐ Sprint 12.5.6.M — Mismo criterio que columna izquierda: centrado vertical por
   * padres flex + grid items-center. Sin pt/pb arbitrarios para mantener alineación
   * vertical perfecta entre ambas columnas (mismo "centro de masa").
   */
  "pt-0 pb-0",
  "gap-[8px] md:gap-[12px] lg:gap-[16px]",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                        03 · LOGO MARK (cuadro brand navy)                  */
/* -------------------------------------------------------------------------- */
export const FOOTER_MINIMAL_LOGO_WRAP_CLASS = ["mb-[0px] md:mb-[1px]"].join(" ");

export const FOOTER_MINIMAL_LOGO_MARK_CLASS = [
  "relative shrink-0 select-none flex items-center justify-center",
  "w-[28px] h-[28px] md:w-[32px] md:h-[32px] lg:w-[36px] lg:h-[36px]",
  "rounded-[9px]",
  "bg-gradient-to-br from-brand-navy via-[#1E3A8A] to-[#3B5BDB]",
  "shadow-[0_7px_18px_rgba(30,58,138,0.42),0_1px_2px_rgba(0,0,0,0.34)]",
].join(" ");

export const FOOTER_MINIMAL_ICON_SIZE_CLASS = "[&>svg]:w-full [&>svg]:h-full" as const;

/* -------------------------------------------------------------------------- */
/*                        04 · NOMBRE + TAGLINE · JERARQUÍA HERO              */
/* -------------------------------------------------------------------------- */
export const FOOTER_MINIMAL_NAME_CLASS = [
  "font-heading font-extrabold tracking-tight leading-[1.05] text-white",
  "text-[18px] md:text-[22px] lg:text-[24px]",
  "[text-shadow:0_2px_6px_rgba(0,0,0,0.46),0_3px_12px_rgba(0,0,0,0.22)]",
].join(" ");

export const FOOTER_MINIMAL_TAGLINE_CLASS = [
  "font-sans font-semibold tracking-[0.08em] uppercase",
  "text-white/72",
  "text-[10px] md:text-[10.5px] lg:text-[11px]",
  "mt-[0px]",
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.30)]",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                        05 · SEPARADOR EDITORIAL (sutil · derecho solo)    */
/* -------------------------------------------------------------------------- */
/* ⭐ Sprint 12.5.6.L — Divider sutil dentro BLOQUE DERECHO, entre logo y
 * info. Si el diseño actual no requiere divider global, se mantiene por
 * compatibilidad y se oculta en la columna izquierda al no usarlo.
 */
export const FOOTER_MINIMAL_DIVIDER_CLASS = [
  "w-[60px] md:w-[72px] h-px",
  "bg-white/10",
  "mt-[0px] md:mt-[1px] mb-[0px] md:mb-[1px]",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                        06 · AUTOR · 2 NIVELES (Creado por / Nombre)        */
/* -------------------------------------------------------------------------- */
export const FOOTER_MINIMAL_AUTHOR_LABEL_CLASS = [
  "font-sans font-bold tracking-[0.18em] uppercase",
  "text-white/46",
  "text-[8.5px] md:text-[9px] lg:text-[9.5px]",
  "leading-none mb-[4px] md:mb-[4px]",
  "[text-shadow:0_1px_1px_rgba(0,0,0,0.22)]",
].join(" ");

export const FOOTER_MINIMAL_AUTHOR_NAME_CLASS = [
  "font-heading font-bold tracking-tight leading-[1.1]",
  "text-white/86",
  "text-[12px] md:text-[14px] lg:text-[15px]",
  "[text-shadow:0_1px_2px_rgba(0,0,0,0.32)]",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                        07 · LEGAL / COPYRIGHT · CIERRE DISCRETO            */
/* -------------------------------------------------------------------------- */
export const FOOTER_MINIMAL_LEGAL_CLASS = [
  "font-sans font-medium tracking-[0.02em]",
  "text-white/44",
  "text-[10px] md:text-[10.5px] lg:text-[11px]",
  "leading-[1.4] tabular-nums",
  "mt-[4px] md:mt-[4px] lg:mt-[8px]",
  "[text-shadow:0_1px_1px_rgba(0,0,0,0.22)]",
].join(" ");

/* -------------------------------------------------------------------------- */
/*                        08 · LEGACY CONSTANTS (para compatibilidad)         */
/* -------------------------------------------------------------------------- */
/*
 * Mantenemos nombres exportados antiguos para NO romper imports indirectos
 * que dependan de estas constantes. Sus valores internos no se usan más ya
 * que Footer.tsx renderiza minimalista (sin grid), pero las mantenemos por
 * seguridad build-time.
 */
export const FOOTER_SCENE_INNER_GAP_CLASS = ["gap-[0px]"].join(" ");
export const FOOTER_SCENE_INNER_CLASS = ["relative z-10 w-full min-h-0"].join(" ");
export const FOOTER_GRID_GAP_CLASS = ["gap-[0px]"].join(" ");
export const FOOTER_GRID_CLASS = ["hidden"].join(" ");
export const FOOTER_BLOCK_BASE_CLASS = ["hidden"].join(" ");
export const FOOTER_BLOCK_HEADING_CLASS = ["hidden"].join(" ");
export const FOOTER_BRAND_LOGO_WRAP_CLASS = ["hidden"].join(" ");
export const FOOTER_BRAND_LOGO_MARK_CLASS = ["hidden"].join(" ");
export const FOOTER_BRAND_NAME_CLASS = ["hidden"].join(" ");
export const FOOTER_BRAND_TAGLINE_CLASS = ["hidden"].join(" ");
export const FOOTER_BRAND_DESC_CLASS = ["hidden"].join(" ");
export const FOOTER_ICON_SIZE_CLASS = "hidden" as const;
export const FOOTER_NAV_LIST_CLASS = ["hidden"].join(" ");
export const FOOTER_NAV_ITEM_BASE_CLASS = ["hidden"].join(" ");
export const FOOTER_CONTACT_LIST_CLASS = ["hidden"].join(" ");
export const FOOTER_CONTACT_ITEM_ROW_CLASS = ["hidden"].join(" ");
export const FOOTER_CONTACT_ICON_WRAP_CLASS = ["hidden"].join(" ");
export const FOOTER_CONTACT_TEXT_COL_CLASS = ["hidden"].join(" ");
export const FOOTER_CONTACT_LABEL_CLASS = ["hidden"].join(" ");
export const FOOTER_CONTACT_VALUE_CLASS = ["hidden"].join(" ");
export const FOOTER_CONTACT_VALUE_PLAIN_CLASS = ["hidden"].join(" ");
export const FOOTER_HOURS_LIST_CLASS = ["hidden"].join(" ");
export const FOOTER_HOURS_ROW_CLASS = ["hidden"].join(" ");
export const FOOTER_HOURS_DAY_CLASS = ["hidden"].join(" ");
export const FOOTER_HOURS_DAY_HIGHLIGHT_CLASS = ["hidden"].join(" ");
export const FOOTER_HOURS_DAY_CLOSED_CLASS = ["hidden"].join(" ");
export const FOOTER_HOURS_TIME_CLASS = ["hidden"].join(" ");
export const FOOTER_HOURS_TIME_CLOSED_CLASS = ["hidden"].join(" ");
export const FOOTER_BOTTOM_GAP_CLASS = ["gap-[0px]"].join(" ");
export const FOOTER_BOTTOM_WRAP_CLASS = ["hidden"].join(" ");
export const FOOTER_BOTTOM_TEXT_CLASS = ["hidden"].join(" ");
