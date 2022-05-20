import './note.css'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import Popup from 'reactjs-popup'
import { useDispatch } from 'react-redux'
import { deleteNote, getNotes, editNote } from '../../store/note'
import { useParams } from 'react-router-dom'
import EditNoteForm from '../EditNoteForm/EditNoteForm'
import parse from 'html-react-parser'
import { useState } from 'react'

import { useHistory } from 'react-router-dom';



const Note = ({ note }) => {

  const dispatch = useDispatch()
  const [open, setOpen] = useState("")
  const params = useParams()
  const string = note.content
  const onDelete = async (id) => {
    await dispatch(deleteNote(note.id))
    await dispatch(getNotes(params.notebook_id))
  }

  // edit stuff
  const history = useHistory();
  const [title, setTitle] = useState(`${note.title}`);
  const [content, setContent] = useState(`${note.content}`);
  const [errors, setErrors] = useState([]);
  const [contentErr, setContentErr] = useState([])

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value)
  const toggleModal = () => setOpen(false)

  const onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      id: note.id,
    };
    const updateNote = await dispatch(editNote(newNote));

    dispatch(getNotes(params.notebook_id))


    if (updateNote.errors?.title || updateNote.errors?.content) {
      setErrors(updateNote.errors?.title)
      setContentErr(updateNote.errors?.content)

    } else{
      setContent()

    }
    //clear errors
  }


  return (
    <>

      <div className='note-container'>
        <div className="note">
          <div className='note-header'>
            <h1>{note.title}</h1>
            <div className='note-icons'>


              <Popup
                position=" center"
                trigger={open => (
                  <div >
                    <FaEdit className='x-icon'/>
                  </div>
                )}
                className="note_icon"

                open={open}
              >
                <>
                  <div className='form'>
                    <div className="form-title" >
                      <h4>Edit note</h4>
                    </div>
                    <div className="note-form-input">
                      <form
                        className="note-form"
                        onSubmit={onSubmit}
                      >
                        <div className='note-form-group'>
                          <label>Title</label>
                          <input
                            type="text"
                            className="input"
                            name='title'
                            value={title}
                            onChange={updateTitle}
                          />
                          {errors?.map(message => {
                            return (<p className='note-form-error' key={message.title}>{message}</p>)
                          })}
                        </div>
                        <div className='note-form-group'>
                          <label>Content</label>
                          <input
                            type="text"
                            className="input"
                            name='content'
                            value={content}
                            onChange={updateContent}
                          />
                          {contentErr?.map(msg => {
                            return (<p className='note-form-error' key={msg.content}>{msg}</p>)
                          })}
                        </div>
                      </form>
                    </div>
                    <div className='buttons-container'>
                      <button className='form-button' onClick={onSubmit} type='submit'>Save</button>
                    </div>
                  </div>
                </>
              </Popup>

              <Popup
                trigger={open => (
                  <div>
                    <FaTrashAlt className="x-icon" />
                  </div>
                )}
                position=" center"
                modal
                className="note_icon"
                closeOnEscape
                on={'click'}
              >
                <h4>Are you sure you want to delete this note?</h4>
                <button className="form-button" onClick={onDelete}>Yes</button>
              </Popup>

            </div>
          </div>
          <div className='content' >
            {parse(`${string}`)}
          </div>
        </div>


      </div>

    </>
  )
}


export default Note