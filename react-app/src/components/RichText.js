
import ReactQuill from "react-quill"
import '../../node_modules/react-quill/dist/quill.snow.css';
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { deleteNote, editNote, getNote } from "../store/note";
import Draw from "./Draw";
import { useHistory, useParams } from "react-router-dom";
import './rich.css'
import parse from 'html-react-parser'
import Popup from "reactjs-popup";
import { FaArrowAltCircleRight, FaArrowCircleLeft } from "react-icons/fa";




const RichText = () => {

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const [errors, setErrors] = useState([]);
  const note = useSelector(state => state.notes[params.id])
  const singleNote = useSelector(state => state.notes.note)
  const user = useSelector(state => state.session.user);
  const [content, setContent] = useState(note?.content)
  const [open, setOpen] = useState(false)
  const [color, setColor] = useState('#ebebeb')
  const [shake, setShake] = useState('')
  const [vis, setVis] = useState('none')
  const [success, setSuccess] = useState("")
  const [fontColor, setFontColor] = useState('darkslate')
  const [nb, setNb] = useState("hidden")
  const [canvas, setCanvas] = useState(false)
  const [img, setImg] = useState("")

  
  const onClick = async () => {
    let string = content.replace(/<[^>]+>/g, '')
    const updatedNote = {
      title: note?.title,
      content: content,
      id: params.id,
      string
    }
    
    const data = await dispatch(editNote(updatedNote))
    
    if (data.errors) {
      setErrors(data.errors);
      setShake('error')
      setTimeout(() => setShake(''), 2000)
      
    } else {

      setErrors([])
      setSuccess('saved')
      
      setTimeout(() => setSuccess('none'), 1200)

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
  
  useEffect(() => {
    if (!user) {
      history.push('/login')
    }
    
    const func = async() => {
      await dispatch(getNote(params.id))
      await setNb(`${singleNote?.notebookId}`)
      await console.log(`${nb}`)
      
    }
    func()

  }, [])
  
  
    const onDelete = async () => {
      await dispatch(deleteNote(params.id))
      history.push(`/notebooks/${singleNote?.notebookId}`)
  
    }
  const handleContent = e => {
    setContent(e)
  }

  return (
    <div id='container' style={{ backgroundColor: `${color}`, color: `${fontColor}` }}>
      <div className="title">
        <h3 style={{ marginTop: '7%' }}>{note?.title}</h3>
        <div className="backbutton" onMouseEnter={() => setVis("")} onMouseLeave={() => setVis('none')}>
          <FaArrowCircleLeft className="icon x-icon" onClick={() => history.go(-1)}/>
        </div>
          <p className='backmsg' style={{display: `${vis}`}}>Go back to your notebook</p>
      </div>
      {canvas &&
        <Draw  note={note}/>
        
      }
      {!canvas && 
      
      <ReactQuill
      style={{ width: '65%', height: '100%' }}
      placeholder="Write a new note."
      value={content}
      onChange={handleContent}
      />
      }
      <div className="buttons">
        <button className="save" onClick={onTheme}>toggle theme</button>
        <button className={`save ${shake} ${success}`} onClick={onClick}>save</button>
        
        {<div style={{marginTop: '20px', width:'150px'}} className='errormsg'>{errors}</div>}
        <button className='save red' onClick={toggle}>delete</button>
        <button className='save' onClick={() => setCanvas(!canvas)}>draw</button>
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