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

// has-many magic methods on user. We can use these to load the cart into the store
// this.accessors = {
//   get: `get${plural}`,
//   set: `set${plural}`,
//   addMultiple: `add${plural}`,
//   add: `add${singular}`,
//   create: `create${singular}`,
//   remove: `remove${singular}`,
//   removeMultiple: `remove${plural}`,
//    hasSingle: `has${singular}`,
//    hasAll: `has${plural}`,
//    count: `count${plural}`
//   };

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Order,
  ProductOrder
}
