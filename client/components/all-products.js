import React from 'react'
import {fetchProducts, destroyProduct} from '../store/products'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// edit this line according to David's code
import NewProduct from './NewProduct'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      createMode: false
    }
    this.tuggleCreateMode = this.tuggleCreateMode.bind(this)
  }

  componentDidMount() {
    this.props.getProducts()
  }

  tuggleCreateMode() {
    const currentMode = this.state.createMode
    this.setState({
      createMode: !currentMode
    })
  }

  render() {
    const {products, user, deleteProduct} = this.props
    return !products.length ? (
      <h1>Loading Products</h1>
    ) : (
      <div>
        {user.admin && (
          <button type="button" onClick={() => this.tuggleCreateMode()}>
            Create
          </button>
        )}
        {this.state.createMode && (
          <NewProduct tuggleCreateMode={this.tuggleCreateMode} />
        )}
        {products.map(product => {
          return (
            <div key={`product${product.id}`}>
              <img src={product.imageUrl} width="500" height="500" />
              <Link to={`/products/${product.id}`}>
                <h2>{product.name}</h2>
              </Link>
              <p>{product.price}</p>
              {user.admin && (
                <button type="button" onClick={() => deleteProduct(product.id)}>
                  Delete
                </button>
              )}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  user: state.user
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: productId => dispatch(destroyProduct(productId))
})

export default connect(mapState, mapDispatch)(AllProducts)
