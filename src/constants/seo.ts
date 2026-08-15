/**
 * src/constants/seo.ts
 *
 * Valores por defecto de SEO para <head> / Open Graph / Twitter Cards.
 * Futuramente un SEO componente leerá estas constantes como base y
 * cada página podrá sobreescribir título/description.
 */

import { APP_NAME_DEFAULT } from "./app";
import { ROUTES } from "./routes";

export const SEO_DEFAULT_TITLE = `${APP_NAME_DEFAULT} — Restaurante de comida mexicana`;

export const SEO_DEFAULT_DESCRIPTION =
  "Disfruta desayunos, comidas, cenas y bebidas con el auténtico sabor de casa. Conoce nuestro menú, horarios, ubicación y formas de contacto.";

export const SEO_DEFAULT_KEYWORDS = [
  "restaurante",
  "comida mexicana",
  "desayunos",
  "comidas",
  "cenas",
  "bebidas",
  "comida casera",
  "Sabor de Casa",
] as const;

export const SEO_DEFAULT_ROBOTS = "index,follow" as const;

export const SEO_OG = {
  TYPE: "website",
  SITE_NAME: APP_NAME_DEFAULT,
  LOCALE: "es-MX",
  URL: ROUTES.HOME,
} as const;

export const SEO_TWITTER = {
  CARD: "summary_large_image",
} as const;
