import CanvasDraw from "react-canvas-draw";
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createNote, editNote, getNote } from "../store/note";
import { FaSave } from "react-icons/fa";
import { useHistory, useParams } from "react-router-dom";
import Popup from "reactjs-popup";


const Draw = ({ note }) => {
  const params = useParams()
  const canvasRef = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()
  const [shake, setShake] = useState('')
  const [success, setSuccess] = useState("")
  const [drawing, setDrawing] = useState();
  const [errors, setErrors] = useState([])
  const fetchNote = useSelector(state => state.notes[params.id])
  const [open, setOpen] = useState(false)


  // const current = canvasRef.current;

  const handleExport = async () => {
    setOpen(false)
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
    console.log(base64)
    const newNote = {
      id: params.id,
      title: note.title,
      content: `<img className='drawing' src=${base64}></img>`,
      notebook_id: note.notebookId,
      string: "123"
    }
    try {
      const data = await dispatch(editNote(newNote))
      setErrors([])
      setSuccess('saved')
      setTimeout(() => setSuccess('none'), 1200)

    } catch (error) {
      setErrors(["Something went seriously wrong."]);
      setShake('error')
      setTimeout(() => setShake(''), 2000)
    }





  };

  useEffect(() => {

  }, [])

  return (
    <div className="canvas-container">

      <CanvasDraw
        
        brushColor="#300"
        canvasHeight={600}
        canvasWidth={900}
        hideGrid={true}
        brushRadius={3}
        ref={canvasRef}
  
        immediateLoading={false}
        style={{
          borderRadius: '8px',
          marginTop: '8%',
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }}

      ></CanvasDraw>
      <FaSave className={`form-button  ${shake} ${success}` } style={{ color: 'black' }} onClick={() => setOpen(true)} />
      <p>{errors}</p>
      <Popup
      onClose={() => setOpen(false)}
      open={open}
      >
      <p style={{width: '300px'}}>Any existing drawing will be overwritten. Are you sure?</p>
      <button onClick={handleExport} className="logout yes" style={{margin: '20px'}} >yes</button>
      <button onClick={() => setOpen(false)} className="logout yes" style={{margin: '20px'}} >no</button>
      </Popup>

    </div>


  )

}
export default Draw;