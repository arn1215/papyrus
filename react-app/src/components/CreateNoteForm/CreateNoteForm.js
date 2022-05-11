import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { createNote, getNotes } from "../../store/note";

const CreateNoteForm = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState([]);

  const updateTitle = (e) => setTitle(e.target.value);
  const updateContent = (e) => setContent(e.target.value)
  const onSubmit = async (e) => {
    e.preventDefault();
    const note = {
      title,
      content
    };
    const newNote = await dispatch(createNote(note));
    dispatch(getNotes())

    if (newNote.errors) return setErrors(newNote.errors.name);
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
              {errors?.map(error => {
                return (<p className="signup-error" key={error}>{error}</p>)
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
              {errors?.map(error => {
                return (<p className="signup-error" key={error}>{error}</p>)
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

export default CreateNoteForm;
