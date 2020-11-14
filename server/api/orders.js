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

    // J: make sure that what this returns fits the format of the cart
    if (!order.products) return res.send('You cart is empty')
    return res.json(order.products)
  } catch (err) {
    next(err)
  }
})

//possible route to get all completed orders for each User....

router.post('/', async (req, res, next) => {
  try {
    /* J: changed productId into product so that the order passed in
    thunk postOrder can be also used by guest
    */
    const {userId, quantity, savedPrice, product} = req.body
    const [order, created] = await Order.findOrCreate({
      where: {
        completed: false,
        userId
      }
    })
    const productId = product.id
    const orderId = order.id
    await ProductOrder.create({
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
