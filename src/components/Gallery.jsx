import { useState, useEffect } from 'react'
import Thumbnail from './Thumbnail.jsx'

const styles = {
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
  }
}

function Gallery({ images, aspect, }) {
  const [displayImages, setDisplayImages] = useState([])

  useEffect(()=>{
    const tempArray = []
    images.forEach((img, ind) => {
      tempArray.push(ind)
      console.log(ind)
    })
    setDisplayImages(tempArray)
    console.log(images, tempArray)
  }, [images])
  
  return (
    <div style={styles.gallery} >
      {displayImages.map((imageIndex, index) => (
        <Thumbnail 
          key={images[imageIndex].fileName} 
          image={images[imageIndex]}
        />
      ))}
    </div>
  )
}

export default Gallery
