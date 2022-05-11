import './note.css'
import { FaCircle } from 'react-icons/fa'
import Popup from 'reactjs-popup'
import { useDispatch } from 'react-redux'
import { deleteNote, getNotes } from '../../store/note'
import { useHistory } from 'react-router-dom'
import { useRef } from 'react'
import Draggable from 'react-draggable'


const Note = ({ note }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const ref = useRef()


  const onDelete = async (id) => {
    await dispatch(deleteNote(note.id))
    await dispatch(getNotes())


  }




  return (
    <>
      <Draggable>
        <div className='note-container'>
          <div className="note">
            <div className='note-header'>
              <div className='note-icons'>
                <Popup
                  trigger={open => (
                    <div>
                      <FaCircle className="x-icon" />
                    </div>
                  )}
                  position=" center"
                  className="server_icon"
                  closeOnEscape
                  on={'click'}
                >
                  <h1>Are you sure you want to delete this note?</h1>
                  <button onClick={onDelete}>Yes</button>
                </Popup>

              </div>
            </div>
            <div className='note-content'>
              <p>{note.content}</p>
            </div>
          </div>
          <h4>{note.title}</h4>
        </div>
      </Draggable>
    </>
  )
}


export default Note