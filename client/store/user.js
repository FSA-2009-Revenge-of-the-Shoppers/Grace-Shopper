import axios from 'axios'
import history from '../history'
import {postOrder} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    //when user comes back but is still logged in
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method, localCart) => async dispatch => {
  let res //when user first logs in

  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    const userId = res.data.id
    //* D: Not sure if this if block will work properly, may need to take it out, but ideally we only want combineLocalCart to run if there are cart items on localStorage. Otherwise it's wasted expense.
    if (localCart && localCart.length) {
      // See comments below
      combineLocalCart(dispatch, userId, localCart)
    }
    // Redirect after logging in
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

// About the combineLocalCart helper function:
// Intended to take the cart a guest creates, saved on localStorage and Redux, and add those items to the database when that guest logs in or signs up, and localStorage is cleared
// It appears to work well when an existing user logs in
// There is a bug where if the user signs up, only one item is added. localStorage is cleared
// There is a bigger bug with Google OAuth users, where the localCart seems to persist, and if they don't have a database order it will show up in their cart, but nothing gets updated in the database.

async function combineLocalCart(dispatch, userId, localCart) {
  const orderFromLocal = localCart.map(product => {
    // create the order object with the needed properties
    const orderObj = {
      product,
      savedPrice: product.productOrder.savedPrice,
      quantity: product.productOrder.quantity,
      userId
    }
    // push the promise onto the mapped array
    return dispatch(postOrder(orderObj))
  })
  // invokes the promises, adding the guests' orders to the database & updating state
  await Promise.all(orderFromLocal)
  // clear the cart on local storage
  window.localStorage.removeItem('cart')
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}
