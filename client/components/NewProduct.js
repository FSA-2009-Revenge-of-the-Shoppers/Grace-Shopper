import React from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../store/products'
import ProductForm from './ProductForm'

class NewProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      quantity: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const {name, description, imageUrl, price, quantity} = this.state

    !imageUrl
      ? this.props.createProduct({name, description, price, quantity})
      : this.props.createProduct({name, description, imageUrl, price, quantity})

    this.setState({
      name: '',
      description: '',
      imageUrl: '',
      price: '',
      quantity: ''
    })

    this.props.tuggleCreateMode()
  }

  render() {
    return (
      <ProductForm
        name={this.state.name}
        description={this.state.description}
        imageUrl={this.state.imageUrl}
        price={this.state.price}
        quantity={this.state.quantity}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}

const mapDispatch = dispatch => ({
  createProduct: createdProduct => dispatch(postProduct(createdProduct))
})

export default connect(null, mapDispatch)(NewProduct)
