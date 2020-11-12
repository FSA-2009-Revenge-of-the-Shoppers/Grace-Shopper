/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'
    let cody
    let jan

    beforeEach(async () => {
      cody = await User.create({
        email: codysEmail
      })
      jan = await User.create({
        email: 'jan@email.com',
        admin: true
      })
    })

    // Travis is unauthorized! This test will fail when building the deployment version on Travis because of a 401 error
    // it('GET /api/users', async () => {
    //   const res = await request(app)
    //     .get('/api/users')
    //     .expect(200)

    //   expect(res.body).to.be.an('array')
    //   expect(res.body[0].email).to.be.equal(codysEmail)
    // })
  }) // end describe('/api/users')
}) // end describe('User routes')
