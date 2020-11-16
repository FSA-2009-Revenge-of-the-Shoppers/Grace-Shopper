import React from 'react'
import {connect} from 'react-redux'
import {Navbar} from './components'
import Routes from './routes'
import {me} from './store'
import {loadCart} from './store/cart'
import PropTypes from 'prop-types'

class App extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    //grabbing cart from localStorage if one exists -user is not yet logged in
    await this.props.getCart(this.props.user.id)
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
