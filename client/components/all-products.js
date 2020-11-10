import React from 'react'
import fetchProducts from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const {products} = this.props
    return !products.length ? (
      <h1>Loading Products</h1>
    ) : (
      <div>
        {products.map(product => {
          return (
            <div key={`product${product.id}`}>
              <img src={product.imageUrl} />
              <Link to={`/products/${products.id}`}>
                <h2>{product.name}</h2>
              </Link>
              <p>{product.price}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
