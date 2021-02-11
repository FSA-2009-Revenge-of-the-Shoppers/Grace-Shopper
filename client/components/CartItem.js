import React from 'react'
import {Link} from 'react-router-dom'
import {updateQty, removeItemFromCart} from '../store/cart'
import {connect} from 'react-redux'
import accounting from 'accounting'

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
    const updatedQty = this.state.quantity

    this.props.changeQty(orderId, productId, userId, updatedQty)
    this.toggleEditMode()
  }

  handleRemove() {
    const orderId = this.props.product.productOrder.orderId
    const productId = this.props.product.id
    const userId = this.props.userId
    this.props.removeItem(orderId, productId, userId)
  }

  render() {
    const product = this.props.product
    const {savedPrice, quantity} = product.productOrder
    if (!product) return <h1>Loading Product</h1>
    return (
      <div className="indv-cart-item">
        <img
          className="product-image"
          src={product.imageUrl}
          alt={`image of ${product.name}`}
          width="400px"
          height="400px"
        />
        <div className="product-info">
          <Link to={`/products/${product.id}`}>
            <h1 className="product-name">{product.name}</h1>
          </Link>
          <h3>{accounting.formatMoney(product.price)}</h3>
          <p>
            Qty: {quantity} | Total:{' '}
            {accounting.formatMoney(Number(savedPrice * quantity) * 100 / 100)}
          </p>
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={() => this.toggleEditMode()}
          >
            Change Quantity
          </button>

          {this.state.editMode && (
            <form className="qtyForm" onSubmit={this.handleSubmit}>
              <div className="edit-qty-top-row">
                <label htmlFor="quantity">New Qty</label>
                <input
                  name="quantity"
                  type="number"
                  onChange={this.handleChange}
                  value={this.state.quantity}
                  required="required"
                />
              </div>
              <button
                type="submit"
                className="add-to-cart-btn"
                id="update-qty-button"
              >
                Update
              </button>
            </form>
          )}
          <button
            type="button"
            className="add-to-cart-btn"
            onClick={() => this.handleRemove()}
          >
            Remove from cart
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  userId: state.user.id //need this for removeItemFromCart thunk after clicking on button. Otherwise, the DB is updated (that productOrder is destroyed) but immediately after the cart of the guest user is rendered instead of the cart of the logged in user. But when you refresh, the right cart renders. Passing the state.user.id state to this component fixed the problem
})

const mapDispatch = dispatch => ({
  changeQty: (orderId, productId, userId, updatedQty) =>
    dispatch(updateQty(orderId, productId, userId, updatedQty)),
  removeItem: (orderId, productId, userId) =>
    dispatch(removeItemFromCart(orderId, productId, userId))
})

export default connect(mapState, mapDispatch)(CartItem)
