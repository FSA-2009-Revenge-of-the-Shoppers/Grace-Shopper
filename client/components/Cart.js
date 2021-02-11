import React from 'react'
import {connect} from 'react-redux'
import CartItem from './CartItem'
import CheckoutForm from './CheckoutForm'
import ModalContainer from './ModalContainer'
import {loadCart} from '../store/cart'
import {me} from '../store'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'
import accounting from 'accounting'
import {Card, Button, CardActions, CardContent} from '@material-ui/core'
import Modal from 'react-modal'
const stripePromise = loadStripe(
  'pk_test_51I3T5YJu0Fc4Oe9JCbahuYZ0KuvAhy3tTvLgeHxUqIAP3M1UMa9sPrXkoQx2JFn6I2yOhaZULoyvuNzRN77sIc6n008rRJESsy'
)
import axios from 'axios'

Modal.setAppElement('#app')

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.startCheckout = this.startCheckout.bind(this)
    this.handleStripe = this.handleStripe.bind(this)
    this.hideCheckoutForm = this.hideCheckoutForm.bind(this)
    this.pushToThankYouPage = this.pushToThankYouPage.bind(this)
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
    const {data: clientSecret} = await axios.post('/stripe/secret', {
      total: Math.round(total * 100)
    })
    // Show the checkout Form
    this.setState({
      clientSecret,
      paymentOpen: true
    })
  }

  hideCheckoutForm() {
    this.setState({paymentOpen: false})
  }

  pushToThankYouPage(total) {
    this.props.history.push('thank-you', total)
  }

  async handleStripe(cart, user) {
    const stripe = await stripePromise
    // Call your backend to create the Checkout Session
    const {data} = await axios.post('/stripe/create-session', {
      cart,
      user
    })
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
    const quantity = cart.reduce(
      (accumulator, product) => accumulator + product.productOrder.quantity,
      0
    )
    return (
      <div id="cart-parent">
        {!cart.length ? (
          <h1>No Items In Cart!</h1>
        ) : (
          <div id="main-cart-container">
            <div id="cart-items-container">
              {cart.map(product => (
                <CartItem
                  product={product}
                  remove={this.props.removeItem}
                  key={product.id}
                  userId={this.props.userId}
                />
              ))}
            </div>
            <Card id="cart-info">
              <CardActions id="checkout-button-container">
                <Button
                  id="start-checkout-button"
                  onClick={() => this.startCheckout(total)}
                  variant="contained"
                  color="primary"
                >
                  Checkout
                </Button>
              </CardActions>
              <CardContent id="content-container">
                <hr />
                <div className="subtotal-container">
                  <h3>Subtotal</h3>
                  <h3>{accounting.formatMoney(total)}</h3>
                </div>
                <div className="subtotal-container">
                  <p>Items</p>
                  <p>{quantity}</p>
                </div>
              </CardContent>
            </Card>
            <Modal
              isOpen={this.state.paymentOpen}
              onRequestClose={this.hideCheckoutForm}
              style={{
                overlay: {
                  backgroundColor: 'rgba(41, 41, 41, 0.728)'
                },
                content: {
                  margin: '50px 0',
                  backgroundColor: 'rgba(255, 245, 245)',
                  border: '3px solid #d2b041',
                  borderRadius: '15px'
                }
              }}
            >
              {this.state.paymentOpen && (
                <Elements stripe={stripePromise}>
                  <CheckoutForm
                    user={user}
                    cart={cart}
                    total={total}
                    clientSecret={this.state.clientSecret}
                    cancel={this.hideCheckoutForm}
                    pushToThankYouPage={this.pushToThankYouPage}
                  />
                </Elements>
              )}
            </Modal>
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
  loadInitialData: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
