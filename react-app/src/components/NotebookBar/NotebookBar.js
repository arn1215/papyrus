// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clear_notes } from '../../store/note';
import { deleteNotebook, getNotebook, getNotebooks } from '../../store/notebook';
import CreateNotebook from '../CreateNotebook/CreateNotebook';
import './notebookBar.css'


const NotebookBar = () => {

  const history = useHistory()
  const notebookState = useSelector(state => state.notebooks?.notebooks)
  const dispatch = useDispatch()
  const onClick = async (e) => {
    e.stopPropagation()
    let id = e.target.id
    console.log('clicked', 'id:', id)
    await dispatch(deleteNotebook(id)).then(() => dispatch(getNotebooks())).then(() => dispatch(clear_notes()))
    history.push('/notebooks/')

  }

  return (
    <div className='notebook-bar'>
      <h3>New Notebook</h3>
      <CreateNotebook />
      {notebookState?.map(notebook =>
        <div key={notebook.id}>
          <Link key={notebook.id} onClick={() => dispatch(getNotebook(notebook.id))}  className='link' to={`/notebooks/${notebook.id}`} >{notebook.title}</Link>
          <div className='notebook-icons'>
          <div className='icon iconbutton' id={notebook.id} onClick={onClick}>
            X
          </div>
          Edit
          </div>
        </div>
        )}
        
    </div>
  )
}


export default NotebookBar;