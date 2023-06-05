/**
 * Este archivo contiene las constantes para las unidades.
 * Contiene datos para crear y editar unidades.
 * Contiene datos correctos e incorrectos.
 * Contiene datos para las alertas de SweetAlert.
 * Contiene datos para las rutas de la aplicación.
 */

// Rutas de la aplicación

export const baseUrl = 'https://pla-udea-front.vercel.app'

// Datos correctos para crear unidades

export const CORRECT_UNIT = {
  name: 'Unidad de prueba',
  code: '20',
  headName: 'Decano de prueba',
  description: 'Descripción de prueba',
  ubication: 'Ubicación de prueba',
  urlCreation: 'https://www.udea.edu.co/',
  costCenterCode: '123456789'
}

export const LINKS_UNITS = {
  // base url + /units
  units: `${baseUrl}/units`,
  createUnits: `${baseUrl}/create-unit`
}

// id de los inputs del formulario de creación de unidades

export const ID_INPUTS_UNITS = {
  name: '#nameAcademicUnit',
  code: '#codeAcademicUnit',
  type: '#typeAcademicUnit',
  headName: '#deanName',
  description: '#description',
  ubication: '#ubicationAcademicUnit',
  urlCreation: '#urlCreationAcademicUnit',
  costCenterCode: '#costCenterCode'
}

// Datos correctos para editar unidades

export const CORRECT_EDIT_UNIT = {
  name: 'Unidad de prueba editada',
  code: '987654321',
  headName: 'Decano de prueba editado',
  description: 'Descripción de prueba editada',
  ubication: 'Ubicación de prueba editada',
  urlCreation: 'https://www.udea.edu.co/',
  costCenterCode: '987654321'
}

// Datos incorrectos para crear unidades

export const INCORRECT_UNIT = {
  name: '56',
  code: 'ghh',
  headName: '56',
  description: '6',
  ubication: '56',
  urlCreation: '56',
  costCenterCode: 'ghh'
}

export const ALERTS = {
  nameIncorrect: 'El nombre debe tener minimo 2 letras y no debe contener números o caracteres especiales"',
  codeIncorrect: 'El código debe tener minimo 1 número y maximo 2 números',
  type: 'Selecciona un elemento de la lista',
  headNameIncorrect: 'El nombre debe tener minimo 2 letras y no debe contener números o caracteres especiales',
  descriptionIncorrect: 'La descripción no debe contener caracteres especiales y debe tener entre 2 y 600 caracteres',
  ubicationIncorrect: 'La ubicación no debe contener caracteres especiales y debe tener entre 2 y 600 caracteres',
  urlCreationIncorrect: 'El enlace de creación debe tener entre 2 y 600 caracteres',
  costCenterCodeIncorrect: 'El código del centro de costos debe tener entre 2 y 600 caracteres'
}
