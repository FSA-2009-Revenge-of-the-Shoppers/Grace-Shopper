const Sequelize = require('sequelize')
const db = require('../db')

// Orders are either completed or incomplete, and have multiple productOrders (containing quanitity, savedPrice, productId) pointing to them. Querying an orders should return an array of productOrders.

const Order = db.define('order', {
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Order
