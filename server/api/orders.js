const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')

module.exports = router

//sends back only 1 open order because only 1 can be incomplete - the order has an id, which has a products array, which has objects for each products

router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        completed: false
      },
      include: Product
    })
    if (!order.products) return res.send('You cart is empty')
    return res.json(order.products)
  } catch (err) {
    next(err)
  }
})

//possible route to get all completed orders for each User....

router.post('/', async (req, res, next) => {
  try {
    const {userId, quantity, savedPrice, productId} = req.body
    const [order, created] = await Order.findOrCreate({
      where: {
        completed: false,
        userId
      }
    })
    const orderId = order.id
    const productOrder = await ProductOrder.create({
      productId,
      orderId,
      quantity,
      savedPrice
    })
    res.json(await order.getProducts())
  } catch (err) {
    next(err)
  }
})
