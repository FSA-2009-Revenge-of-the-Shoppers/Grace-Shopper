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
    return async dispatch => {
      try {
        console.log(userId)
        const {data} = await axios.get(`/cart/${userId}`)
        dispatch(getCart(data))
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    // We have a guest user
    // if there's a cart, load it from window.localStorage.cart
    // if there isn't, set it as an empty array
    // dispatch getCart with that data
  }
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return [...state, action.cart]
    default:
      return state
  }
}
