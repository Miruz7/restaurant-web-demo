import type { ReactElement } from "react";
import { FOOTER_BOTTOM_TEXT_CLASS, FOOTER_BOTTOM_WRAP_CLASS } from "../../Footer.config";

export interface FooterBottomProps {
  readonly copy: string;
  readonly rights: string;
  readonly className?: string;
}

export default function FooterBottom({ copy, rights, className }: FooterBottomProps): ReactElement {
  return (
    <div
      aria-label="Pie de página · Aviso legal y propiedad intelectual"
      className={[FOOTER_BOTTOM_WRAP_CLASS, className].filter(Boolean).join(" ")}
    >
      <p className={FOOTER_BOTTOM_TEXT_CLASS}>{copy}</p>
      <p className={FOOTER_BOTTOM_TEXT_CLASS}>{rights}</p>
    </div>
  );
}
