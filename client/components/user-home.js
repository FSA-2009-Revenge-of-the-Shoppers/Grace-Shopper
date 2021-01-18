import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './index'

export const UserHome = props => {
  const {email, isLoggedIn} = props

  const welcomeNum = Math.floor(Math.random() * (8 - 1) + 1)

  let welcomeMsg = ''

  switch (welcomeNum) {
    case 1:
      welcomeMsg = `This is the way, ${email}.`
      break
    case 2:
      welcomeMsg = `May the Force be with you, ${email}.`
      break
    case 3:
      welcomeMsg = `Shop or shop not, ${email}. There is no browse.`
      break
    case 4:
      welcomeMsg = `Buy something, ${email}. I have spoken.`
      break
    case 5:
      welcomeMsg = `${email}, I find your lack of spending distrubing.`
      break
    case 6:
      welcomeMsg = `These ARE the products you're looking for, ${email}.`
      break
    case 7:
      welcomeMsg = `${email}, I am YoDaddy.`
      break
    default:
      welcomeMsg = `Welcome, ${email}.`
  }

  return (
    <div>
      {isLoggedIn && <h2 id="welcome-msg">{welcomeMsg}</h2>}
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
