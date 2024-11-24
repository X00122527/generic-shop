import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Homepage from './components/HomePage/Homepage'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Homepage></Homepage>
      <Footer></Footer>
    </>
  )
}

export default App
