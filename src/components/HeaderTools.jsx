import { useState, useRef, useEffect } from 'react'
import '../App.css'
import './HeaderTools.css'
import TagsTool from './TagsTool'
import FolderInput from './FolderInput'

const aspectString = ['square', 'landscape', 'portrait']

function HeaderTools({ images, setImages, tags, setTags, setAspect, setThumbSize, setSortBy, showHtmlLinks, showImages, setShowImages, showVideos, setShowVideos, showComics, setShowComics, setShowHtmlLinks, setHtmlLinks }) {
  const [aspectIndex, setAspectIndex] = useState(0)

  const nextAspect = () => {
    let currentAspect = aspectIndex + 1
    if (currentAspect > 2) currentAspect = 0
    setAspectIndex(currentAspect)
    setAspect(aspectString[currentAspect])
  }
  
  const thumbSizeChange = (newSize) => {
    setThumbSize(newSize)
  }

  return (
    <header>
      <FolderInput 
        setImages={setImages}
        setHtmlLinks={setHtmlLinks}
        showImages={showImages}
        showVideos={showVideos}
        showComics={showComics}
        showHtmlLinks={showHtmlLinks}
      />
      <label>
        <input 
          name="showImages" 
          type='checkbox' 
          checked={showImages} 
          onChange={(e)=>setShowImages(e.target.checked)}
        />
        Images
      </label>
      <label>
        <input 
          name="showVideos" 
          type='checkbox' 
          checked={showVideos} 
          onChange={(e)=>setShowVideos(e.target.checked)}
        />
        Videos
      </label>
      <label>
        <input 
          name="showComics" 
          type='checkbox' 
          checked={showComics} 
          onChange={(e)=>setShowComics(e.target.checked)}
        />
        Comics
      </label>
      <label>
        <input 
          name="showHtml" 
          type='checkbox' 
          checked={showHtmlLinks} 
          onChange={(e)=>setShowHtmlLinks(e.target.checked)}
        />
        Html
      </label>
      <TagsTool
        images={images}
        tags={tags}
        setTags={setTags}
      />
      <div>
        <p>Sort:  </p>
        <button onClick={()=>setSortBy('name')}>Name</button>
        <button onClick={()=>setSortBy('rating')}>Rating</button>
        <button onClick={()=>setSortBy('type')}>Type</button>
      </div>
      <div>
        <p>Aspect</p>
        <button onClick={nextAspect}>{aspectString[aspectIndex][0].toUpperCase()}</button>
      </div>
      <div>
        <p>Size:  </p>
        <button onClick={()=>thumbSizeChange('S')}>S</button>
        <button onClick={()=>thumbSizeChange('M')}>M</button>
        <button onClick={()=>thumbSizeChange('L')}>L</button>
        <button onClick={()=>thumbSizeChange('XL')}>XL</button>
      </div>
    </header>
  )
}

export default HeaderTools
