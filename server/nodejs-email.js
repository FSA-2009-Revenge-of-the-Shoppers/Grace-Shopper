const nodemailer = require('nodemailer')
const router = require('express').Router()

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {email, cart, total} = req.body

    const transport = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '19c92fe136a139',
        pass: '89486bdfc2e4f7'
      }
    })

    const message = {
      from: 'danberadi@gmail.com',
      to: email,
      subject: 'This is the Receipt. Thanks for shopping with YoDaddy!',
      html: `
        <h1>Your YoDaddy Receipt</h1>
        <h4>Total: $${total}</h4>
        ${cart.map(item => {
          return `<p>${item.name}</p>
            <p>${item.productOrder.quantity} x $${
            item.productOrder.savedPrice
          }</p>`
        })}
      `
    }

    const messageTest = {
      from: 'danberadi@gmail.com',
      to: email,
      subject: 'This is the Receipt. Thanks for shopping with YoDaddy!',
      text: 'Thanks =)'
    }

    transport.sendMail(messageTest, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log(info)
      }
    })
  } catch (err) {
    next(err)
  }
})
