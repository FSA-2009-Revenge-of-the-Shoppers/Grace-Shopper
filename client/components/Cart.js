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
    const products = this.props.userCart
    console.log('props', this.props)
    return !products.length ? (
      <h1>No Items In Cart!</h1>
    ) : (
      <div className="cart-container">
        <h3 className="cart-title">Shopping Cart</h3>
        {products.map(product => (
          <CartItem
            product={product}
            remove={this.props.removeItem}
            key={product.id}
          />
        ))}
        <h3>Total: $</h3>
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id,
  userCart: state.cart
})

const mapDispatch = dispatch => ({
  getCart: userId => dispatch(loadCart(userId)),
  removeItem: productId => dispatch(removeItem(productId))
})

export default connect(mapState, mapDispatch)(Cart)
