import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editNote, getNotes } from "../../store/note";

const EditNoteForm = ({ note }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState(`${note.title}`);
  const [content, setContent] = useState(`${note.content}`);
  const [errors, setErrors] = useState([]);
  const [contentErr, setContentErr] = useState([])
  
  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value)

  const onSubmit = async (e) => {
    e.preventDefault();
    const newNote = {
      title,
      content,
      id: note.id
    };
    const updateNote = await dispatch(editNote(newNote));
    
    dispatch(getNotes())

    
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
    <div className='who'>
      <div className="signup-form-container">
        <div className="login-form-text-container">
          <h1>Edit note.{note.id}</h1>
        </div>
        <div className="login-form-input">
          <form
            className="login-form"
            onSubmit={onSubmit}
          >
            <div className='login-form-group'>
              <label>Title</label>
              <input
                type="text"
                className="input"
                name='title'
                value={title}
                onChange={updateTitle}
              />
              {errors?.map(message => {
                return (<p className='server-form-error' key={message.title}>{message}</p>)
              })}
            </div>
            <div className='login-form-group'>
              <label>Content</label>
              <input
                type="text"
                className="input"
                name='content'
                value={content}
                onChange={updateContent}
              />
              {contentErr?.map(msg => {
                return (<p className='server-form-error' key={msg.content}>{msg}</p>)
              })}
            </div>
          </form>
        </div>
        <div className='create-channel-buttons-container'>
          <button className='channel-form-button' onClick={backButton}>Back</button>
          <button className='channel-form-button' onClick={onSubmit} type='submit'>Create</button>
        </div>
      </div>
    </div>
  )
}

export default EditNoteForm;
