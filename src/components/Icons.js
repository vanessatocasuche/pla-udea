import React from 'react'
import { theme } from '@/theme/theme'
const COLORS = theme.colors.secondary

/**
 *
 * Componente de icono de más(+).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de más(+).
 */
function PlusIcon({ width, height, color, ...props }) {
  return (
    <svg
      data-testid="plus-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 48}
      height={height || 48}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M12 5L12 19" />
      <path d="M5 12L19 12" />
    </svg>
  )
}

/**
 *
 * Componente de icono de papelera (Eliminar).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de papelera (Eliminar).
 */
function TrashIcon({ width, height, color, ...props }) {
  return (
    <svg
      data-testid="trash-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 48}
      height={height || 48}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3 6L5 6 21 6" />
      <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <path d="M10 11L10 17" />
      <path d="M14 11L14 17" />
    </svg>
  )
}

/**
 *
 * Componente de icono de check(✓).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de check(✓).
 */
function CheckIcon({ width, height, color, ...props }) {
  return (
    <svg
      data-testid="check-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 48}
      height={height || 48}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 12l5 5L20 7" />
    </svg>
  )
}

/**
 *
 * Componente de icono de flecha(<-).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de flecha(<-).
 */
function ArrowIcon({ width, height, color, ...props }) {
  return (
    <svg
      data-testid="arrow-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 48}
      height={height || 48}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M5 12L19 12" />
      <path d="M5 12L9 16" />
      <path d="M5 12L9 8" />
    </svg>
  )
}

/**
 * Componente de icono de editar.
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de editar.
 */
function EditIcon({ width, height, color, ...props }) {
  return (
    <svg
      data-testid="edit-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 48}
      height={height || 48}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M4 20h4L18.5 9.5a1.5 1.5 0 00-4-4L4 16v4" />
      <path d="M13.5 6.5L17.5 10.5" />
    </svg>
  )
}

/**
 * Componente de icono de cancelar o cerar (X).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de cancelar o cerar (X).
 */
function XIcon({ width, height, color, ...props }) {
  return (
    <PlusIcon
      data-testid="x-icon"
      style={{ transform: 'rotate(45deg)' }}
      color={color}
      width={width}
      height={height}
      {...props}
    />
  )
}

/**
 * Componente de icono de cerrar sesión
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de cerrar sesión.
 */
function LogoutIcon({ width, height, color, ...props }) {
  return (
    <svg
      data-testid="logout-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 48}
      height={height || 48}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <path d="M14 8V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2h7a2 2 0 002-2v-2" />
      <path d="M7 12h14l-3-3m0 6l3-3" />
    </svg>
  )
}

function SearchIcon({ color, width, height, ...props }) {
  return (
    <svg
      data-testid="search-icon"
      xmlns="http://www.w3.org/2000/svg"
      className="icon icon-tabler icon-tabler-search"
      width={width || 48}
      height={height || 48}
      viewBox="0 0 24 24"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M0 0h24v24H0z" stroke="none" />
      <circle cx={10} cy={10} r={7} />
      <path d="M21 21L15 15" />
    </svg>
  )
}

/**
 * Componente de icono de la Universidad de Antioquia simplificado (UdeA).
 *
 * @param {Object} props - Propiedades del componente.
 * @param {number} [props.width=48] - Ancho del icono.
 * @param {number} [props.height=48] - Altura del icono.
 * @param {string} [props.color] - Color del icono.
 *
 * @returns {JSX.Element} Componente de icono de la Universidad de Antioquia simplificado (UdeA).
 */
function UdeaIcon({ width, height, color, ...props }) {
  return (
    <svg
      data-testid="udea-icon"
      xmlns="http://www.w3.org/2000/svg"
      width={width || 212}
      height={height || 64}
      viewBox="0 0 212 64"
      strokeWidth={props.strokeWidth || 2}
      stroke={COLORS[color] || 'currentColor'}
      fill={COLORS[color] || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path
        d="M-99.79-19.5l-6.21-1.23v-7.08h24.22v7.08l-6.06 1.2a3.76 3.76 0 00-.1.66v31.33c0 5.72 3.91 9.65 9.62 10.17a17.78 17.78 0 006.46-.47A9.52 9.52 0 00-64.55 13c.12-3.76.14-7.52.16-11.29v-21.16l-6.29-1.25v-7.07h24.4v6.71c0 .22-.71.51-1.13.6-1.65.36-3.32.64-5.13 1V10.6a24.17 24.17 0 01-1.27 8.47 16.88 16.88 0 01-8.86 9.74C-71.79 33.05-81 33.14-90 28.65c-5.7-2.84-8.85-7.73-9.57-14.09a32.7 32.7 0 01-.21-3.42v-29.22z"
        transform="translate(106 32)"
      />
      <path
        d="M-14.72-8.34v-1.34-12.73c0-1.14-.43-1.44-1.39-1.6-1.64-.25-3.26-.59-4.94-.91V-32H-3c0 .45.07.94.07 1.44v51.7c0 1.18.3 1.72 1.49 1.87a29.11 29.11 0 013.44.72c.29.08.72.46.73.71.06 2.13 0 4.26 0 6.47-.46 0-.82.07-1.18.07C-3 31-7.5 31-12 31c-.84 0-1.25-.16-1.33-1.12-.1-1.31-.43-2.6-.68-4-.69.78-1.3 1.49-2 2.17-3.22 3.31-7.24 4.22-11.67 3.68-7.39-.92-11.57-5.6-13.45-12.34a34.69 34.69 0 011-22.55c1.66-4.2 4.36-7.65 8.77-9.29 5.91-2.19 12-1.36 16.21 3.88.15.07.29.15.43.23zm0 17.68V1.05A2.7 2.7 0 00-15-.32a8.12 8.12 0 00-8-4A6.56 6.56 0 00-28.94.33a26.71 26.71 0 00-.57 17 6.77 6.77 0 003.8 4.67 8.88 8.88 0 0010.36-2.64 3.41 3.41 0 00.61-1.8c.06-2.76.02-5.49.02-8.22z"
        transform="translate(106 32)"
      />
      <path
        d="M45.27 12.64H19a9.58 9.58 0 009.4 10.12 22.64 22.64 0 0012.46-3.33l3.23 7.34a22.78 22.78 0 01-7.52 3.75 28.33 28.33 0 01-14.64.71A18.22 18.22 0 018 18.6 28.58 28.58 0 019.06-2.74c3.37-7.38 10-11.14 18.08-10.81a19.11 19.11 0 0110.35 3A16.48 16.48 0 0144.6 1.22c.51 3.7.46 7.47.67 11.42zm-11.74-7.9c-.11-1.24-.13-2.41-.33-3.56a6.36 6.36 0 00-5.05-5.48c-3.42-.6-5.92.42-7.5 3.29a21.61 21.61 0 00-1.46 3.89 10.24 10.24 0 00-.28 1.86z"
        transform="translate(106 32)"
      />
      <path
        d="M71.88-27.89h11.44c.31 0 .77.47.89.81q4.31 12.22 8.55 24.46c2.88 8.26 5.77 16.51 8.6 24.78a1.65 1.65 0 001.52 1.27c1 .13 2.32 0 2.83.58s.2 1.89.22 2.88v3.95H85.84v-6.51c0-.23.51-.56.83-.63 1-.24 2-.38 3.18-.58-.17-.59-.3-1.1-.46-1.61-.59-1.86-1.21-3.7-1.76-5.57-.18-.58-.43-.84-1.07-.83H69.05c-.3 0-.8.18-.87.39-.85 2.49-1.64 5-2.47 7.59 1.18.2 2.24.34 3.27.59.31.07.75.45.75.69.06 2.13 0 4.26 0 6.47-.48 0-.84.07-1.19.07H50.81c-.89 0-1.24-.19-1.21-1.15.07-2 0-3.9 0-5.94a23.22 23.22 0 012.68-.4 2 2 0 002.08-1.64q8.43-24.27 17-48.5c.17-.28.35-.72.52-1.17zM78-14.21h-.26L71.12 6.36h13.43C82.34-.56 80.15-7.38 78-14.21z"
        transform="translate(106 32)"
      />
    </svg>
  )
}

export {
  PlusIcon,
  TrashIcon,
  CheckIcon,
  ArrowIcon,
  EditIcon,
  XIcon,
  SearchIcon,
  LogoutIcon,
  UdeaIcon
}
