/* eslint-disable no-trailing-spaces */
/* eslint-disable no-tabs */
/* eslint-disable no-undef */
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Button, RoundButton } from './../../components/Buttons'

afterAll(() => {
  jest.clearAllMocks()
})

describe('Pruebas a componente Button', () => {
  // Arrange
  const constHandler = jest.fn()
  const constTooltip = 'Test tooltip'
  const constText = 'My button'

  test('Debe renderizar el componente correctamente con las propiedades esperadas', () => {
    // Act
    render(<Button handler={constHandler} tooltip={constTooltip} >{constText}</Button>)
    const button = screen.getByText(constText)
    // Assert
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(constText)
    expect(button).toHaveClass('mainButton')
    expect(button).toHaveAttribute('title', constTooltip)
  })

  test('Debe llamar la función handler cuando se haga click en el botón', () => {
    // Act
    render(<Button handler={constHandler} >{constText}</Button>)
    const button = screen.getByText(constText)
    fireEvent.click(button)
    // Assert
    expect(constHandler).toHaveBeenCalledTimes(1)
  })

  test('Debe renderizar el componente con el estilo secundario', () => {
    // Act
    render(<Button handler={constHandler} secondary >{constText}</Button>)
    const button = screen.getByText(constText)
    // Assert
    expect(button).toHaveClass('secondaryButton')
  })
})

describe('Pruebas a componente RoundButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  const constHandler = jest.fn()
  const constTooltip = 'Test tooltip'
  const constText = 'My button'

  test('Debe renderizar el componente correctamente con las propiedades esperadas', () => {
    // Act
    render(<RoundButton handler={constHandler} tooltip={constTooltip} >{constText}</RoundButton>)
    const button = screen.getByText(constText)
    // Assert
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(constText)
    expect(button).toHaveClass('roundButton')
    expect(button).toHaveAttribute('title', constTooltip)
  })

  test('Debe llamar la función handler cuando se haga click en el botón', () => {
    // Act
    render(<RoundButton handler={constHandler} >{constText}</RoundButton>)
    const button = screen.getByText(constText)
    fireEvent.click(button)
    // Assert
    expect(constHandler).toHaveBeenCalledTimes(1)
  })

  test('Debe renderizar el componente cuando se le pase la propiedad fixed sea true', () => {
    // Act
    render(<RoundButton handler={constHandler} fixed >{constText}</RoundButton>)
    const button = screen.getByText(constText)
    // Assert
    expect(button).toHaveClass('fixed')
  })

  test('Debe renderizar el componente con el color base por defecto que es Yellow', () => {
    // Act
    render(<RoundButton handler={constHandler} >{constText}</RoundButton>)
    const button = screen.getByText(constText)
    // Assert
    expect(button).toHaveStyle('background: var(--secondary-color-yellow)') // Refactorizar este codigo
  })
})
