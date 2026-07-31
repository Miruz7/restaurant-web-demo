import type { NavigationItem } from "../../../data/navigation";

export interface NavigationProps {
  readonly items: readonly NavigationItem[];
  readonly className?: string;
}
