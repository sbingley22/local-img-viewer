import React, { useState, useEffect } from 'react'

function TagsTool({ images, tags, setTags }) {
  const [allTags, setAllTags] = useState([])

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

  const sortTagsByAmount = (tagsDict) => {
    const entries = Object.entries(tagsDict)
    entries.sort(([, amountA], [, amountB]) => amountB - amountA)
    const tagList = entries.map(([tag]) => tag)
    setAllTags(tagList)
    console.log(tagList)
  }

  const removeTag = (tag) => {
    console.log("Removing Tag!", tag)
    const index = tags.indexOf(tag)
    if (index > -1) {
      const tempTags = [...tags]
      tempTags.splice(index, 1)
      setTags(tempTags)
    }
  }

  return (
    <div className="select-box">
      <select id="tagSelect" multiple>
      </select>

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

      <div className="options">
        {allTags.map((tag, index) => (
          <label key={tag}>
            <input name="tags" value={tag} type='checkbox' checked={tags.includes(tag)} />
            <option value={tag}>{tag}</option>
          </label>
        ))}
      </div>
    </div>
  )
}

export default TagsTool
