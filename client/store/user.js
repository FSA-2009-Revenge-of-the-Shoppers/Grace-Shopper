import axios from 'axios'
import history from '../history'
import {loadCart, postOrder} from './cart'

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
    console.log('local cart in the auth route', localCart)
    combineLocalCart(dispatch, userId, localCart)
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

async function combineLocalCart(dispatch, userId, localCart) {
  const orderFromLocal = localCart.map(product => {
    const orderObj = {
      product,
      savedPrice: product.productOrder.savedPrice,
      quantity: product.productOrder.quantity,
      userId
    }
    return dispatch(postOrder(orderObj))
  })
  console.log('before', orderFromLocal)
  await Promise.all(orderFromLocal)
  console.log('after', orderFromLocal)
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
