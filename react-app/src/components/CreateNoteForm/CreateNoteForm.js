import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createNote, getNotes } from "../../store/note";

const CreateNoteForm = () => {
  const history = useHistory();
 
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);
  const [contentErr, setContentErr] = useState([])

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value)
  const onSubmit = async (e) => {
    e.preventDefault();
    const note = {
      title,
      content
    };
    const newNote = await dispatch(createNote(note));
    await dispatch(getNotes())

    if (newNote.errors?.title) {
      setErrors(newNote.errors?.title)

    }
    if (newNote.errors?.content) {
      return setContentErr(newNote.errors?.content)
    }
    // history.push(`/channels/${location.server_id}/${newChannel.id}`);
  }
  const backButton = () => {
    history.goBack();
  }

  return (
    <div className='whole-page-div'>
      <div className="signup-form-container">
        <div className="login-form-text-container">
          <h1>Create a note.</h1>
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
          <button className='channel-form-button' onClick={onSubmit} type='submit'>Create</button>
        </div>
      </div>
    </div>
  )
}

export default CreateNoteForm;
