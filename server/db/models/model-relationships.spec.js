/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const User = db.model('user')
const Order = db.model('order')
const ProductOrder = db.model('productOrder')

describe('Associations', () => {
  // before runs before all the tests in a describe
  before(() => db.sync({force: true}))

  describe('Model Association with User and Order', () => {
    let cody, order1, order2
    beforeEach(async () => {
      cody = await User.create({
        email: 'cody@puppys.com'
      })
      order1 = await Order.create({
        completed: false,
        userId: 1
      })
      order2 = await Order.create({
        completed: true
      })
    })
    // afterEach runs after each test in a describe
    afterEach(() => db.sync({force: true}))

    it('can set userId in orders', () => {
      order2.setUser(cody)
      expect(order2.userId).to.equal(cody.id)
    })

    it('can return the user of an order', async () => {
      const user = await order1.getUser()
      expect(user.email).to.equal(cody.email)
      expect(user.id).to.equal(cody.id)
    })

    it('can return orders by one user', async () => {
      // await has to be added, otherwise the getOrders will run first;
      await order2.setUser(cody)
      const orders = await cody.getOrders()
      expect(orders.length).to.equal(2)
      expect(orders[0].id).to.equal(order1.id)
      expect(orders[0].completed).to.equal(order1.completed)
      expect(orders[1].id).to.equal(order2.id)
      expect(orders[1].completed).to.equal(order2.completed)
    })
  })

  describe('Model Association with Order and Product', () => {
    let pencil, pen, order1, order2, orderedItem1, orderedItem2, orderedItem3

    beforeEach(async () => {
      await Promise.all([
        (pencil = await Product.create({
          name: 'pencil',
          description: 'a pencil',
          price: 60
        })),
        (pen = await Product.create({
          name: 'pen',
          description: 'a ballpoint pen',
          price: 45.5
        })),
        (order1 = await Order.create({
          completed: false
        })),
        (order2 = await Order.create({
          completed: true
        })),
        (orderedItem1 = await ProductOrder.create({
          productId: 1,
          orderId: 1,
          quantity: 2,
          savedPrice: 60
        })),
        (orderedItem2 = await ProductOrder.create({
          productId: 1,
          orderId: 2,
          quantity: 3,
          savedPrice: 60
        })),
        (orderedItem3 = await ProductOrder.create({
          productId: 2,
          orderId: 1,
          quantity: 1,
          savedPrice: 45.5
        }))
      ])
    })
    afterEach(() => db.sync({force: true}))

    it('can retrieve all products on an order', async () => {
      const cart = await order1.getProducts()
      expect(cart.length).to.be.equal(2)
      expect(cart[0].name).to.be.equal('pencil')
      expect(cart[0].description).to.be.equal('a pencil')
      expect(cart[1].price).to.be.equal('45.50')
    })

    it('can retrieve all the orders that include the same product', async () => {
      const orders = await pencil.getOrders()
      expect(orders.length).to.be.equal(2)
      expect(orders[0].completed).to.be.equal(false)
      expect(orders[1].completed).to.be.equal(true)
    })
  })
})
