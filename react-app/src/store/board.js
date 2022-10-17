const CREATE_board = '/boards/post'
const UPDATE_board = '/boards/edit'
const DELETE_board = '/boards/delete'
const READ_boardS = '/boards/read'
const READ_board = '/board/read'

const get_boards = payload => {
  return {
    type: READ_boardS,
    payload
  }
}

const get_board = payload => {
  return {
    type: READ_board,
    payload
  }
}

const post_board = payload => {
  return {
    type: CREATE_board,
    payload
  }
}

const edit_board = payload => {
  return {
    type: UPDATE_board,
    payload
  }
}

const delete_board = payload => {
  return {
    type: DELETE_board,
    payload
  }
}


export const getboards = () => async dispatch => {
  const res = await fetch(`/api/boards/`);
  const boardArr = await res.json();

  dispatch(get_boards(boardArr));
}

export const getboard = (id) => async dispatch => {
  const res = await fetch(`/api/boards/${id}`);
  const boardObj = await res.json();

  dispatch(get_board(boardObj));
}


export const createboard = (board) => async dispatch => {
  const { title, content } = board;

  const res = await fetch('/api/boards/', {
    method: 'POST',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json()

  if (data.errors) {
    return data
  } else {

    dispatch(post_board(data))
    return data;
  }


}

export const editboard = (board) => async dispatch => {
  const { title } = board;
  const res = await fetch(`/api/boards/${board.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title }),
    headers: { 'Content-Type': 'application/json' }
  })

  const data = await res.json()
  dispatch(edit_board(data))
  return data;

}

export const deleteboard = (id) => async dispatch => {
  const res = await fetch(`/api/boards/${id}`, {
    method: 'DELETE',
    body: JSON.stringify(id),
    headers: { 'Content-Type': 'application/json' }
  })
  const data = await res.json();
  dispatch(delete_board(id))
  return data
}

const initialState = {}

const BoardReducer = (state = initialState, action) => {
  let newState;

  switch (action.type) {
    case CREATE_board:
      newState = { ...state };
      newState.boards?.push(action.payload);
      newState[action.payload.id] = action.payload;
      return newState;

    //refactor  
    case READ_boardS:
      let payload = action.payload['boards']
      newState = { ...state, boards: payload }
      payload?.forEach(board => {
        newState[board.id] = board
      })
      return newState;

    case READ_board:
      let payload2 = action.payload
      newState = { ...state };
      newState.board = payload2
      return newState;
    default:
      return state;
  }
}

export default BoardReducer
