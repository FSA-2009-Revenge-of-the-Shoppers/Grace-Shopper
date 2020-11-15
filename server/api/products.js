const router = require('express').Router()
const {Product} = require('../db/models')

// routes mounted on /api/products

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

// GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// routes for admin only

// PUT /api/products/:productId
router.put('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    // Note that we will not use this response in our application, but it is useful for testing the api route in mocha and postman
    const response = await product.update(req.body)
    // J: deleted status(204), which means no content; instead sent the response (the updated response) so that the thunk updateProduct in singleProduct.js can make use of this response
    res.json(response)
  } catch (err) {
    next(err)
  }
})

// POST /api/products
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

// DELETE /api/products/:productId
router.delete('/:productId', async (req, res, next) => {
  try {
    await Product.destroy({
      where: {
        id: req.params.productId
      }
    })
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
