import React from 'react'
import {Link} from 'react-router-dom'

const ProductList = props => {
  const {product, deleteProduct, user, overview, imageSize} = props
  return (
    <div>
      <img src={product.imageUrl} width={imageSize} height={imageSize} />
      <Link to={`/products/${product.id}`}>
        <h2>{product.name}</h2>
      </Link>
      <p>{product.price}</p>
      {/* {* D: Should we add the delete Product functionality in the Update Product component, instead of the all products view? - seems dangerous since it is just a single misclick away} */}
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
