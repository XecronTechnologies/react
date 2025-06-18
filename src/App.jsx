import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import RestaurantWebsite from './RestaurantWebsite'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <RestaurantWebsite />
    </>
  )
}

export default App
