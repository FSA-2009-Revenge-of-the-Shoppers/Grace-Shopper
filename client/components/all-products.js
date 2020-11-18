import React from 'react'
import {fetchProducts, destroyProduct, updateQuantity} from '../store/products'
import {connect} from 'react-redux'
import NewProduct from './NewProduct'
import ProductList from './ProductList'
import {loadCart} from '../store/cart'

const defaultState = {
  createMode: false,
  imageSize: '300',
  overview: true
}

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleClick = this.handleClick.bind(this)
    this.toggleCreateMode = this.toggleCreateMode.bind(this)
  }

  async componentDidMount() {
    await this.props.getProducts()
    await this.props.getCart(this.props.userId)
  }

  toggleCreateMode() {
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
    console.log(imageSize)
    return !products.length ? (
      <h1>Loading Products</h1>
    ) : (
      <div>
        <div className="add-product-container">
          {user.admin && (
            <button
              type="button"
              id="add-a-product"
              onClick={() => this.toggleCreateMode()}
            >
              Add a Product
            </button>
          )}
          {this.state.createMode && (
            <NewProduct toggleCreateMode={this.toggleCreateMode} />
          )}
        </div>
        <div className="products-container">
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
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  user: state.user,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: productId => dispatch(destroyProduct(productId)),
  getCart: userId => dispatch(loadCart(userId))
})

export default connect(mapState, mapDispatch)(AllProducts)
