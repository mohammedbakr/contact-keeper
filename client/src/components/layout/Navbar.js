import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../context/auth/authContext'
import ContactContext from '../../context/contact/contactContext'
import PropTypes from 'prop-types'

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext)
  const contactContext = useContext(ContactContext)

  const { isAuthenticated, logout, user } = authContext
  const { clearContacts } = contactContext

  const onLogoutHandler = () => {
    logout()
    clearContacts()
  }

  const authLinks = (
    <React.Fragment>
      <li>Hello { user && user.name }</li>
      <li>
        <a href="#!" onClick={onLogoutHandler}>
          <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
        </a>
      </li>
    </React.Fragment>
  )

  const guestLinks = (
    <React.Fragment>
      <li>
        <NavLink to="/register">Register</NavLink>
      </li>
      <li>
        <NavLink to="/login">Login</NavLink>
      </li>
    </React.Fragment>
  )

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>
        {isAuthenticated ? authLinks : guestLinks}
      </ul>
    </div>
  )
}

Navbar.prototype = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
}

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'fas fa-id-card-alt'
}

export default Navbar
