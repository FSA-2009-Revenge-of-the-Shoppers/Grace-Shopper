import React from 'react'
import {connect} from 'react-redux'
import {postProduct} from '../store/products'
import ProductForm from './ProductForm'

const defaultState = {
  name: '',
  description: '',
  imageUrl: '',
  price: '',
  quantity: ''
}

class NewProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
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
    let {name, description, imageUrl, price, quantity} = this.state
    if (!imageUrl) imageUrl = undefined
    if (!quantity) quantity = undefined
    this.props.createProduct({name, description, price, imageUrl, quantity})
    this.setState(defaultState)
    this.props.toggleCreateMode()
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
