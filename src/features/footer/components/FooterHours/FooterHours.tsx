import type { ReactElement } from "react";
import type { FooterHoursItem } from "../../Footer.types";
import {
  FOOTER_BLOCK_BASE_CLASS,
  FOOTER_BLOCK_HEADING_CLASS,
  FOOTER_HOURS_DAY_CLASS,
  FOOTER_HOURS_DAY_CLOSED_CLASS,
  FOOTER_HOURS_DAY_HIGHLIGHT_CLASS,
  FOOTER_HOURS_LIST_CLASS,
  FOOTER_HOURS_ROW_CLASS,
  FOOTER_HOURS_TIME_CLASS,
  FOOTER_HOURS_TIME_CLOSED_CLASS,
} from "../../Footer.config";

export interface FooterHoursProps {
  readonly heading: string;
  readonly items: readonly FooterHoursItem[];
  readonly className?: string;
}

export default function FooterHours({ heading, items, className }: FooterHoursProps): ReactElement {
  return (
    <section
      aria-label="Pie de página · Horarios"
      className={[FOOTER_BLOCK_BASE_CLASS, className].filter(Boolean).join(" ")}
    >
      <h2 className={FOOTER_BLOCK_HEADING_CLASS}>{heading}</h2>
      <ul role="list" className={FOOTER_HOURS_LIST_CLASS}>
        {items.map((item) => {
          const isClosed = item.hours === "Cerrado";
          const dayClass = isClosed
            ? FOOTER_HOURS_DAY_CLOSED_CLASS
            : item.highlight
              ? FOOTER_HOURS_DAY_HIGHLIGHT_CLASS
              : FOOTER_HOURS_DAY_CLASS;
          const timeClass = isClosed ? FOOTER_HOURS_TIME_CLOSED_CLASS : FOOTER_HOURS_TIME_CLASS;
          return (
            <li key={item.day} className={FOOTER_HOURS_ROW_CLASS}>
              <span className={dayClass}>{item.day}</span>
              <span className={timeClass}>{item.hours}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
