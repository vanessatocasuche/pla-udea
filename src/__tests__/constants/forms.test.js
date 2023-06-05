/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { PATTERNS, TITLES } from './../../constants/forms'

describe('Pruebas a las constantes forms', () => {
  test('PATTERNS debe estar definido', () => {
    expect(PATTERNS).toBeDefined()
  })

  test('TITLES debe estar definido', () => {
    expect(TITLES).toBeDefined()
  })
})
