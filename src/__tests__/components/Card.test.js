/* eslint-disable no-undef */
import React from 'react'
import Card from './../../components/Card'
import { fireEvent, render, screen } from '@testing-library/react'

afterAll(() => {
  jest.clearAllMocks()
})

describe('Pruebas al componente Card', () => {
  // Arrange
  const valoresIniciales = {
    id: 'mi-id',
    content: 'Titulo de tarjeta',
    subContent: 'Subtitulo de tarjeta',
    handleAddCard: jest.fn(),
    handleDeleteCard: jest.fn(),
    cardType: '1'
  }
  const testIdAdd = 'add-card-button'

  test('Renderiza el componente', () => {
    // Act
    render(
      <Card
        {...valoresIniciales}
      />
    )
    const addButtonElement = screen.getByTestId(testIdAdd)

    // Assert
    expect(screen.getByTestId(testIdAdd)).toBeInTheDocument()
    expect(addButtonElement).toHaveAttribute('title', 'Agregar ' + valoresIniciales.cardType)
  })

  test('Llamar a handleAddCard cuando se hace click sobre el botón Agregar', () => {
    // Act
    render(
      <Card
        {...valoresIniciales}
        handleDeleteCard={jest.fn()}
      />
    )
    const addButton = screen.getByTestId(testIdAdd)
    fireEvent.click(addButton)

    // Assert
    expect(valoresIniciales.handleAddCard).toHaveBeenCalledTimes(1)
    expect(valoresIniciales.handleDeleteCard).toHaveBeenCalledTimes(0)
  })

  // test('Llamar a handleDeleteCard cuando se hace click sobre el botón Eliminar', () => {
  //   // Act
  //   render(
  //     <Card
  //       {...valoresIniciales}
  //     />
  //   )
  //   const deleteButton = screen.getByTestId(testIdDelete)
  //   fireEvent.click(deleteButton)

  //   // Assert
  //   expect(valoresIniciales.handleDeleteCard).toHaveBeenCalledTimes(1)
  //   expect(valoresIniciales.handleAddCard).toHaveBeenCalledTimes(0)
  // });

  test('renders link with URL', () => {
    // Arrange
    const props = {
      content: 'Example',
      subContent: 'An example website',
      id: '/example'
    }

    // Act
    render(<Card {...props} />)
    // Assert
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', props.id)
  })

  test('Renderiza el link con el enlace correspondiente', () => {
    // Arrange
    const props = {
      content: 'Example',
      subContent: 'An example website',
      id: '/example'
    }
    // Act
    render(<Card {...props} />)
    // Assert
    const linkElement = screen.getByRole('link')
    expect(linkElement).toHaveAttribute('href', props.id)
  })
})
