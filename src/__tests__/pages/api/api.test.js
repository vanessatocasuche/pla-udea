/* eslint-disable no-undef */
// Importar la función `handler` del archivo
import handler from './../../../pages/api/api'

describe('handler function', () => {
  test('debe devolver todas las unidades académicas cuando se llama con el método GET y sin parámetro de consulta', () => {
    // Arrange
    const req = { method: 'GET' }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    // Act
    handler(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('debe devolver una unidad académica con el código dado cuando se llama con el método GET y el parámetro de consulta de código', () => {
    // Arrange
    const code = '08'
    const req = { method: 'GET', query: { code } }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    // Act
    handler(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(200)
  })

  test('debe agregar una nueva unidad académica a la lista cuando se llama con el método POST y los datos', () => {
    // Arrange
    const data = {
      codeAcademicUnit: '12',
      nameAcademicUnit: 'Facultad de Arquitectura',
      deanName: 'María del Carmen Hidalgo González',
      typeAcademicUnit: 'Facultad',
      ubicationAcademicUnit: 'Campus Central',
      description: 'Facultad de Arquitectura',
      urlCreationAcademicUnit: 'https://arquitectura.usac.edu.gt/historia/',
      costCenterCode: '23898923829323893',
      subunits: [
        'Departamento de Diseño Arquitectónico',
        'Departamento de Diseño Gráfico',
        'Departamento de Historia de la Arquitectura y del Arte'
      ]
    }
    const req = { method: 'POST', body: data }
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() }

    // Act
    handler(req, res)

    // Assert
    expect(res.status).toHaveBeenCalledWith(201)
  })
})
