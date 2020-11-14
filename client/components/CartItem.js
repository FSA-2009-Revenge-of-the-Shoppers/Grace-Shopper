import React from 'react'
import {Link} from 'react-router-dom'
// import Order from '../../server/db/models/order'
// import {connect} from 'react-redux'
// import {fetchSingleProduct} from '../store/singleProduct'

export default class CartItem extends React.Component {
  constructor(props) {
    //should get remove function and the actual individual item from the Cart component
    super(props)
    this.state = {
      quantity: this.props.product.productOrder.quantity
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // componentDidMount() {
  //   const productId = this.props.match.params.productId
  //   this.props.getProduct(productId)
  // }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const productId = this.props.product.id

    const updatedProductQty = {
      quantity: this.state.quantity
    }

    // const productQty = this.props.product.productOrder.quantity
  }

  // our form
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
        <form className="qtyForm" onSubmit={this.props.handleSubmit}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            name="quantity"
            type="number"
            onChange={this.props.handleChange}
            value={this.state.quantity}
            required="required"
          />
        </form>

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
