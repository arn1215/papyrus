import CanvasDraw from "react-canvas-draw";
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { createNote, editNote, getNote } from "../store/note";
import { FaSave } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Popup from "reactjs-popup";


const Draw = ({ note }) => {
  const params = useParams()
  const canvasRef = useRef(null)
  const dispatch = useDispatch()
  const [drawing, setDrawing] = useState();
  const fetchNote = useSelector(state => state.notes[params.id])


  const [shake, setShake] = useState('')
  // const current = canvasRef.current;

  const handleExport = async () => {
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
    console.log(base64)
    const newNote = {
      id: note.id,
      title: note.title,
      content: `<img className='drawing' src=${base64}></img>`,
      notebook_id: note.notebookId,
      string: "123"
    }

    dispatch(editNote(newNote))

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

      <FaSave className='animation form-button' style={{ color: 'black' }} onClick={handleExport} />
      <Popup
      
      >
      <p>Existing drawings will be overwritten. Are you sure?</p>
      <button>yes</button>
      <button>no</button>
      </Popup>

    </div>


  )

}
export default Draw;