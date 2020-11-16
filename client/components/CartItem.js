import React from 'react'
import {Link} from 'react-router-dom'

const CartItem = props => {
  const {product, remove} = props
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

export default CartItem
