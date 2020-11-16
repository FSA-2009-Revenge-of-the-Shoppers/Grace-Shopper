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

  // componentDidMount() {
  // const productId = this.props.match.params.productId
  // this.props.getProduct(productId)
  // }

  toggleEditMode() {
    const currentMode = this.state.editMode
    this.setState({
      editMode: !currentMode
    })
    console.log(this.state)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    console.log('props', this.props)

    const orderId = this.props.product.productOrder.orderId
    const productId = this.props.product.id
    const userId = this.props.userId
    const updatedQty = {
      quantity: this.state.quantity
    }

    console.log('args')
    console.log('orderId', orderId)
    console.log('productId', productId)
    console.log('userId', userId)
    console.log('updatedQty', updatedQty)

    this.props.changeQty(orderId, productId, userId, updatedQty)

    // try {
    //   await axios.put(`/api/productorders/${orderId}/${productId}`, updatedQty)

    // } catch (err) {
    //   console.error('error updating quantity', err)
    // }

    // const productQty = this.props.product.productOrder.quantity
  }

  // how the form works
  // local state is initialized with the quantity of the product in our cart
  // value for the input field is taken from the value we have for it in our local state
  // when we type something into the input field, the change handler sets our local state to reflect what is in the input field
  // when we click submit, we trigger a thunk what will use a put route to edit the quantity in the productOrder table in our database

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
