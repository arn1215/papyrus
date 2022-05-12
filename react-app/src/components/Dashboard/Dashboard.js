import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';
import Popup from 'reactjs-popup'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNotes } from '../../store/note';
import { useSelector } from 'react-redux';
import Note from '../Note/Note';
import './Dashboard.css'
import { FaPlusCircle } from 'react-icons/fa';

const DashBoard = () => {
  const dispatch = useDispatch()
  const noteState = useSelector(state => state.notes.notes)
  
  
  useEffect(() => {
    dispatch(getNotes())
  }, [dispatch])
  
  
  return (
    <>

    <div className='note-list'>
    <Popup
      trigger={open => (
        <div className='note-create'>
          <FaPlusCircle />
        </div>
      )}
      position=" center"
      className="server_icon"
      closeOnDocumentClick
      on={'click'}
      >
      <CreateNoteForm />
    </Popup>
    {noteState?.map(note => 
      <Note note={note} />
      )}
    </div>
    </>
  )
}

export default DashBoard;