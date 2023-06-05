/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
import { LINKS_UNITS, CORRECT_UNIT, ID_INPUTS_UNITS } from '../../fixtures/constants/units/unitsConstants'
import { baseUrl, CORRECT_SUBUNIT, LINKS_SUBUNITS, ID_INPUTS_SUBUNITS, CORRECT_SUBUNIT_EDIT, INCORRECT_SUBUNIT, ALERTS } from '../../fixtures/constants/subunits/subUnitsConstants'

/**
 * El before se ejecuta antes de todos los tests
 * Se crea una unidad academica
 * @module e2e/sub-units/subAcademicUnits
 * @version 0.0.1
 */
before(() => {
  // Crear una unidad academica
  cy.visit(LINKS_UNITS.createUnits)
  cy.get(ID_INPUTS_UNITS.name).type(CORRECT_UNIT.name)
  cy.get(ID_INPUTS_UNITS.code).type(CORRECT_UNIT.code)
  cy.get(ID_INPUTS_UNITS.type).select('Escuela')
  cy.get(ID_INPUTS_UNITS.headName).type(CORRECT_UNIT.headName)
  cy.get(ID_INPUTS_UNITS.description).type(CORRECT_UNIT.description)
  cy.get(ID_INPUTS_UNITS.ubication).type(CORRECT_UNIT.ubication)
  cy.get(ID_INPUTS_UNITS.urlCreation).type(CORRECT_UNIT.urlCreation)
  cy.get(ID_INPUTS_UNITS.costCenterCode).type(CORRECT_UNIT.costCenterCode)
  cy.get('button').eq(3).click().wait(3000)
})

beforeEach(() => {
  // arrange
	cy.visit(LINKS_UNITS.units)
	cy.contains(CORRECT_UNIT.name).click().wait(3000)
	cy.get('button').eq(3).click()
})

/**
 * HU 03: Como usuario administrador quiero poder crear subunidades académicas.
 * @description Pruebas e2e para la creación de una subunidad académica
 * @module e2e/sub-units/subAcademicUnits
 * @version 0.0.1
 */
describe('Crear subunidad académica', () => {
  /**
	 * Dado que el usuario se encuentra en la página de editar una unidad académica,
	 * cuando el usuario hace click en el botón para agregar una subunidad académica,
	 * entonces el usuario debería poder ver el formulario para crear una subunidad académica.
	 * @description Prueba e2e para la creación de una subunidad académica
	 * @module e2e/sub-units/subAcademicUnits
	 * @version 0.0.1
	 */
  it('Se puede ver el formulario para crear una subunidad académica', () => {
    // arrange
		cy.get('.Card_addButton__mpQut').click().wait(3000)

    // Act
		cy.get('h1').contains('Crear Subunidad Académica')

    // Assert
    cy.get(ID_INPUTS_SUBUNITS.name).should('exist')
    cy.get(ID_INPUTS_SUBUNITS.code).should('exist')
    cy.get(ID_INPUTS_SUBUNITS.headName).should('exist')
    cy.get(ID_INPUTS_SUBUNITS.description).should('exist')
  })

  /**
	 * Dado que el usuario se encuentra en el formulario para crear una subunidad académica,
	 * cuando el usuario ingresa los datos correctos y hace click en el botón para crear la subunidad académica,
	 * entonces el usuario debería poder ver la subunidad académica creada en la lista de subunidades académicas.
	 * @description Prueba e2e para la creación de una subunidad académica
	 * @module e2e/sub-units/subAcademicUnits
	 * @version 0.0.1
	 */
	it('Se puede crear una subunidad académica', () => {
		// arrange
		cy.get('.Card_addButton__mpQut').click().wait(3000)

		// Act
		cy.get(ID_INPUTS_SUBUNITS.name).type(CORRECT_SUBUNIT.name)
		cy.get(ID_INPUTS_SUBUNITS.code).type(CORRECT_SUBUNIT.code)
		cy.get(ID_INPUTS_SUBUNITS.type).select('Departamento')
		cy.get(ID_INPUTS_SUBUNITS.headName).type(CORRECT_SUBUNIT.headName)
		cy.get(ID_INPUTS_SUBUNITS.description).type(CORRECT_SUBUNIT.description)
		cy.get('button').eq(3).click().wait(3000)

		// Assert
		cy.get('h1').contains('Subunidades Académicas')
		cy.contains(CORRECT_SUBUNIT.name)
	})


})
