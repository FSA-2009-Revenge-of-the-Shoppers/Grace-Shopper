import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import {loadCart} from '../store/cart'
import {me} from '../store'

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.getCart(this.props.user.id)
  }

  render() {
    const {cart} = this.props

    return !cart.length ? (
      <h1>No Items In Cart!</h1>
    ) : (
      <div className="cart-container">
        <h3 className="cart-title">Shopping Cart</h3>
        <h3>
          Total: ${cart.reduce(
            (accumulator, product) =>
              accumulator +
              Number(product.productOrder.savedPrice) *
                product.productOrder.quantity,
            0
          )}
        </h3>
        {cart.map(product => (
          <CartItem
            product={product}
            remove={this.props.removeItem}
            key={product.id}
            userId={this.props.userId}
          />
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  getCart: userId => dispatch(loadCart(userId)),
  loadInitialData: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
