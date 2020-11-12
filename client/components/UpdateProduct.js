import React from 'react'
import {connect} from 'react-redux'
import {updateProduct} from '../store/singleProduct'
import ProductForm from './ProductForm'

const defaultState = {
  name: '',
  description: '',
  imageUrl: '',
  price: '',
  quantity: ''
}

class UpdateProduct extends React.Component {
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

    const productId = this.props.productId
    const prevName = this.props.name
    const prevDescription = this.props.description
    const prevImageUrl = this.props.imageUrl
    const prevPrice = this.props.price
    const prevQuantity = this.props.quantity

    const updatedProductInfo = {
      name: this.state.name[0] ? this.state.name : prevName,
      description: this.state.description[0]
        ? this.state.description
        : prevDescription,
      imageUrl: this.state.imageUrl[0] ? this.state.imageUrl : prevImageUrl,
      price: this.state.price[0] ? this.state.price : prevPrice,
      quantity: this.state.quantity[0] ? this.state.quantity : prevQuantity
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
