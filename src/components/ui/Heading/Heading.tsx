import { createElement } from "react";
import { cn } from "../../../lib";
import { HEADING_TAGS, HEADING_VARIANTS } from "../typography/Typography.config";
import type { HeadingProps } from "../typography/Typography.types";

function Heading({ level = 1, children, className }: HeadingProps) {
  const tag = HEADING_TAGS[level];
  return createElement(tag, { className: cn(HEADING_VARIANTS[level], className) }, children);
}

export default Heading;
