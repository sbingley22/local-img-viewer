import React, { useEffect, useRef } from 'react'

const styles = {
  thumb: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    border: '1px solid #ccc',
    cursor: 'pointer',
  },
  redBorder: {
    borderColor: 'red',
  },
  blueBorder: {
    borderColor: 'blue',
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
      // Show image in overlay
      showImage(imageIndex, displayIndex);
    } 
    else if (e.button === 1 || e.button === 2) {
      // Show image in new tab
      e.preventDefault()

      let comment = null
      let comics = null
      let video = null
      if (image.comment && e.button === 1) comment = image.comment
      if (image.fileType === 'comic') {
        comment = null
        comics = []
        image.images.forEach(i => comics.push(i.dataUrl))
      }
      else if (image.fileType === 'video') {
        comment = null
        video = image.video
      }

      const newTab = window.open('', '_blank');
      if (newTab) {
        const imageHTML = generateImageHTML(image.image, comment, comics, video);
        newTab.document.write(imageHTML);
        newTab.document.close();
      }
    }
  };

  const src = image.fileType === 'comic' ? image.images[0].dataUrl : image.image
  const style = {
    ...styles.thumb,
    ...(image.fileType === 'comic' ? styles.redBorder : {}),
    ...(image.fileType === 'video' ? styles.blueBorder : {})
  }

  return (
    <div>
      <img 
        ref={imgRef}
        style={style}
        src={src} 
        onMouseDown={(e)=>handleClick(e, imageIndex, displayIndex)}
        title={hoverText}
      />
    </div>
  )
}

const generateImageHTML = (imageUrl, title = '', comics = null, video = null) => {
  const isComic = Array.isArray((comics))
  const comicImagesHTML = isComic
    ? comics.map(url => `<img src="${url}" alt="Comic Page" />`).join('\n')
    : '';

  const isVideo = video
  const videoHTML = isVideo
    ? `<video controls><source src="${video}" type="video/mp4" /></video>`
    : '';

  let imgContainerStyle = 'image-container'
  if (isComic) imgContainerStyle += ' comics'
  if (isVideo) imgContainerStyle += ' video'

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
          width: 100%;
        }
        .comics {
          flex-direction: column;
        }
        .video {
          align-items: center;
          justify-content: center;
        }
        .zoom {
          width: 65vw;
        }
        img {
          max-width: 100vw;
          max-height: 100vh;
          display: block;
          margin: 0px;
          min-width: 0;
          flex-shrink: 1;
        }
        .comics img {
          width: 100%;
          max-height: none;
          flex-shrink: 0;
          min-width: auto;
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
      <div id="img-container" class="${imgContainerStyle}" onclick="zoomToggle()">
        ${comicImagesHTML || videoHTML || `<img src="${imageUrl}" alt="${title}">`}
        ${title ? `<p class="image-title">${title}</p>` : ''}
      </div>
      <script>
        const imgContainer = document.getElementById('img-container')
        let zoomed = false
        function zoomToggle() {
          console.log("zooming: ", zoomed)
          if (zoomed) {
            imgContainer.classList.remove('zoom')
          }
          else {
            imgContainer.classList.add('zoom')
          }
          zoomed = !zoomed
        }
      </script>
    </body>
    </html>
  `;
};

export default Thumbnail
