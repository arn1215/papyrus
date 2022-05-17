import Quill from "quill"
import ReactQuill from "react-quill"
import '../../node_modules/react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react"




const RichText = () => {
  const [content, setContent] = useState()
  
  const handleContent = e => {
    console.log(e)
    setContent(e)
  }
  return (
    <div id='container' >
      <h1>name</h1>
      <ReactQuill
      style={{width: '65%', height: '100%'}}
      placeholder="Write a new note." 
      value={content}
      onChange={handleContent}
      />
    </div>
  )
}


export default RichText