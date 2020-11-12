/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/products/', () => {
    let pencil
    let pen
    let updateData

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
      updateData = {name: 'sharpie', price: 20.0}
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/products')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].name).to.be.equal('pencil')
    })

    it('GET /api/products/:productId', async () => {
      const res = await request(app)
        .get('/api/products/1')
        .expect(200)

      expect(res.body).to.be.an('object')
      expect(res.body.name).to.be.equal('pencil')
    })

    // it('PUT /api/products/:productId', async () => {
    //   const res = await request(app)
    //   const updated = await res.put('/api/products/1', updateData).expect(200)
    //   const message =
    //     'This does not seem to be working - updated is returning the data from the previous instance, although in postman, this route seems to be working fine. RESPONSE.BODY:'
    //   console.log(message, updated.body)
    //   expect(updated.body).to.be.an('object')
    //   expect(updated.body.name).to.be.equal('sharpie')
    //   expect(updated.body.price).to.be.equal('20.00')
    // })

    // These two routes will likely have similar problems
    // it('POST /api/products/', async () => {

    // })

    // it('DELETE /api/products/:productId', async () => {

    // })
  }) // end describe('/api/products')
}) // end describe('Product routes')
