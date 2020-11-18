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
    })

    let response = []
    if (order) response = order.products
    return res.json(response)
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
      //* D: Note that the console was logging the following warning when passing req.body to defaults: (sequelize) Warning: Unknown attributes (product,userId) passed to defaults option of findOrCreate -- we should only handle the fields ProductOrder actually needs, which are saved price and quantity. This no longer errors
      defaults: {
        quantity,
        savedPrice
      }
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

// checkout route updates the completed field to true
router.put('/checkout/:orderId', async (req, res, next) => {
  try {
    const orderId = req.params.orderId
    const order = await Order.findOne({
      where: {
        id: orderId
      }
    })
    await order.update({
      completed: true
    })
    // No content to send back
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
})
