const CREATE_NOTE = '/notes/post'
const UPDATE_NOTE = '/notes/edit'
const DELETE_NOTE = '/notes/delete'
const READ_NOTES = '/notes/read'

const get_notes = payload => {
  return {
    type: READ_NOTES,
    payload
  }
}

const post_note = payload => {
  return {
    type: CREATE_NOTE,
    payload
  }
}

const edit_note = payload => {
  return {
    type: UPDATE_NOTE,
    payload
  }
}

const delete_note = payload => {
  return {
    type: DELETE_NOTE,
    payload
  }
}


export const getNotes = (notebookId) => async dispatch => {
  const res = await fetch(`/api/notes/${notebookId}`);
  const noteArray = await res.json();

  dispatch(get_notes(noteArray));
}

export const createNote = (note) => async dispatch => {
  const { title, content, notebook_id } = note;

  const res = await fetch('/api/notes/', {
    method: 'POST',
    body: JSON.stringify({title, content, notebook_id}),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json()
  console.log(data)
  if (data.errors) {
    return data
  } else {

    dispatch(post_note(data))
    return data;
  }
  

}

export const editNote = (note) => async dispatch => {
  const {title, content} = note;
  const res = await fetch(`/api/notes/${note.id}`, {
    method: 'PATCH',
    body: JSON.stringify({title, content}),
    headers: {'Content-Type': 'application/json'}
  })

  const data = await res.json()
  dispatch(edit_note(data))
  return data;

}

export const deleteNote = (id) => async dispatch => {
  const res = await fetch(`/api/notes/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json();
  dispatch(delete_note(id))
  return data
} 

const initialState = {}

const NoteReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE_NOTE:
      newState = { ...state };
      newState.notes?.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;
    
     //refactor  
     case READ_NOTES:
      let payload = action.payload['notes']
      newState = { ...state, notes: payload }
      payload?.forEach(note => {
        newState[note.id] = note
      })
      return newState
    default:
      return state;
  }
}

export default NoteReducer
