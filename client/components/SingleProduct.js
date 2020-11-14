import React from 'react'
import {connect} from 'react-redux'
import {UpdateProduct} from '.'
import {fetchSingleProduct} from '../store/singleProduct'
import {postOrder} from '../store/cart'

const defaultState = {
  editMode: false,
  quantity: 1
}

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.toggleEditMode = this.toggleEditMode.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }

  toggleEditMode() {
    const currentMode = this.state.editMode
    this.setState({
      editMode: !currentMode
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const {product, user} = this.props
    const {quantity} = this.state
    const userId = user.id
    const savedPrice = product.price
    this.props.orderProduct({product, userId, quantity, savedPrice})
  }

  render() {
    const {product, user} = this.props
    if (!product) return <h1>Loading Product</h1>
    return !product.name ? (
      <h1>Loading Product</h1>
    ) : (
      <div className="single-product">
        {user.admin && (
          <button type="button" onClick={() => this.toggleEditMode()}>
            Edit Product
          </button>
        )}
        {this.state.editMode && (
          <UpdateProduct
            toggleEditMode={this.toggleEditMode}
            productId={product.id}
            name={product.name}
            description={product.description}
            imageUrl={product.imageUrl}
            price={product.price}
            quantity={product.quantity}
          />
        )}

        <h1>{product.name}</h1>
        <img
          className="product-image"
          src={product.imageUrl}
          alt="image of this product"
        />
        <h3>{product.price}</h3>
        <p>{product.description}</p>
        <form>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="submit" onSubmit={this.handleSubmit}>
            Add to cart
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.singleProduct,
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchSingleProduct(id)),
  orderProduct: order => dispatch(postOrder(order))
})

export default connect(mapState, mapDispatch)(SingleProduct)
