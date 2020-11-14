import React from 'react'
// import {fetchProducts, destroyProduct} from '../store/products'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import CartItem from './CartItem'
import {loadCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.getCart(this.props.userId)
  }

  render() {
    const productsInCart = this.props.userCart
    // console.log('products in cart', productsInCart)

    return !productsInCart.length ? (
      <h1>No Items In Cart!</h1>
    ) : (
      <div className="cart-container">
        <h3 className="cart-title">Shopping Cart</h3>
        {productsInCart.map(product => (
          <CartItem
            product={product}
            remove={this.props.removeItem}
            key={product.id}
          />
        ))}
        <h2>
          Total: ${productsInCart.reduce(
            (accumulator, product) =>
              accumulator +
              Number(product.productOrder.savedPrice) *
                product.productOrder.quantity,
            0
          )}
        </h2>
      </div>
    )
  }
}

const mapState = state => ({
  userCart: state.cart,
  // products: state.products,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  // removeItem: productId => dispatch(removeItem(productId)),
  getCart: userId => dispatch(loadCart(userId))
})

export default connect(mapState, mapDispatch)(Cart)
