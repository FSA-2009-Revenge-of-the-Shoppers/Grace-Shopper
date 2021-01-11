import React, {useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'
import {checkout} from '../store/cart'

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
  // const [isIntentLoading, setIntentLoading] = useState(false)
  const [isPaymentLoading, setPaymentLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  // console.log('Elements var from Hook:', elements)
  // console.log('what is this', CardElement)

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
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '500px'
      }}
    >
      <label style={{width: '100%'}}>
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <button
          className="pay-button"
          disabled={isPaymentLoading}
          type="button"
          onClick={payMoney}
        >
          {isPaymentLoading ? 'Loading...' : 'Complete Order'}
        </button>
        <button className="cancel-button" type="button" onClick={cancel}>
          Cancel Order
        </button>
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
