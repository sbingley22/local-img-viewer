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

  const handleClick = (e, imageIndex, displayIndex) => {
    if (e.button === 0) {
      showImage(imageIndex, displayIndex);
    } else if (e.button === 1 || e.button === 2) {
      let comment = null
      if (image.comment && e.button === 1) comment = image.comment
      const newTab = window.open('', '_blank');
      if (newTab) {
        const imageHTML = generateImageHTML(image.image, comment);
        newTab.document.write(imageHTML);
        newTab.document.close();
      }
    }
  };

  return (
    <div>
      <img 
        ref={imgRef}
        style={styles.thumb}
        src={image.image} 
        onMouseDown={(e)=>handleClick(e, imageIndex, displayIndex)}
        title={hoverText}
      />
    </div>
  )
}

const generateImageHTML = (imageUrl, title = '') => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Image Viewer</title>
        <style>
          * {
            box-sizing: border-box;
          }

          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 0;
            background-color: #000;
          }
          .image-container {
            background-color: #111;
            padding: 0px;
            margin: 0px;
            border-radius: 8px;
            text-align: center;
            display: flex;
            align-items: center;
          }
          img {
            max-width: 100vw;
            max-height: 100vh;
            display: block;
            margin: 0px;
            min-width: 0;
            flex-shrink: 1;
          }
          .image-title {
            font-size: 1.0em;
            color: #999;
            max-width: 300px;
            margin: 0px;
            padding: 20px;
            overflow-y: auto;
          }
        </style>
      </head>
      <body>
        <div class="image-container">
          <img src="${imageUrl}" alt="${title}">
          ${title ? `<p class="image-title">${title}</p>` : ''}
        </div>
      </body>
      </html>
    `;
  };

export default Thumbnail
