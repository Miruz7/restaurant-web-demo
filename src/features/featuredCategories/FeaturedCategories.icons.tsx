/**
 * FeaturedCategories.icons.tsx
 *
 * Iconos editoriales inline SVG · 24 x 24 · strokeWidth 1.75.
 *
 * Mantenidos en archivo TSX separado porque constants.ts NO debe
 * contener JSX (TS parser project references lo rechaza).
 */

import type { ReactElement } from "react";

const BASE = {
  "aria-hidden": true,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: "h-6 w-6",
};

export function CategoryIconDesayunos(): ReactElement {
  return (
    <svg {...BASE}>
      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

export function CategoryIconComidas(): ReactElement {
  return (
    <svg {...BASE}>
      <path d="M2 2v20" />
      <path d="M14 10c0-3-3-5-6-5S2 7 2 10s3 5 6 5 6-2 6-5z" />
      <path d="M22 13V5c0-1.7-1.3-3-3-3s-3 1.3-3 3v8" />
      <path d="M16 10h6" />
      <path d="M16 21a3 3 0 0 1-3-3v-8h6v8a3 3 0 0 1-3 3z" />
    </svg>
  );
}

export function CategoryIconCenas(): ReactElement {
  return (
    <svg {...BASE}>
      <path d="M12 2a7 7 0 0 0-7 7c0 4 3 6.5 7 10 4-3.5 7-6 7-10a7 7 0 0 0-7-7z" />
      <path d="M12 9v.01" />
      <path d="M12 12a3 3 0 0 1-3-3" />
      <path d="M12 12a3 3 0 0 0 3-3" />
      <path d="M5 21h14" />
      <path d="M8 21a6 6 0 0 1-2-4" />
      <path d="M16 21a6 6 0 0 0 2-4" />
    </svg>
  );
}

export function CategoryIconBebidas(): ReactElement {
  return (
    <svg {...BASE}>
      <path d="M8 2h8" />
      <path d="M9 2v17a3 3 0 0 0 3 3h0a3 3 0 0 0 3-3V2" />
      <path d="M7 8h10l-1 4H8z" />
      <path d="M12 12v10" />
    </svg>
  );
}
