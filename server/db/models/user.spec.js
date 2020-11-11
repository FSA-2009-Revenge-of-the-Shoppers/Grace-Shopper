/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const User = db.model('user')

describe('User model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('adminAccess', () => {
    let jim
    let jan

    beforeEach(async () => {
      jim = await User.create({
        email: 'jim@website.net',
        password: '456'
      })
      jan = await User.create({
        email: 'jan@email.com',
        password: '0001',
        admin: true
      })
    })

    it('by default, does not assign the user to be an admin', () => {
      expect(jim.admin).to.be.equal(false)
    })

    it('assigns admin access to user if directed', () => {
      expect(jan.admin).to.be.equal(true)
    })
  })

  describe('instanceMethods', () => {
    describe('correctPassword', () => {
      let cody

      beforeEach(async () => {
        cody = await User.create({
          email: 'cody@puppybook.com',
          password: 'bones'
        })
      })

      it('returns true if the password is correct', () => {
        expect(cody.correctPassword('bones')).to.be.equal(true)
      })

      it('returns false if the password is incorrect', () => {
        expect(cody.correctPassword('bonez')).to.be.equal(false)
      })
    }) // end describe('correctPassword')
  }) // end describe('instanceMethods')
}) // end describe('User model')
