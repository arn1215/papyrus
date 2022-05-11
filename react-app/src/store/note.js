const CREATE_NOTE = '/notes/post'
const UPDATE_NOTE = '/notes/edit'
const NOTE_DELETE = '/notes/delete'
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


export const getNotes = () => async dispatch => {
  const res = await fetch(`/api/notes/`);
  const noteArray = await res.json();

  dispatch(get_notes(noteArray));
}

export const createNote = (note) => async dispatch => {
  const { title, content } = note;
  const res = await fetch('/api/notes/', {
    method: 'POST',
    body: JSON.stringify({title, content}),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json()

  dispatch(post_note(note))
  return data;

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
