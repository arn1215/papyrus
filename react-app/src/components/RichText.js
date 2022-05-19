
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
  const [color, setColor] = useState('#ebebeb')
  const [fontColor, setFontColor] = useState('darkslate')

  const onClick = async () => { 
    
    const updatedNote = {
      title: note?.title,
      content,
      id: params.id
    }
    console.log(updatedNote)
    await dispatch(editNote(updatedNote))
  }

  const onTheme = () => {
    if (color === 'rgb(71, 64, 61)') {
      setColor('#ebebeb')
      setFontColor('black')
    } else {
      setFontColor('aliceblue')
      setColor('rgb(71, 64, 61)')
    }
  }

  const handleContent = e => {
    console.log(e)
    setContent(e)
  }

  return (
    <div id='container' style={{backgroundColor: `${color}`, color: `${fontColor}`}}>
      <div className="title">
        <h3 style={{marginTop: '7%'}}>{note?.title}</h3>
      </div>
      <ReactQuill
      style={{width: '65%', height: '100%'}}
      placeholder="Write a new note." 
      value={content}
      onChange={handleContent}
      />
      <div className="buttons">
        <button  className="save" onClick={onTheme}>dark mode</button>
        <button  className="save" onClick={onClick}>save</button>
      </div>
    </div>
  )
}


export default RichText