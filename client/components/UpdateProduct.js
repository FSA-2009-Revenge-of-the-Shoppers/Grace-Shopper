import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'
import ProductForm from './ProductForm'

class UpdateProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: this.props.name,
      description: this.props.description,
      imageUrl: this.props.imageUrl,
      price: this.props.price,
      quantity: this.props.quantity
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
    const productId = this.props.productId

    const {name, description, imageUrl, price, quantity} = this.state
    const existing = quantity && quantity

    const updatedProductInfo = {
      name,
      description,
      price,
      imageUrl,
      existing
    }
    this.props.editProduct(productId, updatedProductInfo)

    this.props.toggleEditMode()
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
  editProduct: (productId, updatedProduct) =>
    dispatch(updateProduct(productId, updatedProduct))
})

export default connect(null, mapDispatch)(UpdateProduct)
