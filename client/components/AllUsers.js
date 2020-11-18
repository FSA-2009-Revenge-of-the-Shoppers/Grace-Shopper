import React from 'react'
import {connect} from 'react-redux'
import {fetchUsers} from '../store/users'

// Available to admin only

class AllUsers extends React.Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render() {
    const {users} = this.props
    if (!users) return <h1>Loading Users</h1>
    return (
      <div className="align-left">
        {users.map(user => {
          return (
            <div key={`user${user.id}`}>
              <h5>{user.id}</h5>
              <h5>{user.email}</h5>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapState = state => ({
  users: state.users
})

const mapDispatch = dispatch => ({
  getUsers: () => dispatch(fetchUsers())
})

export default connect(mapState, mapDispatch)(AllUsers)
