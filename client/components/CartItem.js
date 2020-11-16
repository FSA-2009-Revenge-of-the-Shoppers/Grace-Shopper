import React from 'react'
import {Link} from 'react-router-dom'
import {updateQty} from '../store/cart'
import {connect} from 'react-redux'

// import Order from '../../server/db/models/order'
// import {fetchSingleProduct} from '../store/singleProduct'

export class CartItem extends React.Component {
  constructor(props) {
    //should get remove function and the actual individual item from the Cart component
    super(props)
    this.state = {
      quantity: this.props.product.productOrder.quantity,
      editMode: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  render() {
    const product = this.props.product
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
        <h3>Price: ${product.productOrder.savedPrice}</h3>
        <p>Quantity: {product.productOrder.quantity}</p>
        <button type="button" onClick={() => this.toggleEditMode()}>
          Change Quantity
        </button>

        {this.state.editMode && (
          <form className="qtyForm" onSubmit={this.handleSubmit}>
            <label htmlFor="quantity">Change Quantity:</label>
            <input
              name="quantity"
              type="number"
              onChange={this.handleChange}
              value={this.state.quantity}
              required="required"
            />
            <button type="submit">Change Quanity</button>
          </form>
        )}

        <button
          type="button"
          className="rmv-btn"
          //onClick={() => this.props.remove(product)}
        >
          Remove from cart
        </button>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  changeQty: (orderId, productId, userId, updatedQty) =>
    dispatch(updateQty(orderId, productId, userId, updatedQty))
})

export default connect(null, mapDispatch)(CartItem)
