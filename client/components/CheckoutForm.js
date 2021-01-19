import React, {useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import {checkout} from '../store/cart'
import axios from 'axios'
import {Button} from '@material-ui/core'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
}

const CheckoutForm = ({
  user,
  cart,
  total,
  clientSecret,
  checkoutCart,
  cancel,
  pushToThankYouPage
}) => {
  const [isPaymentLoading, setPaymentLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  const payMoney = async e => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setPaymentLoading(true)
    // Pay via Stripe
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user.email
        }
      }
    })
    setPaymentLoading(false)
    if (paymentResult.error) {
      alert(paymentResult.error.message)
    } else if (paymentResult.paymentIntent.status === 'succeeded') {
      // Run the checkout function
      checkoutCart(cart, total, user.id)
      // Redirect to thank you page
      pushToThankYouPage(total)
      // Send email receipt
      await axios.post('/nodejs-email', {
        email: user.email,
        total,
        cart
      })
    }
  }

  return (
    <div id="checkout-container">
      <label>
        Enter Card Details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
      <div className="checkout-buttons-container">
        <Button
          id="pay-button"
          disabled={isPaymentLoading}
          onClick={payMoney}
          variant="outlined"
          color="primary"
        >
          {isPaymentLoading ? 'Loading...' : 'Complete Order'}
        </Button>
        <Button
          id="cancel-button"
          onClick={cancel}
          variant="outlined"
          color="secondary"
        >
          Cancel Order
        </Button>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkoutCart: (cart, total, userId) =>
      dispatch(checkout(cart, total, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
