/* eslint-disable no-undef */
/* eslint-disable no-tabs */
import React from 'react'
import Select from './../../components/Select'
import { fireEvent, render, screen } from '@testing-library/react'

afterAll(() => {
  jest.clearAllMocks()
})

const options = ['Option 1', 'Option 2', 'Option 3']

describe('Select component', () => {
  test('should render with placeholder and options', () => {
    const onChangeMock = jest.fn()
    render(
      <Select
        options={options}
        value=""
        onChange={onChangeMock}
        id="test-select"
        placeholder="Please select an option"
      />
    )

    const placeholderOption = screen.getByText('Please select an option')
    expect(placeholderOption).toBeInTheDocument()

    const option1 = screen.getByText('Option 1')
    expect(option1).toBeInTheDocument()

    const option2 = screen.getByText('Option 2')
    expect(option2).toBeInTheDocument()

    const option3 = screen.getByText('Option 3')
    expect(option3).toBeInTheDocument()
  })

  test('should call onChange callback when an option is selected', () => {
    const onChangeMock = jest.fn()
    render(<Select options={options} value="" onChange={onChangeMock} id="test-select" />)

    const select = screen.getByRole('combobox')
    fireEvent.change(select, { target: { value: 'Option 2' } })

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith('Option 2')
  })

  test('should render label when provided', () => {
    const onChangeMock = jest.fn()
    render(
      <Select
        options={options}
        value=""
        onChange={onChangeMock}
        id="test-select"
        label="Test label"
      />
    )

    const label = screen.getByText('Test label')
    expect(label).toBeInTheDocument()
  })
})
