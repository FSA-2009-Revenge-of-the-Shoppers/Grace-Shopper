const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true // no empty strings
    }
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue: '../../../public/baby-yoda.jpg'
  },
  price: {
    type: Sequelize.DECIMAL,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER
    // validate: {
    //   min: 0,
    //   max: 10,
    // },
  }
})

module.exports = Product
