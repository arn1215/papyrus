import './note.css'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Popup from 'reactjs-popup'
import { useDispatch } from 'react-redux'
import { deleteNote, getNotes } from '../../store/note'
import { useParams } from 'react-router-dom'
import EditNoteForm from '../EditNoteForm/EditNoteForm'
import parse from 'html-react-parser'


const Note = ({ note }) => {

  const dispatch = useDispatch()

  const params = useParams()
  const string = note.content
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
                modal
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
          <div className='content' >
            {parse(`${string}`)}
          </div>
        </div>
        <h4>{note.title}</h4>
        <p>{note.createdAt}</p>
      </div>

    </>
  )
}


export default Note