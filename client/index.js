import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import history from './history'
import store from './store'
import App from './app'
import {loadStripe} from '@stripe/stripe-js'
import {Elements} from '@stripe/react-stripe-js'

// establishes socket connection
import './socket'

// Establishes Stripe Payment
const stripe = loadStripe(
  'pk_test_51I3T5YJu0Fc4Oe9JCbahuYZ0KuvAhy3tTvLgeHxUqIAP3M1UMa9sPrXkoQx2JFn6I2yOhaZULoyvuNzRN77sIc6n008rRJESsy'
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Elements stripe={stripe}>
        <App />
      </Elements>
    </Router>
  </Provider>,
  document.getElementById('app')
)
