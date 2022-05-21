import Popup from 'reactjs-popup'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  {createNotebook, getNotebook, getNotebooks} from '../../store/notebook'
import { FaPlusCircle } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';

const CreateNotebook = () => {

  const dispatch = useDispatch()
  const history = useHistory(
    
  )

  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState([]);
  const [open, setOpen] = useState(false)

  const updateTitle = (e) => setTitle(e.target.value);
  

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
      await dispatch(getNotebook(newNotebook.id))

      setOpen(false)
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
            <div className='note-create' onClick={() => setOpen(true)}>
              <FaPlusCircle />
            </div>
        <Popup
          arrow={true}
          position=" center"
          className="note_icon"
          closeOnEscape
          onClose={() => setOpen(false)}
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
                <button className='form-button' onClick={onSubmit} type='submit'>Create</button>
              </div>
            </form>
          </>
        </Popup>
      </div>
    </>      
  )
}


export default CreateNotebook;