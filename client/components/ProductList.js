import React from 'react'
import {Link} from 'react-router-dom'

const ProductList = props => {
  const {product, deleteProduct, user, overview, imageSize, handleClick} = props
  return (
    <div>
      <img src={product.imageUrl} width={imageSize} height={imageSize} />
      <Link to={`/products/${product.id}`}>
        <h2>{product.name}</h2>
      </Link>
      {/* {overview && user.admin && (
        <div>
          <p>{product.quantity}</p>
          <button
            type="button"
            name="minus"
            onClick={(event) =>
              handleClick(event, product.id, product.quantity)
            }
          >
            -
          </button>
          <button
            type="button"
            name="plus"
            onClick={(event) =>
              handleClick(event, product.id, product.quantity)
            }
          >
            +
          </button>
        </div>
      )} */}
      <p>{product.price}</p>
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
