
import Popup from 'reactjs-popup'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { clear_notes, createNote, getNote, getNotes } from '../../store/note';
import { useSelector } from 'react-redux';
import Note from '../Note/Note';
import './Dashboard.css'
import { FaPlusCircle } from 'react-icons/fa';
import { getNotebooks } from '../../store/notebook';
import { useHistory, useParams } from 'react-router-dom';
import NavBar from '../NavBar'
import RichText from '../RichText';
import image from './Animation.gif'



const DashBoard = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const noteState = useSelector(state => state.notes.notes)

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [contentErr, setContentErr] = useState([])
  const [open, setOpen] = useState(false)
  const [display, setDisplay] = useState('visible')
  const singleNotebook = useSelector(state => state.notebooks?.notebook)

  const params = useParams()

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value)
  const toggleModal = () => setOpen(!open)

  const onSubmit = async (e) => {
    e.preventDefault();
    const note = {
      title,
      content,
      notebook_id: params.notebook_id
    };

    const newNote = await dispatch(createNote(note));

    if (newNote.errors?.content || newNote.errors?.title) {
      setContentErr(newNote.errors?.content)
      setErrors(newNote.errors?.title)
    } else {

      setErrors([])
      setContentErr([])
      setContent("")
      setTitle("")
      setOpen(false)
      
    }
    // history.push(`/channels/${location.server_id}/${newChannel.id}`);
  }
  const backButton = () => {
    // history.goBack();
  }


  const onClick = (id) => {
    dispatch(getNote(id))
    history.push(`/notes/${id}`)
  }

  useEffect(() => {
    dispatch(getNotes(params.notebook_id))
    dispatch(getNotebooks())
    if (window.location.href.includes('/notebooks/')) {
      dispatch(clear_notes())
    }
    if (!params.notebook_id) {
      setDisplay('none')
    }
    // dispatch(getNotebook(params.notebook_id))
  }, [dispatch, params])

  if (!window.location.href.endsWith('/notebooks/')) {

    return (
      <>

        <div className='note-list'>
          <div className='notebook-title'>
            <div className='nb-title animation'>
            </div>
          </div>
          <h2 style={{ color: 'aliceblue', marginTop: '6px', marginRight: '30px' }}>{singleNotebook?.title}</h2>
              <div className='note-create' onClick={() => setOpen(true)}>
                <FaPlusCircle />
              </div>
          <Popup
            position=" center"
            className="note_icon"
            modal
            open={open}
            closeOnEscape
            onClose={() => setOpen(false)}
            style={{ display: `${display}` }}
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
                <div className='buttons-container'>
                  <button className='form-button' onClick={onSubmit} type='submit'>Create</button>
                </div>
              </form>
            </>
          </Popup>
          <div className='single-note-container'>
            <>

            </>
            {noteState?.map(note =>
              <div className='notes' >
                <div className='single-note' onClick={() => onClick(note.id)}>
                  <Note note={note} />
                </div>
              </div>
            )}
          </div>
        </div>

      </>
    )
  } else {
    return (
      <div className='demo-container'>
        <h1>Get started by creating or clicking a notebook!</h1>
        <img src={image} className="demo-image" style={{ width: '1200px', height: '500px' }}></img>
      </div>

    )
  }
}

export default DashBoard;