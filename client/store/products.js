import axios from 'axios'

//Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const ADJUST_QUANTITY = 'ADJUST_QUANTITY'

//action functions
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const addProduct = product => ({
  type: ADD_PRODUCT,
  product
})

const deleteProduct = productId => ({
  type: DELETE_PRODUCT,
  productId
})

const adjustQuantity = (quantity, productId) => ({
  type: ADJUST_QUANTITY,
  quantity,
  productId
})

//thunk functions

// All users:
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const {data: products} = await axios.get('/api/products')
      dispatch(getAllProducts(products))
    } catch (err) {
      console.log('failed to fetch products', err)
    }
  }
}

// Admins only:
export const postProduct = createdProduct => {
  return async dispatch => {
    try {
      const {data: product} = await axios.post('/api/products', createdProduct)
      dispatch(addProduct(product))
    } catch (err) {
      console.log('failed to post a new product', err)
    }
  }
}

// Admins only:
export const destroyProduct = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/products/${productId}`)
      dispatch(deleteProduct(productId))
    } catch (err) {
      console.log('failed to destroy the product', err)
    }
  }
}

// Admins only:
export const updateQuantity = (productId, quantity) => {
  return async dispatch => {
    try {
      await axios.put(`/api/products/${productId}`, {quantity})
      dispatch(adjustQuantity(quantity, productId))
    } catch (err) {
      console.log('failed to update the quantity', err)
    }
  }
}

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    case ADJUST_QUANTITY: {
      const adjusted = state.filter(product => product.id === action.productId)
      adjusted.quantity = action.quantity
      return [...state, adjusted]
    }
    default:
      return state
  }
}

export default productReducer
