import { useState } from 'react'
import './App.css'
import HeaderTools from './components/HeaderTools.jsx'

function App() {
  const [aspect, setAspect] = useState('square')

  return (
    <>
      <HeaderTools setAspect={setAspect} />
    </>
  )
}

export default App
