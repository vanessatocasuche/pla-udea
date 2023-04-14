import Styles from '@/styles/Botones.module.css'

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

function BotonRedondo({ handler, tooltip, fixed, color = 'yellow', ...props }) {
  const classFixed = fixed ? Styles.fixed : ''
  const bgColor =
    color !== 'green'
      ? `var(--secondary-color-${color})`
      : 'var(--primary-color-3'

  return (
    <button
      className={`${Styles.botonRedondo} ${classFixed}`}
      {...props}
      onClick={handler}
      title={tooltip}
      style={{ background: bgColor }}
    >
      {props.children}
    </button>
  )
}

export { Boton, BotonRedondo }
