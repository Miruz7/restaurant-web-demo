import { cn } from "@/lib/cn";
import { PUBLIC_NAVIGATION } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Navigation } from "../Navigation";
import {
  HEADER_ACTIONS_CLASSES,
  HEADER_HEIGHT_PX,
  HEADER_LOGO_CLASSES,
  HEADER_NAV_CLASSES,
  HEADER_SECTION_CLASSES,
  HEADER_CONTAINER_CLASSES,
} from "./Header.config";
import type { HeaderProps } from "./Header.types";

function Header({ className, style }: HeaderProps) {
  return (
    <header
      className={cn(HEADER_SECTION_CLASSES, "fixed inset-x-0 top-0 z-nav", className)}
      style={{
        minHeight: `${HEADER_HEIGHT_PX}px`,
        ...style,
      }}
      role="banner"
    >
      <Section spacing="none" className="h-full">
        <Container size="3xl" fullWidth className={HEADER_CONTAINER_CLASSES}>
          <a href="/" className={HEADER_LOGO_CLASSES} aria-label="Papelería Nova - Inicio">
            Papelería Nova
          </a>

          <div className={HEADER_NAV_CLASSES}>
            <Navigation items={PUBLIC_NAVIGATION} />
          </div>

          <div className={HEADER_ACTIONS_CLASSES}>
            <Button size="sm">Contáctanos</Button>
          </div>
        </Container>
      </Section>
    </header>
  );
}

export default Header;
