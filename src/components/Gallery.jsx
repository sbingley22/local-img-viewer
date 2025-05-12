import { useState, useEffect } from 'react'
import Thumbnail from './Thumbnail.jsx'
import ImageOverlay from './ImageOverlay.jsx'

const styles = {
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
  }
}

function Gallery({ images, tags, aspect, thumbSize, sortBy }) {
  const [displayImages, setDisplayImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedDisplayIndex, setSelectedDisplayIndex] = useState(null)

  useEffect(()=>{
    const tempArray = []
    images.forEach((img,ind) => {
      tempArray.push(ind)
    })
    setDisplayImages(tempArray)
  }, [images])

  const showImage = (imgInd, displayIndex=null) => {
    setSelectedImage(imgInd)
    setSelectedDisplayIndex(displayIndex)
  }

  const closeOverlay = () => {
    setSelectedImage(null)
  }

  const nextImage = (direction=1) => {
    let nextDisplayIndex = selectedDisplayIndex + direction
    if (nextDisplayIndex >= displayImages.length) nextDisplayIndex = 0
    else if (nextDisplayIndex < 0) nextDisplayIndex = displayImages.length -1
    setSelectedImage(displayImages[nextDisplayIndex])
    setSelectedDisplayIndex(nextDisplayIndex)
    //console.log("next image: ", nextDisplayIndex, displayImages[nextDisplayIndex])
  }
  
  return (
    <div style={styles.gallery} >
      {displayImages.map((imageIndex, index) => (
        <Thumbnail 
          key={images[imageIndex].fileName} 
          image={images[imageIndex]}
          displayIndex={index}
          imageIndex={imageIndex}
          showImage={showImage}
        />
      ))}

      {selectedImage !== null && <ImageOverlay 
        image={images[selectedImage]}
        closeOverlay={closeOverlay}
        nextImage={nextImage}
      />}
    </div>
  )
}

export default Gallery
