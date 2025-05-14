const styles = {
  HtmlGalleryContainer: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  htmlLink: {
    border: '2px solid #111',
    margin: '5px',
    padding: '5px 10px',
    borderRadius: '20%',
    background: '#000',
    color: '#ddd',
  }
}
function HtmlGallery({ htmlLinks }) {
  return (
    <div style={styles.HtmlGalleryContainer}>
      {htmlLinks.map(({name, link}, index) => (
        <a 
          key={name + index}
          style={styles.htmlLink}
          href={link} 
          target="_blank" 
          rel="noopener noreferrer"
        >
          {name.slice(0, name.lastIndexOf('.'))}
        </a>
      ))}
    </div>
  )
}

export default HtmlGallery
