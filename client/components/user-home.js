import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {AllProducts} from './index'
import {Button} from '@material-ui/core'

export const UserHome = ({email, isLoggedIn}) => {
  const generateWelcome = prevMsg => {
    let welcomeMsg = ''
    let welcomeNum = Math.floor(Math.random() * (8 - 1) + 1)
    switch (welcomeNum) {
      case 1:
        welcomeMsg = `This is the way to huge savings, ${email}.`
        break
      case 2:
        welcomeMsg = `May the Force be with your wallet, ${email}.`
        break
      case 3:
        welcomeMsg = `Shop or shop not, ${email}. There is no browse.`
        break
      case 4:
        welcomeMsg = `Buy something, ${email}. I have spoken.`
        break
      case 5:
        welcomeMsg = `${email}, I find your lack of spending disturbing.`
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
    // Iterate recursively if we did not generate a new message
    return prevMsg === welcomeMsg ? generateWelcome(prevMsg) : welcomeMsg
  }
  // Keep track of welcome message in state
  const [welcome, changeWelcome] = useState('')
  // When email loads, set welcome message state
  useEffect(
    () => {
      changeWelcome(generateWelcome(welcome))
    },
    [email]
  )

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
      welcomeMsg = `${email}, I find your lack of spending disturbing.`
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
    <div id="user-home-container">
      {isLoggedIn &&
        email && (
          <div id="welcome">
            <h3 id="welcome-msg">{welcome}</h3>
            <Button
              onClick={() => changeWelcome(generateWelcome(welcome))}
              variant="contained"
              color="primary"
              id="generate-welcome"
            >
              Refresh
            </Button>
          </div>
        )}
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
