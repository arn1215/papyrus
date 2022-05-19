
import ReactQuill from "react-quill"
import '../../node_modules/react-quill/dist/quill.snow.css';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editNote } from "../store/note";
import { useParams } from "react-router-dom";
import './rich.css'



const RichText = () => {
  
  const dispatch = useDispatch()
  const params = useParams()
  const note = useSelector(state => state.notes[params.id])
  const [content, setContent] = useState(note?.content)

  const onClick = async () => { 
    
    const updatedNote = {
      title: note?.title,
      content,
      id: params.id
    }
    console.log(updatedNote)
    await dispatch(editNote(updatedNote))
  }

  const handleContent = e => {
    console.log(e)
    setContent(e)
  }

  return (
    <div id='container' >
      <h1 style={{marginTop: '7%'}}>{note?.title}</h1>
      <ReactQuill
      style={{width: '65%', height: '100%'}}
      placeholder="Write a new note." 
      value={content}
      onChange={handleContent}
      />
      <button  className="save" onClick={onClick}>save</button>
    </div>
  )
}


export default RichText