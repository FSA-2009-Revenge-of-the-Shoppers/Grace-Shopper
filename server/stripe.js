const router = require('express').Router()
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
module.exports = router

router.post('/create-session', async (req, res, next) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'T-shirt'
            },
            unit_amount: 2000
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: 'http://localhost:8080/thank-you',
      cancel_url: 'http://localhost:8080/cart'
    })

    res.json({id: session.id})
  } catch (err) {
    next(err)
  }
})
