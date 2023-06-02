import { theme } from '@/theme/theme'
/**
 * Objeto de configuración para los diferentes tipos de alertas.
 * @typedef {Object} AlertConfig
 * @property {string} title - El título de la alerta.
 * @property {string} text - El texto de la alerta.
 * @property {string} icon - El ícono de la alerta.
 * @property {string} iconColor - El color del ícono de la alerta.
 * @property {boolean} showCancelButton - Indica si se muestra el botón de cancelar.
 * @property {string} confirmButtonText - El texto a mostrar en el botón de confirmar.
 * @property {string} cancelButtonText - El texto a mostrar en el botón de cancelar.
 * @property {string} confirmButtonColor - El color del botón de confirmar.
 * @property {string} cancelButtonColor - El color del botón de cancelar.
 * @property {boolean} focusCancel - El color del botón de cancelar.
 * @property {boolean} focusConfirm - El color del botón de confirmar.
 */

/**
 * Objeto de configuración para los diferentes tipos de alertas.
 * @type {Object.<string, AlertConfig>}
 */
export const ALERT_CFG = {
  cancel: {
    title: '¿Está seguro que desea cancelar?',
    text: 'No se guardarán los cambios',
    icon: 'warning',
    iconColor: theme.colors.secondary.yellow,
    showCancelButton: true,
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No, volver',
    confirmButtonColor: theme.colors.secondary.red,
    cancelButtonColor: '#999',
    focusCancel: true
  },
  delete: {
    title: '¿Está seguro que desea eliminar?',
    text: 'No se podrá recuperar la información',
    icon: 'warning',
    iconColor: theme.colors.secondary.red,
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'No, volver',
    confirmButtonColor: theme.colors.secondary.red,
    cancelButtonColor: '#999',
    focusCancel: true
  },
  error: {
    title: 'Ocurrió un error',
    text: 'No se pudo realizar la operación',
    icon: 'error',
    iconColor: theme.colors.secondary.red,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: '#999',
    focusConfirm: true
  },
  success: {
    title: 'Operación exitosa',
    text: 'Se realizó la operación correctamente',
    icon: 'success',
    iconColor: theme.colors.primary.green,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: theme.colors.secondary.green,
    focusConfirm: true
  },
  addSubject: {
    title: 'Agregar materia',
    html: `
      <input type="text" class="form-control swal2-input" id="subjectName" placeholder="Nombre de la materia">
      <input type="number" min="0" class="form-control swal2-input" id="subjectCode" placeholder="Código de la materia">
      <input type="number" min="0" class="form-control swal2-input" id="subjectCredits" placeholder="Créditos de la materia">
      <input type="text" class="form-control swal2-input" id="subjectType" placeholder="Tipo de la materia">
      <input type="text" class="form-control swal2-input" id="subjectModality" placeholder="Modalidad de la materia">
    `,
    focusConfirm: false,
    confirmButtonText: 'Aceptar',
    confirmButtonColor: theme.colors.secondary.green
  }
}
