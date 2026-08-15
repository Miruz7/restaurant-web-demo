import type { ReactElement } from "react";
import type { FooterBrandData } from "../../Footer.types";
import {
  FOOTER_BRAND_DESC_CLASS,
  FOOTER_BRAND_LOGO_MARK_CLASS,
  FOOTER_BRAND_LOGO_WRAP_CLASS,
  FOOTER_BRAND_NAME_CLASS,
  FOOTER_BRAND_TAGLINE_CLASS,
  FOOTER_BLOCK_BASE_CLASS,
  FOOTER_ICON_SIZE_CLASS,
} from "../../Footer.config";

export interface FooterBrandProps {
  readonly data: FooterBrandData;
  readonly className?: string;
}

export default function FooterBrand({ data, className }: FooterBrandProps): ReactElement {
  return (
    <div className={[FOOTER_BLOCK_BASE_CLASS, className].filter(Boolean).join(" ")}>
      {/* ① LOGO: Simple SVG "N" minimalista · 36 / 40 / 44 px. NO PNG. NO JPG. */}
      <div className={FOOTER_BRAND_LOGO_WRAP_CLASS}>
        <div
          aria-hidden="true"
          className={[FOOTER_BRAND_LOGO_MARK_CLASS, FOOTER_ICON_SIZE_CLASS].join(" ")}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M6.5 18.5h2.1l5.6-8.1V18.5h2V5.5h-2.1l-5.6 8.1V5.5h-2v13Z"
              fill="white"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* ② NOMBRE: fw‑800 · tracking‑tight · leading‑tight = HERO H1. */}
      <h2 className={FOOTER_BRAND_NAME_CLASS}>{data.name}</h2>

      {/* ③ TAGLINE: MUY discreto · white/70 · coherente con brand.tagline */}
      <p className={FOOTER_BRAND_TAGLINE_CLASS}>{data.tagline}</p>

      {/* ④ DESCRIPCIÓN: max 3 líneas · line-clamp-3 */}
      <p className={FOOTER_BRAND_DESC_CLASS}>{data.description}</p>
    </div>
  );
}
