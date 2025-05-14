import React, { useState, useEffect, useRef } from 'react'

function TagsTool({ images, tags, setTags }) {
  const [allTags, setAllTags] = useState([])
  const [showOptions, setShowOptions] = useState(false)
  const boxRef = useRef(null)

  useEffect(()=>{
    if (!images || images.length < 1) return

    const tagsDict = {}
    images.forEach(img => {
      img.tags.forEach(t => {
        if (tagsDict[t]) tagsDict[t] += 1
        else tagsDict[t] = 1
      })
    });
    sortTagsByAmount(tagsDict)
  }, [images])

  useEffect(() => {
    const hideOptions = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowOptions(false)
      }
    }

    document.addEventListener('click', hideOptions)
    return () => {
      document.removeEventListener('click', hideOptions)
    }
  })

  const sortTagsByAmount = (tagsDict) => {
    const entries = Object.entries(tagsDict)
    entries.sort(([, amountA], [, amountB]) => amountB - amountA)
    const tagList = entries.map(([tag]) => tag)
    setAllTags(tagList)
    //console.log(tagList)
  }

  const removeTag = (tag) => {
    const index = tags.indexOf(tag)
    if (index > -1) {
      const tempTags = [...tags]
      tempTags.splice(index, 1)
      setTags(tempTags)
    }
  }

  const handleTagChange = (e) => {
    const checked = e.target.checked
    const value = e.target.value

    if (checked && !tags.includes(value)) {
      const tempTags = [...tags]
      tempTags.push(value)
      setTags(tempTags)
    }
    else {
      // remove tag from list
      removeTag(value)
    }
  }

  return (
    <div 
      ref={boxRef}
      className="select-box"
      onClick={()=>setShowOptions(true)}
    >
      <div className="selected-items">
        {tags.length < 1 ?
          "Select tags"
        :
          tags.map((tag) => (
            <div key={tag} className='item'>
              {tag}
              <span onClick={()=>removeTag(tag)} className='close'>X</span>
            </div>
          ))
        }
      </div>

      <div className="options" style={{display: showOptions ? 'block' : 'none'}}>
        {allTags.map((tag, index) => (
          <label key={tag}>
            <input 
              name="tags" 
              value={tag} type='checkbox' 
              checked={tags.includes(tag)} 
              onChange={(e)=>handleTagChange(e)}
            />
            <option value={tag}>{tag}</option>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TagsTool
