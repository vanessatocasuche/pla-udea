/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { ID_INPUTS_UNITS, baseUrl, LINKS_UNITS, CORRECT_UNIT, ALERTS, CORRECT_EDIT_UNIT } from '../../fixtures/constants/units/unitsConstants'

/**
 * HU 01. Como usuario quiero poder crear una unidad académica (facultades).
 * @description Pruebas e2e para la creación de una unidad académica
 * @module e2e/units/academicUnits
 * @version 0.0.1
 * */
describe('Crear unidad académica', () => {
  /**
   * Dado que el usuario se encuentra en la página de unidades académicas,
   * cuando el usuario hace click en el botón para agregar una unidad académica,
   * entonces el usuario debería poder ver el formulario para crear una unidad académica.
   * @description Prueba e2e para la creación de una unidad académica
   * @module e2e/units/academicUnits
   * @version 0.0.1
   */
  it('Se puede ver el formulario para crear una unidad académica', () => {
    // arrange
    cy.visit(baseUrl)
    cy.get('button').contains('Conectar').click()
    cy.get('h2').contains('Unidades académicas', { matchCase: false })

    // Act
    cy.get('.gridContainer > .Buttons_roundButton__vGP7G').click()

    // Assert
    cy.get(ID_INPUTS_UNITS.name).should('exist')
    cy.get(ID_INPUTS_UNITS.code).should('exist')
    cy.get(ID_INPUTS_UNITS.type).should('exist')
    cy.get(ID_INPUTS_UNITS.headName).should('exist')
    cy.get(ID_INPUTS_UNITS.description).should('exist')
    cy.get(ID_INPUTS_UNITS.ubication).should('exist')
    cy.get(ID_INPUTS_UNITS.urlCreation).should('exist')
    cy.get(ID_INPUTS_UNITS.costCenterCode).should('exist')
  })

  /**
   * Dado que el usuario se encuentra en el formulario para crear una unidad académica,
   * cuando el usuario ingresa los datos correctos y hace click en el botón para crear la unidad académica,
   * entonces el usuario debería poder ver la unidad académica creada en la lista de unidades académicas.
   * @description Prueba e2e para la creación de una unidad académica
   * @module e2e/units/academicUnits
   * @version 0.0.1
   */
  it('Se puede crear una unidad académica', () => {
    // arrange
    cy.visit(LINKS_UNITS.createUnits)

    // Act
    cy.get(ID_INPUTS_UNITS.name).type(CORRECT_UNIT.name)
    cy.get(ID_INPUTS_UNITS.code).type(CORRECT_UNIT.code)
    cy.get(ID_INPUTS_UNITS.type).select('Escuela')
    cy.get(ID_INPUTS_UNITS.headName).type(CORRECT_UNIT.headName)
    cy.get(ID_INPUTS_UNITS.description).type(CORRECT_UNIT.description)
    cy.get(ID_INPUTS_UNITS.ubication).type(CORRECT_UNIT.ubication)
    cy.get(ID_INPUTS_UNITS.urlCreation).type(CORRECT_UNIT.urlCreation)
    cy.get(ID_INPUTS_UNITS.costCenterCode).type(CORRECT_UNIT.costCenterCode)
    cy.get('button').eq(3).click().wait(3000)

    // Assert
    cy.get('button').contains('Aceptar').click()
  })

  /**
   * Dado que el usuario se encuentra en el formulario para crear una unidad académica,
   * cuando el usuario ingresa los datos incorrectos y hace click en el botón para crear la unidad académica,
   * entonces el usuario debería poder ver un mensaje de error.
   * @description Prueba e2e para la creación de una unidad académica
   * @module e2e/units/academicUnits
   * @version 0.0.1
   */
  it('No se puede crear una unidad académica', () => {
    // arrange
    cy.visit(LINKS_UNITS.createUnits)

    // Act
    cy.get(ID_INPUTS_UNITS.name).title(ALERTS.name)
    cy.get(ID_INPUTS_UNITS.code).title(ALERTS.code)
    cy.get(ID_INPUTS_UNITS.type).title(ALERTS.type)
    cy.get(ID_INPUTS_UNITS.headName).title(ALERTS.headName)
    cy.get(ID_INPUTS_UNITS.description).title(ALERTS.description)
    cy.get(ID_INPUTS_UNITS.ubication).title(ALERTS.ubication)
    cy.get(ID_INPUTS_UNITS.urlCreation).title(ALERTS.urlCreation)
    cy.get(ID_INPUTS_UNITS.costCenterCode).title(ALERTS.costCenterCode)
  })
})

/**
 * HU 02. Como usuario quiero poder editar una unidad académica.
 * @description Pruebas e2e para la edición de una unidad académica
 * @module e2e/units/academicUnits
 * @version 0.0.1
 */
describe('Editar unidad académica', () => {
  /**
   * Dado que el usuario se encuentra en la página de unidades académicas,
   * cuando el usuario seleccioana una unidad académica cuya información desea editar,
   * entonces el usuario debería poder ver el formulario con los datos actuales y poder editarlos.
   * @description Prueba e2e para la edición de una unidad académica
   * @module e2e/units/academicUnits
   * @version 0.0.1
   */
  it('Se puede ver el formulario para editar una unidad académica', () => {
    // arrange
    cy.visit(LINKS_UNITS.units)
    cy.get('h3').contains(CORRECT_UNIT.name).parent().click()
    cy.get('button').eq(2).click()

    // Assert
    cy.get(ID_INPUTS_UNITS.name).should('exist')
    cy.get(ID_INPUTS_UNITS.code).should('exist')
    cy.get(ID_INPUTS_UNITS.type).should('exist')
    cy.get(ID_INPUTS_UNITS.headName).should('exist')
    cy.get(ID_INPUTS_UNITS.description).should('exist')
    cy.get(ID_INPUTS_UNITS.ubication).should('exist')
    cy.get(ID_INPUTS_UNITS.urlCreation).should('exist')
    cy.get(ID_INPUTS_UNITS.costCenterCode).should('exist')
  })

  /**
   * Dado que el usuario se encuentra en el formulario para editar una unidad académica,
   * cuando el usuario ingresa los datos correctos y hace click en el botón para editar la unidad académica,
   * entonces el usuario debería poder ver la unidad académica editada en la lista de unidades académicas.
   * @description Prueba e2e para la edición de una unidad académica
   * @module e2e/units/academicUnits
   * @version 0.0.1
   * @todo Cambiar los datos de la unidad académica para que no se repita con el de la unidad académica creada en la prueba anterior.
   */
  it('Se puede editar una unidad académica', () => {
    // arrange
    cy.visit(LINKS_UNITS.units)
    cy.get('h3').contains(CORRECT_UNIT.name).parent().click()
    cy.get('button').eq(3).click().wait(3000)
    cy.get('h1').contains('Editar unidad académica', { matchCase: false })

    // Act
    cy.get(ID_INPUTS_UNITS.name).clear()
    cy.get(ID_INPUTS_UNITS.headName).clear()
    cy.get(ID_INPUTS_UNITS.description).clear()
    cy.get(ID_INPUTS_UNITS.ubication).clear()
    cy.get(ID_INPUTS_UNITS.urlCreation).clear()

    // Act
    cy.get(ID_INPUTS_UNITS.name).type(CORRECT_EDIT_UNIT.name)
    cy.get(ID_INPUTS_UNITS.headName).type(CORRECT_EDIT_UNIT.headName)
    cy.get(ID_INPUTS_UNITS.description).type(CORRECT_EDIT_UNIT.description)
    cy.get(ID_INPUTS_UNITS.ubication).type(CORRECT_EDIT_UNIT.ubication)
    cy.get(ID_INPUTS_UNITS.urlCreation).type(CORRECT_EDIT_UNIT.urlCreation)

    cy.get('button').eq(3).click()

    // assert
    cy.get('.swal2-popup').should('exist')
    cy.get('Button').contains('Aceptar').click()
  })
})

/**
 * HU 03. Como usuario quiero poder eliminar una unidad académica.
 * @description Pruebas e2e para la eliminación de una unidad académica
 * @module e2e/units/academicUnits
 * @version 0.0.1
 * */
describe('Eliminar unidad académica', () => {
  /**
   * Dado que el usuario se encuentra en la vista de una unidad académica,
   * cuando el usuario hace click en el botón para eliminar la unidad académica,
   * entonces el usuario debería poder ver un mensaje de confirmación para eliminar la unidad académica
   * y al confirmar la acción, la unidad académica debería ser eliminada de la lista de unidades académicas.
   * @description Prueba e2e para la edición de una unidad académica
   * @module e2e/units/academicUnits
   */
  it('Se puede eliminar una unidad académica', () => {
    // arrange
    cy.visit(LINKS_UNITS.units)
    cy.get('h3').contains(CORRECT_EDIT_UNIT.name).parent().click().wait(3000)

    // Act
    cy.get('button').eq(2).click().wait(3000)
    cy.get('.swal2-confirm').click().wait(2000)

    // assert
    // no existe el texto de la unidad académica eliminada
    cy.get('h3').contains(CORRECT_EDIT_UNIT.name).should('not.exist')
  })
})
