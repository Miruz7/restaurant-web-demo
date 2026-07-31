import { cn } from "../../../lib";
import {
  TEXT_SIZES,
  TEXT_WEIGHTS,
  DEFAULT_TEXT_SIZE,
  DEFAULT_TEXT_WEIGHT,
} from "../typography/Typography.config";
import type { TextProps } from "../typography/Typography.types";

function Text({
  size = DEFAULT_TEXT_SIZE,
  weight = DEFAULT_TEXT_WEIGHT,
  children,
  className,
}: TextProps) {
  return (
    <p className={cn("font-sans", TEXT_SIZES[size], TEXT_WEIGHTS[weight], className)}>{children}</p>
  );
}

export default Text;
