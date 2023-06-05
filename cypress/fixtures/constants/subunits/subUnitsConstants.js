/**
 * Este archivo contiene las constantes para las subunidades.
 * Contiene datos para crear y editar subunidades.
 * Contiene datos correctos e incorrectos.
 * Contiene datos para las alertas de SweetAlert.
 * Contiene datos para las rutas de la aplicación.
 */

// Rutas de la aplicación

export const baseUrl = 'https://pla-udea-front.vercel.app'

export const CORRECT_SUBUNIT = {
  name: 'Subunidad de prueba',
  code: '20',
  headName: 'Decano de subunidad de prueba',
  description: 'Descripción de subunidad de prueba'
}

export const LINKS_SUBUNITS = {
  subUnits: `${baseUrl}/units`
}

// id de los inputs del formulario de creación de subunidades

export const ID_INPUTS_SUBUNITS = {
  name: '#nameAcademicSubUnit',
  code: '#codeAcademicSubUnit',
  headName: '#headName',
  description: '#description'
}

// Datos correctos para editar subunidades

export const CORRECT_SUBUNIT_EDIT = {
  name: 'Subunidad de prueba editada',
  code: '01',
  headName: 'Prueba editada',
  description: 'Esta es una subunidad de prueba editada'
}

// Datos incorrectos para crear subunidades

export const INCORRECT_SUBUNIT = {
  name: '1',
  code: 'codigo1',
  headName: '1',
  description: '1'
}

// Alertas de SweetAlert

export const ALERTS = {
  nameIncorrect: 'El nombre debe tener minimo 2 letras y no debe contener números o caracteres especiales"',
  codeIncorrect: 'El código debe tener minimo 1 número y maximo 2 números',
  headNameIncorrect: 'El nombre debe tener minimo 2 letras y no debe contener números o caracteres especiales',
  descriptionIncorrect: 'La descripción no debe contener caracteres especiales y debe tener entre 2 y 600 caracteres'
}
