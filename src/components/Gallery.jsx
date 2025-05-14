import { useState, useEffect } from 'react'
import Thumbnail from './Thumbnail.jsx'
import ImageOverlay from './ImageOverlay.jsx'

const styles = {
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
    maxHeight: '100%',
    overflowY: 'auto',
    justifyContent: 'center',
  }
}

function Gallery({ images, tags, aspect, thumbSize, sortBy, showImages, showVideos, showComics }) {
  const [displayImages, setDisplayImages] = useState([])
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedDisplayIndex, setSelectedDisplayIndex] = useState(null)
  const [showInfo, setShowInfo] = useState(true)

  // Filter by tags
  useEffect(()=>{
    if (tags.length < 1) {
      resetFilters()
      return
    }

    const tempArray = []
    displayImages.forEach((di) => {
      const img = images[di]
      let missingTag = false
      tags.forEach(tag => {
        if (!img.tags.includes(tag)) missingTag = true
      })
      if (!missingTag) tempArray.push(di)
    })
    setDisplayImages(tempArray)
  }, [tags])

  // Sort by
  useEffect(()=>{
    const tempArray = [...displayImages]
    if (sortBy === 'name') {
      tempArray.sort((a, b) => {
        const imgNameA = images[a].fileName
        const imgNameB = images[b].fileName
        if (imgNameA > imgNameB) return 1
        if (imgNameA < imgNameB) return -1
        return 0
      })
    }
    else if (sortBy === 'rating') {
      tempArray.sort((a, b) => {
        const imgRatingA = images[a].rating
        const imgRatingB = images[b].rating
        if (imgRatingA > imgRatingB) return -1
        if (imgRatingA < imgRatingB) return 1
        return 0
      })
    }
    else if (sortBy === "type") {
      tempArray.sort((a, b) => {
        const fileTypeA = images[a].fileType
        const fileTypeB = images[b].fileType
        if (fileTypeA > fileTypeB) return 1
        if (fileTypeA < fileTypeB) return -1
        return 0
      })
    }
    setDisplayImages(tempArray)
  }, [sortBy])

  // Load all images
  useEffect(()=>{
    resetFilters()
  }, [images])

  const resetFilters = () => {
    const tempArray = []
    images.forEach((img,ind) => {
      tempArray.push(ind)
    })
    setDisplayImages(tempArray)
  }

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
  }

  return (
    <div style={styles.gallery}>
      {displayImages.map((imageIndex, index) => {
        const image = images[imageIndex]
        if (!showImages && image.fileType === "img") return null
        if (!showVideos && image.fileType === "video") return null
        if (!showComics && image.fileType === "comic") return null

        return (
          <Thumbnail 
            key={image.fileName} 
            image={image}
            displayIndex={index}
            imageIndex={imageIndex}
            showImage={showImage}
            aspect={aspect}
            thumbSize={thumbSize}
          />
        )
      })}

      {selectedImage !== null && <ImageOverlay 
        image={images[selectedImage]}
        closeOverlay={closeOverlay}
        nextImage={nextImage}
        showInfo={showInfo}
        setShowInfo={setShowInfo}
      />}
    </div>
  )
}

export default Gallery
