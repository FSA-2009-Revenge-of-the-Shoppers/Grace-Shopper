import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {loadCart} from '../store/cart'
import CartIcon from './CartIcon'

const Navbar = ({handleClick, user, cart}) => (
  <div id="nav-container">
    {/* <h1>YoDaddy - The Home Of Everything Baby Yoda</h1> */}
    <nav>
      {user.id ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-link">
            Shop
          </Link>
          {user.admin && (
            <Link to="/users" className="nav-link">
              Users
            </Link>
          )}
          <a href="#" className="nav-link" onClick={handleClick}>
            Logout
          </a>
          <CartIcon cart={cart} className="nav-link" />
          {/* <Link to="/cart" className="icon-container">
            <img id="icon" src="/shopping-cart.png" />
            {cart && cart.length && <p id="badge">{cart.length}</p>}
          </Link> */}
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/home" className="nav-link">
            Shop
          </Link>
          <Link to="/login" className="nav-link">
            Login
          </Link>
          <Link to="/signup" className="nav-link">
            Sign Up
          </Link>
          <Link to="/cart">
            <div className="icon-container">
              <img id="icon" src="shopping-cart.png" />
              {cart && cart.length >= 1 && <p id="badge">{cart.length}</p>}
            </div>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

const mapDispatch = dispatch => {
  return {
    async handleClick() {
      await dispatch(logout())
      await dispatch(loadCart())
    }
  }
}

export default connect(null, mapDispatch)(Navbar)

Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired
}
