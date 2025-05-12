import { useState, useEffect } from 'react'

const styles = {
  overlay: {
    display: 'flex',
    //flexDirection: 'column',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    margin: '0',
    padding: '0',
    background: 'rgba(0,0,0,0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%',
    objectFit: 'contain',
    flexShrink: 1,
    minWidth: 0,
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

function ImageOverlay({ image, closeOverlay, nextImage }) {
  const [showInfo, setShowInfo] = useState(true)

  return (
    <div style={styles.overlay}>

      {showInfo && <div style={styles.infoBox}>
        {image.title && <h3>{image.title}</h3>}
        {image.comment && <div>
          {image.comment.split('\n').map((line, index) => (
            <p key={line+index}>{line}</p>
          ))}
        </div>}
        {image.rating && <p style={styles.smallText}>rating: {image.rating}</p>}
        {image.tags && <p style={styles.smallText}>{image.tags.length > 0 && 'tags: '}{image.tags.join("; ")}</p>}
      </div>}

      <img src={image.image} style={styles.image} />

      <div onClick={()=>setShowInfo(!showInfo)} style={styles.toggleInfo} ></div>
      <div onClick={()=>nextImage(1)} style={styles.next} ></div>
      <div onClick={()=>nextImage(-1)} style={styles.prev} ></div>
      <span onClick={()=>closeOverlay()} style={styles.close} >&times;</span>
    </div>
  )
}

export default ImageOverlay
