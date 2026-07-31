import { cn } from "../../../lib";
import {
  CAPTION_SIZES,
  DEFAULT_CAPTION_SIZE,
} from "../typography/Typography.config";
import type { CaptionProps } from "../typography/Typography.types";

function Caption({ size = DEFAULT_CAPTION_SIZE, children, className }: CaptionProps) {
  return (
    <span className={cn("font-sans opacity-75", CAPTION_SIZES[size], className)}>
      {children}
    </span>
  );
}

export default Caption;
