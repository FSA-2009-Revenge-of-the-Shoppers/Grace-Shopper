import axios from 'axios'

// action types
const GET_CART = 'GET_CART'
const GOT_UPDATED_QUANTITY = 'GOT_UPDATED_QUANTITY'

// action creator
const getCart = cart => ({
  type: GET_CART,
  cart
})

// export const gotUpdatedQuantity = updatedQuantity => ({
//   type: GOT_UPDATED_QUANTITY,
//   quantity: updatedQuantity
// })

// thunk creator
export const loadCart = userId => {
  if (userId) {
    console.log('loadCart thunk triggered')
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

export const updateQty = (orderId, productId, userId, updatedQty) => {
  console.log('updateQty thunk triggered')
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/productorders/${orderId}/${productId}`,
        updatedQty
      )
      console.log(data)
      dispatch(loadCart(userId))
      // dispatch(gotUpdatedQuantity(updatedQuantity))
    } catch (err) {
      console.error('error updating quantity', err)
    }
  }
}

// const updateProductOrder = (orderId, productId, stateArr) => {
//   for (let i = 0; i < stateArr.length; i++) {
//     const orderIdToCheck = stateArr[i].productOrder.orderId
//     const productIdToCheck = stateArr[i].productOrder.productId
//     if (orderIdToCheck === orderId && productIdToCheck === productId) {
//       stateArr[i].quantity =
//     }
//   }
// }

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    // case GOT_UPDATED_QUANTITY:
    //   return []
    default:
      return state
  }
}
