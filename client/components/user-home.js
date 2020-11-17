import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './index'

export const UserHome = props => {
  const {email, isLoggedIn} = props

  return (
    <div>
      {isLoggedIn && <h3>Welcome, {email}</h3>}
      <AllProducts />
    </div>
  )
}

const mapState = state => {
  return {
    email: state.user.email,
    isLoggedIn: !!state.user.id
  }
}

export default connect(mapState)(UserHome)

UserHome.propTypes = {
  email: PropTypes.string
}
