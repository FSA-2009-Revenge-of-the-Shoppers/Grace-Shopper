/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Product = db.model('product')

describe('Product model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('validation and defaults', () => {
    let pencil
    let pen

    beforeEach(async () => {
      pencil = await Product.create({
        name: 'pencil',
        description: 'a pencil',
        price: 60
      })
      pen = await Product.create({
        name: 'pen',
        description: 'a ballpoint pen',
        price: 45.5
      })
    })

    it('adds a default image and decimals to the price', () => {
      expect(pencil.price).to.deep.equal('60.00')
      expect(pen.imageUrl).to.be.equal('/baby-yoda.jpg')
    })
  })
})
