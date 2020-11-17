import React from 'react'

const PostCheckout = props => {
  const total = props.location.state
  return (
    <div>
      <p>
        Thank you for shopping with YoDaddy! Your total today was{' '}
        <span style={{fontWeight: 'bold'}}>${total}</span>.
      </p>
    </div>
  )
}

export default PostCheckout
