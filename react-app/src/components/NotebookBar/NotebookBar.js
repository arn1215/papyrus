// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotebook } from '../../store/notebook';
import CreateNotebook from '../CreateNotebook/CreateNotebook';
import DeleteNotebook from '../DeleteNotebook/DeleteNotebook';
import EditNotebookForm from '../EditNotebookForm/EditNotebookForm';
import './notebookBar.css'


const NotebookBar = () => {
  const notebookState = useSelector(state => state.notebooks?.notebooks)
  const dispatch = useDispatch()

  // const onRedirect = async(id) => {
  //   await dispatch(getNotebook(id))
  //   history.push(`/notebooks/${id}`)
  // }

  return (
    <div className='notebook-bar'>
      <h3>Notebooks</h3>
      <CreateNotebook />
      {notebookState?.map(notebook =>
        <div key={notebook.id}>
          <Link className='animation nb-container' onClick={() => dispatch(getNotebook(notebook.id))}  className='link' to={`/notebooks/${notebook.id}`}>
          <div className='animation nb-container' >
            <p  onClick={() => dispatch(getNotebook(notebook.id))}  className='link' to={`/notebooks/${notebook.id}`} >{notebook.title}</p>
            <div className='notebook-icons'>
            <div className='icon iconbutton'>
              <DeleteNotebook id={notebook.id}  notebook={notebook} />
            </div>
              <EditNotebookForm id={notebook.id} notebook={notebook} />
            </div>
          </div>
          </Link>
        </div>
        )}
        
    </div>
  )
}


export default NotebookBar;