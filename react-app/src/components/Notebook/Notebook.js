import '../Note/note.css'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Popup from 'reactjs-popup'
import { useDispatch } from 'react-redux'

import { deleteNotebook, getNotebooks } from '../../store/notebook'


const Notebook = ({ notebook }) => {

  const dispatch = useDispatch()

  const onDelete = async (id) => {
    await dispatch(deleteNotebook(notebook.id))
    await dispatch(getNotebooks())
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
                    {/* <EditNoteForm note={note} /> */}
                    <p>put edit notebookform here</p>
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
                  <h1>Are you sure you want to delete this notebook?</h1>
                  <button onClick={onDelete}>Yes</button>
                </Popup>
              </div>
            </div>
          </div>
          <h4>{notebook.title}</h4>
        </div>
      
    </>
  )
}


export default Notebook