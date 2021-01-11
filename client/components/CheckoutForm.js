import React, {useState} from 'react'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import {connect} from 'react-redux'

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

const CheckoutForm = ({user, cart, total, clientSecret}) => {
  // const [isIntentLoading, setIntentLoading] = useState(false)
  const [isPaymentLoading, setPaymentLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()
  console.log('Elements var from Hook:', elements)
  console.log('what is this', CardElement)

  const payMoney = async e => {
    e.preventDefault()
    if (!stripe || !elements) {
      return
    }
    setPaymentLoading(true)
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
      alert('Success!')
    }
  }

  return (
    // <form
    //   style={{
    //     display: 'block',
    //     width: '50%'
    //   }}
    //   onSubmit={payMoney}
    // >
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
      <button className="pay-button" disabled={isPaymentLoading} type="submit">
        {isPaymentLoading ? 'Loading...' : 'Complete Order'}
      </button>
    </div>
    // </form>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(CheckoutForm)
