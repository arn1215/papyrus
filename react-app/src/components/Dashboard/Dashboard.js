import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';
import Popup from 'reactjs-popup'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote, getNotes } from '../../store/note';
import { useSelector } from 'react-redux';
import Note from '../Note/Note';
import './Dashboard.css'
import { FaEdit, FaPlusCircle } from 'react-icons/fa';

const DashBoard = () => {
  const dispatch = useDispatch()
  const noteState = useSelector(state => state.notes.notes)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [contentErr, setContentErr] = useState([])
  const [open, setOpen] = useState(false)

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value)
  const toggleModal = () => setOpen(!open)

  const onSubmit = async (e) => {
    e.preventDefault();
    const note = {
      title,
      content
    };
    const newNote = await dispatch(createNote(note));
    


    if (newNote.errors?.content || newNote.errors?.title) {
      setContentErr(newNote.errors?.content)
      setErrors(newNote.errors?.title)
    } else {
      
      setErrors([])
      setContentErr([])
      toggleModal()

    }
    // history.push(`/channels/${location.server_id}/${newChannel.id}`);
  }
  const backButton = () => {
    // history.goBack();
  }


  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])


  return (
    <>

      <div className='note-list'>

        <Popup
          trigger={open => (
            <div className='note-create' onClick={toggleModal}>
            <FaPlusCircle />
          </div>
          )}
          open={open}
          position=" center"
          className="note_icon"
          closeOnEscape
          on={'click'}
        >
          <>
            <form
              className="login-form"
              onSubmit={onSubmit}
            >
              <div className='login-form-group'>
                <label>Title</label>
                <input
                  type="text"
                  className="input"
                  name='title'
                  value={title}
                  onChange={updateTitle}
                />
                {errors?.map(message => {
                  return (<p className='server-form-error' key={message.title}>{message}</p>)
                })}
              </div>
              <div className='login-form-group'>
                <label>Content</label>
                <input
                  type="text"
                  className="input"
                  name='content'
                  value={content}
                  onChange={updateContent}
                />
                {contentErr?.map(msg => {
                  return (<p className='server-form-error' key={msg.content}>{msg}</p>)
                })}

              </div>
              <div className='create-channel-buttons-container'>
                <button className='channel-form-button' onClick={backButton}>Back</button>
                <button className='channel-form-button' onClick={onSubmit} type='submit'>Create</button>
              </div>
            </form>
          </>
        </Popup>
        {noteState?.map(note =>
          <Note note={note} />
        )}
      </div>

    </>
  )
}

export default DashBoard;