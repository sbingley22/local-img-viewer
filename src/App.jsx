import { useState } from 'react'
import './App.css'
import HeaderTools from './components/HeaderTools.jsx'
import Gallery from './components/Gallery.jsx'

function App() {
  const [images, setImages] = useState([])
  const [aspect, setAspect] = useState('square')

  return (
    <>
      <HeaderTools 
        setImages={setImages}
        setAspect={setAspect}
      />

      <Gallery
        images={images}
        aspect={aspect}
      />
    </>
  )
}

export default App
