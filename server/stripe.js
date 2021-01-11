const router = require('express').Router()
const stripe = require('stripe')(
  'sk_test_51I3T5YJu0Fc4Oe9JoyeQHuQ8t5Px2Jacom5lYAeUB7FcrjmcEOvkmg6Ri4aocw5J3ffGBjwQAynG0G7HcNhpzCqI00iBcEoYwH'
)
module.exports = router
const chalk = require('chalk')

const urlBase =
  process.env.NODE_ENV !== 'production'
    ? 'http://localhost:8080/'
    : 'https://yodaddy.herokuapp.com/'

router.post('/create-session', async (req, res, next) => {
  console.log(chalk.bgMagenta('HERE'))
  try {
    const {cart, user} = req.body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: cart.map(item => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: item.name
            },
            unit_amount: Number(item.price) * 100
          },
          quantity: item.productOrder.quantity
        }
      }),
      mode: 'payment',
      success_url: urlBase + 'thank-you',
      cancel_url: urlBase + 'cart'
    })

    res.json({id: session.id})
  } catch (err) {
    next(err)
  }
})

router.post('/webhook', async (req, res, next) => {
  const sig = req.headers['stripe-signature']
  const endpointSecret = ''

  let event
  try {
    event = stripe.webhooks.constructEvent(
      req.body.rawBody,
      sig,
      endpointSecret
    )
  } catch (err) {
    next(err)
  }
})

router.post('secret/', async (req, res, next) => {
  const {total} = req.body
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {integration_check: 'accept_a_payment'}
    })
    console.log(paymentIntent)
    res.json(paymentIntent.client_secret)
  } catch (error) {
    next(error)
  }
})
