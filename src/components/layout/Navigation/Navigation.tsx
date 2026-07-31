import { cn } from "../../../lib";
import {
  NAVIGATION_CLASSES,
  NAVIGATION_ITEM_CLASSES,
  NAVIGATION_LINK_CLASSES,
  NAVIGATION_LIST_CLASSES,
} from "./Navigation.config";
import type { NavigationProps } from "./Navigation.types";

function Navigation({ items, className }: NavigationProps) {
  return (
    <nav aria-label="Navegación principal" className={cn(NAVIGATION_CLASSES, className)}>
      <ul className={NAVIGATION_LIST_CLASSES}>
        {items.map((item) => (
          <li key={item.id} className={NAVIGATION_ITEM_CLASSES}>
            <a href={item.href} className={NAVIGATION_LINK_CLASSES}>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
