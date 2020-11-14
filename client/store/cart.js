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
        const {data: orderedProducts} = await axios.get(`api/orders/${userId}`) //this is the problem
        // console.log(productsInCart)
        dispatch(getCart(orderedProducts))
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
    const orderedProducts = JSON.parse(window.localStorage.getItem('cart'))
    return dispatch => dispatch(getCart(orderedProducts))
  }
}

// J: this order should include all product info, userId, quantity, savedPrice;
export const postOrder = order => {
  if (order.userId) {
    return async dispatch => {
      try {
        // J: this axios.post return an array of all the products on the order, not just the newly created one;
        console.log('what is order????????????', order)
        const {data: updatedCart} = await axios.post('api/orders', order)
        dispatch(createOrder(updatedCart))
      } catch (err) {
        console.log(err)
      }
    }
  } else {
    // J: create a localStorage cart in the same format as database cart
    const {product, quantity, savedPrice} = order
    const orderedProduct = product
    orderedProduct['product-order'] = {
      quantity,
      savedPrice
    }

    /* J: check if local cart exists, if exists, add a new item into it;
    if not create a cart and place the item in it */
    if (!window.localStorage.cart)
      window.localStorage.setItem('cart', JSON.stringify([orderedProduct]))
    const orderedProducts = JSON.parse(window.localStorage.getItem('cart'))
    orderedProducts.push(orderedProduct)
    window.localStorage.setItem('cart', JSON.stringify(orderedProducts))
    return dispatch => dispatch(orderedProducts)
  }
}

// J: this thunk is getting huge, we probably need to split it;

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

/*
Sample: a product in an order returned by database calls
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
