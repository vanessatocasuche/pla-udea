import Styles from '@/styles/Input.module.css'

/**
 * Componente de selección de opciones.
 *
 * @param {object} props - Props del componente.
 * @param {string} props.value - Valor seleccionado.
 * @param {string} [props.label] - Texto del label del componente.
 * @param {function} props.onChange - Función llamada al cambiar la selección.
 * @param {string} [props.id] - ID del componente.
 * @param {boolean} [props.required] - Indica si el campo es requerido.
 * @param {string} [props.placeholder] - Mensaje a mostrar como opción por defecto.
 * @param {string} [props.pattern] - Expresión regular para validar los datos ingresados por el usuario
 *
 * @returns {JSX.Element} Componente de selección de opciones.
 */
export default function Input({ value, label, onChange, pattern, ...props }) {
  /**
   * Función llamada al cambiar la selección.
   *
   * @param {object} event - Evento de cambio.
   */
  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <div className={Styles.selectContainer} style={props.style ?? {}}>
      <input
        type={props?.type ?? 'text'}
        className={Styles.input}
        value={value}
        id={props.id}
        onChange={handleChange}
        placeholder={props.placeholder}
        pattern={pattern}
        required={props.required}
        {...props}
      />

      {label && (
        <label className="select" htmlFor={props.id}>
          {label}
        </label>
      )}
    </div>
  )
}
