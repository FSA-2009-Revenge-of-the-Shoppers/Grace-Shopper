'use strict'

const db = require('../server/db')
const {User, Product, Cart} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', admin: true}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'jam@msn.net', password: '456'}),
    User.create({email: 'babyyodalover@aol.com', password: 'yoda4ever'}),
    User.create({email: 'darthmaul@sith.gov', password: 'iluvthedarkside'}),
    User.create({
      email: 'obiwan@jediacademy.edu',
      password: 'padawan',
      admin: true
    }),
    User.create({
      email: 'bigyoda@thecouncil.org',
      password: 'amialone?',
      admin: true
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Sleepy Baby Yoda',
      description: 'This baby yoda is ready for its nap.',
      imageUrl:
        'https://i.pinimg.com/564x/68/37/17/68371744abc400c63e81e07ad3f348e9.jpg',
      price: 20.0
    }),
    Product.create({
      name: 'Hungry Baby Yoda',
      description: 'This baby yoda wants its nom nom.',
      imageUrl:
        'https://i.pinimg.com/564x/f6/c5/36/f6c5362760240453788a4257c748a0b1.jpg',
      price: 30.0
    }),
    Product.create({
      name: '2-D Baby Yoda',
      description: 'This baby yoda has never seen its shadow.',
      imageUrl:
        'https://i.pinimg.com/564x/3d/fe/d7/3dfed78ae979f79f55e982c04d6c98f8.jpg',
      price: 11.0
    }),
    Product.create({
      name: 'Eligible Bachelor Baby Yoda',
      description: 'This baby yoda has a rhyming scheme.',
      imageUrl: 'https://i.redd.it/z51gam338lh41.jpg',
      price: 21.0
    }),
    Product.create({
      name: 'Crochet Baby Yoda',
      description: 'This baby yoda is made of yarn.',
      imageUrl: 'https://i.imgur.com/Sr9iz1Y.jpeg',
      price: 250.0
    }),
    Product.create({
      name: 'Mandodrake',
      description: 'Thank you for this wonderful TV series.',
      imageUrl: 'https://i.imgur.com/fjJQHWB.jpeg',
      price: 49.99
    }),
    Product.create({
      name: 'Halloween Baby Yoda',
      description: 'This baby yoda is spooky.',
      imageUrl: 'https://i.imgur.com/EnTpOsk.jpeg',
      price: 20.0
    }),
    Product.create({
      name: 'Tupperware Baby Yoda',
      description: 'This baby yoda keeps your snacks fresh.',
      imageUrl: 'https://i.imgur.com/MlrHf8n.jpeg',
      price: 13.0
    }),
    Product.create({
      name: 'Lego Baby Yoda',
      description: "It's about time, LEGO.",
      imageUrl: 'https://i.imgur.com/MyyJAXc.jpeg',
      price: 77.77
    }),
    Product.create({
      name: 'Martini Yoda',
      description: 'This baby yoda gets you tipsy.',
      imageUrl: 'https://i.imgur.com/GenT0Qs.jpg',
      price: 14.0
    }),
    Product.create({
      name: 'Lil Nugget Baby Yoda',
      description:
        'Not sure where this meme started, but not mad about it either.',
      imageUrl: 'https://i.imgur.com/YwXye05.jpg',
      price: 4.0
    }),
    Product.create({
      name: 'Patriot Baby Yoda',
      description: 'This baby yoda love its democracy.',
      imageUrl: 'https://i.imgur.com/E3aOcds.jpg',
      price: 1.0
    }),
    Product.create({
      name: 'Disappointed Baby Yoda',
      description: 'This baby yoda expected more of you.',
      imageUrl: 'https://i.imgur.com/0UZYsE7.jpg',
      price: 100.0
    }),
    Product.create({
      name: 'Balloon Baby Yoda',
      description: 'Get that push-pin out of here!',
      imageUrl: 'https://i.imgur.com/4vFXbfi.jpg',
      price: 16.5
    }),
    Product.create({
      name: 'Good Neighbor Baby Yoda',
      description: 'This baby yoda wears a mask to protect its neighbors',
      imageUrl: 'https://i.imgur.com/Igwn9rN.jpeg',
      price: 30.0
    })
  ])

  const carts = await Promise.all([
    Cart.create({productId: 1, userId: 2, quantity: 1}),
    Cart.create({productId: 1, userId: 3, quantity: 4}),
    Cart.create({productId: 2, userId: 5, quantity: 1}),
    Cart.create({productId: 2, userId: 5, quantity: 2}),
    Cart.create({productId: 9, userId: 1, quantity: 3}),
    Cart.create({productId: 3, userId: 2, quantity: 1}),
    Cart.create({productId: 6, userId: 3, quantity: 4}),
    Cart.create({productId: 7, userId: 4, quantity: 5}),
    Cart.create({productId: 1, userId: 1, quantity: 2})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
