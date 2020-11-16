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
    console.log('loadCart thunk triggered without userId on state')
    // We have a guest user
    // if there's a cart, load it from window.localStorage.cart
    // if there isn't, set it as an empty array
    // dispatch getCart with that data
    const cart = JSON.parse(window.localStorage.getItem('cart'))
    // We will optionally return an empty array here, but in the future we will create the cart array in local storage when the user adds their first item

    return dispatch => dispatch(getCart(cart || []))
  }
}

// J: this order should include all product info, userId, quantity, savedPrice;
export const postOrder = order => {
  if (order.userId) {
    return async dispatch => {
      try {
        // J: this axios.post return an array of all the products on the order, not just the newly created one;
        const {data: updatedCart} = await axios.post('/api/orders', order)
        dispatch(getCart(updatedCart))
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    // J: create a localStorage cart in the same format as database cart
    const {product, quantity, savedPrice} = order
    const cartItem = product
    cartItem.productOrder = {
      quantity,
      savedPrice
    }

    /* J: check if localStorage cart doesn't exist, create a cart */
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
        "product-order": {
            "quantity": 25,
            "savedPrice": "54",
            "createdAt": "2020-11-13T21:55:12.183Z",
            "updatedAt": "2020-11-13T21:55:12.236Z",
            "productId": 1,
            "orderId": 3
        }
    },

*/
