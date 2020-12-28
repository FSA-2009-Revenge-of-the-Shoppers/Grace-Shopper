import React from 'react'
import {Route, Switch} from 'react-router-dom'

import {
  Login,
  Signup,
  UserHome,
  SingleProduct,
  AllProducts,
  AllUsers,
  Cart,
  PostCheckout,
  CheckoutForm
} from './components'

/**
 * COMPONENT
 */
const Routes = props => {
  const user = props.user
  return (
    <div id="routes-container">
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route
          exact
          path="/products"
          component={() => <AllProducts {...props} />}
        />
        <Route exact path="/products/:productId" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        <Route exact path="/home" component={UserHome} />
        <Route exact path="/checkout" component={CheckoutForm} />
        <Route exact path="/thank-you" component={PostCheckout} />
        {user.id && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/home" component={UserHome} />
            {user.admin && <Route exact path="/users" component={AllUsers} />}
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    </div>
  )
}

export default Routes
