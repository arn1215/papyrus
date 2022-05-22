import CanvasDraw from "react-canvas-draw";
import { useRef, useState } from 'react'
import { useDispatch } from "react-redux";
import { createNote, editNote, getNote } from "../store/note";


const Draw = ({ note }) => {

  const canvasRef = useRef(null)
  const dispatch = useDispatch()
  const [drawing, setDrawing] = useState();
  // const current = canvasRef.current;

  const handleExport = async () => {
    const base64 = canvasRef.current.canvasContainer.childNodes[1].toDataURL();
    setDrawing(base64);
    console.log(base64)
    const newNote = {
      id: note.id,
      title: note.title,
      content:  `<img className='drawing' src=${base64}></img>`,
      notebook_id: note.notebookId,
      string: "123"
    }

    dispatch(editNote(newNote))

  };



  return (
    <>

      <CanvasDraw
        brushColor="#300"
        canvasHeight={600}
        canvasWidth={900}
        hideGrid="true"
        brushRadius={3}
        ref={canvasRef}

        // onChange={handleChange}


        style={{
          borderRadius: '8px',
          boxShadow:
            "0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)"
        }}

      ></CanvasDraw>
          <button
            type="button"
            className="save "
            onClick={handleExport}
          >
            Save Drawing
          </button>

    </>


  )

}
export default Draw;