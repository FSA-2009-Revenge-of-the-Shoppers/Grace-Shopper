// this authorization function can be passed in as the 2nd argument in any api route that requires the logged in user to be an admin

const adminAuth = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(401).send('Not authorized to view this content')
  } else {
    next()
  }
}

module.exports = adminAuth
