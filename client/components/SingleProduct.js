import React from 'react'
import {connect} from 'react-redux'
import {UpdateProduct} from '.'
import {fetchSingleProduct} from '../store/singleProduct'

const defaultState = {
  editMode: false
}

export class SingleProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = defaultState
    this.toggleEditMode = this.toggleEditMode.bind(this)
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.getProduct(productId)
  }

  toggleEditMode() {
    const currentMode = this.state.editMode
    this.setState({
      editMode: !currentMode
    })
  }

  render() {
    const {product, user} = this.props
    console.log(product)
    if (!product) return <h1>Loading Product</h1>
    return !product.name ? (
      <h1>Loading Product</h1>
    ) : (
      <div className="single-product">
        {user.admin && (
          <button type="button" onClick={() => this.toggleEditMode()}>
            Edit Product
          </button>
        )}
        {this.state.editMode && (
          <UpdateProduct
            toggleEditMode={this.toggleEditMode}
            productId={product.id}
            name={product.name}
            description={product.description}
            imageUrl={product.imageUrl}
            price={product.price}
            quantity={product.quantity}
          />
        )}

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
  product: state.singleProduct,
  user: state.user
})

const mapDispatch = dispatch => ({
  getProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
