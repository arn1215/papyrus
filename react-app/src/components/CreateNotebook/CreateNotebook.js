import Popup from 'reactjs-popup'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNote, getNotes } from '../../store/note';
import  {createNotebook, getNotebooks} from '../../store/notebook'
import { useSelector } from 'react-redux';
import Notebook from '../Notebook/Notebook';

import { FaEdit, FaPlusCircle } from 'react-icons/fa';

const CreateNotebook = () => {

  const dispatch = useDispatch()
  const notebookState = useSelector(state => state.notebooks?.notebooks)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false)

  const updateTitle = (e) => setTitle(e.target.value);
  const toggleModal = () => setOpen(!open)

  const onSubmit = async (e) => {
    e.preventDefault();
    const notebook = {
      title,
    };
    const newNotebook = await dispatch(createNotebook(notebook));
    


    if (newNotebook.errors?.title) {
      setErrors(newNotebook.errors?.title)
    } else {
      
      setErrors([])
      await dispatch(getNotebooks())
      toggleModal()

    }
    // history.push(`/channels/${location.server_id}/${newChannel.id}`);
  }
  const backButton = () => {
    // history.goBack();
  }


  // useEffect(() => {
  //   dispatch(getNotebooks())
  // }, [dispatch])

  
  
  return (
        
    <>
      <div className='create'>
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

              <div className='create-channel-buttons-container'>
                <button className='channel-form-button' onClick={backButton}>Back</button>
                <button className='channel-form-button' onClick={onSubmit} type='submit'>Create</button>
              </div>
            </form>
          </>
        </Popup>
      </div>
    </>      
  )
}


export default CreateNotebook;