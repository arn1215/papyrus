
import ReactQuill from "react-quill"
import '../../node_modules/react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, editNote } from "../store/note";
import { useHistory, useParams } from "react-router-dom";
import './rich.css'
import parse from 'html-react-parser'
import Popup from "reactjs-popup";




const RichText = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const [errors, setErrors] = useState([]);
  const note = useSelector(state => state.notes[params.id])
  const user = useSelector(state => state.session.user);
  const [content, setContent] = useState(note?.content)
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('#ebebeb')
  const [fontColor, setFontColor] = useState('darkslate')
  
  const onClick = async () => {
    let string = content.replace(/<[^>]+>/g, '')
    const updatedNote = {
      title: note?.title,
      content: string,
      id: params.id
    }
    
    const data = await dispatch(editNote(updatedNote))
    
    if (data) {
      setErrors(data.errors);
    }
  
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

  const toggle = () => { setOpen(!open) }

  const onDelete = () => {
    dispatch(deleteNote(params.id))
    history.push('/notebooks/')

  }
  
  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
  }, [])

  const handleContent = e => {
    setContent(e)
   
  }

  return (
    <div id='container' style={{ backgroundColor: `${color}`, color: `${fontColor}` }}>
      <div className="title">
        <h3 style={{ marginTop: '7%' }}>{note?.title}</h3>
      </div>
      <ReactQuill
        style={{ width: '65%', height: '100%' }}
        placeholder="Write a new note."
        value={content}
        onChange={handleContent}
      />
      <div className="buttons">
        <button className="save" onClick={onTheme}>toggle theme</button>
        <button className="save" onClick={onClick}>save</button>
        {<div style={{marginTop: '20px', width:'150px'}}>{errors}</div>}
        <button className='save red' onClick={toggle}>delete</button>
        <Popup
          open={open}
          onClose={() => setOpen(false)}
        >

          <div className="button-container" style={{ display: 'flex', flexDirection: "column", alignItems: "center", height: '200px', width: '300px' }}>
            <p>Are you sure?</p>
            <div className="button-container">
              <button className="logout yes" style={{margin: '20px'}} onClick={onDelete}>Yes</button>
              <button className="logout yes" style={{margin: '20px'}} onClick={() => setOpen(false)}>No</button>
            </div>
          </div>
        </Popup>
      </div>
    </div>
  )
}


export default RichText