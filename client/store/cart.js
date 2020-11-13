import axios from 'axios'
import history from '../history'

// action types
const GET_CART = 'GET_CART'

// action creator
const getCart = cart => ({
  type: GET_CART,
  cart
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

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return [...state, ...action.cart]
    default:
      return state
  }
}
