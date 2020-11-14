import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {me} from './store'
import {loadCart} from './store/cart'
import PropTypes from 'prop-types'

class App extends React.Component {
  componentDidMount() {
    this.props.loadInitialData()
    //grabbing cart from localStorage if one exists -user is not yet logged in
    this.props.getCart(this.props.userId)
  }

  render() {
    return (
      <div>
        <Navbar {...this.props} />
        <Routes {...this.props} />
      </div>
    )
  }
}

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

export default connect(mapState, mapDispatch)(App)

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
