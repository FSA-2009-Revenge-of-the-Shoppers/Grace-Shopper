import React from 'react'
import {fetchProducts, destroyProduct, updateQuantity} from '../store/products'
import {connect} from 'react-redux'
import NewProduct from './NewProduct'
import ProductList from './ProductList'

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      createMode: false,
      imageSize: '500',
      overview: true
    }
    this.tuggleCreateMode = this.tuggleCreateMode.bind(this)
    this.handleClick = this.handleClick.bind(this)
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

  handleClick(event, productId, quantity) {
    const increase = event.target.name === 'plus'
    console.log(increase)
    increase ? quantity++ : quantity--
    updateQuantity(productId, quantity)
  }

  render() {
    const {products, user, deleteProduct} = this.props
    const {overview, imageSize} = this.state
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
            <ProductList
              key={`product${product.id}`}
              product={product}
              user={user}
              overview={overview}
              imageSize={imageSize}
              deleteProduct={deleteProduct}
              handleClick={this.handleClick}
            />
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
