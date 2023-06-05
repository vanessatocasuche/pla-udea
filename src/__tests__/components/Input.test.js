/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import React from 'react'
import Input from './../../components/Input'
import { fireEvent, render, screen } from '@testing-library/react'

afterAll(() => {
  jest.clearAllMocks()
})

describe('Pruebas al componente Input', () => {
  // Arrange
  const valoresIniciales = {
    id: 'input-id',
    value: 'Titulo de tarjeta',
    pattern: '^[a-zA-Z0-9 ]*$',
    initialValue: 'Titulo de tarjeta',
    label: 'Titulo de tarjeta',
    type: 'text',
    onChange: true
  }

  test('Renderiza el componente', () => {
    // Act
    render(
			<Input
				{...valoresIniciales}
			/>
    )
    const inputElement = screen.getByTestId(valoresIniciales.id)

    // Assert
    expect(inputElement).toBeInTheDocument()
    expect(inputElement).toHaveAttribute('type', valoresIniciales.type)
    expect(inputElement).toHaveAttribute('value', valoresIniciales.value)
  })

  test('Llamar a handleChange con onChange=true cuando se hace click sobre el botón Agregar', () => {
    // Arrange
    const handleChange = jest.fn()
    // Act
    render(
			<Input
				{...valoresIniciales}
				onChange={handleChange}
			/>
    )
    const inputElement = screen.getByTestId(valoresIniciales.id)
    fireEvent.change(inputElement, { target: { value: 'Nuevo valor' } })

    // Assert
    expect(handleChange).toHaveBeenCalledTimes(1)
  })
})
