export { default, default as Footer, HomeFooter } from "./Footer";
export type { FooterProps } from "./Footer";

export { FOOTER_DATA, DEFAULT_FOOTER_ID } from "./Footer.constants";

export * from "./Footer.types";
export type {
  FooterBrandData,
  FooterNavItem,
  FooterContactItem,
  FooterHoursItem,
  FooterData,
} from "./Footer.types";

/** Sprint 12.5.4.b — Footer Reveal Engine Rewrite (Arquitectura Definitiva)
 *  Hook useFooterReveal · IO observa DIRECTAMENTE <footer> · 0 wrappers · 0 selectores DOM.
 */
export { FooterRevealBus } from "./FooterReveal.bus";
export type { FooterRevealListener } from "./FooterReveal.bus";
export {
  default as useFooterReveal,
  useFooterReveal as FooterReveal,
} from "./components/FooterReveal";
export type { UseFooterRevealReturn, FooterRevealHookReturn } from "./components/FooterReveal";

export { FooterBrand } from "./components/FooterBrand";
export type { FooterBrandProps } from "./components/FooterBrand";

export { FooterNavigation } from "./components/FooterNavigation";
export type { FooterNavigationProps } from "./components/FooterNavigation";

export { FooterContact } from "./components/FooterContact";
export type { FooterContactProps } from "./components/FooterContact";

export { FooterHours } from "./components/FooterHours";
export type { FooterHoursProps } from "./components/FooterHours";

export { FooterBottom } from "./components/FooterBottom";
export type { FooterBottomProps } from "./components/FooterBottom";
