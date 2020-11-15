const router = require('express').Router()
const {User} = require('../db/models/')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {email: req.body.email}
    })
    if (!user) {
      console.log('No such user found:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else if (!user.correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email)
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, err => (err ? next(err) : res.json(user)))
    }
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    req.login(user, err => (err ? next(err) : res.json(user)))
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

// router.get('/me', async (req, res) => {
//   //runs everytime page gets loaded
//   //console.log(req.user)
//   const user = await User.findOne({
//     where: {email: req.user.email}
//   })

//   res.json(user)
//   //for when user is still logged in and comes back
// })

router.get('/me', (req, res) => {
  // console.log(req.user)
  res.json(req.user)
  //for when user is still logged in and comes back
})

router.use('/google', require('./google'))
