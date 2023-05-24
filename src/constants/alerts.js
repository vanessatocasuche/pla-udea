import { theme } from '@/theme/theme'

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
  }
}
