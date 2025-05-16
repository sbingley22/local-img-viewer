import { useState, useEffect, useRef } from 'react'

const styles = {
  overlay: {
    display: 'flex',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
    background: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'start',
    zIndex: 1000,
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    flexShrink: 1,
    minWidth: 0,
  },
  comic: {
    width: '100%',
  },
  video: {
    justifySelf: 'center',
    alignSelf: 'center',
  },
  close: {
    position: 'absolute',
    padding: 0,
    margin: 0,
    top: '0px',
    right: '20px',
    fontSize: '60px',
    color: '#888',
    cursor: 'pointer',
  },
  next: {
    position: 'absolute',
    padding: 0,
    margin: 0,
    top: '0px',
    right: '0px',
    cursor: 'pointer',
    width: '100px',
    height: '100vh',
  },
  prev: {
    position: 'absolute',
    padding: 0,
    margin: 0,
    top: '0px',
    left: '0px',
    cursor: 'pointer',
    width: '100px',
    height: '100vh',
  },
  toggleInfo: {
    position: 'absolute',
    padding: 0,
    margin: 0,
    top: '0px',
    left: '0px',
    cursor: 'pointer',
    width: '100vw',
    height: '100px',
  },
  infoBox: {
    minWidth: '200px',
    maxWidth: '400px',
    width: '300px',
    height: '100vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallText: {
    fontSize : '0.8rem',
    margin: 0,
  },
}

function ImageOverlay({ image, closeOverlay, nextImage, showInfo, setShowInfo }) {
  const [widthZoom, setWidthZoom] = useState(false)
  const imgRef = useRef()

  useEffect(()=>{
    if (!imgRef || !imgRef.current) return
    if (widthZoom) {
      imgRef.current.style.width = '100%'
      imgRef.current.style.maxHeight = 'none'
    }
    else {
      imgRef.current.style.width = 'auto'
      imgRef.current.style.maxHeight = '100%'
    }
  }, [widthZoom])

  // Hide info if not an image
  useEffect(()=>{
    if (image.fileType === "img") return 
    if (showInfo) setShowInfo(false)
  }, [image])

  const comicSize = (e) => {
    if (e.target.parentElement.localName !== "div") return
    const div = e.target.parentElement
    console.log(div, div.style)
    if (div.style.width === "50%") div.style.width = "100%"
    else div.style.width = "50%"
  }

  let fileType = 'img'
  if (image.fileType === 'comic') fileType = 'comic'
  else if (image.fileType === 'video') fileType = 'video'

  return (
    <div 
      style={styles.overlay} 
      onClick={(e) => {
        if (e.target === e.currentTarget) closeOverlay()
      }}
    >

      {showInfo && <div 
          style={styles.infoBox}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeOverlay()
          }}
        >
        {image.title && <h3>{image.title}</h3>}
        {image.comment && <div>
          {image.comment.split('\n').map((line, index) => (
            <p key={line+index}>{line}</p>
          ))}
        </div>}
        {image.rating && <p style={styles.smallText}>rating: {image.rating}</p>}
        {image.tags && <p style={styles.smallText}>{image.tags.length > 0 && 'tags: '}{image.tags.join("; ")}</p>}
      </div>}

      {fileType === 'img' && <img 
        ref={imgRef}
        src={image.image} 
        style={styles.image} 
        onClick={()=>setWidthZoom(!widthZoom)}
      />}

      {fileType === 'comic' && <div onClick={(e)=>comicSize(e)}> 
        {image.images.map((i,index)=> (
          <img
            key={'comicPage'+index}
            src={i.dataUrl} 
            style={styles.comic} 
          />
        ))}
      </div>}

      {fileType === 'video' && <video controls style={styles.video}>
        <source 
          src={image.video} 
          type='video/mp4' 
        />
      </video>}

      <div onClick={()=>setShowInfo(!showInfo)} style={styles.toggleInfo} ></div>
      <div onClick={()=>nextImage(1)} style={styles.next} ></div>
      <div onClick={()=>nextImage(-1)} style={styles.prev} ></div>
      <span onClick={()=>closeOverlay()} style={styles.close} >&times;</span>
    </div>
  )
}

export default ImageOverlay
