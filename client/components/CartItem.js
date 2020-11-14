import React from 'react'
import {Link} from 'react-router-dom'
// import Order from '../../server/db/models/order'
// import {connect} from 'react-redux'
// import {fetchSingleProduct} from '../store/singleProduct'

export default class CartItem extends React.Component {
  constructor(props) {
    //should get remove function and the actual individual item from the Cart component
    super(props)
    this.state = {}
  }

  // componentDidMount() {
  //   const productId = this.props.match.params.productId
  //   this.props.getProduct(productId)
  // }

  render() {
    const product = this.props.product
    if (!product) return <h1>Loading Product</h1>
    return (
      <div className="single-product">
        <Link to={`/products/${product.id}`}>
          <h1>{product.name}</h1>
        </Link>
        <img
          className="cart-item-image"
          src={product.imageUrl}
          alt="image of this product"
          width="500"
          height="500"
        />
        <h3>Price: ${product.productOrder.savedPrice}</h3>
        <p>Quantity: {product.productOrder.quantity}</p>
        <button
          type="button"
          className="rmv-btn"
          //onClick={() => this.props.remove(product)}
        >
          Remove from cart
        </button>
      </div>
    )
  }
}
