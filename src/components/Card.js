import React from 'react'
import Styles from '@/styles/Card.module.css'
import Link from 'next/link'
import { PlusIcon, TrashIcon } from './Icons'

/**
 * Componente que representa una tarjeta.
 *
 * @param {Object} props - Las props del componente.
 * @param {string} props.id - El ID de la tarjeta.
 * @param {string} props.content - El contenido principal de la tarjeta.
 * @param {string} props.subContent - El contenido secundario de la tarjeta.
 * @param {function} props.handleAddCard - La función que se ejecuta cuando se agrega una tarjeta.
 * @param {function} props.handleDeleteCard - La función que se ejecuta cuando se elimina una tarjeta.
 * @param {string} props.cardType - El tipo de tarjeta (opcional).
 * @param {Object} props.children - Los elementos hijos de la tarjeta (opcional).
 * @returns {JSX.Element} - El componente de tarjeta.
 */
export default function Card({
  id,
  content,
  subContent,
  handleAddCard,
  handleDeleteCard,
  ...props
}) {
  return (
    <div className={Styles.card}>
      {handleAddCard ? (
        <button
          data-testid="add-card-button"
          className={Styles.addButton}
          title={`Agregar ${props.cardType || ''}`}
          onClick={handleAddCard}
          name={props.name}
        >
          <PlusIcon color="white" height="4rem" width="4rem" />
        </button>
      ) : (
        <>
          <Link {...props} id={id} href={id ?? `/${id}`}>
            {content && <h3>{content}</h3>}
            {subContent && <h4>{subContent}</h4>}
            {props.children}
          </Link>
          {handleDeleteCard && (
            <button
              data-testid="delete-card-button"
              className={Styles.deleteButton}
              title={`Eliminar ${props.cardType || ''}`}
              onClick={handleDeleteCard}
            >
              <TrashIcon style={{ width: '100%', height: '100%' }} />
            </button>
          )}
        </>
      )}
    </div>
  )
}
