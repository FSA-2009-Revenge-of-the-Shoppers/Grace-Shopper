import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin, cart}) => (
  <div>
    <h1>Grace Shopper</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          {isAdmin && <Link to="/users">Users</Link>}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <Link to="/cart" className="icon-container">
            <img id="icon" src="shopping-cart.jpg" />
            {cart && cart.length && <p id="badge">{cart.length}</p>}
          </Link>
        </div>
      ) : (
        <div>
          {/* The navbar will show these links before you log in */}
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/home">Shop</Link>
          <Link to="/cart">
            <div className="icon-container">
              <img id="icon" src="shopping-cart.jpg" />
              {cart && cart.length && <p id="badge">{cart.length}</p>}
            </div>
          </Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin,
    // one cart prop for db or localStorage cart array
    cart: state.cart // this will be an array
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
