
import ReactQuill from "react-quill"
import '../../node_modules/react-quill/dist/quill.snow.css';
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { editNote } from "../store/note";
import { useParams } from "react-router-dom";
import './rich.css'
import Popup from "reactjs-popup";



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
      <div className="title">
        <h3 style={{marginTop: '7%'}}>{note?.title}</h3>
      </div>
      <ReactQuill
      style={{width: '65%', height: '100%'}}
      placeholder="Write a new note." 
      value={content}
      onChange={handleContent}
      />
      <Popup
        trigger={open => (
          <button  className="save" onClick={onClick}>save</button>
        )}
        arrowStyle
        position="top center"
        closeOnDocumentClick
        closeOnEscape
        
        on={'click'}

      >
        <p>Saved!</p>
      </Popup>
    
    </div>
  )
}


export default RichText