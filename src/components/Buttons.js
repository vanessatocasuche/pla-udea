import Styles from '@/styles/Buttons.module.css'
import React from 'react'

/**
* Componentes de boton.
*
* @param {Function} handler - Función que maneja el evento click del botón.
* @param {string} tooltip - Texto que se muestra como tooltip cuando el cursor es colocado encima del boton
* @param {boolean} secundary - Indica si el botón es secundario. Si es verdadero, el boton tendra un estilo diferente
* @param {*} props - Props adicionales a ser aplicadas al botón.
* @param {boolean} fixed - Indica si el botón es fijo. Si es verdadero, el botón tendra una posicion fija
* @param {string} color - Color del botón. Puede ser 'yellow', 'blue', 'red', 'purple', o 'green'.
*
* @returns {JSX.Element} - Elemento JSX que representa un botón generico o redondo
*/

function Button({ handler, tooltip, secondary, ...props }) {
  const btnSecondary = !secondary ? Styles.mainButton : Styles.secondaryButton
  return (
    <button
      className={btnSecondary}
      {...props}
      onClick={handler}
      title={tooltip}
    >
      {props.children}
    </button>
  )
}

function RoundButton({ handler, tooltip, fixed, color = 'yellow', ...props }) {
  const classFixed = fixed ? Styles.fixed : ''
  const bgColor =
    color !== 'green'
      ? `var(--secondary-color-${color})`
      : 'var(--primary-color-3'

  return (
    <button
      className={`${Styles.roundButton} ${classFixed}`}
      {...props}
      onClick={handler}
      title={tooltip}
      style={{ background: bgColor }}
    >
      {props.children}
    </button>
  )
}

export { Button, RoundButton }
