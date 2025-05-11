import { useState, useRef, useEffect } from 'react'
import '../App.css'
import './HeaderTools.css'

const aspectString = ['square', 'landscape', 'portrait']

function HeaderTools({ setAspect }) {
  const [aspectIndex, setAspectIndex] = useState(0)
  const folderInputRef = useRef(null)

  useEffect(() => {
    // You need to add non standard element attributes like this in react
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute('webkitdirectory', '')
      folderInputRef.current.setAttribute('directory', '')
      folderInputRef.current.setAttribute('mozdirectory', '')
    }
  }, [])

  const nextAspect = () => {
    let currentAspect = aspectIndex + 1
    if (currentAspect > 2) currentAspect = 0
    setAspectIndex(currentAspect)
    setAspect(aspectString[currentAspect])
  }

  const handleFolderChange = (e) => {
    const files = Array.from(e.target.files)
    console.log('Selected files:', files)
  }

  return (
    <header>
      <input 
        type="file" 
        ref={folderInputRef}
        id="folderInput" 
        multiple 
        accept="image/*,.heic,.webp,.svg,.bmp,.tiff,.ico,.ip,.iw,.ij,ig"
        onChange={handleFolderChange}
      />
      <div className="select-box">
        <select id="tagSelect" multiple>
        </select>
        <div className="selected-items"></div>
        <div className="options"></div>
      </div>
      <div>
        <span>Filter: </span>
        <input type="text" id="textFilter"/>
      </div>
      <div>
        <p>Sort:  </p>
        <button id="sortByName">Name</button>
        <button id="sortByRating">Rating</button>
      </div>
      <div>
        <p>Aspect</p>
        <button onClick={nextAspect}>{aspectString[aspectIndex][0].toUpperCase()}</button>
      </div>
      <div>
        <p>Size:  </p>
        <button >S</button>
        <button >M</button>
        <button >L</button>
        <button >XL</button>
      </div>
    </header>
  )
}

export default HeaderTools
