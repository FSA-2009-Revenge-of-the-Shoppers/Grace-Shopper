const Sequelize = require('sequelize')
const db = require('../db')

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