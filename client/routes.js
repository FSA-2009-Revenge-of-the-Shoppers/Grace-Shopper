import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  SingleProduct,
  AllProducts,
  AllUsers
} from './components'
import {me} from './store'
import {loadCart} from './store/cart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()

    //grabbing cart from localStorage if one exists -user is not yet logged in
    this.props.getCart(this.props.userId)
  }

  render() {
    console.log(this.props)
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/products" exact component={AllProducts} />
        <Route path="/products/:productId" component={SingleProduct} />
        <Route path="/home" component={UserHome} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            {isAdmin && <Route path="/users" component={AllUsers} />}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    // grab user's cart
    cart: state.cart,
    // check if the logged-in user is an admin
    isAdmin: state.user.admin,
    // user id to get the cart
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    getCart(userId) {
      dispatch(loadCart(userId))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
