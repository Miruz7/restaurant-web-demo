/**
 * src/constants/seo.ts
 *
 * Valores por defecto de SEO para <head> / Open Graph / Twitter Cards.
 * Futuramente un SEO componente leerá estas constantes como base y
 * cada página podrá sobreescribir título/description.
 */

import { APP_NAME_DEFAULT } from "./app";
import { ROUTES } from "./routes";

export const SEO_DEFAULT_TITLE = `${APP_NAME_DEFAULT} — Papelería moderna para crear, aprender y trabajar`;

export const SEO_DEFAULT_DESCRIPTION =
  "Material de estudio, oficina y creatividad. Servicios de impresión, encuadernación y diseño. Papelería Nova ayuda a que las ideas tomen forma.";

export const SEO_DEFAULT_KEYWORDS = [
  "papelería",
  "cuadernos",
  "oficina",
  "material escolar",
  "impresión",
  "encuadernación",
  "creatividad",
  "Papelería Nova",
] as const;

export const SEO_DEFAULT_ROBOTS = "index,follow" as const;

export const SEO_OG = {
  TYPE: "website",
  SITE_NAME: APP_NAME_DEFAULT,
  LOCALE: "es_ES",
  URL: ROUTES.HOME,
} as const;

export const SEO_TWITTER = {
  CARD: "summary_large_image",
} as const;
