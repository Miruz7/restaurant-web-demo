/**
 * Location.config.ts — Sprint 12.4.3 Editorial Grid Rebalance.
 *
 *   NO padding interno offset texto.
 *   MOVER RETÍCULA COMPLETA (info + mapa) mediante COMPOSITION_ROW justify-center + pl 40/50/60 px.
 *   MAPA centrado VERTICAL NATURAL: col derecha flex items-center h=100% (NO translateY).
 *   INTACTO: wrapper / max-width / overlay / spacing interno / tipografía / animaciones.
 */

import { STORYTELLING_BEZIER_CSS } from "@/features/storytellingNavigation";

/* ========================================================================= *
 * SECTION + WRAPPER (EXACTO Hero, NO TOCAR).
 *   • max-w-[1280px] · px-[24px] md:px-[48px] lg:px-[84px].
 * ========================================================================= */

export const LOCATION_SECTION_BG_CLASS = [
  "relative w-full isolate overflow-hidden",
  "bg-[#151311]",
  "text-white",
  "h-[100vh] !min-h-[100vh] !max-h-[100vh]",
].join(" ");

export const LOCATION_BACKDROP_PHOTO_CLASS = [
  "pointer-events-none absolute inset-0 -z-20 select-none",
  "bg-center bg-no-repeat bg-cover",
  "will-change-background-position",
].join(" ");

export const LOCATION_INFO_HALO_RADIAL_CLASS = [
  "pointer-events-none absolute inset-0 -z-10 select-none",
  "[background:radial-gradient(ellipse_56%_56%_at_28%_50%,rgba(0,0,0,0.42)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0)_72%)]",
  "mix-blend-multiply",
].join(" ");

export const LOCATION_INNER_CLASS = [
  "relative z-20 mx-auto w-full h-full",
  "max-w-[1280px]",
  "px-[20px] md:px-[40px] lg:px-[84px]",
  "flex flex-col items-stretch justify-start",
  "pt-[24px] md:pt-[48px] lg:pt-[72px] xl:pt-[88px]",
  "pb-[16px] md:pb-[32px] lg:pb-[56px] xl:pb-[64px]",
  "min-h-0",
].join(" ");

/* ========================================================================= *
 * OVERLAY (igual Featured 12.3.4 · transparente sutil).
 * ========================================================================= */

export const LOCATION_OVERLAY_CLASS = [
  "absolute inset-0 z-[1] pointer-events-none select-none",
  "[background-image:linear-gradient(to_bottom,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.03)_14%,rgba(0,0,0,0)_24%,rgba(0,0,0,0)_100%),linear-gradient(to_right,rgba(0,0,0,0.50)_0%,rgba(0,0,0,0.36)_34%,rgba(0,0,0,0.12)_50%,rgba(0,0,0,0.03)_56%,rgba(0,0,0,0)_58%,rgba(0,0,0,0)_100%)]",
  "[background-size:100%_100%,100%_100%]",
  "[background-repeat:no-repeat,no-repeat]",
  "bg-black/08",
].join(" ");

/* ========================================================================= *
 * TEXT-SHADOW HERO (multi-layer borde + volumen natural).
 * ========================================================================= */

const HERO_ARTISAN_HEADING_SHADOW = [
  "1px_0_0_rgba(0,0,0,0.35)",
  "-1px_0_0_rgba(0,0,0,0.35)",
  "0_1px_0_rgba(0,0,0,0.35)",
  "0_-1px_0_rgba(0,0,0,0.35)",
  "0_3px_12px_rgba(0,0,0,0.35)",
  "0_6px_22px_rgba(0,0,0,0.22)",
].join(",");

const HERO_ARTISAN_SUB_SHADOW = ["0_2px_6px_rgba(0,0,0,0.42)", "0_4px_16px_rgba(0,0,0,0.22)"].join(
  ",",
);

const HERO_ARTISAN_META_SHADOW = ["0_2px_5px_rgba(0,0,0,0.40)", "0_4px_12px_rgba(0,0,0,0.20)"].join(
  ",",
);

/* ========================================================================= *
 * COMPOSICIÓN RETÍCULA COMPLETA (info + mapa) — Sprint 12.4.3 objetivos 1-7.
 *   • justify-center: toda la retícula centrada visualmente dentro del inner.
 *   • pl offset 40 / 50 / 60 px → mueve RETÍCULA COMPLETA (info + mapa) a la derecha.
 *   • gap cols 120 / 140 / 160 px.
 *   • Altura de la fila = 100% del inner restante → mapa puede usar align-self-center.
 * ========================================================================= */

export const LOCATION_COMPOSITION_ROW_CLASS = [
  "flex flex-col items-stretch justify-start gap-[16px]",
  "md:flex-row md:items-stretch md:justify-center",
  "md:pl-[40px] lg:pl-[50px] xl:pl-[60px]",
  "md:gap-[120px] lg:gap-[140px] xl:gap-[160px]",
  "min-h-0",
  "w-full flex-1 h-full",
].join(" ");

/** Columna IZQUIERDA · Info editorial (≤620 px max ancho útil).
 *
 *  Sprint 12.4.3 : SIN padding interno (objetivo 1 + 2).
 *   Elimina pl-[40/56] anterior. El offset lo aporta COMPOSITION_ROW.
 */
export const LOCATION_INFO_COL_CLASS = [
  "w-full flex flex-col items-start justify-start",
  "md:max-w-[560px] lg:max-w-[600px] xl:max-w-[620px]",
  "md:w-[54%] lg:w-[52%] xl:w-[50%]",
  "flex-none",
  "min-w-0",
  "mt-0",
  "pt-[0px] md:pt-[8px] lg:pt-[12px]",
].join(" ");

/** Columna DERECHA · Tarjeta mapa premium (objetivo mapa + detalle usuario).
 *
 *  Sprint 12.4.3 : CENTRADO VERTICAL NATURAL (NO translateY).
 *    · flex items-center height 100% → mapa verticalmente centrado
 *      independientemente de la resolución.
 */
export const LOCATION_MAP_COL_CLASS = [
  "w-full flex flex-col items-stretch justify-center items-center",
  "md:w-[46%] lg:w-[48%] xl:w-[50%]",
  "min-w-0 h-full",
  "md:h-full md:min-h-0",
  "md:justify-center md:items-center",
  "md:place-self-stretch",
].join(" ");

/* ========================================================================= *
 * BLOQUE INFO EDITORIAL (columna izquierda) — Sprint 12.4.1.
 *   • Head gap 6 (24 px) · mb 32/40/48 px.
 *   • Info list max-w-[620 px] (bloque de info nunca se extiende).
 * ========================================================================= */

export const LOCATION_HEAD_CLASS = ["flex flex-col items-start gap-5 md:gap-6 w-full"].join(" ");

export const LOCATION_EYEBROW_CLASS = [
  "inline-flex items-center gap-[10px]",
  "px-[14px] py-[6px] rounded-full",
  "bg-white/10 border border-white/14 backdrop-blur-[8px]",
  "text-[12px] md:text-[12.5px] lg:text-[13px] font-semibold uppercase tracking-[0.22em]",
  "text-white/82",
  `[text-shadow:${HERO_ARTISAN_META_SHADOW}]`,
].join(" ");

export const LOCATION_HEADING_CLASS = [
  "font-heading font-bold tracking-tight text-white",
  "text-[24px] leading-[1.05]",
  "md:text-[34px] md:leading-[1.08]",
  "lg:text-[48px]",
  `[text-shadow:${HERO_ARTISAN_HEADING_SHADOW}]`,
  "max-w-[620px]",
].join(" ");

export const LOCATION_DESCRIPTION_CLASS = [
  "max-w-[620px]",
  "text-[15px] leading-[1.65] md:text-[16px] lg:text-[17px]",
  "text-white",
  `[text-shadow:${HERO_ARTISAN_SUB_SHADOW}]`,
].join(" ");

/* ===== Info listado: Dirección / Horario / Teléfono / WhatsApp. ===== */

export const LOCATION_INFO_LIST_CLASS = [
  "flex flex-col items-stretch gap-[12px] md:gap-[16px] lg:gap-[24px]",
  "max-w-[620px]",
].join(" ");

export const LOCATION_INFO_ITEM_CLASS = [
  "flex items-start gap-[12px] md:gap-[16px]",
  "max-w-[620px]",
].join(" ");

export const LOCATION_INFO_ICON_WRAP_CLASS = [
  "flex-none mt-[2px]",
  "w-[32px] h-[32px] md:w-[40px] md:h-[40px] lg:w-[44px] lg:h-[44px]",
  "rounded-12",
  "flex items-center justify-center",
  "bg-white/12 border border-white/18 backdrop-blur-[8px]",
  "text-white",
  `transition-[background-color,border-color,transform,box-shadow] duration-[240ms] ${STORYTELLING_BEZIER_CSS}`,
].join(" ");

export const LOCATION_INFO_ICON_CLASS = [
  "w-[15px] h-[15px] md:w-[18px] md:h-[18px] lg:w-[20px] lg:h-[20px]",
  "shrink-0 flex-none",
].join(" ");

export const LOCATION_INFO_LABEL_CLASS = [
  "text-[11px] md:text-[11.5px] uppercase tracking-[0.18em] font-semibold",
  "text-white/60",
  "mb-[4px]",
  `[text-shadow:${HERO_ARTISAN_META_SHADOW}]`,
].join(" ");

export const LOCATION_INFO_VALUE_CLASS = [
  "text-[13.5px] leading-[1.5] md:text-[15px] md:leading-[1.55] lg:text-[16.5px]",
  "text-white font-medium",
  `[text-shadow:${HERO_ARTISAN_SUB_SHADOW}]`,
].join(" ");

export const LOCATION_SCHEDULE_DAY_CLASS = [
  "flex items-center justify-between gap-4",
  "py-[4px] md:py-[6px]",
].join(" ");

export const LOCATION_SCHEDULE_LABEL_CLASS = [
  "text-[13px] md:text-[14.5px] text-white/78",
  `[text-shadow:${HERO_ARTISAN_META_SHADOW}]`,
].join(" ");

export const LOCATION_SCHEDULE_HOURS_CLASS = [
  "text-[13px] md:text-[14.5px] text-white font-semibold tabular-nums",
  `[text-shadow:${HERO_ARTISAN_META_SHADOW}]`,
].join(" ");

/* ===== Actions 2 botones glass (CTA). ===== */

export const LOCATION_ACTIONS_CLASS = [
  "flex flex-col items-stretch gap-[8px] w-full",
  "md:flex-row md:items-center md:flex-wrap md:gap-[16px]",
].join(" ");

export const LOCATION_CTA_PRIMARY_CLASS = [
  "w-full inline-flex items-center justify-center gap-[10px]",
  "md:w-auto md:justify-start",
  "px-[20px] py-[11px] md:px-[24px] md:py-[13.5px] lg:px-[28px] lg:py-[15.5px]",
  "rounded-12",
  "bg-brand-navy text-white",
  "font-sans font-semibold tracking-[0.005em]",
  "text-[13.5px] md:text-[14.5px] lg:text-[15.5px]",
  "shadow-[0_14px_32px_rgba(30,58,138,0.44)]",
  `transition-[background-color,transform,color,box-shadow,opacity] duration-[180ms] ${STORYTELLING_BEZIER_CSS}`,
  "hover:-translate-y-[1px] hover:bg-brand-navy-hover",
  "hover:shadow-[0_20px_42px_rgba(30,58,138,0.50)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "active:scale-[0.98] active:translate-y-[0px] active:bg-brand-navy-active",
].join(" ");

export const LOCATION_CTA_SECONDARY_CLASS = [
  "w-full inline-flex items-center justify-center gap-[10px]",
  "md:w-auto md:justify-start",
  "px-[20px] py-[11px] md:px-[24px] md:py-[13.5px] lg:px-[28px] lg:py-[15.5px]",
  "rounded-12",
  "bg-white/14 border border-white/22 backdrop-blur-[10px]",
  "text-white font-sans font-semibold tracking-[0.01em]",
  "text-[13.5px] md:text-[14.5px] lg:text-[15.5px]",
  "shadow-[0_8px_24px_rgba(0,0,0,0.18)]",
  `transition-[background-color,border-color,transform,color,box-shadow,opacity] duration-[180ms] ${STORYTELLING_BEZIER_CSS}`,
  "hover:bg-white/20 hover:border-white/34 hover:-translate-y-[1px] hover:text-white",
  "hover:shadow-[0_14px_32px_rgba(0,0,0,0.24)]",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent",
  "active:scale-[0.98] active:translate-y-[0px]",
].join(" ");

/* ========================================================================= *
 * MAP CARD PREMIUM (columna derecha).
 *   • Borde suave · radio consistente · sombra · hover ligero · glass marco.
 * ========================================================================= */

export const LOCATION_MAP_CARD_CLASS = [
  "relative w-full rounded-[20px] md:rounded-[24px] overflow-hidden",
  "bg-white/06 border border-white/12 backdrop-blur-[14px]",
  "shadow-[0_30px_60px_-18px_rgba(0,0,0,0.50),0_10px_24px_rgba(0,0,0,0.28)]",
  `transition-[transform,box-shadow,border-color] duration-[380ms] ${STORYTELLING_BEZIER_CSS}`,
  "hover:-translate-y-[3px]",
  "hover:shadow-[0_40px_70px_-18px_rgba(0,0,0,0.55),0_18px_32px_rgba(0,0,0,0.32)]",
  "hover:border-white/22",
].join(" ");

export const LOCATION_MAP_CARD_HEADER_CLASS = [
  "flex items-center justify-between gap-4",
  "px-[14px] py-[10px] md:px-[18px] md:py-[14px] lg:px-[22px] lg:py-[16px]",
  "bg-white/06 border-b border-white/10",
].join(" ");

export const LOCATION_MAP_CARD_TITLE_CLASS = [
  "font-heading font-semibold tracking-tight text-white text-[13.5px] md:text-[15px] lg:text-[16.5px]",
  `[text-shadow:${HERO_ARTISAN_META_SHADOW}]`,
].join(" ");

export const LOCATION_MAP_CARD_SUBTITLE_CLASS = [
  "text-[11.5px] md:text-[12.5px] lg:text-[13px] text-white/64",
  `[text-shadow:${HERO_ARTISAN_META_SHADOW}]`,
].join(" ");

export const LOCATION_MAP_FRAME_CLASS = [
  "relative w-full aspect-[7/5] md:aspect-[5/4] lg:aspect-[4/3] bg-[#1B1917]",
  "overflow-hidden",
].join(" ");

export const LOCATION_MAP_IFRAME_CLASS = [
  "absolute inset-0 w-full h-full border-0",
  "opacity-90",
  `transition-[opacity,filter] duration-[600ms] ease-out`,
].join(" ");

/* ========================================================================= *
 * ENTRADA SUAVE (fade + translateY). GPU transform+opacity.
 *   Monta en opacity-0 translateY(32px) → mount → 1 0.
 * ========================================================================= */

export const LOCATION_ENTRY_CLASS = [
  "opacity-0 translate-y-[32px]",
  `transition-[opacity,transform] duration-[700ms] ${STORYTELLING_BEZIER_CSS}`,
  "will-change-opacity will-change-transform",
].join(" ");

export const LOCATION_ENTRY_PLAY_CLASS = ["!opacity-100 !translate-y-[0px]"].join(" ");

/* ========================================================================= *
 * BEZIER CONSISTENCIA (igual Storytelling bezier).
 * ========================================================================= */

export const LOCATION_STORYTELLING_BEZIER = STORYTELLING_BEZIER_CSS;
