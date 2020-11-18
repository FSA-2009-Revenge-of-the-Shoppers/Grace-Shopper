import React from 'react'

const ProductForm = props => {
  return (
    <div className="form-container">
      <h3>Product Info</h3>
      <form className="form" onSubmit={props.handleSubmit}>
        <label htmlFor="name">Product Name*:</label>
        <input
          name="name"
          type="text"
          onChange={props.handleChange}
          value={props.name}
          required="required"
        />

        <label htmlFor="description">Description*:</label>
        <textarea
          rows="3"
          name="description"
          type="text"
          onChange={props.handleChange}
          value={props.description}
          required="required"
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          name="imageUrl"
          type="url"
          onChange={props.handleChange}
          value={props.imageUrl}
        />

        <label htmlFor="price">Price*:</label>
        <input
          name="price"
          type="text"
          onChange={props.handleChange}
          value={props.price}
          required="required"
        />

        <label htmlFor="quantity">Quantity:</label>
        <input
          name="quantity"
          type="number"
          onChange={props.handleChange}
          value={props.quantity}
        />

        <button type="submit">Submit Product</button>
      </form>
    </div>
  )
}

export default ProductForm
