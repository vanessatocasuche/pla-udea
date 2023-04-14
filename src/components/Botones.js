import Styles from '@/styles/Boton.module.css'

function Boton({ handler, tooltip, ...props }) {
  return (
    <button
      className={Styles.botonPrincipal}
      {...props}
      onClick={handler}
      title={tooltip}
    >
      {props.children}
    </button>
  )
}

function BotonRedondo({ handler, tooltip, fixed, ...props }) {
  const classFixed = fixed ? Styles.fixed : ''
  return (
    <button
      className={`${Styles.botonRedondo} ${classFixed}`}
      {...props}
      onClick={handler}
      title={tooltip}
    >
      {props.children}
    </button>
  )
}

export { Boton, BotonRedondo }
