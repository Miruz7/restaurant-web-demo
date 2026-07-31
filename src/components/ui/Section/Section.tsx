import { cn } from "../../../lib";
import {
  DEFAULT_SECTION_BACKGROUND,
  DEFAULT_SECTION_SPACING,
  SECTION_BACKGROUNDS,
  SECTION_SPACING,
} from "./Section.config";
import type { SectionProps } from "./Section.types";

function Section({
  children,
  id,
  spacing = DEFAULT_SECTION_SPACING,
  background = DEFAULT_SECTION_BACKGROUND,
  fullHeight = false,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        SECTION_SPACING[spacing],
        SECTION_BACKGROUNDS[background],
        fullHeight && "min-h-screen",
        className,
      )}
    >
      {children}
    </section>
  );
}

export default Section;
