/**
 * src/constants/app.ts
 *
 * Metadatos básicos de la aplicación (nombre, versión, contactos por defecto, etc.).
 * No sustituye a variables de entorno: los valores aquí son defaults fallback
 * usados cuando VITE_* no está definida.
 */

/** Nombre de marca (fallback). La fuente real es VITE_APP_NAME / __APP_NAME__. */
export const APP_NAME_DEFAULT = "Sabor de Casa" as const;

/** Entorno por defecto. */
export const APP_ENV_DEFAULT = "development" as const;

/** Contacto por defecto (fallback si VITE_CONTACT_EMAIL no existe). */
export const APP_CONTACT_EMAIL_DEFAULT = "hola@sabordecasa.example" as const;

/** Idioma base del proyecto. Futuro para i18n. */
export const APP_LOCALE_DEFAULT = "es-MX" as const;

/** Moneda por defecto (tienda futura / catálogo / presupuestos). */
export const APP_CURRENCY_CODE = "MXN" as const;
export const APP_CURRENCY_SYMBOL = "$" as const;
