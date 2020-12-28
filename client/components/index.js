/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {default as AllProducts} from './all-products'
export {default as SingleProduct} from './SingleProduct'
export {default as UpdateProduct} from './UpdateProduct'
export {default as NewProduct} from './NewProduct'
export {default as AllUsers} from './AllUsers'
export {default as Cart} from './Cart'
export {default as CheckoutForm} from './CheckoutForm'
export {default as PostCheckout} from './PostCheckout'
