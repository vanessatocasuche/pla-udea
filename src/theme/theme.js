/**
 * Tema de colores utilizado en la aplicación.
 * @typedef {Object} Theme
 * @property {Object} colors - Colores utilizados en el tema.
 * @property {Object} colors.primary - Colores primarios.
 * @property {string} colors.primary.1 - Color primario 1.
 * @property {string} colors.primary.2 - Color primario 2.
 * @property {string} colors.primary.3 - Color primario 3.
 * @property {string} colors.primary.4 - Color primario 4.
 * @property {string} colors.primary.5 - Color primario 5.
 * @property {Object} colors.secondary - Colores secundarios.
 * @property {string} colors.secondary.purple - Color secundario morado.
 * @property {string} colors.secondary.blue - Color secundario azul.
 * @property {string} colors.secondary.red - Color secundario rojo.
 * @property {string} colors.secondary.yellow - Color secundario amarillo.
 * @property {string} colors.secondary.violet - Color secundario violeta.
 * @property {string} colors.secondary.green - Color secundario verde.
 * @property {string} colors.secondary.white - Color secundario blanco.
 * @property {Object} colors.others - Otros colores.
 * @property {string} colors.others.text - Color de texto.
 * @property {string} colors.others.background - Color de fondo.
 * @property {string} colors.others.disabled - Color para elementos deshabilitados.
 */

/**
 * Objeto que contiene el tema de colores utilizado en la aplicación y adaptado a la identidad institucional.
 * @type {Theme}
 */
export const theme = {
  colors: {
    primary: {
      1: '#026937',
      2: '#35944b',
      3: '#43b649',
      4: '#8dc63f',
      5: '#3ebdac'
    },
    secondary: {
      purple: '#70205b',
      blue: '#137598',
      red: '#ef434d',
      yellow: '#f9a12c',
      violet: '#532d87',
      green: '#43b649',
      white: '#ffffff'
    },
    others: {
      text: '#ffffff',
      background: '#f9f9f9',
      disabled: '#bfbfbf'
    }
  }
}
