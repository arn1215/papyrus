import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';
import Popup from 'reactjs-popup'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/note';

const DashBoard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])
  
  
  return (
    <Popup
      trigger={open => (
        <div>
          <h4>create a note</h4>
        </div>
      )}
      position=" center"
      className="server_icon"
      closeOnEscape
      on={'click'}
    >
      <CreateNoteForm />
    </Popup>
  )
}

export default DashBoard;