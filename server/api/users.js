const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      // We may also want this route to access whether the user is an admin, so we will include that key too.
      attributes: ['id', 'email', 'admin']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})
