import axios from 'axios'
import history from '../history'

// action types
const GET_CART = 'GET_CART'
const CREATE_ORDER = 'CREATE_ORDER'

// action creator
const getCart = cart => ({
  type: GET_CART,
  cart
})

const createOrder = updatedCart => ({
  type: CREATE_ORDER,
  updatedCart
})

// thunk creator
export const loadCart = userId => {
  if (userId) {
    console.log('thunk triggered')
    return async dispatch => {
      try {
        const {data} = await axios.get(`api/orders/${userId}`) //this is the problem
        const productsInCart = data[0].products
        // console.log(productsInCart)
        dispatch(getCart(productsInCart))
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    console.log('user is not logged in')
    // We have a guest user
    // if there's a cart, load it from window.localStorage.cart
    // if there isn't, set it as an empty array
    // dispatch getCart with that data
    return dispatch => dispatch(getCart([]))
  }
}

export const postOrder = order => {
  if (order.userId) {
    return async dispatch => {
      try {
        // this axios.post return an array of all the products on the order, not just the newly created one;
        const {data: updatedCart} = await axios.post('api/orders', order)
        dispatch(createOrder(updatedCart))
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    console.log('user is not logged in')
    return dispatch => dispatch(createOrder([]))
  }
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    case CREATE_ORDER:
      return action.updatedCart
    default:
      return state
  }
}
