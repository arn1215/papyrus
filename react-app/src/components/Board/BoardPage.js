import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import BoardItem from './BoardItem';
import Board from './Board';
import BoardList from './BoardList';

function BoardPage() {
  const [parent, setParent] = useState(null);
  const draggable = (
    <BoardItem id="draggable" >
      <div style={{ cursor: 'pointer' }} className="nb-container">
        Go ahead, drag me.\\\\\\\\\\
      </div>
    </BoardItem>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: "flex", width: '100%', height: '100%', justifyContent: 'space-around' }}>
        <Board id="todo" title="todo">
          {parent === "todo" ? draggable : null}
          <BoardList id="todoList" title={"To Do"} >
            {!parent ? draggable : null}
            {parent === "todoList" ? draggable : null}
          </BoardList>
        </Board>
        <Board id="prog" title="prog">
          {parent === "prog" ? draggable : null}
          <BoardList id="progList" title={"In Progress"} >
            {parent === "progList" ? draggable : null}
          </BoardList>
        </Board>
        <Board id="done" title="done">
          {parent === "done" ? draggable : null}
          <BoardList id="doneList" title={"Done"} >
            {parent === "doneList" ? draggable : null}
          </BoardList>
        </Board>
      </div>


    </DndContext>
  );

  function handleDragEnd({ over }) {
    setParent(over ? over.id : null);
  }
}

export default BoardPage