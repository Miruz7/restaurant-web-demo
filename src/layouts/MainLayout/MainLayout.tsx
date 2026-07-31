import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { HEADER_HEIGHT_PX } from "@/constants/layout";
import { cn } from "@/lib/cn";
import {
  MAIN_LAYOUT_MAIN_CLASS,
  MAIN_LAYOUT_MAIN_ID,
  MAIN_LAYOUT_SHELL_CLASS,
  MAIN_LAYOUT_SKIP_LINK_CLASS,
} from "./MainLayout.config";
import type { MainLayoutProps } from "./MainLayout.types";

/**
 * MainLayout
 *
 * Composición global del shell de la aplicación:
 *   SkipLink → Header (fixed) → main (landmark) → Footer.
 *
 * Es un LAYOUT, no un bloque reutilizable. Por eso vive en src/layouts/,
 * no en src/components/layout/ (que es para Header / Footer / Navigation).
 */
function MainLayout({ children, className, style }: MainLayoutProps) {
  return (
    <div className={MAIN_LAYOUT_SHELL_CLASS} data-layout="main">
      {/* 1. Skip link (solo visible en foco de teclado) */}
      <a href={`#${MAIN_LAYOUT_MAIN_ID}`} className={MAIN_LAYOUT_SKIP_LINK_CLASS}>
        Saltar al contenido principal
      </a>

      {/* 2. Header — banner landmark (A11y). Pasamos CSS var dinámica calculada. */}
      <Header
        style={{
          ["--nova-header-height" as never]: `${HEADER_HEIGHT_PX}px`,
        }}
      />

      {/* 3. Main — landmark principal con id para skip-link + tabindex=-1 para foco programático */}
      <main
        id={MAIN_LAYOUT_MAIN_ID}
        role="main"
        tabIndex={-1}
        style={{
          paddingTop: 0,
          scrollMarginTop: HEADER_HEIGHT_PX + 16,
          ...style,
        }}
        className={cn(MAIN_LAYOUT_MAIN_CLASS, className)}
      >
        {children}
      </main>

      {/* 4. Footer — contentinfo landmark (A11y) */}
      <Footer />
    </div>
  );
}

export default MainLayout;
