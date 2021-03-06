const CREATE_NOTE = '/notes/post'
const UPDATE_NOTE = '/notes/edit'
const DELETE_NOTE = '/notes/delete'
const READ_NOTES = '/notes/read'
const READ_NOTE = '/note/read'
const CLEAR_NOTES = '/notes/clear'

const get_notes = payload => {
  return {
    type: READ_NOTES,
    payload
  }
}

const get_note = payload => {
  return {
    type: READ_NOTE,
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

export const clear_notes = payload => {
  return {
    type: CLEAR_NOTES,
    payload
  }
}




export const getNotes = (notebookId) => async dispatch => {
  const res = await fetch(`/api/notes/${notebookId}`);
  const noteArray = await res.json();

  dispatch(get_notes(noteArray));
}

export const getNote = (noteId) => async dispatch => {
  const res = await fetch(`/api/notes/byNoteId/${noteId}`);
  const note = await res.json();

  dispatch(get_note(note));
}

export const createNote = (note) => async dispatch => {
  const { title, content, notebook_id } = note;

  const res = await fetch('/api/notes/', {
    method: 'POST',
    body: JSON.stringify({title, content, notebook_id}),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json()
  if (data.errors) {
    return data
  } else {

    dispatch(post_note(data))
    return data;
  }
  

}

export const editNote = (note) => async dispatch => {
  const {title, content, string} = note;
  const res = await fetch(`/api/notes/${note.id}`, {
    method: 'PATCH',
    body: JSON.stringify({title, content, string}),
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

const initialState = {note: {}}

const NoteReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE_NOTE:
      newState = { ...state };
      newState.notes?.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;

    case UPDATE_NOTE: 
      newState = { ...state };
      newState.notes?.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;  
      
      case CLEAR_NOTES:
        return {}
    
     //refactor  
    case READ_NOTES:
      let payload = action.payload['notes']
      newState = { ...state, notes: payload }
      payload?.forEach(note => {
        newState[note.id] = note
      })
      return newState

    case READ_NOTE:
      newState = {...state};
      newState.note = action.payload
      return newState    

    default:
      return state;
  }
}

export default NoteReducer
