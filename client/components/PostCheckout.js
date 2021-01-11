import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {checkout} from '../store/cart'

const PostCheckout = ({cart, user, orderCheckout}) => {
  const total =
    Number(
      cart.reduce(
        (accumulator, product) =>
          accumulator +
          product.productOrder.savedPrice * product.productOrder.quantity,
        0
      )
    ) *
    100 /
    100

  useEffect(() => {
    orderCheckout(cart, total, user.id)
  }, [])

  return (
    <div>
      <p>
        <span style={{fontWeight: 'bold', color: 'green'}}>
          Payment Succeeded!
        </span>{' '}
        Thank you for shopping with YoDaddy.
      </p>
      <p>
        <Link to="/home">Keep Shopping</Link>
      </p>
    </div>
  )
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  orderCheckout: (cart, total, userId) =>
    dispatch(checkout(cart, total, userId))
})

export default connect(mapState, mapDispatch)(PostCheckout)
