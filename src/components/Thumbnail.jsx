import React, { useEffect, useRef } from 'react'

const styles = {
  thumb: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
}

function Thumbnail({ image, displayIndex, imageIndex, showImage, aspect, thumbSize }) {
  const imgRef = useRef()
  
  let hoverText = ""
  if (image.title) hoverText = image.title
  else if (image.comment) hoverText = image.comment
  else if (image.fileName) hoverText = image.fileName

  // Adjust thumb size
  useEffect(()=>{
    let height = 150
    if (thumbSize === "M") {
      height = 300
    }
    else if (thumbSize === "L") {
      height = 500
    }
    else if (thumbSize === "XL") {
      height = 800
    }
    imgRef.current.style.height = height + 'px'

    if (aspect === 'landscape') {
      imgRef.current.style.width = Math.floor(height * 1.9) + 'px'
    }
    else if (aspect === 'portrait') {
      imgRef.current.style.width = Math.floor(height / 1.5) + 'px'
    }
    else {
      imgRef.current.style.width = height + 'px'
    }
  }, [aspect, thumbSize])

  return (
    <div>
      <img 
        ref={imgRef}
        style={styles.thumb}
        src={image.image} 
        onClick={()=>showImage(imageIndex, displayIndex)}
        title={hoverText}
      />
    </div>
  )
}

export default Thumbnail
