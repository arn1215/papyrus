import { useSelector } from 'react-redux';
import CreateNotebook from '../CreateNotebook/CreateNotebook';
import './notebookBar.css'


const NotebookBar = () => {

  const notebookState = useSelector(state => state.notebooks?.notebooks)
  
  return (
    <div className='notebook-bar'>
    <h3>New Notebook</h3>
    <CreateNotebook />
    {notebookState?.map(notebook =>
      <p>{notebook.title}</p>
      )}
      
    </div>
  )
}


export default NotebookBar;