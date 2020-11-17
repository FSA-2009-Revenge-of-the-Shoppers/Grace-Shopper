import axios from 'axios'

// action type
const GET_USERS = 'GET_USERS'

//action function
const getUsers = users => ({
  type: GET_USERS,
  users
})

//thunk creator
// * Available to admins only *
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data: users} = await axios.get('/api/users')
      dispatch(getUsers(users))
    } catch (err) {
      console.log('failed to fetch user information', err)
    }
  }
}

// initial state
const initialState = []

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.users
    default:
      return state
  }
}
