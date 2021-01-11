import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import CheckoutForm from './CheckoutForm'
import {loadCart, checkout} from '../store/cart'
import {me} from '../store'
import {loadStripe} from '@stripe/stripe-js'
const stripePromise = loadStripe(
  'pk_test_51I3T5YJu0Fc4Oe9JCbahuYZ0KuvAhy3tTvLgeHxUqIAP3M1UMa9sPrXkoQx2JFn6I2yOhaZULoyvuNzRN77sIc6n008rRJESsy'
)
import axios from 'axios'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.checkoutCart = this.checkoutCart.bind(this)
    this.startCheckout = this.startCheckout.bind(this)
    this.state = {
      paymentOpen: false,
      clientSecret: ''
    }
  }
  async componentDidMount() {
    // Need to wait for user in order to pass userId to getCart
    await this.props.loadInitialData()
    await this.props.getCart(this.props.user.id)
  }

  async startCheckout(total) {
    // Get Client Secret
    const intent = await axios.post('/stripe/secret/', {total})
    console.log('SECRET:', intent)
    // Show the checkout Form
    this.setState({
      clientSecret: intent.client_secret,
      paymentOpen: true
    })
  }

  checkoutCart(cart, total, userId) {
    this.props.checkout(cart, total, userId)
    this.props.history.push('/thank-you', total)
  }

  async handleStripe(cart, user) {
    const stripe = await stripePromise

    // Call your backend to create the Checkout Session
    const {data} = await axios.post('/stripe/create-session', {
      cart,
      user
    })
    console.log(data.id)
    //const session = await response.json();

    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe.redirectToCheckout({
      sessionId: data.id
    })

    if (result.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
      this.props.history.push('/stripe-failure', result.error.message)
    }
  }

  render() {
    const {cart, user} = this.props

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
    return (
      <div>
        {!cart.length ? (
          <h1>No Items In Cart!</h1>
        ) : (
          <div id="main-cart-container">
            <div id="total-container">
              <h3 className="cart-title">Shopping Cart</h3>
              <h3>Total: ${total}</h3>
              <button
                type="button"
                onClick={
                  () =>
                    // this.checkoutCart(cart, total, this.props.user.id)
                    this.handleStripe(cart, this.props.user)
                  // this.startCheckout(total)
                }
              >
                Checkout
              </button>
            </div>
            {this.state.paymentOpen && (
              <CheckoutForm
                user={user}
                cart={cart}
                total={total}
                clientSecret={this.state.clientSecret}
              />
            )}
            <div className="cart-item-container-on-cart-view">
              {cart.map(product => (
                <CartItem
                  product={product}
                  remove={this.props.removeItem}
                  key={product.id}
                  userId={this.props.userId}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
}

const mapState = state => ({
  cart: state.cart,
  user: state.user
})

const mapDispatch = dispatch => ({
  getCart: userId => dispatch(loadCart(userId)),
  loadInitialData: () => dispatch(me()),
  checkout: (cart, total, userId) => dispatch(checkout(cart, total, userId))
})

export default connect(mapState, mapDispatch)(Cart)
