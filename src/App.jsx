import { useState } from 'react'
import './App.css'
import HeaderTools from './components/HeaderTools.jsx'
import Gallery from './components/Gallery.jsx'

function App() {
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])
  const [aspect, setAspect] = useState('square')
  const [thumbSize, setThumbSize] = useState('S')
  const [sortBy, setSortBy] = useState('name')

  return (
    <>
      <HeaderTools 
        images={images}
        setImages={setImages}
        tags={tags}
        setTags={setTags}
        setAspect={setAspect}
        setThumbSize={setThumbSize}
        setSortBy={setSortBy}
      />

      <Gallery
        images={images}
        tags={tags}
        aspect={aspect}
        thumbSize={thumbSize}
        sortBy={sortBy}
      />
    </>
  )
}

export default App
