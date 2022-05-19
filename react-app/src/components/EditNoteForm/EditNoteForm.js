import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { editNote, getNotes } from "../../store/note";

const EditNoteForm = ({ note }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(`${note.title}`);
  const [content, setContent] = useState(`${note.content}`);
  const [errors, setErrors] = useState([]);
  const [contentErr, setContentErr] = useState([])
  const params = useParams()
  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      id: note.id,
    };
    const updateNote = await dispatch(editNote(newNote));
    
    dispatch(getNotes(params.notebook_id))

    
    if (updateNote.errors?.title || updateNote.errors?.content) {
      setErrors(updateNote.errors?.title)
      setContentErr(updateNote.errors?.content) 
      
    }
    // if (updateNote.errors?.content) {
    //   return setContentErr(updateNote.errors?.content) 
    // }
    
    // history.push(`/channels/${location.server_id}/${newChannel.id}`);
  }
  const backButton = () => {
    history.goBack();
  }

  return (
    <div className='form'>
        <div className="form-title" >
          <h4>Edit note</h4>
        </div>
        <div className="note-form-input">
          <form
            className="note-form"
            onSubmit={onSubmit}
          >
            <div className='note-form-group'>
              <label>Title</label>
              <input
                type="text"
                className="input"
                name='title'
                value={title}
                onChange={updateTitle}
              />
              {errors?.map(message => {
                return (<p className='note-form-error' key={message.title}>{message}</p>)
              })}
            </div>
            <div className='note-form-group'>
              <label>Content</label>
              <input
                type="text"
                className="input"
                name='content'
                value={content}
                onChange={updateContent}
              />
              {contentErr?.map(msg => {
                return (<p className='note-form-error' key={msg.content}>{msg}</p>)
              })}
            </div>
          </form>
        </div>
        <div className='buttons-container'>
          <button className='form-button' onClick={onSubmit} type='submit'>Save</button>
        </div>
    </div>
  )
}

export default EditNoteForm;
