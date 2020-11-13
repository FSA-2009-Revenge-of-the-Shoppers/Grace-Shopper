const adminAuth = (req, res, next) => {
  if (!req.user || !req.user.admin) {
    return res.status(401).send('Not authorized to view this content')
  } else {
    next()
  }
}

module.exports = adminAuth
