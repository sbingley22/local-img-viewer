import { useState } from 'react'
import './App.css'

function App() {
  const [aspect, setAspect] = useState('square')

  return (
    <>
      <header>
        <div>
          <span>Aspect: </span>
          <button onClick={()=>setAspect('square')}>S</button>
          <button onClick={()=>setAspect('landscape')}>L</button>
          <button onClick={()=>setAspect('portrait')}>P</button>
        </div>
      </header>
    </>
  )
}

export default App
