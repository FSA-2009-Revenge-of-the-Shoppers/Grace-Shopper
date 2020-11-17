const Sequelize = require('sequelize')
const db = require('../db')

// ProductOrder is a many-many associations table that connects Products by Product ID and Saved Price to Orders By the Order Id, Order Owner (User Id), and Quantity of the Product in this Order.

const ProductOrder = db.define('productOrder', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  savedPrice: {
    type: Sequelize.DECIMAL
  }
})

module.exports = ProductOrder
