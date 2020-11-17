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
    // J: assuming that admins would not replace information with undefined values
    const {name, description, price, quantity, imageUrl} = this.state

    const updatedProductInfo = {name, description, price}
    // allows us to omit these keys if undefined so the database can validate the fields with default values
    if (quantity) updatedProductInfo.quantity = quantity
    if (imageUrl) updatedProductInfo.imageUrl = imageUrl

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
