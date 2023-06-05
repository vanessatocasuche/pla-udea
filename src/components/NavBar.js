import React from 'react'
import { UdeaIcon, LogoutIcon } from './Icons'
import Styles from '@/styles/NavBar.module.css'

/**
 * Componente funcional de React para una barra de navegación.
 *
 * @param {Object} props - Las propiedades del componente.
 * @param {boolean} props.logged - Indica si el usuario ha iniciado sesión o no.
 * @param {string} props.title - El título que se mostrará en la barra de navegación.
 * @param {function} props.handlerLogout - La función que se llamará cuando se haga clic en el botón de cerrar sesión.
 * @returns {JSX.Element} Un elemento JSX que representa la barra de navegación.
 */
const NavBar = ({ logged, title, handlerLogout }) => {
  return (
    <header>
      <nav className={Styles.navBar}>
        <UdeaIcon color="white" style={{ height: '100%', width: 'auto' }} />
        {title && <h3>{title}</h3>}
        <button
          data-testid="logout-button"
          className={Styles.logoutBtn}
          onClick={handlerLogout}
          style={{ visibility: logged ? 'visible' : 'hidden' }}
        >
          <LogoutIcon color="white" height="2.5rem" />
        </button>
      </nav>
    </header>
  )
}

export default NavBar
