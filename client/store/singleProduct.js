import axios from 'axios'

const initialState = {}

// action types
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'
const GOT_UPDATED_PRODUCT_INFO = 'GOT_UPDATED_PRODUCT_INFO'

// action creators
export const setSingleProduct = product => ({
  type: SET_SINGLE_PRODUCT,
  product
})

export const gotUpdatedProductInfo = updatedProductInfo => ({
  type: GOT_UPDATED_PRODUCT_INFO,
  product: updatedProductInfo
})

// thunks
export const fetchSingleProduct = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${id}`)
    dispatch(setSingleProduct(data))
  } catch (err) {
    console.error('error fetching the product from server', err)
  }
}

export const updateProduct = (
  productId,
  updatedProductInfo
) => async dispatch => {
  try {
    const {data: updatedProduct} = await axios.put(
      `/api/products/${productId}`,
      updatedProductInfo
    )
    // J: passed in the response (updatedProduct) from api route instead of updatedProductInfo from component. Because the database can take care of undefined fields and assign them with default values;
    dispatch(gotUpdatedProductInfo(updatedProduct))
  } catch (err) {
    console.error('error updating the product', err)
  }
}

// reducer
export default function singleProductReducer(state = initialState, action) {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    case GOT_UPDATED_PRODUCT_INFO:
      return action.product
    default:
      return state
  }
}
