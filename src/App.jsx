import { useState } from 'react'
import './App.css'
import HeaderTools from './components/HeaderTools.jsx'
import Gallery from './components/Gallery.jsx'
import HtmlGallery from './components/HtmlGallery.jsx'

function App() {
  const [images, setImages] = useState([])
  const [tags, setTags] = useState([])
  const [aspect, setAspect] = useState('square')
  const [thumbSize, setThumbSize] = useState('S')
  const [sortBy, setSortBy] = useState('name')
  const [htmlLinks, setHtmlLinks] = useState([])
  const [showImages, setShowImages] = useState(true)
  const [showVideos, setShowVideos] = useState(true)
  const [showComics, setShowComics] = useState(true)
  const [showHtmlLinks, setShowHtmlLinks] = useState(true)

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
        setHtmlLinks={setHtmlLinks}
        showImages={showImages}
        setShowImages={setShowImages}
        showVideos={showVideos}
        setShowVideos={setShowVideos}
        showComics={showComics}
        setShowComics={setShowComics}
        showHtmlLinks={showHtmlLinks}
        setShowHtmlLinks={setShowHtmlLinks}
      />

      {showHtmlLinks && <HtmlGallery
        htmlLinks={htmlLinks}
      />}

      <Gallery
        images={images}
        tags={tags}
        aspect={aspect}
        thumbSize={thumbSize}
        sortBy={sortBy}
        showImages={showImages}
        showVideos={showVideos}
        showComics={showComics}
      />
    </>
  )
}

export default App
