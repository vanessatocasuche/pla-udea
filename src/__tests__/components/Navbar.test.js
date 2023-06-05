/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-tabs */
import React from 'react'
import NavBar from './../../components/NavBar'
import { fireEvent, render, screen } from '@testing-library/react'

afterAll(() => {
  jest.clearAllMocks()
})

describe('Pruebas al componente Navbar', () => {
  // Arrange
  const valoresIniciales = {
    logged: true,
    title: 'Titulo de tarjeta',
    handleLogout: jest.fn()
  }
  const valores = {
    logged: false,
    title: 'Titulo de tarjeta',
    handleLogout: jest.fn()
  }

  test('Renderiza el componente', () => {
    // Act
    render(
			<NavBar
				{...valoresIniciales}
			/>
    )
    const addButtonElement = screen.getByTestId('logout-button')
    // screen.debug()
    // Assert
    expect(screen.getByTestId('logout-button')).toBeInTheDocument()
    // expect(addButtonElement).toHaveAttribute('title', 'Titulo de tarjeta')
  })

  test('Renderiza el componente co logged false', () => {
    // Act
    render(
			<NavBar
				{...valores}
			/>
    )
    const addButtonElement = screen.getByTestId('logout-button')

    // Assert
    expect(screen.getByTestId('logout-button')).toBeInTheDocument()
    // expect(addButtonElement).toHaveAttribute('title', 'Titulo de tarjeta')
  })

  test('Llamar a handleLogout cuando se hace click sobre el botón Cerrar sesión', () => {
    // Act
    render(
			<NavBar
				{...valoresIniciales}
			/>
    )
    const addButton = screen.getByTestId('logout-button')
    fireEvent.click(addButton)

    // Assert
    // expect(valoresIniciales.handleLogout).toHaveBeenCalledTimes(1)
  })
})
