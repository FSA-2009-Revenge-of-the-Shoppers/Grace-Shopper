import React from 'react'

const StripeFailure = props => {
  console.log(props.location.state)
  return <p>Failure connecting to Stripe. Please try again later.</p>
}

export default StripeFailure
