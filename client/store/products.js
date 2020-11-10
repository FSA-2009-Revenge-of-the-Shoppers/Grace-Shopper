import axios from 'axios'

//Action type
const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'

//action function
const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

//thunk function
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

const initialState = []

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productReducer
