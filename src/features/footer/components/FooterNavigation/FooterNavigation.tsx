import type { ReactElement } from "react";
import type { FooterNavItem } from "../../Footer.types";
import {
  FOOTER_BLOCK_BASE_CLASS,
  FOOTER_BLOCK_HEADING_CLASS,
  FOOTER_NAV_ITEM_BASE_CLASS,
  FOOTER_NAV_LIST_CLASS,
} from "../../Footer.config";

export interface FooterNavigationProps {
  readonly heading: string;
  readonly items: readonly FooterNavItem[];
  readonly className?: string;
}

export default function FooterNavigation({
  heading,
  items,
  className,
}: FooterNavigationProps): ReactElement {
  return (
    <nav
      aria-label="Pie de página · Navegación"
      className={[FOOTER_BLOCK_BASE_CLASS, className].filter(Boolean).join(" ")}
    >
      <h2 className={FOOTER_BLOCK_HEADING_CLASS}>{heading}</h2>
      <ul role="list" className={FOOTER_NAV_LIST_CLASS}>
        {items.map((item) => (
          <li key={`${item.label}-${item.href}`} className="w-full min-w-0">
            <a href={item.href} className={FOOTER_NAV_ITEM_BASE_CLASS} aria-label={item.ariaLabel}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
