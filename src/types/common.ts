/**
 * src/types/common.ts
 *
 * Tipos 100% agnósticos al dominio: helpers de tipos,
 * interfaces genéricas, unidades, marcas básicas.
 */

/** Identidad de marca oficial (Brand Identity §7 — "Papelería Nova" es la única forma válida). */
export type BrandName = "Papelería Nova";

/** Objetos que tienen id único (listas, navegación, entidades). */
export interface IWithId<TId extends string = string> {
  readonly id: TId;
}

/** Unidades de longitud tipadas, evita `px` / `rem` esparcidos sin control. */
export type LengthUnit = `${number}px` | `${number}rem` | `${number}em` | `${number}%`;
