const router = require('express').Router()
const {User} = require('../db/models')
const adminAuth = require('../auth/adminAuth')
module.exports = router

// GET /api/users
router.get('/', adminAuth, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id, email fields, and admin (whether the user is an admin) fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'admin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
