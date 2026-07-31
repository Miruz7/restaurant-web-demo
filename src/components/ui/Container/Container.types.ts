import type { ReactNode } from "react";
import type { ContainerSize } from "./Container.config";

export interface ContainerProps {
  readonly children: ReactNode;
  readonly size?: ContainerSize;
  readonly centered?: boolean;
  readonly fullWidth?: boolean;
  readonly className?: string;
}
