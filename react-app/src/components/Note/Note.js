import './note.css'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Popup from 'reactjs-popup'
import { useDispatch } from 'react-redux'
import { deleteNote, getNotes } from '../../store/note'
import { useHistory, useParams } from 'react-router-dom'
import { useRef } from 'react'
import Draggable from 'react-draggable'
import EditNoteForm from '../EditNoteForm/EditNoteForm'


const Note = ({ note }) => {

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()

  const onDelete = async (id) => {
    await dispatch(deleteNote(note.id))
    await dispatch(getNotes(params.notebook_id))
  }

  return (
    <>
      
        <div className='note-container'>
          <div className="note">
            <div className='note-header'>
              <div className='note-icons'>
                <Popup
                    trigger={open => (
                      <div>
                        <FaEdit className="x-icon" />
                      </div>
                    )}
                    position="center"
                    className="note_icon"
                    closeOnEscape
                    on={'click'}
                  >
                    <EditNoteForm note={note} />
                  </Popup>
                  
                  <Popup
                    trigger={open => (
                      <div>
                        <FaTrashAlt className="x-icon" />
                      </div>
                    )}
                    position=" center"
                    className="note_icon"
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
      
    </>
  )
}


export default Note