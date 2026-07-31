import { cn } from "../../../lib";
import {
  BASE_CONTAINER_CLASS,
  CENTERED_CONTAINER_CLASS,
  CONTAINER_SIZES,
  DEFAULT_CONTAINER_SIZE,
} from "./Container.config";
import type { ContainerProps } from "./Container.types";

function Container({
  children,
  size = DEFAULT_CONTAINER_SIZE,
  centered = true,
  fullWidth = false,
  className,
}: ContainerProps) {
  const maxWidthClass = fullWidth ? undefined : CONTAINER_SIZES[size];
  const centeredClass = centered ? CENTERED_CONTAINER_CLASS : undefined;

  return (
    <div className={cn(BASE_CONTAINER_CLASS, maxWidthClass, centeredClass, className)}>
      {children}
    </div>
  );
}

export default Container;
