const router = require('express').Router()
const {Product} = require('../db/models')
const {route} = require('./users')

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// routes for admin only
router.post('/', async (req, res, next) => {
  try {
    const [product, created] = await Product.findOrCreate({
      where: {
        name: req.body.name
      },
      defaults: req.body
    })

    if (!created) return res.sendStatus(409)
    return res.status(201).json(product)
  } catch (err) {
    next(err)
  }
})

route.delete('/:id', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
