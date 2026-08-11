import type { ReactElement } from "react";
import { MapPin, MessageCircle, Mail, Phone } from "lucide-react";
import type { FooterContactItem } from "../../Footer.types";
import {
  FOOTER_BLOCK_BASE_CLASS,
  FOOTER_BLOCK_HEADING_CLASS,
  FOOTER_CONTACT_ICON_WRAP_CLASS,
  FOOTER_CONTACT_ITEM_ROW_CLASS,
  FOOTER_CONTACT_LABEL_CLASS,
  FOOTER_CONTACT_LIST_CLASS,
  FOOTER_CONTACT_TEXT_COL_CLASS,
  FOOTER_CONTACT_VALUE_CLASS,
  FOOTER_CONTACT_VALUE_PLAIN_CLASS,
  FOOTER_ICON_SIZE_CLASS,
} from "../../Footer.config";

export interface FooterContactProps {
  readonly heading: string;
  readonly items: readonly FooterContactItem[];
  readonly className?: string;
}

const CONTACT_ICON_MAP = {
  Dirección: MapPin,
  Teléfono: Phone,
  WhatsApp: MessageCircle,
  Correo: Mail,
} as const;

export default function FooterContact({
  heading,
  items,
  className,
}: FooterContactProps): ReactElement {
  return (
    <section
      aria-label="Pie de página · Contacto"
      className={[FOOTER_BLOCK_BASE_CLASS, className].filter(Boolean).join(" ")}
    >
      <h2 className={FOOTER_BLOCK_HEADING_CLASS}>{heading}</h2>
      <address className={FOOTER_CONTACT_LIST_CLASS}>
        {items.map((item) => {
          const Icon = CONTACT_ICON_MAP[item.label as keyof typeof CONTACT_ICON_MAP];
          const value = item.href ? (
            <a href={item.href} aria-label={item.ariaLabel} className={FOOTER_CONTACT_VALUE_CLASS}>
              {item.value}
            </a>
          ) : (
            <span className={FOOTER_CONTACT_VALUE_PLAIN_CLASS}>{item.value}</span>
          );
          return (
            <div key={item.label} className={FOOTER_CONTACT_ITEM_ROW_CLASS}>
              {/* ① ICONO · 16 px Lucide · stroke uniforme 2. */}
              {Icon ? (
                <span
                  aria-hidden="true"
                  className={[FOOTER_CONTACT_ICON_WRAP_CLASS, FOOTER_ICON_SIZE_CLASS].join(" ")}
                >
                  <Icon strokeWidth={2} aria-hidden="true" />
                </span>
              ) : null}
              <div className={FOOTER_CONTACT_TEXT_COL_CLASS}>
                {/* ② LABEL · uppercase tiny · white/55 · MUY pequeño tracking 0.16em */}
                <span className={FOOTER_CONTACT_LABEL_CLASS}>{item.label}</span>
                {/* ③ VALOR · bold / medium strong · white/95 */}
                {value}
              </div>
            </div>
          );
        })}
      </address>
    </section>
  );
}
