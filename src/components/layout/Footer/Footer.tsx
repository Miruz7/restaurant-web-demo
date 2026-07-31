import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { cn } from "@/lib/cn";
import {
  FOOTER_CONTAINER_CLASSES,
  FOOTER_COPY_CLASSES,
  FOOTER_HEIGHT_MIN_PX,
  FOOTER_LOGO_CLASSES,
  FOOTER_SECTION_CLASSES,
} from "./Footer.config";
import type { FooterProps } from "./Footer.types";

function Footer({ className, style }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer
      role="contentinfo"
      aria-label="Pie de página"
      className={cn(FOOTER_SECTION_CLASSES, className)}
      style={{ minHeight: `${FOOTER_HEIGHT_MIN_PX}px`, ...style }}
    >
      <Section spacing="none">
        <Container size="3xl" fullWidth className={FOOTER_CONTAINER_CLASSES}>
          <a href="/" className={FOOTER_LOGO_CLASSES} aria-label="Papelería Nova - Inicio">
            Papelería Nova
          </a>
          <p className={FOOTER_COPY_CLASSES}>
            © {year} Papelería Nova. Todos los derechos reservados.
          </p>
        </Container>
      </Section>
    </footer>
  );
}

export default Footer;
