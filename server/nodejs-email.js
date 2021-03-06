const nodemailer = require('nodemailer')
const router = require('express').Router()

module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const {email, cart, total} = req.body

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'yodaddyshop@gmail.com',
        pass: process.env.GMAIL_PASSWORD
      }
    })

    const message = {
      from: 'yodaddyshop@gmail.com',
      to: email,
      subject:
        'Your Receipt this is. Shopping with YoDaddy today we thank you for!',
      html: `
        <h1>Your YoDaddy Receipt</h1>
        <h4>Total: $${total}</h4>
        ${cart
          .map(item => {
            return `<p>${item.name}</p>
            <p>${item.productOrder.quantity} x $${
              item.productOrder.savedPrice
            }</p>`
          })
          .join('')}
        <a href="https://yodaddy.herokuapp.com/home">Shop Again</a>
      `
    }

    await transport.sendMail(message, (err, info) => {
      if (err) {
        console.log(err)
      } else {
        console.log('Successfully sent E-Mail Receipt')
      }
    })
  } catch (err) {
    next(err)
  }
})
