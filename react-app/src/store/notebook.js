const CREATE_NOTEBOOK = '/notebooks/post'
const UPDATE_NOTEBOOK = '/notebooks/edit'
const DELETE_NOTEBOOK = '/notebooks/delete'
const READ_NOTEBOOKS = '/notebooks/read'

const get_notebooks = payload => {
  return {
    type: READ_NOTEBOOKS,
    payload
  }
}

const post_notebook = payload => {
  return {
    type: CREATE_NOTEBOOK,
    payload
  }
}

const edit_notebook = payload => {
  return {
    type: UPDATE_NOTEBOOK,
    payload
  }
}

const delete_notebook = payload => {
  return {
    type: DELETE_NOTEBOOK,
    payload
  }
}


export const getnotebooks = () => async dispatch => {
  const res = await fetch(`/api/notebooks/`);
  const notebookArr = await res.json();

  dispatch(get_notebooks(notebookArr));
}

export const createNotebook = (notebook) => async dispatch => {
  const { title, content } = notebook;

  const res = await fetch('/api/notebooks/', {
    method: 'POST',
    body: JSON.stringify({title, content}),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json()
  console.log(data)
  if (data.errors) {
    return data
  } else {

    dispatch(post_notebook(data))
    return data;
  }
  

}

export const editNote = (notebook) => async dispatch => {
  const {title, content} = notebook;
  const res = await fetch(`/api/notebooks/${notebook.id}`, {
    method: 'PATCH',
    body: JSON.stringify({title, content}),
    headers: {'Content-Type': 'application/json'}
  })

  const data = await res.json()
  dispatch(edit_notebook(data))
  return data;

}

export const deleteNote = (id) => async dispatch => {
  const res = await fetch(`api/notebooks/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: {'Content-Type': 'application/json'}
  })
  const data = await res.json();
  dispatch(delete_notebook(id))
  return data
} 

const initialState = {}

const NotebookReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE_NOTEBOOK:
      newState = { ...state };
      newState.notebooks?.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;
    
     //refactor  
      case READ:
      let payload = action.payload['notebooks']
      newState = { ...state, notebooks: payload }
      payload?.forEach(notebook => {
        newState[notebook.id] = notebook
      })
      return newState
    default:
      return state;
  }
}

export default NotebookReducer
