import React from 'react'
import {fetchProducts, destroyProduct, updateQuantity} from '../store/products'
import {connect} from 'react-redux'
import NewProduct from './NewProduct'
import ProductList from './ProductList'
import {loadCart} from '../store/cart'

const defaultState = {
  createMode: false,
  imageSize: '500',
  overview: true
}

class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = defaultState
    this.handleClick = this.handleClick.bind(this)
    this.toggleCreateMode = this.toggleCreateMode.bind(this)
  }

  /*J: the problem is that getCart runs faster than getUser; added async and await to
  slow down the getCart and in most cases the cart item number would show, but still
  there are cases that getCart runs earlier than getUser;
  there should be better solutions
  */
  async componentDidMount() {
    await this.props.getProducts()
    await this.props.getCart(this.props.user.id)
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
    return !products.length ? (
      <h1>Loading Product</h1>
    ) : (
      <div>
        {user.admin && (
          <button type="button" onClick={() => this.toggleCreateMode()}>
            Add a Product
          </button>
        )}
        {this.state.createMode && (
          <NewProduct toggleCreateMode={this.toggleCreateMode} />
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
  user: state.user,
  userId: state.user.id
})

const mapDispatch = dispatch => ({
  getProducts: () => dispatch(fetchProducts()),
  deleteProduct: productId => dispatch(destroyProduct(productId)),
  getCart: userId => dispatch(loadCart(userId))
})

export default connect(mapState, mapDispatch)(AllProducts)
