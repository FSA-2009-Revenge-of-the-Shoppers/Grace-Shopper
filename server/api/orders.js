const router = require('express').Router()
const {Order, Product, ProductOrder} = require('../db/models')

module.exports = router

// only 1 incomplete order per user << many productOrders point to that order
router.get('/:id', async (req, res, next) => {
  try {
    const order = await Order.findOne({
      where: {
        userId: req.params.id,
        completed: false
      },
      include: Product
    }) // make sure it doesnt break when there is not "false" order to be found

    // J: make sure that what this returns fits the format of the cart
    if (!order.products) return res.send('You cart is empty')
    return res.json(order.products)
  } catch (err) {
    next(err)
  }
})

// This route creates a finds or creates an incomplete order for the user, and adds a productOrder in that order.
//* D: Is there a more efficient way to write this route?
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

    const [productOrder, wasCreated] = await ProductOrder.findOrCreate({
      where: {
        productId,
        orderId
      },
      defaults: req.body
    })

    // This accounts for the edge case where a user already has that product in their database order, but adds it anyway instead of changing the quantity in their cart
    if (!wasCreated) {
      const currentQuantity = productOrder.quantity
      await productOrder.update({
        // the cart will then reflect the total of the two quantities
        quantity: currentQuantity + quantity,
        savedPrice
      })
    }

    res.json(await order.getProducts())
  } catch (err) {
    next(err)
  }
})
