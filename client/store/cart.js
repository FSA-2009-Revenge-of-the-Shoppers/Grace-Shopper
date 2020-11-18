import axios from 'axios'

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
        const {data: orderedProducts} = await axios.get(`/api/orders/${userId}`)
        dispatch(getCart(orderedProducts))
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    // if there's a cart, load it from window.localStorage.cart
    // if there isn't, set it as an empty array
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    return dispatch => dispatch(getCart(cart || []))
  }
}

export const updateQty = (orderId, productId, userId, updatedQty) => {
  if (userId) {
    return async dispatch => {
      try {
        const qtyBody = {quantity: updatedQty}
        await axios.put(`/api/productorders/${orderId}/${productId}`, qtyBody)
        //* D: In the future can we do this in a less expensive way, by having a new Reducer case that spreads the existing cart, and only updates the quanitity field of one productOrder?
        dispatch(loadCart(userId))
      } catch (err) {
        console.error('error updating quantity', err)
      }
    }
  } else {
    // grab the cart
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    // update the quantity of the changed product
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        item.productOrder.quantity = updatedQty
        return item
      } else {
        return item
      }
    })
    // reset localStorage with the new item
    window.localStorage.setItem('cart', JSON.stringify(updatedCart))
    // update redux
    return dispatch => dispatch(getCart(updatedCart))
  }
}

export const removeItemFromCart = (orderId, productId, userId) => {
  if (userId) {
    return async dispatch => {
      try {
        await axios.delete(`/api/productorders/${orderId}/${productId}`)
        dispatch(loadCart(userId))
      } catch (err) {
        console.error('error deleting item from cart', err)
      }
    }
  } else {
    // grab the cart
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    // update the quantity of the changed product
    const updatedCart = cart.filter(item => {
      return item.id !== productId
    })
    // reset localStorage without the target item
    window.localStorage.setItem('cart', JSON.stringify(updatedCart))
    // update redux
    return dispatch => dispatch(getCart(updatedCart))
  }
}

export const checkout = (cart, total, userId) => {
  // Because this is not a REAL store, we don't actually need the whole cart, only the orderId which we are going to change to true. However, in a real app, we'd want this information
  const {orderId} = cart[0].productOrder
  if (userId) {
    return async dispatch => {
      try {
        // Async change the complete field on the order to true
        await axios.put(`api/orders/checkout/${orderId}`)
        dispatch(getCart([]))
      } catch (err) {
        console.error('error in checkout', err)
      }
    }
  } else {
    window.localStorage.removeItem('cart')
    return dispatch => dispatch(getCart([]))
  }
}

// J: this order should include all product info, userId, quantity, savedPrice;
export const postOrder = order => {
  // checks if the user is logged in
  if (order.userId) {
    return async dispatch => {
      try {
        // J: this axios.post returns an array of all the products on the order, not just the newly created one;
        const {data: updatedCart} = await axios.post('/api/orders', order)
        dispatch(getCart(updatedCart))
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    // J: create a localStorage cart item in the same format as database productOrder
    const {product, quantity, savedPrice} = order
    const cartItem = product
    cartItem.productOrder = {
      quantity,
      savedPrice
    }

    /* J: creates a cart on localStorage if needed */
    if (!window.localStorage.cart) {
      window.localStorage.setItem('cart', JSON.stringify([]))
    }
    // grab the existing cart
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    // push the new item onto the array
    cart.push(cartItem)
    // reset localStorage with the new item
    window.localStorage.setItem('cart', JSON.stringify(cart))
    // update redux
    return dispatch => dispatch(getCart(cart))
  }
}

// J: this thunk is getting huge, we probably need to split it;

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return action.cart
    default:
      return state
  }
}

/*
Sample: a product in an order returned by a database call
 {
    "id": 1,
    "name": "Hungry Baby Yoda",
    "description": "This baby yoda wants its nom nom.",
    "imageUrl": "https://i.pinimg.com/564x/f6/c5/36/f6c5362760240453788a4257c748a0b1.jpg",
    "price": "30.00",
    "quantity": 0,
    "createdAt": "2020-11-13T21:55:12.098Z",
    "updatedAt": "2020-11-13T21:55:12.098Z",
    "productOrder": {
      "quantity": 25,
      "savedPrice": "54",
      "createdAt": "2020-11-13T21:55:12.183Z",
      "updatedAt": "2020-11-13T21:55:12.236Z",
      "productId": 1,
      "orderId": 3
    }
  },
*/
