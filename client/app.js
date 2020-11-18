import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {me} from './store'
import {loadCart} from './store/cart'
import PropTypes from 'prop-types'

class App extends React.Component {
  async componentDidMount() {
    // grabs the user
    await this.props.loadInitialData()
    // grabs the user's cart, falls back on local storage if the user is not logged in
    await this.props.getCart(this.props.user.id)
  }

  render() {
    return (
      <div id="app-container">
        {/* {both primary components use these props} */}
        <Navbar {...this.props} />
        <Routes {...this.props} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart
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
  loadInitialData: PropTypes.func.isRequired
}
