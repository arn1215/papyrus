// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteNotebook, getNotebook, getNotebooks } from '../../store/notebook';
import CreateNotebook from '../CreateNotebook/CreateNotebook';
import './notebookBar.css'


const NotebookBar = () => {


  const notebookState = useSelector(state => state.notebooks?.notebooks)
  const dispatch = useDispatch()
  const onClick = async (e) => {
    e.stopPropagation()
    let id = e.target.id
    console.log('clicked', 'id:', id)
    await dispatch(deleteNotebook(id)).then(() => dispatch(getNotebooks()))
    

  }

  return (
    <div className='notebook-bar'>
      <h3>New Notebook</h3>
      <CreateNotebook />
      {notebookState?.map(notebook =>
        <>
        <Link onClick={() => dispatch(getNotebook(notebook.id))}  className='link' to={`/notebooks/${notebook.id}`} >{notebook.title}</Link>
        <div className='notebook-icons'>
        <div className='icon iconbutton' id={notebook.id} onClick={onClick}>
          X
        </div>
         Edit
        </div>
        </>
        )}
        
    </div>
  )
}


export default NotebookBar;