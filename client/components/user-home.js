import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './index'

// this part may need edits

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email, isLoggedIn} = props

  return (
    <div>
      {isLoggedIn && <h3>Welcome, {email}</h3>}
      <AllProducts />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
