/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')
const User = db.model('user')
const Cart = db.model('cart')

describe('Cart model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('Model Associations with User and Product', () => {
    let pencil
    let pen
    let cody
    let item1
    let item2

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
        (cody = await User.create({
          email: 'cody@puppys.com'
        })),
        (item1 = await Cart.create({
          productId: 1,
          userId: 1,
          quantity: 3
        })),
        (item2 = await Cart.create({
          productId: 2,
          userId: 1,
          quantity: 1
        }))
      ])
    })

    it('can retrieve information about the products in the cart from the user', async () => {
      const carts = await cody.getCarts()
      expect(carts.length).to.be.equal(2)
      const cartProduct1 = await carts[0].getProduct()
      const cartProduct2 = await carts[1].getProduct()
      expect(cartProduct1.name).to.be.equal('pencil')
      expect(cartProduct2.price).to.be.equal('45.50')
    })

    it('can retrieve information about the user from the cart item', async () => {
      const user = await item1.getUser()
      expect(user.email).to.be.equal('cody@puppys.com')
    })
  })
})
