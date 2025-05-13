import { useState, useRef, useEffect } from 'react'
import exifr from 'exifr'
import JSZip from 'jszip'
import '../App.css'
import './HeaderTools.css'
import TagsTool from './TagsTool'

const aspectString = ['square', 'landscape', 'portrait']
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff', '.ico', '.heic', '.ip', '.ij', '.iw', '.cbz'];

function HeaderTools({ images, setImages, tags, setTags, setAspect, setThumbSize, setSortBy }) {
  const [aspectIndex, setAspectIndex] = useState(0)
  const folderInputRef = useRef(null)

  useEffect(() => {
    // You need to add non standard element attributes like this in react
    if (folderInputRef.current) {
      folderInputRef.current.setAttribute('webkitdirectory', '')
      folderInputRef.current.setAttribute('directory', '')
      folderInputRef.current.setAttribute('mozdirectory', '')
    }
  }, [])

  const nextAspect = () => {
    let currentAspect = aspectIndex + 1
    if (currentAspect > 2) currentAspect = 0
    setAspectIndex(currentAspect)
    setAspect(aspectString[currentAspect])
  }
  
  const handleFolderChange = async (e) => {
    const files = Array.from(e.target.files).filter(file => {
      const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
      return file.type.startsWith('image/') || imageExtensions.includes(ext);
    });

    const jpgType = ['.jpg', '.jpeg', '.tif', '.webp', '.avif', '.ij', '.iw'];
    const pngType = ['.png', '.ip'];
    const comicType = ['.cbz']

    const processFile = (file) => {
      return new Promise((resolve) => {
        const ext = file.name.toLowerCase().slice(file.name.lastIndexOf('.'));
        const isPNG = pngType.includes(ext);
        const isJPG = jpgType.includes(ext);
        const isCBZ = comicType.includes(ext)

        let comment = null, rating = null, tags = [], title = null, subject = [];

        if (isPNG) {
          const reader = new FileReader();
          reader.onload = e => {
            const text = new TextDecoder().decode(e.target.result);
            const xmpStart = text.indexOf("<x:xmpmeta");
            const xmpEnd = text.indexOf("</x:xmpmeta>");

            if (xmpStart !== -1 && xmpEnd !== -1) {
              const xmpData = text.slice(xmpStart, xmpEnd + 12);
              const parser = new DOMParser();
              const xmlDoc = parser.parseFromString(xmpData, "text/xml");
              const get = sel => xmlDoc.querySelector(sel)?.textContent.trim();
              comment = get("exif\\:UserComment") || get("UserComment") || get("rdf\\:li");
              rating = parseInt(get("Rating") || get("xmp\\:Rating") || '') || null;
              title = get("dc\\:title > rdf\\:Alt > rdf\\:li");
              const subj = get("dc\\:subject > rdf\\:Bag > rdf\\:li");
              if (subj) subject.push(subj);
              const tagNodes = xmlDoc.querySelectorAll("subject > Bag > li");
              tagNodes.forEach(node => tags.push(node.textContent.trim()));
            }

            const displayReader = new FileReader();
            displayReader.onload = evt => {
              resolve({
                image: evt.target.result,
                fileName: file.name,
                fileType: 'img',
                comment,
                rating,
                tags,
                title,
                subject,
              });
            };
            displayReader.readAsDataURL(file);
          };
          reader.readAsArrayBuffer(file);
        } 
        else if (isJPG) {
          exifr.parse(file, { xmp: true }).then(meta => {
            comment = meta?.XPComment || '';
            rating = meta?.Rating || null;
            tags = meta?.Subject || [];
            title = meta?.XPTitle || null;
            if (Array.isArray(meta?.subject)) subject = meta.subject;
            subject.forEach(s => tags.push(s));

            const displayReader = new FileReader();
            displayReader.onload = evt => {
              resolve({
                image: evt.target.result,
                fileName: file.name,
                fileType: 'img',
                comment,
                rating,
                tags,
                title,
                subject,
              });
            };
            displayReader.readAsDataURL(file);
          }).catch(() => resolve(null));
        } 
        else if (isCBZ) {
          const zip = new JSZip();
          zip.loadAsync(file).then(async (unzipped) => {
            const images = [];
            const supportedImageExtensions = ['.jpg', '.jpeg', '.png'];

            // Sort files by name to preserve page order
            const files = Object.keys(unzipped.files).sort();

            for (const fileName of files) {
              const ext = fileName.toLowerCase().match(/\.\w+$/)?.[0];
              const isImage = supportedImageExtensions.includes(ext);
              const isMetaXML = fileName.toLowerCase().includes("comicinfo.xml");

              if (isImage) {
                const blob = await unzipped.files[fileName].async("blob");
                const dataUrl = await new Promise(resolve => {
                  const reader = new FileReader();
                  reader.onload = e => resolve(e.target.result);
                  reader.readAsDataURL(blob);
                });

                images.push({
                  name: fileName,
                  dataUrl,
                });
              } else if (isMetaXML) {
                const xmlText = await unzipped.files[fileName].async("text");
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, "text/xml");

                const get = (tag) => xmlDoc.querySelector(tag)?.textContent.trim();

                comment = get("Summary");
                rating = parseInt(get("Rating") || '') || null;
                title = get("Title");
                const subjects = [...xmlDoc.querySelectorAll("Genre")].map(n => n.textContent.trim());
                tags = [...subjects];
                subject = subjects;
              }
            }

            resolve({
              images, // array of pages
              fileName: file.name,
              fileType: 'comic',
              comment,
              rating,
              tags,
              title,
              subject,
            });

          }).catch(err => {
            console.error("CBZ parse error:", err);
            resolve(null);
          });
        }
        else {
          const reader = new FileReader();
          reader.onload = () => {
            const displayReader = new FileReader();
            displayReader.onload = evt => {
              resolve({
                image: evt.target.result,
                fileName: file.name,
                fileType: 'img',
                comment,
                rating,
                tags,
                title,
                subject,
              });
            };
            displayReader.readAsDataURL(file);
          };
          reader.readAsArrayBuffer(file);
        }
      });
    };

    const allImageData = await Promise.all(files.map(processFile));
    setImages(allImageData.filter(Boolean)); // Remove any failed/null entries
  };

  const thumbSizeChange = (newSize) => {
    setThumbSize(newSize)
  }

  return (
    <header>
      <input 
        type="file" 
        ref={folderInputRef}
        id="folderInput" 
        multiple 
        accept="image/*,.heic,.webp,.svg,.bmp,.tiff,.ico,.ip,.iw,.ij,ig"
        onChange={handleFolderChange}
      />
      <TagsTool
        images={images}
        tags={tags}
        setTags={setTags}
      />
      <div>
        <p>Sort:  </p>
        <button onClick={()=>setSortBy('name')}>Name</button>
        <button onClick={()=>setSortBy('rating')}>Rating</button>
      </div>
      <div>
        <p>Aspect</p>
        <button onClick={nextAspect}>{aspectString[aspectIndex][0].toUpperCase()}</button>
      </div>
      <div>
        <p>Size:  </p>
        <button onClick={()=>thumbSizeChange('S')}>S</button>
        <button onClick={()=>thumbSizeChange('M')}>M</button>
        <button onClick={()=>thumbSizeChange('L')}>L</button>
        <button onClick={()=>thumbSizeChange('XL')}>XL</button>
      </div>
    </header>
  )
}

export default HeaderTools
