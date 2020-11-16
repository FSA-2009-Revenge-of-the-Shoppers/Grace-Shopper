import React from 'react'
import {Link} from 'react-router-dom'
import {updateQty, removeItemFromCart} from '../store/cart'
import {connect} from 'react-redux'

export class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.product.productOrder.quantity,
      editMode: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
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
    const orderId = this.props.product.productOrder.orderId
    const productId = this.props.product.id
    const userId = this.props.userId
    const updatedQty = {
      quantity: this.state.quantity
    }
    this.props.changeQty(orderId, productId, userId, updatedQty)
  }

  handleRemove() {
    const orderId = this.props.product.productOrder.orderId
    const productId = this.props.product.id
    const userId = this.props.userId
    // console.log(userId)
    this.props.removeItem(orderId, productId, userId)
  }

  render() {
    const product = this.props.product
    const {savedPrice, quantity} = product.productOrder
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
        <h3>Price: ${savedPrice}</h3>
        <p>
          Quantity: {quantity} - Total: ${savedPrice * quantity}
        </p>
        <button type="button" onClick={() => this.toggleEditMode()}>
          Change Quantity
        </button>

        {this.state.editMode && (
          <form className="qtyForm" onSubmit={this.handleSubmit}>
            <label htmlFor="quantity">New Quantity:</label>
            <input
              name="quantity"
              type="number"
              onChange={this.handleChange}
              value={this.state.quantity}
              required="required"
            />
            <button type="submit">Update</button>
          </form>
        )}
        <button
          type="button"
          className="rmv-btn"
          onClick={() => this.handleRemove()}
        >
          Remove from cart
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id //need this in order to find a userId when using removeItemFromCart thunk after clicking on button. Otherwise for some reason, the DB is updated (that productOrder is destroyed) but immediately after the cart of the guest user is rendered instead of the cart of the logged in user. But when you refresh, the right cart renders. Passing the state.user.id state to this component fixed the problem
})

const mapDispatch = dispatch => ({
  changeQty: (orderId, productId, userId, updatedQty) =>
    dispatch(updateQty(orderId, productId, userId, updatedQty)),
  removeItem: (orderId, productId, userId) =>
    dispatch(removeItemFromCart(orderId, productId, userId))
})

export default connect(mapState, mapDispatch)(CartItem)
