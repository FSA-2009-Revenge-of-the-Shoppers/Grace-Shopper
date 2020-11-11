import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      {/* {make the cart state available in navbar component} */}
      <Routes />
    </div>
  )
}

export default App
