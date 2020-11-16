const router = require('express').Router()
const {ProductOrder} = require('../db/models')

// write a put route to update the quantity of productOrder
// need product id and order id to pinpoint the right row in productOrders

// GET /api/productorders/
router.get('/', async (req, res, next) => {
  try {
    const productOrders = await ProductOrder.findAll({})
    res.json(productOrders)
  } catch (err) {
    next(err)
  }
})

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

// PUT /api/productOrders/:orderId/:productId
router.put('/:orderId/:productId', async (req, res, next) => {
  try {
    const productOrder = await ProductOrder.findOne({
      where: {
        orderId: req.params.orderId,
        productId: req.params.productId
      }
    })
    await productOrder.update(req.body)
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})

module.exports = router
