import React from 'react'
// import {fetchProducts, destroyProduct} from '../store/products'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import CartItem from './CartItem'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    // this.props.getProducts()
  }

  render() {
    const products = this.props.userCart
    console.log(this.props)
    return !products ? (
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
      </div>
    )
  }
}

const mapState = state => ({
  // products: state.products,
  userCart: state.user.carts
})

const mapDispatch = dispatch => ({
  // getProducts: () => dispatch(fetchProducts()),
  removeItem: productId => dispatch(removeItem(productId))
})

export default connect(mapState, mapDispatch)(Cart)
