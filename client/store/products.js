import axios from 'axios'

//Action types
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

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

//thunk functions
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

export const postProduct = () => {
  return async dispatch => {
    try {
      const {data: product} = await axios.post('/api/products')
      dispatch(addProduct(product))
    } catch (err) {
      console.log('failed to post a new product', err)
    }
  }
}

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

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case ADD_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter(product => product.id !== action.productId)
    default:
      return state
  }
}

export default productReducer
