import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateNotebook from '../CreateNotebook/CreateNotebook';
import './notebookBar.css'


const NotebookBar = () => {

  const notebookState = useSelector(state => state.notebooks?.notebooks)
  
  return (
    <div className='notebook-bar'>
    <h3>New Notebook</h3>
    <CreateNotebook />
    {notebookState?.map(notebook =>
      <Link className='link' to={`notebooks/${notebook.id}`}>{notebook.title}< /Link>
      )}
      
    </div>
  )
}


export default NotebookBar;