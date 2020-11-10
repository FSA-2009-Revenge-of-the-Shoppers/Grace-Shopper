import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

const defaultState = {
  editMode: false
}

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }

  render() {
    const product = this.props.product
    return (
      <div className="single-product">
        <h1>{product.name}</h1>
        <img
          className="product-image"
          src={product.imageUrl}
          alt="image of this product"
        />
        <h3>{product.price}</h3>
        <p>{product.description}</p>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
