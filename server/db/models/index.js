const User = require('./user')
const Product = require('./product')
const Cart = require('./cart')

User.hasMany(Cart) //each row in cart table is a different product- (different "cart")
Cart.belongsTo(User) //** One-To-Many

Cart.belongsTo(Product) //** One-To-Many
Product.hasMany(Cart)

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
  Cart
}
