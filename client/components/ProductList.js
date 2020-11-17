import React from 'react'
import {Link} from 'react-router-dom'

const ProductList = props => {
  const {product, deleteProduct, user, overview, imageSize, handleClick} = props
  return (
    <div className="single-product">
      <Link to={`/products/${product.id}`}>
        <img src={product.imageUrl} width="250" height="250" />
        <h4 className="product-name">{product.name}</h4>
        <p className="price">${product.price}</p>
      </Link>
      {overview &&
        user.admin && (
          <button type="button" onClick={() => deleteProduct(product.id)}>
            Delete
          </button>
        )}
    </div>
  )
}

export default ProductList
