import type { CSSProperties, ReactElement } from "react";
import type { FooterData } from "./Footer.types";
import { DEFAULT_FOOTER_ID } from "./Footer.constants";
import {
  FOOTER_SECTION_BASE_CLASS,
  FOOTER_MINIMAL_WRAP_CLASS,
  FOOTER_MINIMAL_LEFT_COL_CLASS,
  FOOTER_MINIMAL_RIGHT_COL_CLASS,
  FOOTER_MINIMAL_LOGO_WRAP_CLASS,
  FOOTER_MINIMAL_LOGO_MARK_CLASS,
  FOOTER_MINIMAL_ICON_SIZE_CLASS,
  FOOTER_MINIMAL_NAME_CLASS,
  FOOTER_MINIMAL_TAGLINE_CLASS,
  FOOTER_MINIMAL_DIVIDER_CLASS,
  FOOTER_MINIMAL_AUTHOR_LABEL_CLASS,
  FOOTER_MINIMAL_AUTHOR_NAME_CLASS,
  FOOTER_MINIMAL_LEGAL_CLASS,
} from "./Footer.config";
import useFooterReveal from "./components/FooterReveal/FooterReveal";

export interface FooterProps {
  readonly id?: string;
  readonly data?: FooterData;
  readonly className?: string;
  readonly style?: CSSProperties;
}

/**
 * Minimalist Editorial Logo (SVG Mark "N") · NO PNG · inline.
 * Mismo diseño que FooterBrand original, reutilizado para minimalismo.
 */
function MinimalBrandMark(): ReactElement {
  return (
    <div className={FOOTER_MINIMAL_LOGO_WRAP_CLASS}>
      <div
        aria-hidden="true"
        className={[FOOTER_MINIMAL_LOGO_MARK_CLASS, FOOTER_MINIMAL_ICON_SIZE_CLASS].join(" ")}
      >
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M6.5 18.5h2.1l5.6-8.1V18.5h2V5.5h-2.1l-5.6 8.1V5.5h-2v13Z"
            fill="white"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Footer({
  id = DEFAULT_FOOTER_ID,
  className,
  style,
}: FooterProps): ReactElement {
  /**
   * Sprint 12.5.4.b · Footer Reveal Engine Rewrite (Arquitectura Definitiva).
   * ✅ INTACTO (Reveal NO se toca en este Sprint):
   *   · useFooterReveal → IntersectionObserver sobre <footer>.
   *   · Scroll-driven · 21 thresholds · bezier Hero.
   *   · Reveal = opacity 0→1 + translateY(72px→0px).
   */
  const { footerRef, revealStyle } = useFooterReveal();

  const mergedFooterStyle: CSSProperties = {
    ...(style ?? {}),
    ...revealStyle,
  };

  return (
    <footer
      id={id}
      ref={footerRef}
      aria-label="Pie de página · Sabor de Casa"
      className={[FOOTER_SECTION_BASE_CLASS, "pointer-events-auto", className]
        .filter(Boolean)
        .join(" ")}
      style={mergedFooterStyle}
    >
      {/*
       * ⭐ Sprint 12.5.6.L — Layout Editorial 2 Columnas (Azur Promilia ref).
       *
       *   FOOTER_MINIMAL_WRAP_CLASS → grid 1fr | 1fr (desktop) · 1 col (mobile).
       *
       *   COL IZQUIERDA (Identidad marca):
       *     ① LOGO SVG "N"
       *     ② Papelería Nova (título)
       *     ③ PAPELERÍA • TECNOLOGÍA • IMPRESIÓN (subtítulo)
       *   → bajado ligeramente (pt-12/14/16).
       *
       *   COL DERECHA (Info editorial):
       *     ④ Divider sutil (opcional, separación visual)
       *     ⑤ Creado por · Miguel Ángel De La Cruz (2 niveles)
       *     ⑥ © 2026 Papelería Nova (legal)
       *
       *   Ambos bloques: items-center justify-center (verticalmente centrados).
       *
       * ⛔ CONGELADO (Sprint .k intacto):
       *   · useFooterReveal · footerRef · revealStyle · footerRevealProgress.
       *   · Nada de Storytelling aquí. Animación 1 wheel / 1000 ms intacta.
       */}
      <div className={FOOTER_MINIMAL_WRAP_CLASS}>
        {/* ────────── BLOQUE IZQUIERDO · IDENTIDAD MARCA ───────── */}
        <div className={FOOTER_MINIMAL_LEFT_COL_CLASS}>
          {/* ① LOGO */}
          <MinimalBrandMark />

          {/* ② Nombre Sabor de Casa */}
          <h2 className={FOOTER_MINIMAL_NAME_CLASS}>Sabor de Casa</h2>

          {/* ③ Tagline editorial */}
          <p className={FOOTER_MINIMAL_TAGLINE_CLASS}>Cocina mexicana • Desayunos • Comidas</p>
        </div>

        {/* ────────── BLOQUE DERECHO · INFO AUTOR + LEGAL ──────── */}
        <div className={FOOTER_MINIMAL_RIGHT_COL_CLASS}>
          {/* ④ Divider sutil editorial */}
          <div aria-hidden="true" className={FOOTER_MINIMAL_DIVIDER_CLASS} />

          {/* ⑤ Autor — 2 niveles (Creado por + Nombre) */}
          <div className="flex flex-col items-center justify-start">
            <span className={FOOTER_MINIMAL_AUTHOR_LABEL_CLASS}>Creado por</span>
            <span className={FOOTER_MINIMAL_AUTHOR_NAME_CLASS}>Miguel Ángel De La Cruz</span>
          </div>

          {/* ⑥ Legal / Copyright */}
          <p className={FOOTER_MINIMAL_LEGAL_CLASS}>© 2026 Sabor de Casa</p>
        </div>
      </div>
    </footer>
  );
}

export function HomeFooter(props: FooterProps): ReactElement {
  return <Footer {...props} />;
}
