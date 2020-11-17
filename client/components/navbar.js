import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {loadCart} from '../store/cart'
import CartIcon from './CartIcon'

const Navbar = ({handleClick, user, cart}) => (
  <div>
    <h1>YoDaddy - The Home Of Everything Baby Yoda</h1>
    <nav>
      {user.id ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          {user.admin && <Link to="/users">Users</Link>}
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          <CartIcon cart={cart} />
          {/* <Link to="/cart" className="icon-container">
            <img id="icon" src="/shopping-cart.jpg" />
            {cart && cart.length && <p id="badge">{cart.length}</p>}
          </Link> */}
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
