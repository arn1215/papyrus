import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';
import Popup from 'reactjs-popup'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/note';
import { useSelector } from 'react-redux';
import Note from '../Note/Note';

const DashBoard = () => {
  const dispatch = useDispatch()
  const noteState = useSelector(state => state.notes.notes)
  
  
  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])
  
  
  return (
    <>
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
    {noteState?.map(note => 
      <Note note={note} />
      )}
    </>
  )
}

export default DashBoard;