import React from 'react'
import Styles from '@/styles/Select.module.css'

/**
 * Componente de selección de opciones.
 *
 * @param {object} props - Props del componente.
 * @param {string[]} props.options - Array de opciones a mostrar.
 * @param {string} props.value - Valor seleccionado.
 * @param {string} [props.label] - Texto del label del componente.
 * @param {function} props.onChange - Función llamada al cambiar la selección.
 * @param {string} [props.id] - ID del componente.
 * @param {boolean} [props.required] - Indica si el campo es requerido.
 * @param {string} [props.placeholder] - Mensaje a mostrar como opción por defecto.
 * @param {object} [props.children] - Componentes hijos a incluir.
 *
 * @returns {JSX.Element} Componente de selección de opciones.
 */
export default function Select({ options, value, label, onChange, ...props }) {
  const PLACEHOLDER_MESSAGE = 'Seleccione una opción'

  /**
   * Función llamada al cambiar la selección.
   *
   * @param {object} event - Evento de cambio.
   */
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <div className={Styles.selectContainer}>
      <select
        className={Styles.select}
        value={value}
        id={props.id}
        onChange={handleChange}
        {...props}
      >
        <option value="" disabled={props.required}>
          {props.placeholder || PLACEHOLDER_MESSAGE}
        </option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}

        {props.children}
      </select>

      {label && (
        <label className="select" htmlFor={props.id}>
          {label}
        </label>
      )}
    </div>
  )
}
