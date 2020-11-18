const router = require('express').Router()
const {ProductOrder, Product} = require('../db/models')

// All productOrders
// GET /api/productorders/
router.get('/', async (req, res, next) => {
  try {
    const productOrders = await ProductOrder.findAll({})
    res.json(productOrders)
  } catch (err) {
    next(err)
  }
})

// All productOrders for a single orderId (returns an array)
// GET /api/productorders/:orderId
router.get('/:orderId', async (req, res, next) => {
  try {
    const productOrders = await ProductOrder.findAll({
      where: {
        orderId: req.params.orderId
      }
    })
    res.json(productOrders)
  } catch (err) {
    next(err)
  }
})

// Single productOrder (1 product in the order)
// GET api/productorders/:orderId/:productId
router.get('/:orderId/:productId', async (req, res, next) => {
  try {
    const productOrder = await ProductOrder.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.json(productOrder)
  } catch (err) {
    next(err)
  }
})

// Edit a single productOrder
// PUT /api/productorders/:orderId/:productId
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const productOrder = await ProductOrder.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    console.log('What is req.body?', req.body)
    const response = await productOrder.update(req.body)
    res.json(response)
  } catch (err) {
    next(err)
  }
})

// Delete a single productOrder
//DELETE /api/productOrders/:orderId/:productId
router.delete('/:orderId/:productId', async (req, res, next) => {
  try {
    await ProductOrder.destroy({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    res.status(204).end()
  } catch (err) {
    console.log(err)
    next(err)
  }
})

module.exports = router
