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

function Thumbnail({ image }) {
  return (
    <div>
      <img 
        style={styles.thumb}
        src={image.image} 
      />
    </div>
  )
}

export default Thumbnail
