import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

export class CartIcon extends React.Component {
  render() {
    const cart = this.props.cart
    const quantity = cart.reduce(
      (accumulator, product) => accumulator + product.productOrder.quantity,
      0
    )
    return (
      <Link to="/cart" className="icon-container">
        <img id="icon" src="/shopping-cart.png" />
        {this.props.cart &&
          this.props.cart.length && <p id="badge">{quantity}</p>}
      </Link>
    )
  }
}

const mapState = state => ({
  quantity: state.cartIcon,
  userId: state.user.id
})

export default connect(mapState, null)(CartIcon)
