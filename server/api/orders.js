const router = require('express').Router()
const {Order, Product} = require('../db/models')

module.exports = router

//sends back only 1 open order because only 1 can be incomplete - the order has an id, which has a products array, which has objects for each products

router.get('/:id', async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: {
        userId: req.params.id,
        completed: false
      },
      include: Product
    })
    if (!orders.length) return res.send('You cart is empty')
    return res.json(orders)
  } catch (err) {
    next(err)
  }
})

//possible route to get all completed orders for each User....
