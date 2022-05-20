import Popup from 'reactjs-popup'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  {editNotebook, getNotebook, getNotebooks} from '../../store/notebook'

import { useHistory } from 'react-router-dom';

const EditNotebookForm = ({id, notebook}) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState(`${notebook.title}`);
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false)

  const updateTitle = (e) => setTitle(e.target.value);
  const toggleModal = () => setOpen(!open)

  const onSubmit = async (e) => {
    e.preventDefault();
    const notebook = {
      title,
      id
    };
    const newNotebook = await dispatch(editNotebook(notebook));
    


    if (newNotebook.errors?.title) {
      setErrors(newNotebook.errors?.title)
    } else {
      
      setErrors([])
      await dispatch(getNotebooks())
      await dispatch(getNotebook(newNotebook.id))
      toggleModal()

      history.push(`/notebooks/${newNotebook.id}`);
    }
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
            <div className='icon' onClick={toggleModal}>
              <i class="fa-solid fa-edit" id={notebook.id} ></i>
            </div>
        <Popup
          arrow={true}
          position=" center"
          className="note_icon"
          closeOnEscape
          on={'click'}
          open={open}
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
                <button className='form-button' onClick={onSubmit} type='submit'>Edit</button>
              </div>
            </form>
          </>
        </Popup>
      </div>
    </>      
  )
}


export default EditNotebookForm;