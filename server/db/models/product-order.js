const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('product-order', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  savedPrice: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
})

module.exports = ProductOrder
