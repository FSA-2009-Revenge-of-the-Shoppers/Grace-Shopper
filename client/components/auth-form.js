import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

const AuthForm = props => {
  const {name, displayName, handleSubmit, error, cart} = props

  return (
    <div id="auth-container">
      <form
        id="auth-form"
        onSubmit={event => handleSubmit(event, cart)}
        name={name}
      >
        <div>
          <div className="form-component">
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input className="same-width" name="email" type="text" />
          </div>
          <div className="form-component">
            <label htmlFor="password">
              <small>Password</small>
            </label>
            <input className="same-width" name="password" type="password" />
          </div>
          <hr className="solid" />
          <div className="form-component">
            <button type="submit" className="auth-button same-width">
              {displayName}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
          <div className="form-component">
            <button type="button" className="auth-button same-width">
              <a href="/auth/google" id="google-link">
                {displayName} with Google
              </a>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    cart: state.cart,
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    cart: state.cart,
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt, cart) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      // The cart is needed in the authentication thunk because if a user has been shopping as a guest before login/signup, we will join the cart from redux state/local storage into the persistent user's new or existing database. See ../store/cart for more.
      dispatch(auth(email, password, formName, cart))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
