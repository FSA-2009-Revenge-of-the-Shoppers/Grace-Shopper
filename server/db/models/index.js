const User = require('./user')
const Product = require('./product')
const ProductOrder = require('./productOrder')
const Order = require('./order')

// one-to-many between User and Order
User.hasMany(Order)
Order.belongsTo(User)

// many-to-many between Product and Order;
Product.belongsToMany(Order, {through: ProductOrder})
Order.belongsToMany(Product, {through: ProductOrder})

// See more details about Order and ProductOrder in their respective files

module.exports = {
  User,
  Product,
  Order,
  ProductOrder
}
