import React from 'react'
// import {fetchProducts, destroyProduct} from '../store/products'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import CartItem from './CartItem'
import {loadCart} from '../store/cart'
import {me} from '../store'

class Cart extends React.Component {
  async componentDidMount() {
    await this.props.loadInitialData()
    await this.props.getCart(this.props.user.id)
  }

  render() {
    const {cart: productsInCart} = this.props

    return !productsInCart.length ? (
      <h1>No Items In Cart!</h1>
    ) : (
      <div className="cart-container">
        <h3 className="cart-title">Shopping Cart</h3>
        <h3>
          Total: ${productsInCart.reduce(
            (accumulator, product) =>
              accumulator +
              Number(product.productOrder.savedPrice) *
                product.productOrder.quantity,
            0
          )}
        </h3>
        {productsInCart.map(product => (
          <CartItem
            product={product}
            remove={this.props.removeItem}
            key={product.id}
          />
        ))}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  // products: state.products,
  user: state.user
})

const mapDispatch = dispatch => ({
  // removeItem: productId => dispatch(removeItem(productId)),
  getCart: userId => dispatch(loadCart(userId)),
  loadInitialData: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
