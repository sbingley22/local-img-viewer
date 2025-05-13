import { useState, useRef, useEffect } from 'react'
import '../App.css'
import './HeaderTools.css'
import TagsTool from './TagsTool'
import FolderInput from './FolderInput'

const aspectString = ['square', 'landscape', 'portrait']

function HeaderTools({ images, setImages, tags, setTags, setAspect, setThumbSize, setSortBy }) {
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
      <FolderInput setImages={setImages} />
      <TagsTool
        images={images}
        tags={tags}
        setTags={setTags}
      />
      <div>
        <p>Sort:  </p>
        <button onClick={()=>setSortBy('name')}>Name</button>
        <button onClick={()=>setSortBy('rating')}>Rating</button>
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
