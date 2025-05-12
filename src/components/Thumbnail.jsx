import { useState } from 'react'

const styles = {
  thumb: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    border: '1px solid #ccc',
    cursor: 'pointer',
  }
}

function Thumbnail({ image, displayIndex, imageIndex, showImage }) {
  return (
    <div>
      <img 
        style={styles.thumb}
        src={image.image} 
        onClick={()=>showImage(imageIndex, displayIndex)}
      />
    </div>
  )
}

export default Thumbnail
