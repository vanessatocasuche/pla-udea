/**
 * Patrones (Expresiones Regulares) de validación para diferentes campos.
 * @typedef {Object} ValidationPatterns
 * @property {string} name - Patrón para validar el campo de nombre.
 * @property {string} code - Patrón para validar el campo de código.
 * @property {string} description - Patrón para validar el campo de descripción.
 * @property {string} centerCode - Patrón para validar el campo de código del centro.
 * @property {string} address - Patrón para validar el campo de dirección.
 */

/**
 * Objeto que contiene los patrones de validación para diferentes campos.
 * @type {ValidationPatterns}
 */
export const PATTERNS = {
  name: '^[a-zA-ZÀ-ÿ ]{2,}$',
  code: '^[0-9]{1,2}$',
  description: '^[a-zA-ZÀ-ÿ0-9\\s\\p{P}]*$',
  centerCode: '^[0-9]{8,12}$',
  address: '^[a-zA-ZÀ-ÿ0-9 ]*$'
}
/**
 * Mensajes de error para diferentes campos.
 * @typedef {Object} ValidationTitles
 * @property {string} name - Mensaje de error para el campo de nombre.
 * @property {string} code - Mensaje de error para el campo de código.
 * @property {string} description - Mensaje de error para el campo de descripción.
 * @property {string} centerCode - Mensaje de error para el campo de código del centro.
 * @property {string} address - Mensaje de error para el campo de dirección.
 */

/**
 * Objeto que contiene los mensajes de error para diferentes campos.
 * @type {ValidationTitles}
 */
export const TITLES = {
  name: 'El nombre debe tener mínimo 2 letras y no debe contener números o caracteres especiales',
  code: 'El código debe tener mínimo 1 número y máximo 2 números',
  description: 'La descripción no debe contener caracteres especiales',
  centerCode: 'El código debe tener mínimo 8 números y máximo 12 números',
  address: 'La dirección no debe contener caracteres especiales'
}
