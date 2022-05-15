import Popup from "reactjs-popup"
// import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { FaSadCry } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { clear_notes } from '../../store/note';
import { deleteNotebook, getNotebook, getNotebooks } from '../../store/notebook';
import CreateNotebook from '../CreateNotebook/CreateNotebook';
import { useState } from "react";




const DeleteNotebook = ({id, notebook}) => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [open, setOpen] = useState(false)

  const onClick = async (e) => {
    e.stopPropagation()
    let id = e.target.id
    console.log('clicked', 'id:', id)
    await dispatch(deleteNotebook(id)).then(() => dispatch(getNotebooks())).then(() => dispatch(clear_notes()))
    history.push('/notebooks/')
  }

  


  return (
    <>
    <i className="fa-solid fa-trash" onClick={() => setOpen(!open)}></i>
    <Popup
    position=" center"
    className="note_icon"
    closeOnEscape
    modal
    on={'click'}
    open={open}
    
    >
    <h1>Deleting this notebook will remove all of its contents too. Delete forever?</h1>
    <button className='form-button' id={notebook?.id} onClick={onClick}>Yes</button>
    <button style={{marginLeft: '20px'}} className='form-button' onClick={() => setOpen(!open)}>No</button>
    </Popup>
    </>

  )
}




export default DeleteNotebook;
